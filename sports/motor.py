"""Planck T+ motoru v1 — Poisson güç modeli.
Her takımın hücum ve savunma gücü, maç başına attığı/yediği golün lig ortalamasına oranıdır.
Az maç oynandığı için güçler lig ortalamasına doğru çekilir (büzülme, K maçlık sanal ortalama).
Beklenen gol: ev = ort * hücum_ev * savunma_dep * ev_avantajı ; dep = ort * hücum_dep * savunma_ev / ev_avantajı
Skor olasılıkları Poisson + Dixon-Coles düşük skor düzeltmesi; 0-10 gol ızgarasından ev/beraberlik/dep toplanır.
Aynı veriyle her seferinde aynı sonucu verir.

Parametreler sports/params.json'dan okunur (sports/egitim.py ile geçmiş maç verisinden ölçüldü; bkz. sports/EGITIM.md).
Dosya yoksa ya da `--eski` verilirse v0'ın elle verilmiş değerleri kullanılır (yedek davranış).

Girdi JSON:
  "league":   lig kodu (superlig, premierleague, laliga, seriea, bundesliga, ligue1); yoksa superlig
  "table":    [[takım, O, A, Y, P], ...]  -> tablo yolu (puan tablosuyla çalışır)
  "matches":  [{"date","home","away","hg","ag"}, ...] bu sezonun oynanmış maçları -> maç yolu
              (güncel maçlara üstel zaman ağırlığı; "prev_matches" verilirse önceki sezon da azaltılmış ağırlıkla katılır)
  "asof":     YYYY-AA-GG, zaman ağırlığı için bugünün tarihi (yoksa en son maç tarihi)
  "fixtures": [[ev, deplasman], ...]
"""
import json, math, os, sys
from datetime import date

# v0 elle verilmiş değerler (yedek)
K = 8          # büzülme: 8 maçlık lig ortalaması eklenir (sezon başında aşırı güveni önler)
RHO = -0.12    # Dixon-Coles düzeltmesi: düşük skorlu beraberlikleri bağımsız Poisson'un üstüne taşır
HOME = 1.15    # ev avantajı çarpanı (Süper Lig tarihsel ~%15 fazla gol)
ESKI = {"tablo": {"K": K, "RHO": RHO, "HOME": HOME, "kaynak": "eski"}, "maclar": None,
        "LIG_ORT": None, "ELO_HOME": 65, "ELO_DRAW": 0.27}
PARAMS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "params.json")
N0 = 18        # lig ortalaması öncülünün ağırlığı (takım-maç); LIG_ORT varsa


def load_params(league="superlig", eski=False):
    """Lig parametreleri: params.json -> lig -> yoksa genel -> yoksa eski değerler."""
    if eski or not os.path.exists(PARAMS_PATH):
        return dict(ESKI)
    p = json.load(open(PARAMS_PATH, encoding="utf-8"))
    return p.get(league) or p.get("genel") or dict(ESKI)


def pois(l, k): return math.exp(-l) * l**k / math.factorial(k)


def tau(i, j, lh, la, rho=RHO):
    if i == 0 and j == 0: return max(0.0, 1 - lh*la*rho)
    if i == 0 and j == 1: return max(0.0, 1 + lh*rho)
    if i == 1 and j == 0: return max(0.0, 1 + la*rho)
    if i == 1 and j == 1: return max(0.0, 1 - rho)
    return 1


def match_probs(lh, la, rho):
    ph = pd = pa = 0
    for i in range(11):
        for j in range(11):
            p = pois(lh, i) * pois(la, j) * tau(i, j, lh, la, rho)
            if i > j: ph += p
            elif i == j: pd += p
            else: pa += p
    s = ph + pd + pa
    return ph / s, pd / s, pa / s


def _dnum(s):
    y, m, d = map(int, s[:10].split("-")); return date(y, m, d).toordinal()


def strengths_from_table(table, K, lig_ort=None):
    t = {r[0]: r for r in table}
    gp = sum(r[1] for r in table); gf = sum(r[2] for r in table)
    avg = gf / gp if lig_ort is None else (gf + N0 * lig_ort) / (gp + N0)   # takım başına maç başı gol
    att = {n: ((r[2] + K*avg) / (r[1] + K)) / avg for n, r in t.items()}
    dfn = {n: ((r[3] + K*avg) / (r[1] + K)) / avg for n, r in t.items()}
    return att, dfn, avg


