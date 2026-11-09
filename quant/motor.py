#!/usr/bin/env python3
"""Planck Quant · Motor (dış görünüm).

Veriden kurallı olasılık hesabı. Aynı snapshot ile her seferinde aynı sonucu verir;
yapay zekâ rakam uydurmaz. Claude ayarı (adj) bu dosyanın dışında, data/quant.json
içinde ayrıca yazılır; p = motor + adj.

Kullanım:
    python3 quant/motor.py data/quant.json            # hesapla, tabloyu yazdır
    python3 quant/motor.py data/quant.json --apply    # motor ve p alanlarını dosyaya işle

Yöntemler
---------
1. Bariyer (dokunma) olasılığı: "X, T içinde K seviyesini görür/aşar mı?" soruları için
   lognormal yürüyüşte sürüklenmeli yansıma formülü. S bugünkü fiyat, K hedef, σ yıllık
   oynaklık (varsa opsiyon piyasasından: OVX, GVZ, VIX), μ yıllık log-sürüklenme
   (varsa anket/vadeli beklentisinden, yoksa 0), T yıl.
       P = Φ((ln(S/K)+μT)/(σ√T)) + (K/S)^(2μ/σ²) · Φ((ln(S/K)−μT)/(σ√T))   (yukarı bariyer)
   Aşağı bariyer için S ve K'nin rolü simetrik olarak değişir.
2. Anket/piyasa fiyatlaması: CME FedWatch, kurum anketleri → doğrudan oran.
3. Eşik puanlaması: resesyon gibi fiyatı olmayan olaylar için taban oran + gösterge eşikleri.
4. Dağılım: "veri X'in altında/üstünde gelir mi?" soruları için beklenti ± tarihsel tahmin hatası.
"""
import json, math, sys

def Phi(x):
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))

def touch_up(S, K, sigma, T, mu=0.0):
    """S<K: T içinde K'ye yukarıdan dokunma olasılığı (sürekli izleme, lognormal)."""
    if S >= K:
        return 1.0
    a = math.log(S / K)             # <0
    v = sigma * math.sqrt(T)
    if abs(mu) < 1e-12:
        return 2.0 * (1.0 - Phi(-a / v))
    p = Phi((a + mu * T) / v) + math.exp(-2.0 * mu * a / sigma ** 2) * Phi((a - mu * T) / v)
    return min(max(p, 0.0), 1.0)

def touch_down(S, K, sigma, T, mu=0.0):
    """S>K: T içinde K'ye aşağıdan dokunma olasılığı."""
    if S <= K:
        return 1.0
    return touch_up(K, S, sigma, T, -mu)   # simetri: log-fiyatı ters çevir

def pct(x):
    return int(round(100 * x))

# ---------------------------------------------------------------- kurallar
def motor_tcmb_aralik(s):
    """Kurum anketi: indirim bekleyen / görüş bildiren."""
    a = s["tcmb_aralik_anket"]
    return pct(a["indirim"] / (a["indirim"] + a["sabit"])), \
        f"anket {a['indirim']} indirim / {a['sabit']} sabit ({a['kaynak']})"

def motor_tr_tufe_30(s):
    """Yıl sonu yıllık TÜFE < %30. Kasım+Aralık kümülatif aylık artış gereksinimi,
    anket medyanının ima ettiği kümülatif ile karşılaştırılır; 2 aylık tahmin hatası sd."""
    cur = s["tr_tufe_yillik_ekim"] / 100
    base = (1 + s["tr_tufe_aylik_kasim_2025"] / 100) * (1 + s["tr_tufe_aylik_aralik_2025"] / 100)
    need = (1.30 / (1 + cur)) * base - 1                          # bunun altında kalmalı
    med = s["tr_yil_sonu_tufe_anket_medyan"] / 100
    implied = ((1 + med) / (1 + cur)) * base - 1                  # anketin ima ettiği Kas+Ara
    sd = s["tr_tufe_2ay_tahmin_hatasi_sd"] / 100
    p = Phi((need - implied) / sd)
    return pct(p), f"gereken Kas+Ara < %{need*100:.2f}, anket ima %{implied*100:.2f}, sd %{sd*100:.1f}"

def motor_usdtry_60(s):
    S, K = s["usdtry"], 60.0
    mu = math.log(s["tcmb_anket_usdtry_12ay"] / S)                # anketten yıllık log-sürüklenme
    sig = s["usdtry_vol"] / 100
    p = touch_up(S, K, sig, 1.0, mu)
    return pct(p), f"S={S}, K=60, anket 12 ay={s['tcmb_anket_usdtry_12ay']} (μ={mu:.3f}), σ=%{s['usdtry_vol']}"

