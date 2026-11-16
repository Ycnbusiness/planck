# 1 · Nicel Modelleme ve Tahmin Bilimi Raporu (Quant v2)

*Planck Quant v2 yöntem ekibi · 17.11.2026 · Hazırlayan: nicel modelleme masası (Claude). Bu belge öneridir; hiçbir kural dosyasına dokunulmadı.*

## Özet

Quant'ın sorunu formül değil, **soru tasarımı ve girdi disiplini**. `motor.py`'nin matematiği büyük ölçüde doğru. Ama 8 açık sorunun 5'i 12 ayda kapanıyor, hepsi aynı ABD makro etkenine bağlı. Girdilerin yarısı ya bayat ya varsayım. Motor da kendi yazdığı sicilde iki ayrı sayı taşıyor. Brier 0,51 ise yöntemin değil tek bir sorunun sonucu: `nv-1`, Motor'u olmayan ve bugünkü yasak listesine takılacak bir "kişi görevi" sorusu.

Önerim: Quant'ın Motor'u **"piyasa ne fiyatlıyor"u ölçen bir alet** olsun, Planck'in katkısı da **piyasanın fiyatlamadığı yerlerde** aransın: Türkiye'nin opsiyonsuz varlıkları, koşullu sorular, makro dağılımlar. Piyasanın likit olduğu yerde dürüst cevap şu: katkımız sıfıra yakın, iddiamız da öyle olmalı.

---

## 1. Motor: hangi soruya hangi alet, hangi sırayla

### 1.1 Hiyerarşi

Anayasa §3.3'ün sırası (piyasa → taban → model) doğru, ama soru türüne göre ayrıştırılmalı:

| Soru türü | 1. Motor | 2. Çapraz kontrol | 3. Yedek | Not |
|---|---|---|---|---|
| Likit varlık eşiği (ons altın, Brent, Nasdaq, EUR/USD) | Opsiyon zincirinden risk-nötr dağılım (Breeden–Litzenberger) ya da vadeye uygun ima oynaklıkla bariyer | Minneapolis Fed piyasa olasılıkları | Tarihsel bariyer frekansı (bootstrapped) | Ufka uygun vade şart; 30 günlük endeks 12 aylık soruya girmez |
| Merkez bankası kararı (Fed, AMB) | Vadeli/OIS (FedWatch mantığı) | Tahmin piyasası (Kalshi) | Konsensüs anketi | Risk primi küçük ama sıfır değil |
| TCMB kararı | TLREF/OIS ve kısa vade bono getirileri | TCMB Piyasa Katılımcıları Anketi (PKA) dağılımı | Konsensüs isabetinin tarihsel oranı | "7 kurum / 10" bir olasılık değildir (bkz. §5) |
| Opsiyonu olmayan / sığ varlık (USD/TRY, BIST 100, gram altın) | Rejim bilgili istatistik model (kontrollü kur yürüyüşü + sıçrama) | PKA kur beklentisi, vadeli kur (taşıma primi düşülerek) | Tarihsel taban | Quant'ın asıl değer üretebileceği yer |
| Makro veri (TÜFE, büyüme, istihdam) | Konsensüs + tarihsel tahmin hatası dağılımı | Nowcast (Cleveland Fed, GDPNow, kendi TÜFE öncülerimiz) | BVAR | 16.11 kararıyla takvimli veri News'te. Quant ancak *dağılım* sorusu olarak kullanır. |
| Fiyatı olmayan olay (resesyon) | Yayımlanmış model (NY Fed getiri eğrisi probiti) + SPF "Anxious Index" | Tahmin piyasası | Puanlı eşik tablosu (bugünkü) | Ad hoc puanlar kalibre edilmeden Motor sayılmaz |

