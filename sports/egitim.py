"""Planck T+ motor eğitimi — motor.py'deki elle verilmiş parametreleri geçmiş maç verisinden ölçer.

Girdi: data_loader.py'nin ürettiği matches.json (lig -> maç listesi).
Çıktı: sports/params.json (lig bazında ve genel) + sports/EGITIM.md için rapor verisi (egitim_rapor.json).

Ölçülenler (her lig için ayrı ve hepsi birlikte):
  HOME   ev avantajı çarpanı = sqrt(ev gol ort. / deplasman gol ort.)
  RHO    Dixon-Coles düşük skor düzeltmesi, maksimum olabilirlik (log-olabilirlik ızgara araması)
  K      büzülme: tabloya eklenen sanal lig-ortalaması maç sayısı; Brier'i en küçük yapan değer
  XI     zaman ağırlığı: w = exp(-XI * gün); 0 = ağırlıksız (mevcut motor)
  ELO    home (puan) ve draw_base (beraberlik payı), aynı veriyle Brier'e göre

Doğrulama: her ligin son iki sezonu eğitime katılmaz; eski ve yeni parametrelerle Brier (üç sonuçlu,
toplam kare hata; 0 = kusursuz, ~0.67 = her sonuca 1/3) ve kalibrasyon tablosu karşılaştırılır.

Kullanım: python3 sports/egitim.py <matches.json> [--out sports/params.json] [--rapor sports/egitim_rapor.json]
"""
import json, math, sys
from collections import defaultdict
from datetime import date
import numpy as np

OLD = {"K": 8, "RHO": -0.12, "HOME": 1.15, "XI": 0.0, "ELO_HOME": 65, "ELO_DRAW": 0.27}
TEST_SEASONS = 2          # son iki sezon doğrulama için ayrılır
BIG5_SEASONS = 10         # büyük 5 lig: son 10 sezon
MIN_SEASON_MATCHES = 150  # bundan az maçı olan sezon "devam eden sezon" sayılır, eğitime girmez
N0 = 18                   # lig ortalaması için öncül ağırlığı (takım-maç sayısı)
GRID = 11                 # 0-10 gol ızgarası
FACT = np.array([math.factorial(k) for k in range(GRID)], dtype=float)
KS = np.arange(GRID)


def pois_vec(l):
    return np.exp(-l) * l ** KS / FACT


def outcome_probs(lh, la, rho):
    """Poisson + Dixon-Coles ızgarasından (ev, beraberlik, deplasman) olasılıkları."""
    M = np.outer(pois_vec(lh), pois_vec(la))
    M[0, 0] *= max(0.0, 1 - lh * la * rho); M[0, 1] *= max(0.0, 1 + lh * rho)
    M[1, 0] *= max(0.0, 1 + la * rho);     M[1, 1] *= max(0.0, 1 - rho)
    M /= M.sum()
    ph = np.tril(M, -1).sum(); pd = np.trace(M); pa = np.triu(M, 1).sum()
    return ph, pd, pa, M


def brier(p, o):
    """Üç sonuçlu Brier: sum_k (p_k - o_k)^2. o: 0 ev, 1 beraberlik, 2 deplasman."""
    return sum((p[k] - (1.0 if k == o else 0.0)) ** 2 for k in range(3))


def outcome(m):
    return 0 if m["hg"] > m["ag"] else (1 if m["hg"] == m["ag"] else 2)


def dnum(s):
    y, mo, d = map(int, s.split("-")); return date(y, mo, d).toordinal()


def season_days(ms):
    """Tarihi eksik maçlara aynı turun tarihini ver; gün numarası ekle."""
    rd = defaultdict(list)
    for m in ms:
        if m["date"]: rd[m["round"]].append(dnum(m["date"]))
    for m in ms:
        m["_d"] = dnum(m["date"]) if m["date"] else int(np.median(rd[m["round"]])) if rd[m["round"]] else 0
    return sorted(ms, key=lambda m: (m["_d"], m["round"]))


