"""Planck T+ xG motoru v0 — bir şutun gol olma olasılığı.
Özellikler: kaleye uzaklık, kaleyi görme açısı, kafa vuruşu mu, şut anında kaleyle top arasındaki
(açı üçgeninin içindeki) savunmacı sayısı, kalecinin konumu. Model: lojistik regresyon (numpy ile).
Veri: StatsBomb açık verisi (şut anındaki oyuncu konumları = freeze frame). Penaltılar hariç."""
import json, math, glob, sys
import numpy as np
GX, GY, HW = 120.0, 40.0, 3.66  # StatsBomb koordinatları: kale x=120, y=36.34–43.66
def in_tri(p, a, b, c):
    def s(p1, p2, p3): return (p1[0]-p3[0])*(p2[1]-p3[1]) - (p2[0]-p3[0])*(p1[1]-p3[1])
    d1, d2, d3 = s(p, a, b), s(p, b, c), s(p, c, a)
    return not ((d1 < 0 or d2 < 0 or d3 < 0) and (d1 > 0 or d2 > 0 or d3 > 0))
def feats(ev):
    x, y = ev['location'][:2]; dx, dy = GX - x, GY - y
    dist = math.hypot(dx, dy)
    a1 = math.atan2(GY - HW - y, GX - x); a2 = math.atan2(GY + HW - y, GX - x); ang = abs(a2 - a1)
    head = 1.0 if ev['shot'].get('body_part', {}).get('name') == 'Head' else 0.0
    ff = ev['shot'].get('freeze_frame', []); blk = 0; gk_off = 0.0
    for p in ff:
        if p.get('teammate'): continue
        loc = p['location']
        if p.get('position', {}).get('name') == 'Goalkeeper':
            gk_off = math.hypot(loc[0] - GX, loc[1] - GY)
        elif in_tri(loc, (x, y), (GX, GY - HW), (GX, GY + HW)): blk += 1
    return [1.0, dist, ang, head, blk, gk_off]
def load(paths):
    X, y, meta = [], [], []
    for f in paths:
        for e in json.load(open(f)):
            if e['type']['name'] != 'Shot' or e['shot']['type']['name'] == 'Penalty': continue
            X.append(feats(e)); y.append(1.0 if e['shot']['outcome']['name'] == 'Goal' else 0.0); meta.append(e)
    return np.array(X), np.array(y), meta
def fit(X, y, l2=1.0, it=4000, lr=0.05):
    mu, sd = X[:, 1:].mean(0), X[:, 1:].std(0) + 1e-9
    Z = np.c_[X[:, :1], (X[:, 1:] - mu) / sd]; w = np.zeros(Z.shape[1])
    for _ in range(it):
        p = 1 / (1 + np.exp(-Z @ w)); g = Z.T @ (p - y) / len(y); g[1:] += l2 * w[1:] / len(y); w -= lr * g * 10
    return {'w': w.tolist(), 'mu': mu.tolist(), 'sd': sd.tolist()}
def predict(m, f):
    z = m['w'][0] + sum(m['w'][i+1] * (f[i+1] - m['mu'][i]) / m['sd'][i] for i in range(len(m['mu'])))
    return 1 / (1 + math.exp(-z))
if __name__ == '__main__':
    files = sorted(glob.glob(sys.argv[1] + '/ev_*.json'))
    X, y, meta = load(files)
    idx = np.arange(len(y)); rng = np.random.default_rng(7); rng.shuffle(idx); cut = int(len(y) * .8)
    m = fit(X[idx[:cut]], y[idx[:cut]])
    pt = np.array([predict(m, X[i]) for i in idx[cut:]]); yt = y[idx[cut:]]
    sbx = np.array([meta[i]['shot']['statsbomb_xg'] for i in idx[cut:]])
    print(f"şut: {len(y)}  gol: {int(y.sum())}  test Brier — Planck xG: {np.mean((pt-yt)**2):.4f}  StatsBomb xG: {np.mean((sbx-yt)**2):.4f}  sabit oran: {np.mean((yt.mean()-yt)**2):.4f}")
    m = fit(X, y); m['features'] = ['sabit', 'uzaklik', 'aci', 'kafa', 'onundeki_savunmaci', 'kaleci_uzakligi']; m['n_shots'] = int(len(y))
    json.dump(m, open('sports/xg_model.json', 'w'), indent=1); print('ağırlıklar:', [round(v, 2) for v in m['w']])