Kaynaklar: Breeden–Litzenberger yönteminin kurumsal uygulaması [Minneapolis Fed, Market-Based Probabilities](https://www.minneapolisfed.org/banking/current-and-historical-market-based-probabilities). Vadeli faizlerin karar tahmininde en iyi piyasa ölçüsü olduğu [Gürkaynak, Sack ve Swanson](https://www.federalreserve.gov/econres/feds/market-based-measures-of-monetary-policy-expectations.htm). FedWatch'ın ikili ağaç yöntemi ve varsayımları [CME](https://www.cmegroup.com/articles/2023/understanding-the-cme-group-fedwatch-tool-methodology.html). Getiri eğrisi resesyon modeli [Estrella ve Mishkin, NY Fed](https://www.newyorkfed.org/research/current_issues/ci2-7.pdf). SPF'nin negatif büyüme olasılığı [Philadelphia Fed, Anxious Index](https://www.philadelphiafed.org/surveys-and-data/real-time-data-research/anxious-index).

### 1.2 Yapısal modeller (VAR, BVAR, Taylor kuralı) Motor olmamalı

Bu modeller **mercek** olarak değerli: "Taylor kuralı TCMB'nin 36'da kalmasını mı söylüyor?" gibi. Ama Motor tanımına ("aynı veriyle aynı sonuç, rakamı yapay zekâ uydurmaz") uyacak kadar sağlam değiller. Türkiye'de 2018, 2021 ve 2023'te para politikası rejimi üç kez kırıldı. Bu yüzden geçmişten tahmin edilen katsayılar geleceği temsil etmez. Önerim: BVAR ya da kural tabanlı hesap **ikinci geçişte** ("iç görünüm") kullanılsın, Motor'a girmesin.

### 1.3 Risk-nötr ile gerçek dünya olasılığı

Opsiyondan ve vadeli fiyattan çıkan olasılık **risk-nötr** olasılıktır. Piyasanın bir sonucu ne kadar değerli bulduğunu söyler, ne kadar sık gerçekleşeceğini değil. Minneapolis Fed bunu açıkça yazıyor. Kötü senaryoya, yani paranın en değerli olduğu duruma, olduğundan fazla ağırlık verilir. Bliss ve Panigirtzoglou bu farkı risktan kaçınma parametresiyle düzeltiyor ([Chicago Fed WP](https://www.chicagofed.org/~/media/publications/working-papers/2001/wp2001-15r3-pdf.pdf)). İngiltere Merkez Bankası da ampirik bir dönüşümle gerçek dünya yoğunluğuna geçiyor ([de Vincent-Humphreys ve Noss 2012](https://www.bankofengland.co.uk/-/media/boe/files/working-paper/2012/estimating-probability-distributions-of-future-asset-prices-emperical-transformations.pdf)). Fed fonları vadelerinde döngüye karşı hareket eden bir risk primi var ([Piazzesi ve Swanson](https://www.frbsf.org/research-and-insights/publications/working-papers/2006/09/futures-prices-as-risk-adjusted-forecasts-of-monetary-policy/)).

Uygulanabilir kural:

1. **Motor risk-nötr sayıyı ham olarak yazar** (`motor_rn`) ve bu etiketle yayınlar: "piyasanın fiyatladığı".
2. **Düzeltme ayrı ve kurallı bir katmandır** (`motor_p`). Varlık sınıfına göre sabit bir dönüşüm uygulanır: hisse endekslerinde aşağı kuyruk için tarihsel olarak ölçülen oran, TL'de taşıma primi. Katsayılar geçmiş veriden bir kez hesaplanır, dosyada durur ve 50 kapanışta yeniden ölçülür.
3. Claude ayarı ancak bunun **üstüne** gelir. Böylece "piyasa ne diyor", "piyasa sistematik olarak nerede yanılıyor" ve "Claude ne düşünüyor" sorularının her biri ayrı puanlanır.

**TL'ye özgü uyarı:** USD/TRY vadeli kuru, faiz farkı nedeniyle (politika faizi %36, ABD ~%4) spotun yaklaşık %30 üstünde. Bu fiyat bir beklenti değil, taşıma getirisinin karşılığıdır. Vadeli kuru "piyasa beklentisi" diye okumak 2024'ten bu yana TL'nin değer kaybını sistematik olarak abartır. TL'de Motor girdisi vadeli kur değil, rejim modeli ve PKA olmalı.

### 1.4 Tahmin piyasaları

Kalshi/Polymarket fiyatları olasılığa yakındır ama gözde-zayıf yanlılığı taşır ve likiditeye bağlıdır ([Wolfers ve Zitzewitz](https://www.frbsf.org/research-and-insights/publications/working-papers/interpreting-prediction-market-prices-as-probabilities)). İki sınırlama var. Polymarket, Milli Piyango İdaresi'nin 16 Temmuz 2026 kararıyla Türkiye'de erişime kapatıldı ([Webtekno](https://www.webtekno.com/polymarket-erisim-engeli-h220708.html)). Anayasa da bahis dilini yasaklıyor. Önerim: tahmin piyasası **yalnız çapraz kontrol** olsun; kartta adı ve oranı geçmesin, sicilin `motor_not` alanına girsin.

---

## 2. Etkin piyasa sorunu: katma değer nerede, nerede sıfır

**Katkımızın sıfır olduğu yerler** (dürüst liste):

- **Likit piyasanın fiyatladığı yakın vadeli eşikler.** Örnekler: Fed'in bir sonraki kararı, Nasdaq'ın 3 ayda %10 düşmesi, altının 6 ayda X'i görmesi. Burada Claude ayarının beklenen değeri sıfır ya da negatiftir. ForecastBench'te en iyi dil modelleri, piyasa fiyatı verildiğinde onu kopyalıyor (korelasyon 0,994). Kopyalamadıkları ayarlar ise isabeti düşürüyor ([FRI, ForecastBench](https://forecastingresearch.substack.com/p/ai-llm-forecasting-model-forecastbench-benchmark)). Bugünkü Brent (−15) ve altın (−12) ayarları tam bu tuzağa düşüyor.
- **"Piyasa yanlış" iddiası.** SPK çizgisi gereği zaten yasak olmalı. "Piyasa %70 diyor, biz %55" demek okura örtük bir pozisyon önerisidir.
- **Yön.** Fiyatın ortalama yönü hakkında bilgimiz yok.

**Katkının mümkün olduğu yerler:**

1. **Türkiye'nin opsiyonsuz varlıkları.** USD/TRY, BIST 100 ve gram altın için kamuya açık, ölçülmüş bir olasılık yok. Burada "piyasa fiyatı" yok ama veri var. Kurallı bir model, Türk okurun hiç görmediği bir sayı üretir.
2. **Fiyatlamanın çevirisi.** Piyasanın sayısını okura "100'de X" ve eylem satırıyla aktarmak. FedWatch'ı Türkçe ve doğru okumak tek başına bir hizmettir. Bu katkı tahmin değil, iletişim katkısıdır; karnede de öyle sunulmalı.
3. **Koşullu sorular.** Piyasa marjinal olasılığı fiyatlar, koşullu olasılığı nadiren fiyatlar ("Fed iki kez artırırsa USD/TRY 60'ı görür mü?"). Kurucunun "şu olursa şu olur" hedefi tam burada (bkz. §3).
4. **Makro dağılımlar.** Konsensüs bir nokta verir, biz dağılım veririz. Elimizde 2012–2026 TCMB yıl sonu tahmin hatası veri seti var (`data/quant/tcmb-tahmin-hata.json`). Hata ortalaması +1,26 puan, standart sapması 4,77 puan. 2021'i (+17,7) çıkarınca sapma yaklaşık 1,5 puana iniyor. Bu **kalın kuyruk** okura anlatılmaya değer bir bulgu: Türkiye'de resmi tahmin genellikle iyi, ama on yılda bir çok kötü.
5. **Piyasaya karşı beceri iddiası değil, piyasaya karşı ölçüm.** Good Judgment, 2024–25'te süper tahmincilerin Fed kararlarında vadeli piyasalardan yaklaşık %30 daha isabetli olduğunu bildiriyor ([GJ / FT](https://goodjudgment.com/news/ft_superforecasters_beat_market)). Kaynak kurumun kendi tanıtımı; ölçüt tanımlı değil. Bu bir hedef olabilir, beklenti olamaz.

---

## 3. Koşullu tahmin ve senaryo ağaçları

### 3.1 Tutarlılık

Senaryo ağacının her düğümü üç sayı taşır: P(A), P(B|A), P(B|¬A). Marjinal ise **hesaplanır**, ayrıca tahmin edilmez: P(B) = P(B|A)·P(A) + P(B|¬A)·(1−P(A)). Böylece aksiyomlar kendiliğinden korunur. Ağaçta üç kural sicile kod olarak girmeli (`sicil.py dogrula`):

- Kardeş dalların toplamı 1'dir.
- Bağımsız sicil sorusu olarak açılmış bir P(B), ağaçtan çıkan değerle 5 puandan fazla ayrışırsa uyarı verilir.
- Koşullu olasılık nedensellik diye yazılmaz. Karger ve arkadaşlarının maske örneği, koşullu tahminin nedensel etki gibi okunduğunu gösteriyor (News raporu §1.2).

Bayes ağı (ör. Fed → ABD 10 yıl → DXY → USD/TRY) ancak 4–5 düğümü geçmeyecek kadar küçük tutulmalı. Her kenar için koşullu olasılığı yazmak zorunda olduğumuzdan büyük ağaç uydurma sayı üretir.

### 3.2 Puanlama

Metaculus kuralı benimsenmeli: koşul gerçekleşmezse o koşullu soru **iptal edilir, puanlanmaz** ([Metaculus FAQ](https://www.metaculus.com/faq/)). İki ek kural öneriyorum:

1. Gerçekleşmeyen dallar karnede **ayrı satırda** sayılır ("12 koşullu tahmin, 7'sinin koşulu gerçekleşmedi"). Böylece "hep olmayan koşulu seçerek puandan kaçma" görünür kalır.
2. Ağacın **marjinal** sayısı her zaman puanlanır, çünkü koşuldan bağımsız kapanır. Ağacın kalitesini asıl bu ölçer.

### 3.3 Yayın

"Ne Olur?" formatı (QUANT.md §2b) aslında bir ağaçtır, ama bugün her halkası bağımsız bir soru olarak açılıyor. Önerim: kart koşulu **en üste** yazsın, koşullu sayıyı **iki dal halinde** göstersin. Örnek: "Fed Mart'a kadar ikinci kez artırırsa: 100'de 40 · artırmazsa: 100'de 15 · bugünkü toplam: 100'de 24". Okurun aklında kalması gereken şey koşulun yarattığı **fark**tır (25 puan). Bu fark piyasa fiyatında görünmez, ve Quant'ın imzası olabilir.

---

## 4. Puanlama

**Brier ikili sorular için yeterli, ama tek başına değil.** Ana ölçü olarak kalsın. Log skor yanında raporlansın: %3 ve %97 sınırı log skoru zaten sonlu tutuyor. Murphy ayrıştırması (güvenilirlik, ayırt etme, belirsizlik) 50 kapanıştan önce yayınlanmasın, çünkü küçük örneklemde yanlı ([Siegert](https://arxiv.org/abs/1303.6182)).

**Sürekli değişkenler.** Enflasyon oranı ya da kur seviyesi için eşik sorusu (evet/hayır) bilgiyi çöpe atar. Önerim: Quant'ta her sürekli değişken için **5 kuantil** yayınlansın (%10, 25, 50, 75, 90). Bunlar kuantil (pinball) kayıp ile puanlanır. Kuantillerden CRPS'nin yaklaşık değeri ve %80 **aralık skoru** çıkar. Üçü de kesin uygun skor kuralıdır ([Gneiting ve Raftery 2007](https://sites.stat.washington.edu/raftery/Research/PDF/Gneiting2007jasa.pdf)). Yoğunluk kalibrasyonu PIT histogramıyla izlenir ([Diebold, Gunther ve Tay 1998](https://archive.nyu.edu/jspui/bitstream/2451/14779/1/SOR-98-6.pdf)). Anayasa evet/hayır şart koşuyor. Uzlaşma yolu şu: kuantil tahmin sicile girer, kartta okura ondan türetilen **bir eşik sorusu** gösterilir. Böylece ikisi aynı dağılımdan gelir ve tutarlı kalır.

**30 kapanışa kadar ne söylenebilir?** Yalnız ham döküm (Anayasa §5). Bir ek öneriyorum: her kapanışta **"beklenen Brier"i** yayınlamak. Tahminci kendi sayısına inanıyorsa beklenen skoru Σp(1−p)/n'dir. Gerçekleşen skor bundan sürekli ve büyük ölçüde kötüyse, bu kalibrasyon için erken bir uyarıdır. 10 kapanışta bile anlamlıdır, iddia değil öz-denetimdir.

**Beceri skorları** (karne satırları):

- `1 − Brier_Planck / Brier_Motor`: Claude ayarının katkısı. Anayasa'nın ana ölçüsü.
- `1 − Brier_Motor / Brier_klimatoloji`: Motor'un dış görünüme katkısı. Klimatoloji = varlığın tarihsel bariyer frekansı.
- `1 − Brier_Planck / Brier_piyasa`: yalnız piyasa sayısı olan sorularda.
- Farkların anlamlılığı Diebold–Mariano testinin küçük örneklem düzeltmesiyle (Harvey–Leybourne–Newbold) raporlanır ([statsmodels](https://www.statsmodels.org/dev/generated/statsmodels.tsa.stattools.diebold_mariano_test.html)). Aynı etkene bağlı sorular tek gözlem sayılır (§5.4).

---

## 5. Mevcut 8 soru, Brier 0,51 ve `motor.py`

### 5.1 Brier 0,51'in anatomisi

`karne.json` iki kapanış gösteriyor. `abd-tufe-ekim-03`: %60 dedik, oldu; Brier 0,16. `nv-1`: %7 dedik, oldu; Brier 0,865. Ortalama 0,512. Motor yalnız ilk soruda var (0,185). Yani **Motor'lu sorularda Planck 0,16 aldı ve fena değil**. Kötü sonucun tamamı, Motor'u olmayan ve "Taban %5 · Claude +2" ile üretilen bir kişi-görev sorusundan geliyor. Bu soru bugünkü Anayasa'da (§9: adı geçen kişinin görevi) açılamaz. Ders: Quant'ın "Ne Olur?" listesi Motor'suz soruların çöplüğü olmamalı. **Motor yoksa Quant sorusu yoktur**; News'e gider ya da açılmaz.

### 5.2 Tasarım hataları

1. **Ufuk.** 8 açık sorunun 5'i 8 Kasım 2027'de, 1'i Mayıs 2027'de kapanıyor. Anayasa §2'nin "%80'i 90 gün içinde" kuralına aykırı. Bu hızla 30 kapanışa 2028'de ulaşılır.
2. **Tek etken.** Fed artırımı, ABD resesyonu, altın, Nasdaq ve Brent büyük ölçüde aynı ABD faiz/enerji şokuna bağlı. Beş soru, bağımsız beş gözlem değil. Etkin örneklem 2–3'tür.
3. **Kapanmış sayılabilecek soru.** `fed-artirim` %97'de. §2'ye göre sessiz izlemeye alınmalı. Aralık artırımı tam fiyatlanmışken 12 aylık "en az bir artırım" sorusu hiçbir bilgi taşımıyor.
4. **İki defter.** `data/quant.json` ile `data/sorular.json` ayrışmış durumda:

   | Soru | quant.json (Motor/p) | sorular.json (Motor/p) |
   |---|---|---|
   | tr-tufe-30 | 48 / 40 | 60 / 52 |
   | usdtry-60 | 65 / 55 | 56 / 46 |
   | brent-110 | 75 / 60 | 69 / 54 |
   | altin-4500 | 57 / 45 | 65 / 53 |

   Sicil 10–12 Kasım'dan beri güncellenmemiş, ya da güncellemeler sicile işlenmemiş. Anayasa ilke 5 (kayıt) açısından en ciddi bulgu bu. **Tek kaynak sicil olmalı**, `quant.json` ondan türetilmeli.
5. **Kâhin testinden geçmeyen kriter.** `nasdaq-25` "tüm zamanların en yüksek kapanışı"na bağlı. Snapshot notu 6 Ekim zirvesinin doğrulanamadığını söylüyor. Zirve de hareketli: yeni rekor gelirse eşik yükselir, Motor ise sabit K kullanıyor (bkz. 5.3).
6. **Bayat girdi ile çalışan "kurallı" hesap.** OVX ve GVZ 5 Kasım'dan, USD/TRY oynaklığı ve TCMB anket sayımı ise varsayım. `motor-gecmis.json` bu günlerde birçok soru için "hesaplanmadı" yazıyor, ama `quant.json`'daki sayılar yine de yayına hazır duruyor.
7. **Ayarın sınırda yaşaması.** Brent'te −15 (tavan), altında −12, USD/TRY'de −10 var. Ayar her gün aynı yönde ve sınırda kalıyorsa sorun Motor'dadır. Ayarı Motor düzeltmesi olarak kullanmak iki katmanı ayrı puanlama fikrini boşa çıkarır.

### 5.3 `motor.py` değerlendirmesi

**Doğru olanlar.** Sürüklenmeli yansıma formülü doğru. Aşağı bariyer simetrisi doğru. Ayar sınırı (±15) ve %3–97 kodda zorlanıyor. TÜFE kuralı (gereken ve ima edilen kümülatif aylık artış) zarif ve şeffaf.

**Düzeltilmesi gerekenler:**

| Kural | Sorun | Öneri |
|---|---|---|
| `brent_110` | OVX, **WTI** ETF'si (USO) üzerindeki **30 günlük** ima oynaklık. 6 aylık Brent sorusuna giriyor. Oynaklık yüksekken vade yapısı terstir; 6 aylık oynaklık çok daha düşüktür. σ=%60 ile Motor %75. σ=%35 ile %58, günlük kapanış düzeltmesiyle %54. Ayarın −15'i aslında bu hatanın tamiri. | Brent opsiyonlarının 6 aylık ATM oynaklığı (ICE). Yoksa OVX × tarihsel vade oranı kuralı. |
| Tüm bariyerler | Sürekli izleme varsayılıyor; kriter ise **günlük kapanış**. Olasılık abartılıyor. | Broadie–Glasserman–Kou düzeltmesi: K → K·e^(0,5826σ√(1/252)) ([BGK 1997](https://ideas.repec.org/a/bla/mathfi/v7y1997i4p325-349.html)). |
| `altin_4500`, `nasdaq_25` | μ=0 log-sürüklenme, aritmetik olarak +σ²/2 yıllık getiri demek: gizli bir yükseliş varsayımı. Altında GVZ (30 gün) 1 yıla taşınıyor. | Risk-nötr sürüklenme r − q − σ²/2, açıkça yazılarak. Vadeye uygun ima oynaklık. |
| `nasdaq_25` | Eşik koşan zirveye göre; K sabit tutulmuş. Ayrıca `NASDAQ_BETA` ve `VOL_TABAN` (24) elle seçilmiş sayılar. | Düşüş (drawdown) olasılığı için kapalı form ya da Monte Carlo. Taban, belgeli bir tarihsel değerden. |
| `usdtry_60` | Yönetilen kurda GBM ve σ=%10 varsayımı. μ, PKA'nın 12 aylık beklentisinden alınıyor; anket 60,77 dediği için soru doğrudan anketin 60'ın üstünde olup olmadığına indirgeniyor. μ'yü anket yerine 57'ye çekmek Motor'u %65'ten %41'e indiriyor: sonuç neredeyse tümüyle tek bir varsayım girdisi. | Kontrollü yürüyüş (aylık değer kaybı dağılımı, EVDS'ten) + sıçrama bileşeni (2018, 2021, 2023 olay sıklığı). PKA beklentisinin tarihsel yanlılığı ayrı katsayı. |
| `tcmb_aralik` | "7 indirim / 10 görüş" bir oy sayımı, olasılık değil. 6 kurum dışarıda. | PKA'nın politika faizi dağılımı + OIS/TLREF + "konsensüs kaç kez doğru çıktı" tabanı. |
| `fed_artirim` | `fed_sonraki_artirim_kosullu_taban=35` dayanaksız bir varsayım. | FedWatch'ın 12 aylık olasılık ağacını doğrudan okumak. |
| `abd_resesyon` | 15 + 25 + 15 + 10 + 5 puanlı tablo kalibre edilmemiş; "petrol YTD ≥%50 +10" gibi kuralların tarihsel testi yok. | NY Fed probit (yayımlanmış sayı) + SPF Anxious Index ortalaması. |
| Genel | Girdinin tarihi ve kaynağı hesapla birlikte saklanmıyor. Bayat girdi sessizce kullanılıyor. | Her girdiye `t` ve `kaynak` alanı. Girdi 3 iş gününden eskiyse kural `None` döner. |

---

## 6. Türkiye verisi

| Veri | Kaynak | Frekans | Kalite ve not |
|---|---|---|---|
| TÜFE, ÜFE, alt kalemler | TÜİK (EVDS'te de) | Aylık, ayın 3'ü 10:00 | Resmi; Anayasa gereği ne doğrulanır ne yalanlanır. Alternatif ölçüler (İTO, ENAG) yalnız mercek olur, kapanış kaynağı olmaz. |
| Politika faizi, kurlar, rezerv, krediler | TCMB **EVDS 3** | Günlük/haftalık | 1993'ten bugüne. TCMB Ekim 2026'da yapay zekâ erişimi için **EVDS-MCP**'yi açtı ([Alomaliye, TCMB duyurusu](https://www.alomaliye.com/2026/10/26/evds-mcpnin-devreye-alinmasina-iliskin-basin-duyurusu/)). Quant'ın girdi borusu buna bağlanmalı; bayat girdi sorununun çözümü burada. |
| Piyasa Katılımcıları Anketi | TCMB | Aylık | Seçilmiş panel, gönüllü yanıt. Bireysel yanıt yayımlanmaz. **Yalnız enflasyon için** 12 ve 24 ay sonrasının olasılık dağılımı soruluyor ([PKA Metaveri](https://www.tcmb.gov.tr/wps/wcm/connect/f7471426-8864-4850-809f-426de2266e03/PKA-Metaveri.pdf?MOD=AJPERES)). Bu dağılım Türkiye'deki tek hazır **gerçek dünya** olasılık girdisi; Motor'a doğrudan girmeli. |
| Gösterge kur | TCMB, günlük 15:30 | Günlük | Kapanış kaynağı. Piyasa kapanışıyla kaynaklar arası fark var (`gunluk/2026-11-16.json`: 50,28 / 50,37). Kriter "TCMB gösterge"yi seçmekle doğru yapmış. |
| BIST 100, VİOP vadeli | Borsa İstanbul | Günlük, gün içi | Vadeli likit. VİOP'ta USD/TRY ve endeks **opsiyonları** var ([Borsa İstanbul](https://borsaistanbul.com/en/markets/viop/options/usdtry-options)). Ancak kullanılabilir bir oynaklık yüzeyi çıkacak derinlikte olduklarını gösteren bir veri bulamadım. Kamuya açık 2025 hacim analizleri endeks vadelisini öne çıkarıyor ([GCM](https://www.gcmyatirim.com.tr/arastirma-analiz/uzman-gorusleri/2026-01-02-2025-yilinda-viop-piyasa-derinligi-zamanlama-ve-yatirimci-davranisi)). **Varsayımım:** Breeden–Litzenberger için yetersiz. Borsa İstanbul bülteniyle doğrulanmalı. |
| TL faiz beklentisi | TLREF, OIS, DİBS getirileri | Günlük | OIS piyasası var ve politika beklentisini fiyatlıyor ([BNN Bloomberg](https://www.bnnbloomberg.ca/turkey-lira-bets-show-central-bank-expected-to-stay-hawkish-1.2031298)). Ama veri çoğunlukla terminalde, kamuya açık değil. Türkiye'de kısa vadeli faizlerin karar beklentisini en iyi yansıttığı eski bir bulgu ([Alp, Kara, Keleş, Gürkaynak, Orak 2010](https://repository.bilkent.edu.tr/items/6239db1b-8bd4-4965-b0b2-1d0b94c9ba70)). |
| USD/TRY ima oynaklık | Tezgâhüstü (offshore) | Günlük | Bloomberg terminali gerektirir. Kamuya açık kaynak yok. |

**Hüküm:** Türkiye'de opsiyondan risk-nötr olasılık çıkarmak bugün **pratikte mümkün değil**. Faizde kısmen mümkün: TLREF vadelisi ve kamuya yansıyan OIS haberleri. Kur ve endekste mümkün değil. Bu bir eksiklik değil, Quant'ın gerekçesi: Türk okur için "piyasa ne diyor" sorusuna kimse sayı vermiyor. İki öneri: (1) PKA enflasyon dağılımı ve EVDS serileri Motor'un çekirdeği olsun. (2) VİOP opsiyon kotasyonları 90 gün boyunca yalnız **kaydedilsin**, yayın için kullanılmasın; sonra kalitesine bakılsın.

---

## (a) En önemli 5 öneri

1. **Motor yoksa Quant sorusu yok.** Motor'u olmayan soru News'e gider ya da açılmaz. Brier 0,51'in tamamı bu kuraldan gelen bir istisnadan doğdu.
2. **Tek defter.** `sorular.json` tek kaynak olsun, `quant.json` ondan türetilsin. Her girdiye tarih ve kaynak eklensin. 3 iş gününden eski girdiyle Motor çalışmasın.
3. **Motor'u üç katmana ayır:** `motor_rn` (piyasa/risk-nötr), `motor_p` (kurallı gerçek dünya düzeltmesi), Claude ayarı. Vadeye uygun oynaklık ve günlük kapanış düzeltmesi zorunlu olsun.
4. **Havuzu yeniden kur:** 12 aylık beş soruyu sessiz izlemeye al. Yerine ≤90 günlük, birbirinden bağımsız etkenlere bağlı eşik soruları aç. Türkiye varlıklarına (USD/TRY, BIST, gram altın) ağırlık ver.
5. **Koşullu iki dallı kart ve kuantil tahmin** Quant'ın imzası olsun. Koşulu gerçekleşmeyen dal iptal edilir ama ayrı sayılır. Marjinal her zaman puanlanır. Sürekli değişkenler pinball/CRPS ile puanlanır.

## (b) Diğer uzmanlarla olası çatışmalar

- **İletişim/psikoloji:** İki dallı koşullu kart ve 5 kuantil, "sayı tek başına çıkmaz" sadeliğini zorlayabilir. Önerim: kartta tek eşik, kuantiller sicilde ve sitede.
- **Davranışsal finans / makro mercek:** Ayarın "piyasanın görmediğini" gördüğü savunulabilir. Benim pozisyonum: likit piyasada ayar varsayılan olarak 0, ±5 ile sınırlı. Bunu karne çürütene kadar korurum.
- **Medya/ürün:** Türkiye soruları "kur 60'ı aşar mı" gibi yön algısı yaratabilir. SPK uzmanı bunu yön tavsiyesi sayabilir. Eşik simetrik (iki yönlü) seçilmeli.
- **News masası:** TÜFE ve TCMB soruları News'e geçti. Ama kuantil/dağılım sürümü Quant'ta kalabilir mi? Çift sayım riski var.

## (c) Karar vericiye sorular

1. Quant'ta **Motor'suz soru** (yalnız Claude yargısı) tümüyle yasaklansın mı?
2. Likit piyasa sorularında Claude ayar sınırı ±15'ten **±5'e** inebilir mi (karne aksini gösterene kadar)?
3. Quant evet/hayır dışında **kuantil tahmin** yayınlayabilir mi (Anayasa §2 istisnası)?
4. Bloomberg/Refinitiv gibi ücretli veri (TL OIS, kur oynaklığı) alınacak mı, yoksa Quant yalnız kamuya açık veriyle mi sınırlı kalsın?
5. Tahmin piyasası verisi (Polymarket Türkiye'de erişime kapalı) çapraz kontrol olarak bile kullanılsın mı?

## (d) 90 günde başarı ölçüsü

| Ölçüt | Hedef (90 gün) |
|---|---|
| Kapanan Quant sorusu (Motor'lu) | ≥ 25 (≤90 gün ufukla) |
| Motor'u kapanış anında yeniden üretilebilen soru payı | %100 (girdi tarihli, kaynaklı, git'te) |
| Sicil ile türetilmiş dosya arasında fark | 0 |
| Bayat girdiyle (3 iş günü+) üretilen sayı | 0 |
| Beklenen Brier ile gerçekleşen Brier farkı | Her 10 kapanışta raporlanır, |fark| < 0,05 |
| Motor'un klimatolojiye göre beceri skoru | > 0 (n ve şans payıyla) |
| Claude ayarının Motor'a göre beceri skoru | Raporlanır. Negatifse ayar sınırı daraltılır. |
| Koşullu ağaç | ≥ 3 ağaç; marjinal sayıları puanlanmış |
| Türkiye varlık sorusu payı | Açık Quant havuzunun ≥ %40'ı |
