# last30days · Planck'te kullanım (taslak v0.1, 25.11.2026)

**Ne:** Reddit, X, YouTube, TikTok, Hacker News, Polymarket, GitHub, Bluesky, Truth Social, patent başvuruları ve kariyer sayfalarını paralel tarayan; sonuçları etkileşime göre sıralayan araştırma becerisi. Kopya: `.claude/skills/last30days/` (sabit commit, `VENDOR.md`).

**Bizim için özü:** Haber ajansları editörün seçtiğini verir. last30days insanların ve paranın neye yöneldiğini verir. Haber ajansa düşmeden önce sinyal çoğu zaman burada görünür. Huang olayında Başkan'ın paylaşımları ve kurul üyelerinin sızıntıları burada günler önce vardı. Biz %15 dedik.

## Durum: kurulu, ağ kapalı

Bulut ortamında yalnız GitHub erişilebilir. Reddit, HN, Polymarket ve web aramaları 403 (ajan proxy izin listesi) döndü (test: 25.11, "Strait of Hormuz", 0 sonuç). Çalışması için iki yol var:

1. **Bulut izin listesi (önerilen):** claude.ai Admin ayarları → Capabilities → ağ erişimine şu alan adları eklenir: `reddit.com`, `www.reddit.com`, `old.reddit.com`, `hn.algolia.com`, `gamma-api.polymarket.com`, `clob.polymarket.com`, `bsky.social`, `public.api.bsky.app`. Bunu Yusuf yapar (25.11: "ekleyeceğim ama yarından sonra", ≈27.11). Sonra tüm turlar (bulut taramaları dahil) kullanır.
2. **Yusuf'un bilgisayarı:** Masaüstü uygulamasıyla bir klasör bağlanır, beceri orada çalışır. Ancak bilgisayar açıkken çalışır, zamanlanmış turlar için uygun değil.

X, YouTube ve TikTok için ayrıca ücretli anahtar gerekir (`SCRAPECREATORS_API_KEY`, `X_BEARER_TOKEN` veya `XAI_API_KEY`). İlk aşamada ücretsiz kaynaklar yeter.

## Kesin kurallar (Anayasa ile çelişmez, ona bağlanır)

1. **Kaynak değil, sinyal.** last30days çıktısı tek başına haber değildir. Yayın için iki bağımsız güvenilir kaynak kuralı aynen geçerli. Sosyal medya bulgusu `data/izleme.json`'a ya da hikâye klasörünün rüzgâr kaydına girer; doğrulanınca haber olur.
2. **Alıntı yok.** Becerinin rapor biçimi (yorumların aynen alıntısı, kullanıcı adları) bizim gönderilerimize taşınmaz. Kaynaktan alıntı yasağı sürer. Kişisel kullanıcı adı yayınlanmaz.
3. **Polymarket = karşılaştırma, girdi değil.** Yusuf 23.11: piyasa fiyatı puanlamada yalnız karşılaştırmadır. Sicile `piyasa: %X (tarih, hacim)` olarak yazılır. Gönderide bahis dili yok. "Piyasa", "oran" ya da "bahis" kelimeleri kullanılmaz. Gerekirse "başka bir tahmin kaynağı %X diyor" denir. Şiddet sorularında hiç kullanılmaz (bahis testi).
4. **Etkileşim ≠ doğruluk.** Çok beğeni ve oy, gerçeklik kanıtı değildir. Etkileşim yalnız "çok konuşuluyor" bilgisidir: Ses ve İz'in hammaddesi budur.
5. **Tarayıcı çerezi okunmaz.** Her çalıştırma `--no-browser-cookies` ile yapılır. Hesap girişi yok.
6. **Bedel kuralı.** Bir aktörün kendi hesabından yazdığı (Truth Social, X) bedelli sinyal olabilir. Anonim sızıntı bedelsizdir. GUC-OKUMA §2'ye göre tartılır.

## Nerelerde kullanılır (öncelik sırasıyla)

| # | Yer | Ne yapar | Kazanç |
|---|---|---|---|
| 1 | **Güç Okuma: rüzgâr kaydı** (TARAMA §6b) | Karar bağımlı her soruda aktörlerin son 7–30 günlük kendi paylaşımları (ör. `--x-handle`, Truth Social) | Huang tipi ıskayı önler. Engeli kaldıracak aktörün sesi kaydedilir. |
| 2 | **Ses ve İz (perşembe, pilot)** | Haftanın en çok konuşulan olayı: etkileşim ölçüsü + "7 gün sonra iz bıraktı mı?" sorusu | Ses ve İz'in ölçüsünü ilk kez sayıyla verir (beğeni ve oy yerine kaynak sayısı ve hız). |
| 3 | **Erken uyarı / keşif** (sabah taraması öncesi) | `--discover` ile dokuz alanda "hızla büyüyen" konular → haber kapısı adayları `izleme.json`'a | Haberi ajanstan önce görmek; Yöntem v2.2'nin "haber kapısı"nı besler. |
| 4 | **Sicil: piyasa karşılaştırması** | Açık her sorunun Polymarket eşleniği varsa haftalık not | Kalibrasyon: biz ile kalabalık arasındaki fark karnede ayrı satır. Neden Yanıldık'ın hammaddesi. |
| 5 | **Şirketler alanı: gizli sinyaller** | Patent başvuruları ve kariyer sayfası rolleri (Nvidia, Apple, Tesla…) | "Duyurulmadan önce" soru açma: şirketler alanında 3 açık soru hedefine katkı. |
| 6 | **Hikâye klasörleri: aylık sentez** | Her hikâyeye 30 günlük tarama; analist notu | Geriye dönük doldurma işini hızlandırır (13 hikâye kaldı). |
| 7 | **Neden Yanıldık** | Iskanın olduğu haftada kalabalık ne diyordu? | Otopsinin "neyi okumadık" bölümü kanıtlı olur. |
| 8 | **Quant (açılınca)** | StockTwits, Yahoo Finance ve Hacker News duyarlılığı | Quant karar verilene kadar kapalı; bu madde de kapalı. |

## Zayıf yanları

- **Küresel kapsam güçlü yanı.** Planck dünya medyası (Türkçe yazılır, okur Türkiye ile sınırlı değil). Kaynakların İngilizce ve küresel olması bu konsepte uyar. Türkiye konuları için ayrıca yerel kaynak gerekir (Ekşi Sözlük, Türk X'i kapsanmaz); bu bir eksik değil, ek katmandır.
- **Gürültü ve manipülasyon.** Koordineli hesaplar etkileşimi şişirebilir. Kural 1 ve 4 bunu sınırlar.
- **Maliyet.** Ücretsiz kaynaklar yavaş ve sığdır. X için aylık ücretli anahtar gerekir; karar Yusuf'ta.
- **Süre.** Hızlı mod ~1–2 dakika, derin mod 5+ dakika sürer. Her olayda değil, yalnız karar bağımlı sorularda ve Ses ve İz'de kullanılır.

## Önerilen ilk adım

1. Yusuf izin listesine 8 alan adını ekler (yukarıda).
2. 26.11 perşembe ilk Ses ve İz'de deneme: haftanın en çok konuşulan olayı için tek çalıştırma.
3. Açık karar bağımlı sorular (Rusya–Ukrayna ateşkes, ABD–İran ateşkes, Nvidia Çin çip) için Güç Okuma'ya rüzgâr satırları.
4. Bir hafta sonra (2.12) değerlendirme: kaç erken sinyal yakaladı, kaçı haber oldu, kaç yanlış alarm.