def strengths(hist, now, K, xi, prior_avg, prev=None):
    """Ağırlıklı tablodan hücum/savunma güçleri. hist: bu sezon oynanmış maçlar; prev: önceki sezon (isteğe bağlı)."""
    gp, gf, ga = defaultdict(float), defaultdict(float), defaultdict(float)
    tg = tp = 0.0
    for src in (hist, prev or []):
        for m in src:
            w = math.exp(-xi * (now - m["_d"])) if xi else 1.0
            gp[m["home"]] += w; gp[m["away"]] += w
            gf[m["home"]] += w * m["hg"]; ga[m["home"]] += w * m["ag"]
            gf[m["away"]] += w * m["ag"]; ga[m["away"]] += w * m["hg"]
            tg += w * (m["hg"] + m["ag"]); tp += 2 * w
    avg = (tg + N0 * prior_avg) / (tp + N0)
    att = defaultdict(lambda: 1.0); dfn = defaultdict(lambda: 1.0)
    for t in gp:
        att[t] = ((gf[t] + K * avg) / (gp[t] + K)) / avg
        dfn[t] = ((ga[t] + K * avg) / (gp[t] + K)) / avg
    return att, dfn, avg


def eval_season(ms, K, rho, home, xi, prior_avg, prev=None, min_round=2, freeze_round=None, want_grid=False):
    """Bir sezonu hafta hafta yürüt: her maçı, o ana kadar oynananlarla tahmin et.
    freeze_round verilirse tablo o turun sonunda dondurulur ve kalan maçlar onunla tahmin edilir."""
    ms = season_days(ms); out = []
    if freeze_round is not None:
        first = [m for m in ms if m["round"] <= freeze_round]
        d0 = max(m["_d"] for m in first)
        frozen = strengths(first, d0, K, xi, prior_avg, prev)
    hist = []; i = 0
    while i < len(ms):
        d = ms[i]["_d"]; today = []
        while i < len(ms) and ms[i]["_d"] == d: today.append(ms[i]); i += 1
        att, dfn, avg = frozen if freeze_round is not None else strengths(hist, d, K, xi, prior_avg, prev)
        for m in today:
            if m["round"] >= min_round and (freeze_round is None or m["round"] > freeze_round):
                lh = avg * att[m["home"]] * dfn[m["away"]] * home
                la = avg * att[m["away"]] * dfn[m["home"]] / home
                ph, pd, pa, M = outcome_probs(lh, la, rho)
                rec = {"p": (ph, pd, pa), "o": outcome(m), "round": m["round"], "lh": lh, "la": la,
                       "hg": m["hg"], "ag": m["ag"]}
                if want_grid: rec["M"] = M
                out.append(rec)
        hist.extend(today)
    return out


def mean_brier(recs):
    return float(np.mean([brier(r["p"], r["o"]) for r in recs])) if recs else float("nan")


def fit_home(ms):
    hg = np.mean([m["hg"] for m in ms]); ag = np.mean([m["ag"] for m in ms])
    return math.sqrt(hg / ag), hg, ag


def fit_rho(seasons, K, home, xi, prior_avg, prevs):
    """Dixon-Coles RHO: eğitim maçlarında skor log-olabilirliğini en büyük yapan değer (ızgara)."""
    recs = []
    for s, ms in seasons:
        recs.extend(eval_season(ms, K, 0.0, home, xi, prior_avg, prevs.get(s)))
    grid = np.round(np.arange(-0.30, 0.1001, 0.01), 2); best = None
    for rho in grid:
        ll = 0.0
        for r in recs:
            lh, la = r["lh"], r["la"]; i, j = min(r["hg"], GRID - 1), min(r["ag"], GRID - 1)
            _, _, _, M = outcome_probs(lh, la, rho)
            ll += math.log(max(M[i, j], 1e-12))
        if best is None or ll > best[1]: best = (float(rho), ll)
    return best[0]


def fit_K(seasons, rho, home, xi, prior_avg, prevs, freeze_round=None):
    res = {}
    for K in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20]:
        recs = []
        for s, ms in seasons:
            recs.extend(eval_season(ms, K, rho, home, xi, prior_avg, prevs.get(s), freeze_round=freeze_round))
        res[K] = mean_brier(recs)
    return min(res, key=res.get), res


def fit_xi(seasons, K, rho, home, prior_avg, prevs):
    res = {}
    for xi in [0.0, 0.001, 0.002, 0.003, 0.005, 0.0075, 0.01, 0.015, 0.02]:
        recs = []
        for s, ms in seasons:
            recs.extend(eval_season(ms, K, rho, home, xi, prior_avg, prevs.get(s)))
        res[xi] = mean_brier(recs)
    return min(res, key=res.get), res


# ---------------- Elo ----------------
def elo_probs(eh, ea, home, draw_base):
    dr = eh + home - ea
    we = 1 / (1 + 10 ** (-dr / 400))
    pd = max(0.12, draw_base * (1 - abs(we - 0.5) * 1.1))
    ph = max(0.0, we - pd / 2); pa = max(0.0, 1 - we - pd / 2)
    s = ph + pd + pa
    return ph / s, pd / s, pa / s


