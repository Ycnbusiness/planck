# 11 · Enerji ve Emtia: Türkiye Aktarımı, Motor Kaynakları, Şok→Fiyat Zinciri

*Uzman: enerji ve emtia · 17.11.2026 · Girdi: BRIEF.md, QUANT.md, KARAR.md, `data/sorular.json`, `data/izleme.json`, `data/quant.json`, `quant/motor.py`, web taraması. Bu belge öneridir; hiçbir kural ya da veri dosyasına dokunulmadı.*

## 0. Durum tespiti (17 Kasım 2026, web ile doğrulandı)

- **Savaş ve boğaz.** Çatışma 28 Şubat 2026'daki ABD–İsrail saldırılarıyla başladı ([bne IntelliNews/Ember](https://www.intellinews.com/turkey-set-to-take-14bn-hit-from-hormuz-crisis-448474/)). Mart'ta küresel arz 10,1 milyon v/g düştü, Brent bir ayda yaklaşık %65 yükseldi: tarihin en büyük aylık artışı ([Dünya Bankası, 7 Mayıs](https://blogs.worldbank.org/en/opendata/strait-of-hormuz-disruption-sends-oil-prices-surging)).
- **Akış kısmen döndü.** Körfez ham petrol ihracatı Eylül'de savaş öncesinin %75'ini aştı. Bunun önemli bir bölümü boğazı atlayan rotalardan geçti: Suudi Doğu-Batı boru hattı ve gemiden gemiye aktarma ([IEA Ekim OMR özeti](https://hydrocarbonengineering.com/refining/26102026/iea-the-latest-developments-in-oil-markets/)). Hürmüz geçişleri Ekim'de 750'ye çıktı, Temmuz'dan beri en yüksek düzey ([S&P Global CAS](https://www.spglobal.com/energy/en/news-research/latest-news/shipping/110226-hormuz-oct-crossings-at-3-month-high-despite-attacks-red-sea-traffic-also-rises)). Lloyd's List'in saydığı "İran bağlantısız" geçişler 5–25 Ekim'de haftada ortalama 121'di ([Lloyd's List Intelligence](https://www.lloydslistintelligence.com/resources/blog/strait-of-hormuz-brief-5-november-2026)).
- **Fiyat.** Brent 11 Kasım'da 92,70 dolardan kapandı (10 haftanın dibi). IEA bu çeyrek için ilk kez yaklaşık 2 milyon v/g arz fazlası görüyor ([Trading Economics](https://tradingeconomics.com/commodity/brent-crude-oil/news/600509)). Depodaki 13 Kasım kapanışı 95,84 dolar. Asıl darboğaz ham petrolde değil, dizelde: IEA'ya göre dizel fiyatı savaş öncesinin yaklaşık iki katı ve sıkılığın 2027'ye taşınması bekleniyor.
- **Sigorta ve navlun.** Hürmüz savaş riski primi gövde değerinin %7,5–10'una çıktı ([Al Jazeera/S&P, 23 Temmuz](https://www.aljazeera.com/economy/2026/7/23/how-shipping-insurance-rates-are-rising-as-hormuz-bab-al-mandeb-shut-down)). Körfez–Asya VLCC navlunu Ekim ortasında savaş öncesinin beş katından fazlaydı (IEA).
- **Gaz.** TTF 16 Kasım'da 90 €/MWh'in altına indi. AB depoları %70,6 dolu; beş yıllık ortalama %89 ([Trading Economics](https://tradingeconomics.com/commodity/eu-natural-gas/news/600111)). Türkiye–İran gaz sözleşmesi (yılda 9–10 milyar m³) 29 Temmuz 2026'da sona erdi. İran 2025'te Türkiye'nin gaz ithalatının %13'ünü (7,7 milyar m³) karşılamıştı ([Evrensel, 6 Ağustos](https://www.evrensel.net/haber/5995275/turkiye-iran-dogal-gaz-anlasmasinda-savas-engeli-yeni-donem-belirsizligi)).
- **Altın.** Ons, Ocak 2026'daki 5.417 dolarlık zirveden 3.886 dolara geriledi (depo, 13 Kasım). Merkez bankaları üçüncü çeyrekte 321 ton net alım yaptı, yıllık %42 artış ([WGC](https://www.gold.org/goldhub/research/gold-demand-trends/gold-demand-trends-q3-2026/central-banks)).

---

## 1. Enerji fiyatlarının Türkiye'ye aktarımı: kanallar ve gecikmeler

Türkiye birincil enerjisinin yaklaşık üçte ikisini ithal ediyor. Gazın %95'i, ham petrolün %83'ü, kömürün %60'ı dışarıdan geliyor. Son on yılın ortalama net enerji ithalatı yılda yaklaşık 42 milyar dolar; 2022'de 80 milyar doları aştı. Ember, Mayıs fiyatları sürerse Mart–Aralık 2026 faturasının 14 milyar dolar artacağını hesapladı ([Ember/IntelliNews](https://www.intellinews.com/turkey-set-to-take-14bn-hit-from-hormuz-crisis-448474/)).

| Kanal | Mekanizma | Büyüklük (kaynak) | Gecikme |
|---|---|---|---|
| **Akaryakıt pompası** | Ürün fiyatı (Brent + rafineri marjı) × kur → rafineri çıkış → **sabit TL ÖTV** + %20 KDV | Kural: Brent'te 1 $ ≈ litrede 0,33 TL (depodaki kurallı model) | 1–5 gün (otomatik fiyatlama) |
| **TÜFE** | Doğrudan akaryakıt (sepetteki ağırlığı %3,21) + dolaylı yollar (ulaşım, gıda, sanayi) | Brent'te %10 artış → 12 ayda ≈1 puan (yarısı ilk çeyrekte), 24 ayda ≈1,2 puan ([TCMB Blog 2025](https://www.tcmb.gov.tr/wps/wcm/connect/blog/en/main+menu/analyses/impacts+of+international+oil+prices+on+consumer+prices+and+the+current+account+balance); [TCMB Blog, 31.03.2026](https://tcmb.gov.tr/wps/wcm/connect/blog/en/main%20menu/analyses/the%20sliding%20scale%20system%20for%20fuel%20prices%20and%20its%20potential%20impact%20on%20inflation)) | 0–12 ay |
| **Cari açık** | Fiyat × hacim (kısa vadede hacim neredeyse sabit) | Varilde 10 $ artış → 12 ayda ≈2,6 milyar $ ek açık (ithalat +5,1, ihracat +2,2) (TCMB Blog 2025) | 1–3 ay (fatura) |
| **Doğalgaz maliyeti (BOTAŞ)** | Boru hattı sözleşmeleri büyük ölçüde petrole endeksli, spot LNG ise TTF/JKM'ye bağlı | Ember: 2026 gaz faturasına +6,4 milyar $ | Petrole endeksli kısımda **6–9 ay** (geçmiş ortalama formülü; sözleşme ayrıntısı kamuya açık değil, doğrulanmalı). Spot LNG'de anında |
| **Doğalgaz ve elektrik tarifesi** | İdari karar: BOTAŞ her ay, EPDK çeyreklik (Ocak/Nisan/Temmuz/Ekim). Aradaki fark sübvansiyonla kapanır | Nisan 2026'da konut elektrik ve gaza %25 zam, sanayi gaza %18,6 zam ([SteelOrbis](https://www.steelorbis.com/steel-news/latest-news/turkey-hikes-electricity-and-gas-prices-for-industry-amid-rising-costs-1445985.htm); [Medyascope](https://medyascope.tv/2026/04/03/dogalgaz-ve-elektrige-yuzde-25-zam-geldi/)) | Maliyet fiyata siyasi takvimle yansır: 1–9 ay, sıçramalı |
| **Elektrik toptan (PTF)** | Marjinal santral çoğunlukla gaz; hidro ve rüzgâr dengeler | EPİAŞ saatlik PTF | Günlük |
| **Kur ve rezerv** | Enerji faturası → döviz talebi → TCMB rezervi | Mart 2026'da TCMB iki haftada yaklaşık 60 ton altın sattı ya da swapladı, ≈8 milyar $ ([Cumhuriyet/Bloomberg](https://www.cumhuriyet.com.tr/ekonomi/altinda-merkez-efsanesi-catirdiyor-mu-tcmb-2-haftada-60-ton-kulce-satti-2490096)) | Günler–haftalar |

**Quant için kritik bulgu: ÖTV takvimi bilinen bir şoktur.** Eşel mobil 4 Mart 2026'da devreye girdi. Motorinde Ağustos'ta kaldırıldı, motorin ÖTV'si kademeli takvime bağlandı: Kasım 9 TL, **Aralık 12 TL**, **1 Ocak 2027'den itibaren 13,9006 TL** ([İstiklal/AA](https://www.istiklal.com.tr/ekonomi/enflasyonla-mucadelenin-desteklenmesi-icin-motorine-kademeli-otv-uygulanacak-1101863h); [Bloomberg HT](https://www.bloomberght.com/ay-sonuna-kadar-motorinde-otv-sifirlandi-3785344)). Benzinde 1 Ekim'den itibaren 95 oktan için ÖTV Kasım'da 11,36 TL, **1 Aralık'tan itibaren 14,8277 TL** ([Bloomberg HT](https://www.bloomberght.com/benzine-kademeli-otv-3789895)).

Bu takvim, Kasım düzeyine göre motorinde Ocak'ta litrede KDV dahil ≈5,9 TL, benzinde Aralık'ta ≈4,2 TL artış demek. Brent hiç kıpırdamasa da bu artış gelir. Ocak'ta ayrıca ÜFE'ye bağlı bir ÖTV güncellemesi yapılıp yapılmayacağı belirsiz; açılıştan önce doğrulanmalı.

Öneri: **Aktarım Motoru** adında deterministik bir pompa fiyatı hesaplayıcı kurulsun. Girdiler: Akdeniz dizel/benzin CIF fiyatı (yoksa Brent + çatlak marjı), USD/TRY, ÖTV takvimi, KDV, dağıtım payı. Çıktı: tarihli pompa fiyatı dağılımı. Bugünkü motorin soruları ÖTV adımlarını modelin içinde taşımıyor (bkz. §6).

**Yayın dili için gecikme haritası.** Okurun bir kararına dokunan ufuklar şunlar. **Pompa:** bu hafta. **Fatura (doğalgaz/elektrik):** bir sonraki tarife dönemi (1 Ocak). **TÜFE:** 1–3 ayda ilk yarı. **BOTAŞ maliyeti:** 2027'nin ilk yarısı. Gecikmeli kanal tarife baskısını 2027'ye taşır. "Petrol düştü, fatura da düşer" çıkarımı tek kaynakla yayınlanmamalı.

---

## 2. Enerji ve emtia sorularının Motoru: kaynaklar ve erişim

| Kaynak | Ne verir | Sıklık | Erişim | Hangi soruda |
|---|---|---|---|---|
| **EIA haftalık petrol raporu (WPSR)** + EIA API | ABD ham petrol, benzin ve distilat stokları, SPR | Çarşamba 10:30 ET | Ücretsiz (API anahtarı) | ABD stok eşikleri, dizel sıkılığı |
| **EIA STEO** | Brent tahmini, Orta Doğu kayıp tahmini | Ayda bir | Ücretsiz | Taban/senaryo kalibrasyonu |
| **OPEC MOMR** | OPEC+ üretimi (ikincil kaynaklara göre) | Ayda bir | Ücretsiz PDF | Üretim eşikleri |
| **IEA OMR** | Arz-talep bilançosu, stoklar, Hürmüz akışı | Ayda bir | Tam rapor ücretli, özet ücretsiz | Bilanço Motoru (özetten) |
| **JODI Oil** | Ülke bazlı üretim, stok, talep | Ayda bir | Ücretsiz | Çapraz kontrol |
| **FRED**: DCOILBRENTEU, OVXCLS, GVZCLS | Brent spot, petrol ve altın ima edilen oynaklık | Günlük, ≈1 hafta gecikmeli | Ücretsiz API | Eşik Motoru (σ). Bugünkü OVX/GVZ girdileri 5 Kasım'dan kalma |
| **ICE/CME uzlaşma fiyatları** | Vadeli eğri (eğrinin geriye dönük olup olmadığı) | Günlük | Sitede gecikmeli ve ücretsiz; veri lisansı ücretli | Sürüklenme (μ) |
| **CFTC COT** | Spekülatif pozisyon | Haftalık | Ücretsiz | Claude ayarı (kalabalık işlem) |
| **IMF PortWatch** | Hürmüz, Bab el-Mandeb, Boğazlar için günlük geçiş ve tonaj (AIS) | Günlük | Ücretsiz | Geçiş soruları. **Uyarı:** transponder kapatan gemileri eksik sayar ([BIS WP 1378](https://www.bis.org/publications/working-paper-1378-maritime-chokepoints-and-global-economy-evidence-strait-hormuz.pdf)) |
| **Lloyd's List Intelligence brifingi** | Hürmüz'de İran bağlantısız geçişler | İki haftada bir, perşembe (sıradaki 19 Kasım) | Blogu ücretsiz | Hürmüz soruları için **tek ölçüt** önerisi |
| **S&P Global CAS (haber)** | Aylık boğaz geçişleri | Ayda bir | Haber ücretsiz | Çapraz kontrol |
| **Kpler, Vortexa, Windward** | Tanker takibi, yük, gemiden gemiye aktarma | Sürekli | Ücretli. Ajans haberlerinde aktarılır | Yalnız ajans haberinden alıntı |
| **UKMTO/JMIC** | Saldırı bildirimleri | Olay bazlı | Ücretsiz | Olay doğrulama (izleme.json zaten kullanıyor) |
| **Savaş riski primi, Baltic TD3C navlunu** | Sigorta ve navlun | Düzensiz | Ham veri ücretli, haberde aktarılır | Yalnız Claude ayarı; Motor girdisi olamaz |
| **Caldara–Iacoviello GPR endeksi** | Jeopolitik risk ([veri](https://www.matteoiacoviello.com/gpr.htm)) | Günlük/aylık | Ücretsiz | Rejim değişkeni |
| **TCMB EVDS, TÜİK, Ticaret Bakanlığı bülteni** | Kur, rezerv, TÜFE alt kalemleri, fasıl 27 enerji ithalatı | Günlük/aylık | Ücretsiz API | Türkiye aktarım soruları |
| **EPİAŞ Şeffaflık Platformu, EPDK, BOTAŞ tarifeleri** | PTF, tarifeler | Saatlik/aylık | Ücretsiz | Fatura soruları |
| **Opet/PO fiyat arşivi** | Pompa fiyatı | Günlük | Ücretsiz | Pompa soruları |
| **LBMA Gold Price, WGC Goldhub** | Altın fiks fiyatı, merkez bankası alımı | Günlük/çeyreklik | Gecikmeli görüntü ücretsiz; yeniden dağıtım lisanslı, kontrol edilmeli | Altın |
| **Dünya Bankası Pink Sheet, FAO FFPI, USDA WASDE, AMIS** | Üre, DAP, tahıl, gıda endeksi | Ayda bir | Ücretsiz | Gıda ve gübre |

**Yöntem kuralı: kaynak tutarsızlığı.** Aynı ay için kaynaklar Hürmüz'ü çok farklı sayıyor. S&P Ekim'de 750 geçiş saydı. Bazı AIS izleyicileri Eylül başı için günde yaklaşık 3 geçiş bildirdi. Lloyd's yalnız İran bağlantısız gemileri sayıyor. Fark büyük ölçüde karanlık geçişlerden (AIS kapalı) ve tanım farkından geliyor. Bu yüzden her Hürmüz sorusu **tek bir adlandırılmış kaynak ve açılışta yazılmış sayısal referans** ile kurulmalı. "Kpler ya da Lloyd's" gibi seçmeli kriter kâhin testini geçmez.

**Hangi soru için hangi Motor:**

| Soru türü | Motor |
|---|---|
| Fiyat eşiği (Brent, TTF, altın) | Lognormal dokunma ya da vade sonu modeli. σ = gerçekleşen oynaklık ile ima edilen oynaklığın harmanı; μ = vadeli eğri; senaryo karışımı (§3) |
| Pompa fiyatı, tarife | Aktarım Motoru (deterministik) + tarife kararları için tarihsel taban oranı (son 5 yılda Ocak zamlarının sayısı) |
| Stok, üretim | Mevsimsel ortalama ± tarihsel haftalık değişim dağılımı (EIA 5 yıllık bant) |
| Geçiş ve akış | Son 8 haftanın eğilimi + rejim olasılığı (News'teki anlaşma sorusundan) |
| Gıda ve TÜFE alt kalemi | Aylık değişimin tarihsel dağılımı + TCMB tahmini + gübre/enerji öncü göstergesi |

---

## 3. Jeopolitik şok → fiyat: taban oranlar ve zincir

### 3.1 Tarihsel olaylar (yaklaşık değerler)

| Olay | Brüt arz kaybı | Fiyat tepkisi | Ne kadar sürdü |
|---|---|---|---|
| 1973 Arap ambargosu | Dünya üretiminin ≈%7–8'i | Varil ≈3 $'dan ≈12 $'a (×4) | Kalıcı (rejim değişti) |
| 1978–79 İran devrimi | ≈%7 | ≈2,5 kat (12–18 ayda) | 1980–81'e kadar |
| 1990 Kuveyt'in işgali | ≈%9 | 17 $'dan 41 $'a (Ekim zirvesi, ≈+%140) | Yaklaşık 5 ay; Ocak 1991'de çöktü |
| 2002–03 Venezuela grevi ve Irak | ≈%2–3 | Savaştan önce yükseldi, işgalle düştü | Haftalar |
| 2019 Abqaiq | 5,7 milyon v/g (≈%5,5) | Brent bir günde ≈+%15 | ≈2 hafta |
| 2022 Rusya | Fiili kayıp başta ≈0 | Brent 97 $'dan 128 $'a (2 hafta) | Yaklaşık 4 ay |
| 2026 Hürmüz | 10,1 milyon v/g (≈%10) | Bir ayda ≈+%65 | Sürüyor; zirveden yaklaşık 9 ay sonra 90'lar |

Kaynaklar: [Hamilton (2011), "Historical Oil Shocks", NBER w16790](https://www.nber.org/papers/w16790) (yüzdeler bu tablodan yaklaşık alındı; yayın öncesi tabloyla doğrulanmalı); Dünya Bankası 2026; 2019 ve 2022 değerleri ajans kapanışlarıyla teyit edilmeli.

### 3.2 Literatürden dört ders

1. **Fiyat, kaybın büyüklüğünden çok beklenen süreye ve tampona bakar.** Kısa vadeli arz ve talep esneklikleri çok küçük, yaklaşık 0,1 civarında ([Caldara, Cavallo, Iacoviello 2019, JME](https://www.matteoiacoviello.com/research_files/CCI.pdf)). [Baumeister ve Hamilton (2019, AER)](https://doi.org/10.1257/aer.20151569) talep esnekliğini daha yüksek buluyor (≈−0,35). Bu fark "kayıp başına fiyat" çarpanını 2–3 kat değiştirir; tek bir sayı yayınlanmamalı.
2. **Her petrol şoku aynı değil.** Arz şoku, küresel talep şoku ve ihtiyati talep (gelecek korkusu) ayrılmalı ([Kilian 2009, AER](https://www.aeaweb.org/articles?id=10.1257/aer.99.3.1053)). 2022 ihtiyati talepti: kayıp yokken +%30. Abqaiq gerçek kayıptı ama kısa bekleniyordu: +%15, iki haftada söndü.
3. **Haber şokları ölçülebilir.** OPEC açıklamalarına dayalı arz haberi şokları fiyatı ve beklentileri kalıcı biçimde oynatıyor ([Känzig 2021, AER](https://www.aeaweb.org/articles?id=10.1257/aer.20190964)). Bu, olay günü LR güncellemesi için doğrudan bir dayanak.
4. **Boğaz trafiği şoku yavaş işler.** Hürmüz trafiğinde bir standart sapmalık düşüş, 12 ayda reel enerji fiyatını yaklaşık %8, gübreyi %6, küresel TÜFE'yi yaklaşık 1 puan artırıyor; arz kaynaklı şoklarda enerji etkisi %15–17 ([BIS WP 1378, Eylül 2026](https://www.bis.org/publications/working-paper-1378-maritime-chokepoints-and-global-economy-evidence-strait-hormuz.pdf)). [Dünya Bankası (Ekim 2023)](https://www.worldbank.org/en/news/press-release/2023/10/26/commodity-markets-outlook-october-2023-press-release) senaryo tablosu: 0,5–2 milyon v/g kayıp → +%3–13; 3–5 → +%21–35; 6–8 → +%56–75. 2026'nın gerçekleşen ≈+%65 tepkisi bu tablonun "büyük" satırıyla uyumlu; yani tablo Motor'a dış referans olarak alınabilir.

### 3.3 "Hürmüz şu olursa Brent şuraya" zinciri nasıl kurulmalı

"Brent şuraya" hedef fiyattır ve SPK çizgisini ihlal eder (QUANT.md §1). Doğru biçim: **"Hürmüz şu rejimde kalırsa Brent'in X'i görme olasılığı %Y."** Beş adım öneriyorum:

1. **Rejim ağacı (News'ten beslenir).** R0: bugünkü durum, akış savaş öncesinin ≈%55–65'i, saldırılar sürüyor. R1: yazılı anlaşma ve kademeli açılma. R2: tırmanma, akış <%30. Olasılıklar sicildeki `on-catisma-abd-iran-anlasma` ve `on-enerji-hurmuz-gecis` sorularından okunur. Böylece iki kanal tutarlı kalır.
2. **Net kayıp.** Brüt kayıp − boğazı atlayan hatlar (Doğu-Batı boru hattı Eylül'de 5,6 milyon v/g taşıdı) − stok salımı − yedek kapasite. Kümülatif kayıp varil olarak OECD stoklarının "gün karşılığı" ile kıyaslanır. Fiyatı kaybın büyüklüğü değil, tamponun tükenme hızı belirler.
3. **Fiyat eşlemesi.** Net kaybı fiyata çevirmek için ters esneklik bandı kullanılır: (ε_arz + |ε_talep|) 0,2–0,45 aralığında, yani net arzın %1'i fiyatta ≈%2–5. Band 2026 Mart gözlemiyle kalibre edilir (≈%10 kayıp → +%65, kısa ufukta alt esneklik ucu). Dizel ayrıca çatlak marjıyla modellenir; Türkiye pompası Brent'e değil dizele bağlıdır.
4. **Rejim içi dağılım.** Her rejim için ayrı lognormal. μ vadeli eğriden gelir; savaş sonu senaryosunda eğri belirgin geriye dönük. σ = gerçekleşen oynaklık ile ima edilen oynaklığın harmanıdır, çünkü ima edilen oynaklık risk primi içerir ve olasılığı yukarı iter.
5. **Karışım → eşik olasılığı.** P(eşik) = Σ P(rejim) × P(eşik | rejim). Kartta rejim satırları gösterilir ("anlaşma olursa 100'de 12, olmazsa 100'de 48"). Bu, BRIEF'teki "Ne Olur?" zincirinin sayısal omurgası olur. Koşullu satırlar puanlanmaz; yalnız koşulsuz soru puanlanır.

**Bugünkü Motor'un sorunları (`quant/motor.py`, `motor_brent_110`):**

- σ olarak 5 Kasım'dan kalma OVX (%60,29) kullanılıyor ve μ = 0. Vadeli eğri girdisi `brent_fwd_6ay` boş.
- Dokunma formülü sürekli izleme varsayıyor, oysa kriter günlük kapanış. [Broadie–Glasserman–Kou (1997)](https://doi.org/10.1111/1467-9965.00039) düzeltmesiyle bariyer exp(0,5826·σ·√(1/252)) kadar kaydırılmalı.
- Duyarlılık hesabım (S = 95,84, K = 110, T ≈ 0,47): σ %60 ve μ = 0 ile **%74**; düzeltme ve geriye dönük eğri (μ = −0,25) ile **%62**; σ %35 ile **%37–57**. Sonuç baskın biçimde kaynağı yazılmamış iki girdiden geliyor. Bu belirsizlik bugün Claude'un −15'lik ayarıyla kapatılıyor. Önce Motor düzeltilmeli; ayar küçülmeli.

---

## 4. Altın: Türk okuru ve yön tavsiyesi vermeden ele alma

**Türk okur için altının özel yeri.** Altın Türkiye'de yatırım aracından çok tasarruf birimi ve enflasyon/kur sigortası: düğün, çeyrek, yastık altı. Ev stoku tahminleri 3.000 ile 8.000 ton arasında değişiyor; kaynaklar çelişkili (ör. [NPR, Eylül 2026](https://npr.org/2026/09/15/g-s1-143414/turkey-gold-economy); yerli tahminlerin aralığı çok geniş). **Tek bir sayı olgu gibi yayınlanmamalı.**

Okurun gördüğü fiyat gram altın: TL gram ≈ ons × USD/TRY / 31,1035 + Kapalıçarşı makası. Yani gram altının değişimi ≈ ons değişimi + kur değişimi. 2026'da ons zirveden yaklaşık %28 düştü; kurun yükselişi bunun bir kısmını TL'de telafi etti. Bu ayrıştırma her altın kartında gösterilmeli. Okurun sorusu "ons" değil, "benim gramım"dır.

**Fiyatı belirleyen etkenler:**

1. **Reel faiz.** Uzun dönemde ters ilişki ([Erb ve Harvey 2013, "The Golden Dilemma"](https://www.nber.org/papers/w18706)). 2022 sonrası merkez bankası alımlarıyla gevşedi.
2. **Dolar.**
3. **Merkez bankası alımı.** 2026 üçüncü çeyrekte 321 ton; Çin 63, Polonya 40. Rusya satıcı. Türkiye "diğer" kaleminde ([WGC](https://www.gold.org/goldhub/research/gold-demand-trends/gold-demand-trends-q3-2026/central-banks)).
4. **Jeopolitik.** Güvenli liman etkisi kısa ömürlü ve koşullu ([Baur ve Lucey 2010](https://doi.org/10.1111/j.1540-6288.2010.00244.x)).

**2026 dersi:** Savaş altını yükseltmedi, düşürdü. Zincir şöyle işledi: enerji → ABD enflasyonu (Ekim TÜFE aylık %0,4) → Fed artırımı (Eylül'de yapıldı, Aralık tam fiyatlı) → reel getiri ve dolar yükseldi → altın düştü. Buna yurt içinde merkez bankalarının kur savunması için yaptığı satışlar eklendi: TCMB'nin Mart'taki ≈60 tonluk satışı. "Savaş = altın yükselir" sezgisi bu yıl yanlıştı. Quant'ın değeri bu sezgiyi sayıyla düzeltmektir.

**Yön tavsiyesi vermeden ele alma kuralları:**

- **Çift eşik zorunluluğu.** Altın eşiği tek yönlü açılmaz: aynı ufukta bir üst (ör. 4.300 $) ve bir alt (ör. 3.500 $) eşik birlikte yayınlanır. Tek yönlü eşik okurda örtük yön sinyali bırakır.
- **Ayrıştırma satırı.** "Gram altındaki son bir aylık değişimin ≈%X'i ons, ≈%Y'si kurdan."
- **Eylem satırı** (KARAR §2.4) alım-satım değil, kavrayış üzerine kurulur. Örnek: "Gram fiyatınız iki ayrı belirsizliğe bağlı: ons ve kur."
- **Yasak:** "güvenli liman", "koruma sağlar" gibi ifadeler olgu olarak yazılmaz.
- **"Ne Olur?" zinciri:** "Fed Aralık'ta 50 bp artırırsa" gibi koşul satırları ile koşulsuz ve puanlanan eşik ayrı tutulur.

---

## 5. Gıda ve tarım emtiaları → Türkiye gıda enflasyonu

**Kanallar ve gecikmeler:**

1. **Mazot ve nakliye: 0–2 ay.** Motorin ÖTV adımları (Aralık, Ocak) taze meyve-sebze ve ekmek maliyetine doğrudan girer.
2. **Gübre: 6–12 ay.** Amonyak ve ürenin ana maliyeti doğalgaz. Hürmüz dünya üre ihracatının yaklaşık dörtte birini ([Dünya Bankası, 14 Mayıs](https://blogs.worldbank.org/en/opendata/fertilizer-prices-surge-as-strait-of-hormuz-disruptions-tighten-)), deniz yoluyla taşınan ürenin ise ≈%40'ını taşıyor ([Kpler](https://www.kpler.com/blog/ureas-gulf-squeeze-has-eased-but-the-acreage-hit-is-locked-in)). Payların farkı paydadan geliyor; kartta hangisi kullanılıyorsa adıyla yazılmalı. Üre Nisan'da 850 $/t'u aştı (Şubat'tan beri +%80). Etkisi hemen hasada değil, **ekim kararına** gidiyor: Avustralya'da buğday ekim alanı %12 düştü (Kpler). Türkiye için anlamı: 2026 sonbahar ekiminde gübre kullanımı ve verim, 2027 hasadına ve 2027 ikinci yarısının gıda fiyatlarına yansır. Türkiye ek gübre alımı için Rusya ile anlaştı ([Aydınlık, 14 Ekim](https://www.aydinlik.com.tr/haber/turkiye-ve-rusya-anlasti-ciftci-gubresiz-kalmayacak-589660); ayrıntı doğrulanmalı).
3. **Küresel gıda fiyatı (FAO) → Türkiye: 3–6 ay**, kurla çarpılarak. FAO Ekim'de 133,9 puan, yıllık +%5,9; tahıl geriliyor.
4. **Sera ve hayvancılık enerjisi:** doğalgaz ve elektrik tarifeleriyle, 1 Ocak'ta.
5. **Yurt içi yapısal etkenler** (hava, aracılık zinciri, işlenmemiş gıda oynaklığı) çoğu ay baskın. Ekim'de gıda aylık %3,5, yıllık %27,73. TCMB yıl sonu gıda tahminini %28,5'ten %31,3'e çıkardı.

**Quant ve News ayrımı.** Gıda TÜFE soruları 16.11 kararıyla News'te. Benim katkım Motor tarafı: aylık gıda değişiminin tarihsel dağılımına bir **enerji-gübre öncü bileşeni** eklenmesi. Bileşenin içeriği: mazot ÖTV adımları + Pink Sheet üre ve DAP + FAO tahıl alt endeksi, 1–6 ay gecikmeli.

---

## 6. Mevcut soruların eleştirisi ve yeni sorular

### 6.1 Eleştiri

| Soru | Sorun | Öneri |
|---|---|---|
| `pb-2026-11-11-motorin-90` (%33) | **Bilinen ÖTV adımları modelde yok.** Kasım'a göre 31 Ocak'ta ÖTV +4,90 TL, KDV dahil ≈+5,9 TL. 95,20 TL'den 90'ın altına inmek için vergi öncesi ürün fiyatında ≈11 TL düşüş gerekir; bu, Brent eşdeğerinde ≈30 $'ın üzerinde bir düşüş demek. Gerekçe ÖTV'yi yalnız "risk" diye anıyor. | Aktarım Motoru ile yeniden hesaplanmalı. Kaba tahminim tek hane (%5–10). |
| `pb-2026-11-10-motorin` (%85, 30 Kasım) | 14 Kasım indirimi gelmedi (kardeş soruda LR 0,9 işlendi) ama bu soru 10 Kasım'dan beri güncellenmedi. Ayrıca 7 Kasım fiyatı 95,09 TL ve bu eşiğin **altında değil**; gerekçe metni yanıltıcı. | Hemen güncellenmeli. Kardeş sorularla tutarlılık denetimi `sicil.py`'ye eklenmeli. |
| `q-brent-110` (%54, Mayıs 2027) | 6 aylık ufuk, eski OVX, μ = 0, sürekli izleme. Motor ile ayar arasındaki 15 puanlık fark Motor'un kalibre olmadığını gösteriyor. | Motor düzeltilsin (§3.3). Soru Uzun Ufuk'a alınsın; yerine 90 günlük çift eşik açılsın. |
| `on-enerji-brent-80` + `q-brent-110` | İki soru aynı dağılımın iki kuyruğu, ama ayrı yöntemlerle hesaplanıyor; tutarlılıkları denetlenmiyor. | Tek karışım modelinden türetilsin. |
| `q-altin-4500` (12 ay) | Ufuk uzun, tek yönlü, GVZ eski. | 90 günlük çift eşik (§6.2). |
| `on-enerji-hurmuz-gecis` | "Lloyd's ya da Kpler" seçmeli kriter. Lloyd's ücretsiz brifingi savaş öncesi referans vermiyor, yalnız İran bağlantısız gemileri sayıyor. Kpler ücretli. Şubat referans sayısı açılışta yazılmamış. Hakem 15 dakikada kapatamaz. | Tek kaynak ve sayısal referans (§6.2'deki E6). |
| `pb-2026-W46-0` sanayi gaz kısıntısı (%10) | Taban gerekçesiz. Etkileyen yeni bilgiler: İran sözleşmesi bitti, AB depoları %70,6, Ocak 2022 sanayi kesintisi emsali var. | 2012–2026 BOTAŞ kısıntı duyuruları sayılarak taban kurulsun. "Kesilebilir sözleşme kısıntısı" ile genel kısıntı ayrılsın. |
| Eksik alanlar | Fatura (doğalgaz, elektrik), gübre, TTF, gram altın ayrıştırması yok. Okurun en doğrudan kararı faturadır. | §6.2 |

### 6.2 Önerilen sorular (90 gün, 17.11.2026–15.02.2027)

Referans değerler açılış günü yeniden doğrulanmalı. Kanal, 16.11 kararına göre belirtildi.

| # | Soru | Kapanış kriteri ve kaynak | Kanal | Kapanış |
|---|---|---|---|---|
| E1 | Brent 29 Ocak 2027 kapanışı 90 doların üstünde mi? | EIA günlük Brent spot (FRED DCOILBRENTEU) 29.01.2027 değeri >90,00 $ + Reuters. Vade sonu sorusu dokunma sorusundan daha iyi kalibre olur. Ref: 95,84 (13.11). | Quant | 5 Şub |
| E2a / E2b | Brent ön ay 12 Şubat 2027'ye kadar herhangi bir gün **105 $ üstünde** / **85 $ altında** kapanır mı? (çift) | ICE ön ay günlük uzlaşma + iki ajans | Quant | 12 Şub |
| E3 | İstanbul Avrupa Yakası motorin pompa fiyatı 4 Ocak 2027'de **100,00 TL veya üstünde** mi? | Opet arşivi, 4.1.2027 + AA. Motor: Aktarım Motoru; ÖTV adımları sayesinde eşik medyana yakın. | News | 4 Oca |
| E4 | BOTAŞ 1 Ocak 2027 tarifesinde konut doğalgaz satış fiyatını artırır mı? | botas.gov.tr tarife tablosu (Aralık ve Ocak TL/m³) + AA. Taban: son beş yılın Ocak kararları. | News | 2 Oca |
| E5 | EPDK 1 Ocak 2027 tarifelerinde mesken (tek zamanlı) elektrik fiyatını artırır mı? | EPDK kurul kararı + AA | News | 1 Oca |
| E6 | Lloyd's List'in 19 Kasım–11 Şubat arasında yayımlayacağı herhangi bir Hürmüz brifinginde, İran bağlantısız haftalık geçiş sayısı 150'yi aşar mı? | Lloyd's List Intelligence blogu. Ref: 5–25 Ekim ortalaması 121. Çapraz kontrol: IMF PortWatch. | News (öncü) | 12 Şub |
| E7a / E7b | LBMA PM ons altın 12 Şubat 2027'ye kadar herhangi bir gün **4.300 $ üstünde** / **3.500 $ altında** belirlenir mi? (çift) | LBMA Gold Price PM + Reuters. Ref: ≈3.886. | Quant | 12 Şub |
| E8 | TTF ön ay 29 Ocak 2027'ye kadar herhangi bir gün 100 €/MWh üstünde uzlaşır mı? | ICE Endex uzlaşma + Reuters. Ref: <90 (16.11), AB depo %70,6. | Quant | 29 Oca |
| E9 | Dünya Bankası Pink Sheet'te üre (Orta Doğu) Ocak 2027 aylık ortalaması, Ekim 2026 ortalamasının en az %10 üstünde mi? | Pink Sheet (Şubat başı yayımı). Ekim değeri açılışta yazılır. | News | ≈4 Şub |
| E10 | ABD ticari ham petrol stokları 13 Şubat 2027'ye kadar yayımlanan herhangi bir EIA haftalık raporunda 400 milyon varilin altına iner mi? | EIA WPSR. Ref: 412,5 (Ekim sonu). Her çarşamba izlenir; hızlı geri bildirim sağlar, karne için değerli. | Quant | 11 Şub |

Bu set ≈4–12 hafta içinde 13 kapanış üretir: E2, E7 ve diğer çiftler ayrı sayıldı. Okurun doğrudan bir kararına beş soru değiyor: E3, E4, E5 (bütçe), E9 (çiftçi girdi zamanlaması), E7 (gram altın kavrayışı).

---

## (a) En önemli 5 önerim

1. **Aktarım Motoru kurulsun.** Brent/dizel + kur + ÖTV takvimi + KDV → pompa fiyatı dağılımı. Bilinen vergi adımlarını kaçıran motorin soruları hemen yeniden hesaplanmalı.
2. **Eşik Motoru düzeltilsin.** σ kaynağı tarihli yazılsın (gerçekleşen ve ima edilen oynaklığın harmanı); μ vadeli eğriden alınsın; günlük kapanış düzeltmesi yapılsın; girdinin yaşı 3 iş gününü geçerse soru güncellenmesin, "eski veri" diye işaretlensin.
3. **Hürmüz → Brent bağlantısı rejim karışımıyla kurulsun.** Rejim olasılıkları News sicilinden gelsin; net kayıp → esneklik bandı → rejim içi lognormal adımlarıyla hesaplansın. Kartta rejim satırları görünsün, yalnız koşulsuz soru puanlansın. Hedef fiyat dili yok.
4. **Her boğaz ve akış sorusunda tek kaynak ve sayısal referans.** Seçmeli kriter yasak; karanlık geçiş uyarısı soru metnine yazılsın.
5. **Altında çift eşik ve TL ayrıştırması zorunlu olsun.** "Savaş = altın yükselir" gibi sezgiler 2026 verisiyle sınansın.

## (b) Diğer uzmanlarla olası çatışmalar

- **Karar 16.11 ile:** Fatura, pompa ve gıda soruları News'te. Ben bunların Motoru'nun (Aktarım, gübre öncü bileşeni) Quant ekibinde tutulmasını öneriyorum. Kanal ve Motor sahipliği ayrı düşünülmeli.
- **Tahmin bilimi uzmanı ile:** Ben vade sonu ve çift eşik soruları öneriyorum; o ise tek eşik ve dokunma sorularını basitlik için savunabilir.
- **Psikoloji ve risk iletişimi ile:** Rejim satırları ("anlaşma olursa 100'de 12") kartı kalabalıklaştırır. Bunlar ikinci kareye konabilir.
- **Hukuk ve SPK açısından:** Gram altın eşiği bireysel yatırım kararına çok yakın. Dar okunursa yalnız ons tutulabilir; ben ayrıştırmanın kavrayış değeri nedeniyle gramı savunuyorum.
- **Veri ve ürün tarafıyla:** LBMA ve ICE verisinin yeniden dağıtım lisansı. Ücretsiz kaynaklara (EIA, FRED) dayalı soru metni tercih edilmeli.

## (c) Karar vericiye sorular

1. Fatura, pompa ve tarife sorularının Motoru Quant'ta mı kalsın, News'e mi devredilsin?
2. Kpler, Vortexa ya da Lloyd's için ücretli abonelik bütçesi var mı? Yoksa Hürmüz soruları yalnız ücretsiz kaynaklarla mı (Lloyd's blogu, PortWatch) kurulsun?
3. Gram altın eşiği SPK çizgisinin içinde mi sayılır, yoksa yalnız ons mu?
4. Rejim koşullu satırlar yayınlansın mı, yoksa yalnız iç hesapta mı kalsın?
5. Motor girdilerinin eskime sınırı (3 iş günü önerisi) kural olarak `QUANT.md`'ye girsin mi?

## (d) 90 günde başarı ölçütü (enerji ve emtia alanı)

- **Kapanış:** 15 Şubat'a kadar en az 12 enerji/emtia kapanışı (§6.2 seti 13 üretir).
- **Doğruluk:** Motor ve Planck Brier skorları ayrı. Hedef: Motor Brier'ı <0,20 ve ortalama |Claude ayarı| <8 puan. Bugün 15 puanlık ayarlar Motor'un bozuk olduğunu gösteriyor.
- **Tutarlılık denetimi:** Kardeş sorular (ör. iki motorin sorusu, Brent'in iki kuyruğu) arasında çelişki sayısı 0. Bu `sicil.py dogrula` ile ölçülür.
- **Veri tazeliği:** Yayın anında Motor girdilerinin %100'ü ≤3 iş günü yaşta.
- **Aktarım Motoru isabeti:** 4 Ocak pompa fiyatında gerçekleşen değer, tahmin dağılımının %80 aralığı içinde. Doğrudan ölçülebilir.
- **Kavrayış:** Story anketinde "gram altını ne belirler?" sorusunun doğru yanıt oranı ilk ve son haftada ölçülür.

---

*Kaynak notu: 2026 olaylarına ait rakamlar bağlantılı haber ve kurum sayfalarından alındı; bazı sayfalara doğrudan erişilemedi ve arama özetleriyle yetinildi (Ember, NPR, Aydınlık). Tarihsel tablo yaklaşık değerlerdir. "Doğrulanmalı" işaretli her ifade yayına girmeden önce iki bağımsız kaynakla teyit edilmelidir.*