def motor_fed_artirim(s):
    """12 ayda en az bir artırım: Aralık (FedWatch) ∪ sonraki toplantılar (koşullu taban)."""
    pd = s["fedwatch_aralik_artirim"] / 100
    later = s["fed_sonraki_artirim_kosullu_taban"] / 100
    p = 1 - (1 - pd) * (1 - later)
    return pct(p), f"FedWatch Aralık %{s['fedwatch_aralik_artirim']}, sonrası koşullu %{s['fed_sonraki_artirim_kosullu_taban']}"

def motor_abd_resesyon(s):
    """Taban oran + gösterge eşikleri (puan)."""
    p = s["resesyon_taban_12ay"]
    notes = [f"taban {p}"]
    sahm = s["abd_issizlik_3ay_ort"] - s["abd_issizlik_12ay_dip"]
    if sahm >= 0.5: p += 25; notes.append("Sahm ≥0,5 +25")
    elif sahm >= 0.3: p += 10; notes.append("Sahm ≥0,3 +10")
    spread = s["us10y"] - s["us3m"]
    if spread < 0: p += 15; notes.append("10y−3m ters +15")
    if s["wti_ytd_degisim"] >= 50: p += 10; notes.append("petrol YTD ≥%50 +10")
    if s["sp500_zirveden_dusus"] >= 15: p += 5; notes.append("S&P zirveden ≥%15 +5")
    return int(p), ", ".join(notes)

def motor_brent_110(s):
    S, K = s["brent_usd"], 110.0
    sig = s["ovx"] / 100
    mu = math.log(s["brent_fwd_6ay"] / S) * 2 if s.get("brent_fwd_6ay") else 0.0
    p = touch_up(S, K, sig, 0.5, mu)
    return pct(p), f"S={S}, K=110, σ=OVX %{s['ovx']}, μ={mu:.2f}, T=0,5"

def motor_altin_4500(s):
    S, K = s["ons_altin_usd"], 4500.0
    sig = s["gvz"] / 100
    p = touch_up(S, K, sig, 1.0, 0.0)
    return pct(p), f"S={S}, K=4500, σ=GVZ %{s['gvz']}, μ=0, T=1"

def motor_nasdaq_25(s):
    S = s["nasdaq"]; K = 0.75 * s["nasdaq_zirve"]
    sig = s["nasdaq_vol"] / 100
    p = touch_down(S, K, sig, 1.0, 0.0)
    return pct(p), f"S={S}, K=0,75×{s['nasdaq_zirve']}={K:.0f}, σ=%{s['nasdaq_vol']}, μ=0, T=1"

def motor_abd_tufe_ekim_03(s):
    """Ekim aylık manşet TÜFE ≥ %0,3 (yuvarlanmış; eşik 0,25). Beklenti = anket ve nowcast ortalaması."""
    m = (s["abd_tufe_ekim_beklenti"] + s["abd_tufe_ekim_nowcast"]) / 2
    sd = s["abd_tufe_aylik_tahmin_hatasi_sd"]
    p = 1 - Phi((0.25 - m) / sd)
    return pct(p), f"beklenti ort %{m:.2f} (anket {s['abd_tufe_ekim_beklenti']}, nowcast {s['abd_tufe_ekim_nowcast']}), sd {sd}"

RULES = {
    "tcmb-aralik": motor_tcmb_aralik,
    "tr-tufe-30": motor_tr_tufe_30,
    "usdtry-60": motor_usdtry_60,
    "fed-artirim": motor_fed_artirim,
    "abd-resesyon": motor_abd_resesyon,
    "brent-110": motor_brent_110,
    "altin-4500": motor_altin_4500,
    "nasdaq-25": motor_nasdaq_25,
    "abd-tufe-ekim-03": motor_abd_tufe_ekim_03,
}

def run(path, apply=False):
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    s = d["snapshot"]
    rows = []
    for fc in d["forecasts"]:
        rule = RULES.get(fc["id"])
        if not rule:
            rows.append((fc["id"], None, "kural yok")); continue
        m, note = rule(s)
        rows.append((fc["id"], m, note))
        if apply:
            fc["motor"] = m
            fc["motor_not"] = note
            adj = fc.get("adj") or 0
            if abs(adj) > 20:
                raise SystemExit(f"{fc['id']}: Claude ayarı ±20 sınırını aşıyor ({adj})")
            fc["p"] = max(1, min(99, m + adj))
    for fid, m, note in rows:
        print(f"{fid:18s} motor={'—' if m is None else m:>3}  {note}")
    if apply:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(d, f, ensure_ascii=False, indent=1)
            f.write("\n")
    return rows

if __name__ == "__main__":
    run(sys.argv[1], apply="--apply" in sys.argv)