def run_elo(seasons_sorted, home, draw_base, kfac=20, skip_first=True):
    """Lig tarihi boyunca Elo yürüt; ilk sezon ısınma. Kayıtlar: (p, o, sezon)."""
    R = {}; recs = []; prev_teams = set()
    for idx, (s, ms) in enumerate(seasons_sorted):
        teams = {m["home"] for m in ms} | {m["away"] for m in ms}
        gone = prev_teams - teams
        init = np.mean([R[t] for t in gone]) if gone and all(t in R for t in gone) else 1500.0
        for t in teams:
            if t not in R: R[t] = init
        for m in season_days(ms):
            eh, ea = R[m["home"]], R[m["away"]]
            p = elo_probs(eh, ea, home, draw_base)
            if not (skip_first and idx == 0):
                recs.append({"p": p, "o": outcome(m), "season": s})
            we = 1 / (1 + 10 ** (-(eh + home - ea) / 400))
            sc = 1.0 if m["hg"] > m["ag"] else 0.5 if m["hg"] == m["ag"] else 0.0
            gd = abs(m["hg"] - m["ag"]); g = 1.0 if gd <= 1 else 1.5 if gd == 2 else (11 + gd) / 8
            delta = kfac * g * (sc - we)
            R[m["home"]] += delta; R[m["away"]] -= delta
        prev_teams = teams
    return recs, R


def fit_elo(seasons_sorted):
    best = None; table = {}
    for home in range(30, 121, 10):
        for db in np.round(np.arange(0.18, 0.36, 0.02), 2):
            recs, _ = run_elo(seasons_sorted, home, float(db))
            b = mean_brier(recs); table[(home, float(db))] = b
            if best is None or b < best[2]: best = (home, float(db), b)
    # ince ayar
    h0, d0, _ = best
    for home in range(max(0, h0 - 10), h0 + 11, 2):
        for db in np.round(np.arange(max(0.1, d0 - 0.02), d0 + 0.021, 0.005), 3):
            recs, _ = run_elo(seasons_sorted, home, float(db))
            b = mean_brier(recs)
            if b < best[2]: best = (home, float(db), b)
    return best


# ---------------- kalibrasyon ----------------
def calibration(recs, bins=(0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1.0001)):
    rows = []
    ps = np.array([[r["p"][k] for k in range(3)] for r in recs]).ravel()
    os_ = np.array([[1.0 if r["o"] == k else 0.0 for k in range(3)] for r in recs]).ravel()
    for lo, hi in zip(bins[:-1], bins[1:]):
        sel = (ps >= lo) & (ps < hi)
        if sel.sum() == 0: continue
        rows.append({"aralik": f"%{int(lo*100)}–{int(round(hi*100)) if hi <= 1 else 100}", "n": int(sel.sum()),
                     "tahmin": float(ps[sel].mean()), "gercek": float(os_[sel].mean())})
    return rows


def split_seasons(ms, league):
    by = defaultdict(list)
    for m in ms: by[m["season"]].append(m)
    complete = [s for s in sorted(by) if len(by[s]) >= MIN_SEASON_MATCHES]
    partial = [s for s in sorted(by) if len(by[s]) < MIN_SEASON_MATCHES]
    if league != "superlig": complete = complete[-BIG5_SEASONS:]
    test = complete[-TEST_SEASONS:]; train = complete[:-TEST_SEASONS]
    return by, train, test, partial




def consecutive(a, b):
    return int(b[:4]) == int(a[:4]) + 1