def strengths_from_matches(matches, prev, K, xi, lig_ort, asof=None):
    """Maç listesinden ağırlıklı tablo: w = exp(-xi * gün). prev: önceki sezon maçları (aynı ağırlık kuralı)."""
    allm = list(matches) + list(prev or [])
    now = _dnum(asof) if asof else max(_dnum(m["date"]) for m in allm if m.get("date"))
    gp, gf, ga = {}, {}, {}
    tg = tp = 0.0
    for m in allm:
        w = math.exp(-xi * max(0, now - _dnum(m["date"]))) if (xi and m.get("date")) else 1.0
        for team, f, a in ((m["home"], m["hg"], m["ag"]), (m["away"], m["ag"], m["hg"])):
            gp[team] = gp.get(team, 0) + w; gf[team] = gf.get(team, 0) + w * f; ga[team] = ga.get(team, 0) + w * a
        tg += w * (m["hg"] + m["ag"]); tp += 2 * w
    avg = (tg + N0 * lig_ort) / (tp + N0) if lig_ort else tg / tp
    att = {t: ((gf[t] + K*avg) / (gp[t] + K)) / avg for t in gp}
    dfn = {t: ((ga[t] + K*avg) / (gp[t] + K)) / avg for t in gp}
    return att, dfn, avg


def run(path, eski=False):
    d = json.load(open(path, encoding="utf-8"))
    P = load_params(d.get("league", "superlig"), eski)
    if d.get("matches") and P.get("maclar"):
        q = P["maclar"]; yol = "maclar"
        att, dfn, avg = strengths_from_matches(d["matches"], d.get("prev_matches") if q.get("ONCEKI_SEZON") else None,
                                               q["K"], q.get("XI", 0.0), P.get("LIG_ORT"), d.get("asof"))
    else:
        q = P["tablo"]; yol = "tablo"
        att, dfn, avg = strengths_from_table(d["table"], q["K"], P.get("LIG_ORT"))
    home, rho = q["HOME"], q["RHO"]
    out = []
    for h, a in d.get('fixtures', d.get('week12', [])):
        lh = avg * att.get(h, 1.0) * dfn.get(a, 1.0) * home; la = avg * att.get(a, 1.0) * dfn.get(h, 1.0) / home
        ph, pd, pa = match_probs(lh, la, rho)
        out.append({"ev": h, "dep": a, "xg_ev": round(lh, 2), "xg_dep": round(la, 2),
                    "p": [round(100*ph), round(100*pd), round(100*pa)]})
    run.info = {"yol": yol, "K": q["K"], "RHO": rho, "HOME": home, "kaynak": q.get("kaynak", "eski")}
    return avg, out


def elo_match(elo_h, elo_a, home=None, draw_base=None):
    """Farklı liglerden takımlar (Avrupa kupaları) için: ClubElo puanları.
    Ev beklenen skoru We = 1/(1+10^(-(dr)/400)); beraberlik payı güç farkı büyüdükçe azalır.
    home/draw_base verilmezse params.json'daki genel değerler (yoksa 65 / 0.27)."""
    if home is None or draw_base is None:
        P = load_params("genel")
        home = P.get("ELO_HOME", 65) if home is None else home
        draw_base = P.get("ELO_DRAW", 0.27) if draw_base is None else draw_base
    dr = elo_h + home - elo_a
    we = 1 / (1 + 10 ** (-dr / 400))
    pd = max(0.12, draw_base * (1 - abs(we - 0.5) * 1.1))
    ph = max(0.0, we - pd / 2); pa = max(0.0, 1 - we - pd / 2)
    s = ph + pd + pa
    return [round(100*ph/s), round(100*pd/s), round(100*pa/s)]


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    eski = "--eski" in sys.argv
    avg, out = run(args[0] if args else 'data/sports/superlig.json', eski)
    i = run.info
    print(f"lig ort. {avg:.2f} gol/takım/maç   [{i['yol']} yolu, parametre: {i['kaynak']}  K={i['K']} RHO={i['RHO']} HOME={i['HOME']}]")
    for m in out: print(f"{m['ev']:>15} - {m['dep']:<15} {m['p'][0]:>3}% {m['p'][1]:>3}% {m['p'][2]:>3}%   xG {m['xg_ev']}-{m['xg_dep']}")
    json.dump(out, open(args[1] if len(args) > 1 else 'data/sports/motor-out.json', 'w'), ensure_ascii=False, indent=1)
