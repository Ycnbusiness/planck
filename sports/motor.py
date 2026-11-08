"""Planck T+ motoru v0 — Poisson güç modeli.
Her takımın hücum ve savunma gücü, maç başına attığı/yediği golün lig ortalamasına oranıdır.
Az maç oynandığı için güçler lig ortalamasına doğru çekilir (büzülme, K maçlık sanal ortalama).
Beklenen gol: ev = ort * hücum_ev * savunma_dep * ev_avantajı ; dep = ort * hücum_dep * savunma_ev / ev_avantajı
Skor olasılıkları Poisson + Dixon-Coles düşük skor düzeltmesi; 0-10 gol ızgarasından ev/beraberlik/dep toplanır.
Aynı veriyle her seferinde aynı sonucu verir."""
import json, math, sys
K = 8          # büzülme: 8 maçlık lig ortalaması eklenir (sezon başında aşırı güveni önler)
RHO = -0.12    # Dixon-Coles düzeltmesi: düşük skorlu beraberlikleri bağımsız Poisson'un üstüne taşır
HOME = 1.15    # ev avantajı çarpanı (Süper Lig tarihsel ~%15 fazla gol)
def pois(l, k): return math.exp(-l) * l**k / math.factorial(k)
def tau(i, j, lh, la):
    if i == 0 and j == 0: return 1 - lh*la*RHO
    if i == 0 and j == 1: return 1 + lh*RHO
    if i == 1 and j == 0: return 1 + la*RHO
    if i == 1 and j == 1: return 1 - RHO
    return 1
def run(path):
    d = json.load(open(path)); t = {r[0]: r for r in d['table']}
    gp = sum(r[1] for r in d['table']); gf = sum(r[2] for r in d['table'])
    avg = gf / gp                      # takım başına maç başı gol
    att = {n: ((r[2] + K*avg) / (r[1] + K)) / avg for n, r in t.items()}
    dfn = {n: ((r[3] + K*avg) / (r[1] + K)) / avg for n, r in t.items()}
    out = []
    for h, a in d['week12']:
        lh = avg * att[h] * dfn[a] * HOME; la = avg * att[a] * dfn[h] / HOME
        ph = pd = pa = 0
        for i in range(11):
            for j in range(11):
                p = pois(lh, i) * pois(la, j) * tau(i, j, lh, la)
                if i > j: ph += p
                elif i == j: pd += p
                else: pa += p
        s = ph + pd + pa
        out.append({"ev": h, "dep": a, "xg_ev": round(lh, 2), "xg_dep": round(la, 2),
                    "p": [round(100*ph/s), round(100*pd/s), round(100*pa/s)]})
    return avg, out
if __name__ == '__main__':
    avg, out = run(sys.argv[1] if len(sys.argv) > 1 else 'data/sports/superlig.json')
    print(f"lig ort. {avg:.2f} gol/takım/maç")
    for m in out: print(f"{m['ev']:>15} - {m['dep']:<15} {m['p'][0]:>3}% {m['p'][1]:>3}% {m['p'][2]:>3}%   xG {m['xg_ev']}-{m['xg_dep']}")
    json.dump(out, open('data/sports/week12-motor.json', 'w'), ensure_ascii=False, indent=1)