def fit_league(train_s, prior_avg, label):
    """Bir maç kümesi için a–d adımları. Döndürür: ölçülen parametreler + arama tabloları."""
    tr_ms = [m for s, x in train_s for m in x]
    home, hg, ag = fit_home(tr_ms)
    K, _ = fit_K(train_s, OLD["RHO"], home, 0.0, prior_avg, {})
    rho = fit_rho(train_s, K, home, 0.0, prior_avg, {})
    K, ktab = fit_K(train_s, rho, home, 0.0, prior_avg, {})
    K10, ktab10 = fit_K(train_s, rho, home, 0.0, prior_avg, {}, freeze_round=10)
    xi, xtab = fit_xi(train_s, K, rho, home, prior_avg, {})
    # önceki sezonla: sadece gerçekten ardışık sezonlar
    prevs = {}
    for (a, x), (b, y) in zip(train_s[:-1], train_s[1:]):
        if consecutive(a, b): prevs[b] = x
    with_prev = [t for t in train_s if t[0] in prevs]
    xi_p, xtab_p = fit_xi(with_prev, K, rho, home, prior_avg, prevs) if with_prev else (xi, {})
    print(f"  [{label}] HOME={home:.3f} (ev {hg:.2f} / dep {ag:.2f})  RHO={rho:+.2f}  K={K} (10. hafta dondurma: {K10})"
          f"  XI={xi} (önceki sezonla: {xi_p})", flush=True)
    return {"HOME": round(home, 4), "RHO": rho, "K": K, "K_10hafta": K10, "XI": xi, "XI_onceki_sezon": xi_p,
            "ev_gol": round(hg, 3), "dep_gol": round(ag, 3), "lig_ort": round(prior_avg, 3), "egitim_mac": len(tr_ms),
            "K_tablosu": {str(k): round(v, 4) for k, v in ktab.items()},
            "K10_tablosu": {str(k): round(v, 4) for k, v in ktab10.items()},
            "XI_tablosu": {str(k): round(v, 4) for k, v in xtab.items()},
            "XI_onceki_tablosu": {str(k): round(v, 4) for k, v in xtab_p.items()}}


def main():
    src = sys.argv[1]
    out_path = sys.argv[sys.argv.index("--out") + 1] if "--out" in sys.argv else "sports/params.json"
    rep_path = sys.argv[sys.argv.index("--rapor") + 1] if "--rapor" in sys.argv else "sports/egitim_rapor.json"
    data = json.load(open(src))

    # ---- veri bölme
    splits = {}
    for league, ms in data.items():
        by, train, test, partial = split_seasons(ms, league)
        splits[league] = (by, train, test, partial)
        print(f"{league}: eğitim {train} ({sum(len(by[s]) for s in train)} maç), test {test} "
              f"({sum(len(by[s]) for s in test)} maç), eğitime girmeyen eksik/devam eden sezon {partial}", flush=True)

    # ---- genel (tüm ligler birlikte) ölçüm
    pooled_train = [(s, by[s]) for league, (by, train, test, partial) in splits.items() for s in train]
    pooled_prior = float(np.mean([m["hg"] + m["ag"] for s, x in pooled_train for m in x]) / 2)
    print("\n== GENEL", flush=True)
    gen = fit_league(pooled_train, pooled_prior, "genel")
    gen_elo_recs = {"eski": [], "genel": []}

    params = {"_aciklama": "Planck T+ motor parametreleri; sports/egitim.py ile openfootball verisinden ölçüldü. "
                           "tablo: sadece puan tablosuyla çalışan yol (HOME ev avantajı çarpanı, RHO Dixon-Coles, K büzülme). "
                           "maclar: maç listesiyle çalışan yol (ek olarak XI zaman ağırlığı gün^-1, ONCEKI_SEZON). "
                           "LIG_ORT takım başına maç başı gol öncülü. ELO_HOME/ELO_DRAW: Elo ev puanı ve beraberlik payı."}
    report = {"_veri": {l: {"egitim_sezonlari": t, "test_sezonlari": te, "eksik_veya_devam_eden": p,
                            "egitim_mac": sum(len(b[s]) for s in t), "test_mac": sum(len(b[s]) for s in te),
                            "toplam_mac": len(data[l])} for l, (b, t, te, p) in splits.items()}}
    pooled_tbl = {"eski": [], "yeni": []}; pooled_mt = {"eski": [], "yeni": []}
    elo_fits = {}
    for league, (by, train, test, partial) in splits.items():
        train_s = [(s, by[s]) for s in train]; test_s = [(s, by[s]) for s in test]
        all_s = train_s + test_s
        prior_avg = float(np.mean([m["hg"] + m["ag"] for s, x in train_s for m in x]) / 2)
        print(f"\n== {league}", flush=True)
        lig = fit_league(train_s, prior_avg, league)
        eh, ed, eb = fit_elo(train_s); elo_fits[league] = (eh, ed)
        print(f"  ELO home={eh} draw_base={ed:.3f} (eğitim Brier {eb:.4f})", flush=True)

        # test için önceki sezon eşlemesi (ardışık ise)
        seq = train + test; prevs = {}
        for a, b in zip(seq[:-1], seq[1:]):
            if consecutive(a, b): prevs[b] = by[a]

        def run_test(K_, rho_, home_, xi_, use_prev):
            recs = []
            for s, x in test_s:
                recs.extend(eval_season(x, K_, rho_, home_, xi_, prior_avg, prevs.get(s) if use_prev else None))
            return recs

        # --- tablo yolu adayları
        tbl = {"eski": (dict(K=OLD["K"], RHO=OLD["RHO"], HOME=OLD["HOME"]), run_test(OLD["K"], OLD["RHO"], OLD["HOME"], 0.0, False)),
               "lig": (dict(K=lig["K"], RHO=lig["RHO"], HOME=lig["HOME"]), run_test(lig["K"], lig["RHO"], lig["HOME"], 0.0, False)),
               "genel": (dict(K=gen["K"], RHO=gen["RHO"], HOME=gen["HOME"]), run_test(gen["K"], gen["RHO"], gen["HOME"], 0.0, False))}
        tbl_b = {k: mean_brier(v[1]) for k, v in tbl.items()}
        tbl_best = min(tbl_b, key=tbl_b.get)
        if tbl_b[tbl_best] >= tbl_b["eski"] - 1e-9: tbl_best = "eski"
        # --- maç listesi yolu adayları (zaman ağırlığı + önceki sezon)
        mt = {"lig": (dict(K=lig["K"], RHO=lig["RHO"], HOME=lig["HOME"], XI=lig["XI_onceki_sezon"], ONCEKI_SEZON=True),
                      run_test(lig["K"], lig["RHO"], lig["HOME"], lig["XI_onceki_sezon"], True)),
              "genel": (dict(K=gen["K"], RHO=gen["RHO"], HOME=gen["HOME"], XI=gen["XI_onceki_sezon"], ONCEKI_SEZON=True),
                        run_test(gen["K"], gen["RHO"], gen["HOME"], gen["XI_onceki_sezon"], True)),
              "lig_sezon_ici": (dict(K=lig["K"], RHO=lig["RHO"], HOME=lig["HOME"], XI=lig["XI"], ONCEKI_SEZON=False),
                                run_test(lig["K"], lig["RHO"], lig["HOME"], lig["XI"], False))}
        mt_b = {k: mean_brier(v[1]) for k, v in mt.items()}
        mt_best = min(mt_b, key=mt_b.get)
        mt_ok = mt_b[mt_best] < tbl_b[tbl_best]
        print("  TEST tablo yolu Brier: " + " | ".join(f"{k} {v:.4f}" for k, v in tbl_b.items()) + f"  -> {tbl_best}", flush=True)
        print("  TEST maç yolu Brier:   " + " | ".join(f"{k} {v:.4f}" for k, v in mt_b.items()) +
              f"  -> {mt_best if mt_ok else 'tablo yolundan iyi değil'}", flush=True)
        # --- Elo doğrulama
        e_old, _ = run_elo(all_s, OLD["ELO_HOME"], OLD["ELO_DRAW"]); e_new, _ = run_elo(all_s, eh, ed)
        eb_old = mean_brier([r for r in e_old if r["season"] in test]); eb_new = mean_brier([r for r in e_new if r["season"] in test])
        keep_elo = eb_new < eb_old
        gen_elo_recs["eski"].extend([r for r in e_old if r["season"] in test])
        print(f"  TEST Elo Brier eski {eb_old:.4f} yeni {eb_new:.4f} -> {'yeni' if keep_elo else 'eski korundu'}", flush=True)

        final = {"tablo": {**tbl[tbl_best][0], "kaynak": tbl_best},
                 "maclar": {**mt[mt_best][0], "kaynak": mt_best} if mt_ok else None,
                 "LIG_ORT": round(prior_avg, 3),
                 "ELO_HOME": eh if keep_elo else OLD["ELO_HOME"], "ELO_DRAW": ed if keep_elo else OLD["ELO_DRAW"]}
        params[league] = final
        pooled_tbl["eski"].extend(tbl["eski"][1]); pooled_tbl["yeni"].extend(tbl[tbl_best][1])
        pooled_mt["eski"].extend(tbl["eski"][1]); pooled_mt["yeni"].extend(mt[mt_best][1] if mt_ok else tbl[tbl_best][1])
        report[league] = {
            "olculen": lig, "elo_olculen": {"ELO_HOME": eh, "ELO_DRAW": ed, "egitim_brier": round(eb, 4)},
            "test_mac_puanlanan": len(tbl["eski"][1]),
            "tablo_yolu": {"brier": {k: round(v, 4) for k, v in tbl_b.items()}, "adaylar": {k: v[0] for k, v in tbl.items()}, "secilen": tbl_best},
            "mac_yolu": {"brier": {k: round(v, 4) for k, v in mt_b.items()}, "adaylar": {k: v[0] for k, v in mt.items()},
                         "secilen": mt_best if mt_ok else None},
            "elo": {"brier_eski": round(eb_old, 4), "brier_yeni": round(eb_new, 4), "yeni_daha_iyi": keep_elo},
            "kalibrasyon_eski": calibration(tbl["eski"][1]),
            "kalibrasyon_tablo_yeni": calibration(tbl[tbl_best][1]),
            "kalibrasyon_mac_yeni": calibration(mt[mt_best][1]) if mt_ok else None,
            "final": final,
        }

    # ---- genel parametre: tüm liglerin test maçlarında eski vs genel
    gen_tbl_b = {}
    for name, (K_, rho_, home_) in {"eski": (OLD["K"], OLD["RHO"], OLD["HOME"]), "genel": (gen["K"], gen["RHO"], gen["HOME"])}.items():
        recs = []
        for league, (by, train, test, partial) in splits.items():
            prior_avg = float(np.mean([m["hg"] + m["ag"] for s in train for m in by[s]]) / 2)
            for s in test: recs.extend(eval_season(by[s], K_, rho_, home_, 0.0, prior_avg))
        gen_tbl_b[name] = mean_brier(recs)
    # genel Elo: lig ortalaması; tüm liglerin test maçlarında eski ile karşılaştır
    g_eh = int(round(np.mean([v[0] for v in elo_fits.values()]))); g_ed = round(float(np.mean([v[1] for v in elo_fits.values()])), 3)
    for league, (by, train, test, partial) in splits.items():
        recs, _ = run_elo([(s, by[s]) for s in train + test], g_eh, g_ed)
        gen_elo_recs["genel"].extend([r for r in recs if r["season"] in test])
    g_eb = {k: mean_brier(v) for k, v in gen_elo_recs.items()}
    gen_ok = gen_tbl_b["genel"] < gen_tbl_b["eski"]; gen_elo_ok = g_eb["genel"] < g_eb["eski"]
    print(f"\n== GENEL TEST (tüm liglerin test maçları, tablo yolu): eski {gen_tbl_b['eski']:.4f} genel {gen_tbl_b['genel']:.4f} -> {'genel' if gen_ok else 'eski korundu'}")
    print(f"   Elo: eski {g_eb['eski']:.4f} genel(home={g_eh}, draw={g_ed}) {g_eb['genel']:.4f} -> {'genel' if gen_elo_ok else 'eski korundu'}")
    params["genel"] = {"tablo": dict(K=gen["K"], RHO=gen["RHO"], HOME=gen["HOME"], kaynak="genel") if gen_ok else dict(K=OLD["K"], RHO=OLD["RHO"], HOME=OLD["HOME"], kaynak="eski"),
                       "maclar": dict(K=gen["K"], RHO=gen["RHO"], HOME=gen["HOME"], XI=gen["XI_onceki_sezon"], ONCEKI_SEZON=True, kaynak="genel"),
                       "LIG_ORT": round(pooled_prior, 3),
                       "ELO_HOME": g_eh if gen_elo_ok else OLD["ELO_HOME"], "ELO_DRAW": g_ed if gen_elo_ok else OLD["ELO_DRAW"]}
    report["genel"] = {"olculen": gen, "elo_olculen": {"ELO_HOME": g_eh, "ELO_DRAW": g_ed},
                       "test_tablo_brier": {k: round(v, 4) for k, v in gen_tbl_b.items()},
                       "test_elo_brier": {k: round(v, 4) for k, v in g_eb.items()},
                       "tum_ligler_secilen_brier": {"tablo_eski": round(mean_brier(pooled_tbl["eski"]), 4),
                                                   "tablo_yeni": round(mean_brier(pooled_tbl["yeni"]), 4),
                                                   "mac_yolu_yeni": round(mean_brier(pooled_mt["yeni"]), 4)},
                       "kalibrasyon_eski": calibration(pooled_tbl["eski"]), "kalibrasyon_tablo_yeni": calibration(pooled_tbl["yeni"]),
                       "kalibrasyon_mac_yeni": calibration(pooled_mt["yeni"]),
                       "final": params["genel"]}
    json.dump(params, open(out_path, "w"), ensure_ascii=False, indent=1)
    json.dump(report, open(rep_path, "w"), ensure_ascii=False, indent=1)
    print(f"\nyazıldı: {out_path}, {rep_path}")


if __name__ == "__main__":
    main()
