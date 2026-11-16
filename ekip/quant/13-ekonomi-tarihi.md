# 13 · Ekonomi ve Finans Tarihi: Quant İçin Taban Oranı Kütüphanesi

*Yazan: ekonomi ve finans tarihçisi (Claude) · 17.11.2026 · Girdi: `ekip/quant/BRIEF.md`, `ANAYASA.md` v2, `QUANT.md`, `ekip/KARAR.md`, `data/quant.json`, `data/sorular.json`, `data/quant/tcmb-tahmin-hata.json`, `quant/motor.py`. Bu belge öneridir. Hiçbir kural ya da veri dosyasına dokunulmadı.*

**Dürüstlük notu.** FRED ve EVDS'ye bu ortamdan erişilemedi (vekil sunucu 403 verdi). Bu yüzden aşağıdaki "n" değerlerinin bir kısmı literatürdeki sayımlardan, bir kısmı benim kaba sayımımdan geliyor. Kaba olanlar **(sayılacak)** diye işaretlendi. Bunlar epizot listesi çıkarılıp doğrulanmadan sicile taban olarak yazılmamalı.

---

## 0. Ana bulgu: Quant'ın bugün taban oranı yok

Sicildeki dokuz `q-*` sorusunun `taban` alanında hep aynı şey yazıyor: "Motor %X (quant/motor.py)". Bu bir referans sınıfı değil, modelin çıktısı. Anayasa §2'deki "Taban: referans sınıfı ve oranı" alanı fiilen boş. Bu yüzden §2.1'in 3. adımındaki frekans cümlesi ("Geçmişte benzer 14 durumun 4'ünde oldu") hiçbir Quant sorusu için yazılamıyor.

Motor'un yöntemi çoğunlukla lognormal bariyer formülü. Bu formül *piyasanın bugünkü oynaklık beyanını* geleceğe taşır, *geçmişte ne olduğunu* söylemez. Yani ilke 2'deki "önce dış görünüm" Quant'ta henüz uygulanmıyor. Raporun geri kalanı bu boşluğu nasıl dolduracağımız üzerine.

---

## 1. Taban Oranı Kütüphanesi: 20 referans sınıfı

Her sınıf `data/quant/taban/<id>.json` olarak tutulmalı. Alanlar: tanım, ölçüt, dönem, epizot listesi (tarih ve kaynakla), n, oran, rejim notu, son güncelleme, kullanan sorular. **Epizot listesi olmadan oran yazılmaz.** Okur "hangi 14 durum?" diye sorduğunda listeyi gösterebilmeliyiz.

| ID | Referans sınıfı ve ölçüt | n (yaklaşık) | Kaynak veri seti | Planck'te kullanım |
|---|---|---|---|---|
| RS-01 | **Gelişen ülke kur krizleri sonrası 12 ay.** Kriz tanımı Laeven–Valencia'dan: yıllık değer kaybı ≥%30 ve önceki yıla göre ≥10 puan hızlanma. 12 ay içinde ikinci dalga, enflasyon zirvesi, faiz tepkisi ölçülür. | 236 kur krizi (1970–2017) | [Laeven–Valencia 2018, IMF WP/18/206](https://www.imf.org/-/media/files/publications/wp/2018/wp18206.pdf.md); [Reinhart–Rogoff verisi](https://rogoff.scholars.harvard.edu/time-different%E2%80%94data-files) (eşik %15) | USD/TRY eşik soruları; kriz sonrası "Ne Olur?" |
| RS-02 | **ABD faiz şokları ve gelişen piyasa kurları.** Getiri artışının *sebebine* göre ayrılır: büyüme kaynaklı mı, şahin para politikası kaynaklı mı? | 8 epizot + taper tantrum | [Fed FEDS Notes 2023](https://www.federalreserve.gov/econres/notes/feds-notes/u-s-interest-rates-and-emerging-market-currencies-taking-stock-10-years-after-the-taper-tantrum-20231004.html) | `q-usdtry-60`; Fed kararı sonrası GOP etkisi |
| RS-03 | **Fed artırım döngüleri.** Artırımla açılan bir toplantıdan sonra 12 ay içinde yeni artırım; döngünün uzunluğu; son artırımdan ilk indirime geçen süre. | 1983'ten beri ~7 döngü (sayılacak) | FOMC karar arşivi, FRED `DFEDTARU` | `q-fed-artirim` ve yerine açılacak soru |
| RS-04 | **Petrol arz şokları sonrası fiyat yolu.** Şokun başladığı aydan itibaren zirveye kadar geçen süre, zirvenin büyüklüğü, 6 ve 12 ay sonra seviye. | 1956'dan beri ~8–10 şok | [Hamilton 2011, NBER w16790](https://www.nber.org/papers/w16790); EIA fiyat serisi | `q-brent-110` |
| RS-05 | **Petrol fiyatı 12 ayda ≥%50 arttığında ABD resesyonu.** | ~6–8 dönem (sayılacak) | [Hamilton, NBER Reporter 2011](https://www.nber.org/reporter/2011number2/oil-price-shocks): savaş sonrası 11 resesyonun 10'unu sert petrol artışı önceledi | `q-abd-resesyon` |
| RS-06 | **ABD resesyonu: koşulsuz oran ve getiri eğrisine koşullu oran.** | 1945'ten beri 12 NBER resesyonu | NBER tarihleri; NY Fed getiri eğrisi modeli | `q-abd-resesyon` |
| RS-07 | **Yüksek enflasyondan çıkış hızları.** Zirveden 12, 24 ve 36 ay sonra enflasyon; %30'dan %20'ye ve %10'a iniş süresi. | 100'ü aşkın şok, 56 ülke | [IMF WP/23/190, "One Hundred Inflation Shocks"](https://www.imf.org/en/publications/wp/issues/2023/09/13/one-hundred-inflation-shocks-seven-stylized-facts-539159); Reinhart–Rogoff (enflasyon krizi eşiği %20) | TÜFE eşik soruları; 2027 ara hedef soruları |
| RS-08 | **Dezenflasyonda "erken zafer" ve plato.** Enflasyon önce düşüp sonra yerinde saydığında ya da yeniden hızlandığında ne olur? | Aynı veri seti; çözülmeyen epizotların çoğu bu tipte | IMF WP/23/190 | Yıllık TÜFE'nin 6 ay sonraki düzeyi |
| RS-09 | **TCMB yıl sonu enflasyon tahmin hataları.** Kasım ve Ağustos raporundaki tahminin gerçekleşenden sapması. | 14 yıl (2012–2025) | `data/quant/tcmb-tahmin-hata.json` | `q-tr-tufe-30`; rapor günü soruları |
| RS-10 | **Piyasa Katılımcıları Anketi (PKA) hataları.** Yıl sonu TÜFE ve 12 ay sonrası kur beklentisinin gerçekleşenden sapması. | 2001'den beri aylık (sayılacak) | TCMB PKA arşivi, EVDS | `q-usdtry-60`, `q-tr-tufe-30` |
| RS-11 | **PPK kararı ile anket medyanı.** Kurul anket çoğunluğundan ne sıklıkla ayrıldı, ayrıldığında hangi yöne? | 2010'dan beri ~150 karar (sayılacak) | TCMB karar metinleri; AA Finans ve Reuters anketleri | `q-tcmb-aralik` |
| RS-12 | **Türkiye'de seçim dönemlerinde para ve maliye politikası.** Seçimden önceki 6 ay ve sonraki 6 ayda faiz, kur ve bütçe. | 1983'ten beri ~12 genel seçim | TCMB, Hazine, YSK tarihleri | 2027–28 politika soruları. Kazanan ya da oy oranı sorusu yok (§9). |
| RS-13 | **Merkez bankası başkanı değişikliği sonrası 3 ay.** Kur, faiz ve politika yönü. | Türkiye 2019–2024'te 5 değişiklik; ülkeler arası daha fazla | TCMB; Dreher–Sturm–de Haan başkan değişim verisi | Yalnız olay *olduktan sonra* "Ne Olur?". Kişinin görevi hakkında olasılık yok (§9). |
| RS-14 | **Yönetilen kur rejimlerinden çıkış.** Fiilî bağlı ya da sürünen kurun düzensiz çözülme sıklığı. | IRR sınıflaması, 1940– | [Ilzetzki–Reinhart–Rogoff](https://carmenreinhart.com/exchange-rate/) | USD/TRY sıçrama riskinin rejim tabanı |
| RS-15 | **Altın zirveden ≥%25 düştükten sonraki 12 ay.** | 1980, 2008, 2011–13, 2026 (n çok küçük) | LBMA, World Gold Council | `q-altin-4500` |
| RS-16 | **ABD hisse endeksi zirveye yakınken 12 ayda ≥%20 ya da ≥%25 düşüş.** | Nasdaq 1971– (~8–9 epizot, sayılacak); S&P 1871– | Nasdaq/FRED, Shiller verisi, [JST Makrotarih](https://www.nber.org/research/data/jorda-schularick-taylor-macrohistory) | `q-nasdaq-25` |
| RS-17 | **Bankacılık krizi sonrası çıktı kaybı ve toparlanma süresi.** | 151 sistemik kriz | Laeven–Valencia 2018 | Büyüme ve "Ne Olur?" soruları |
| RS-18 | **Ani duruşlar (sudden stop).** Sermaye akışı aniden kesildiğinde 12 ay içinde cari açığın kapanması ve büyüme kaybı. | Calvo ve Cavallo–Frankel verileri (sayılacak) | IMF BOP, BIS | Dış finansman ve CDS soruları |
| RS-19 | **Kredi notu geçişleri.** Not artırımından sonra 12 ay içinde ikinci artırım olasılığı. | Kuruluşların yıllık geçiş matrisleri | S&P, Moody's, Fitch ülke notu çalışmaları | Türkiye not soruları |
| RS-20 | **Ocak etkisi.** Yönetilen fiyat ve asgari ücret ayarlarıyla Ocak aylık TÜFE'si. | 2004–2026, 23 Ocak | TÜİK; EVDS | "Ocak TÜFE ≥%X" soruları (Ocak 2026: %4,84) |

**Kütüphane kuralları:**
1. Her sınıfın "rejim notu" alanı zorunlu. Sınıfın hangi para ve kur rejiminde geçerli olduğu yazılır.
2. Oran her zaman "k/n" olarak yazılır, yüzde tek başına yazılmaz. n < 10 ise ayrıca "küçük örneklem" etiketi konur.
3. Sınıf bir kez yazılınca ilgili soru açılmadan önce donar. Soru açıldıktan sonra sınıf değiştirmek "düzeltme" kaydı gerektirir.

---

## 2. Türkiye ekonomi tarihi: taban oranlarına girecek dersler

| Epizot | Ne oldu | Quant'a girecek nicel ders |
|---|---|---|
| **1994** | Kısa vadeli iç borçlanma ve faiz baskısıyla kur ilk dört ayda iki katını aştı, 5 Nisan kararları alındı, rezervler yaklaşık 7'den 3 milyar dolara indi ([Milliyet Uzmanpara](https://uzmanpara.milliyet.com.tr/haber-detay/gundem2/5-nisan-1994te-ne-olmustu/1000/590/)). Enflasyon üç haneye çıktı, büyüme negatife döndü. | Mali baskınlık altında kur, haftalar içinde rejim değiştirebilir. **Kur sıçraması bariyer modeline uymaz.** Lognormal yürüyüş yerine "sıçrama + rejim" karışımı gerekir (bkz. 2-makroekonomi raporundaki karışım önerisi). |
| **2001** | Kasım 2000 ve Şubat 2001 krizleri, kur çıpasının çöküşü, dalgalanmaya geçiş. Bankaların yeniden sermayelendirilmesi GSYH'nin %24,5'i (Laeven–Valencia), küçülme yaklaşık %6 ([Ekonomi Gazetesi](https://www.ekonomigazetesi.com/kose-yazisi/turkiye-bunu-daha-once-basarmisti-79267)). | **Hızlı dezenflasyonun Türkiye'deki tek örneği.** Yıllık TÜFE kriz sonrası 2004 sonunda %9,3'e indi ([aynı kaynak](https://www.ekonomigazetesi.com/kose-yazisi/turkiye-bunu-daha-once-basarmisti-79267)). Bu hızın koşulları vardı: güçlü faiz dışı fazla, IMF çıpası, kriz sonrası atıl kapasite, değerlenen TL, küresel bolluk. Bu koşullar yoksa 2002–04 hızı taban olarak kullanılmaz. |
| **2008–09** | Kriz dışarıdan geldi, bankacılık sağlam kaldı. Kur sert değer kaybetti, 2009'da çıktı daraldı, sonra hızla toparlandı. | Dış kaynaklı şokta Türkiye'nin kendi krizlerinden farklı bir yol izlendi. **"Kriz" tek bir sınıf değildir.** İç kaynaklı ve dış kaynaklı kriz ayrı sınıflardır. |
| **2018** | Cari açık yaklaşık GSYH'nin %7'si, TL dolara karşı yaklaşık %35 kaybetti, 13 Eylül'de politika faizi %17,75'ten %24'e çıkarıldı ([BSI Economics](https://bsi-economics.org/a-look-back-at-the-turkish-lira-crisis-note/)). | Repodaki veri setinde 2018 Kasım tahmin hatası −3,2 puan: kur şokundan sonra TCMB enflasyonu *fazla* tahmin etti. **Şokun hemen ardından tahmin hatasının işareti dönebilir.** |
| **2021–23** | Eylül–Aralık 2021'de 500 baz puan indirimle faiz %14'e indi, TL 2021'de %44 kaybetti ([Gulf News](https://gulfnews.com/business/banking/turkeys-lira-logs-worst-year-in-two-decades-1.84692293)). Mart 2021'de başkan değişikliğinden sonra TL gün içinde yaklaşık %15 düştü ([BNN Bloomberg](https://www.bnnbloomberg.ca/turkish-markets-slide-as-agbal-s-exit-stokes-lira-turmoil-1.1580419)). Yıllık TÜFE Ekim 2022'de %85,5'e çıktı. Haziran 2023'te politikaya dönüş oldu. | 2021'in Kasım tahmin hatası +17,7 puan. Bu, 14 yılın geri kalanının standart sapmasının (1,5) yaklaşık 12 katı. **Türkiye'de tahmin hatası dağılımı normal değil, karışımdır.** "Normal yıl" ve "rejim kırılması yılı" ayrı bileşenlerdir. 14 yılda iki kırılma (2018, 2021) var. Kaba kırılma payı 2/14, yani yaklaşık %14. |
| **2024–26** | Yıllık TÜFE Mayıs 2024'te %75,45'te zirve yaptı ([CNBC-e](https://www.cnbce.com/piyasalar/enflasyon-mayis-2024-tuik-h331)). Aralık 2024'te %44,38, Aralık 2025'te %30,89 oldu. Ekim 2026'da %29,77 (repo verisi). | **Plato bulgusu.** İlk 19 ayda 45 puan düştü, sonraki 10 ayda yalnız 1,1 puan. Bu, IMF'nin "erken zafer" bulgusunun (RS-08) ders kitabı örneği. 2027 ara hedefinin 15'ten 21'e çekilmesi de aynı örüntünün kurumsal karşılığı. |

### Repodaki veriden üç sağlam taban

`tcmb-tahmin-hata.json` içinden hesapladığım üç taban:

- **Ağustos tahmini sistematik olarak düşük.** 14 yılın 12'sinde gerçekleşen, Ağustos (Q3) tahminin üstünde kaldı. 2021 hariç ortalama sapma +3,0 puan.
- **Kasım'da yukarı revizyon neredeyse kural.** TCMB 2012–2026 arasında 15 yılın 13'ünde yıl sonu tahminini Ağustos'tan Kasım'a yükseltti. Yükseltmediği yıllar 2016 (sabit) ve 2019 (düşürdü). 2026 da yükseltilen yıllardan biri (%28 → %29,5).
- **Kasım tahmini ise isabetli.** 2021 hariç 13 yılda mutlak ortalama hata 1,17 puan, ortalama sapma sıfıra yakın (−0,01).

### Kendi geçmiş mi, benzer ülkeler mi?

Önerdiğim kural **mekanizma eşleşmesi**dir:

1. **Kurum davranışı ve ölçüm** sorularında (TCMB tahmin hatası, Ocak etkisi, TÜİK açıklama örüntüsü) Türkiye'nin kendi geçmişi kullanılır. Ama yalnız *aynı rejim kesiti* içinden. Türkiye'nin rejim kesitleri: 1980–2001 kronik yüksek enflasyon ve yönetilen kur; 2002–2017 enflasyon hedeflemesi ve dalgalı kur; 2018–Haziran 2023 alışılmadık politika; Haziran 2023 sonrası sıkı politikaya dönüş.
2. **Nadir olay ve kriz dinamiği** sorularında (kur krizinden sonra ne olur, dezenflasyon kaç yıl sürer, ani duruş) Türkiye'nin n'i 3–5'tir. Bu yüzden benzer ülke sınıfı (RS-01, RS-07, RS-18) birincil kaynaktır.
3. **İkisi birleştirilirken kısmi havuzlama** kullanılır: `p = w·p_TR + (1−w)·p_benzer`, `w = n_TR / (n_TR + k)`. Başlangıç değeri k = 10. Türkiye'nin 4 epizodu varsa ağırlığı 4/14 ≈ 0,29 olur. k'nin seçimi karnede 50 kapanıştan sonra sınanır.
4. **Benzer ülke seçimi önceden yazılır.** Kur ve dezenflasyon için önerdiğim sabit liste: Arjantin, Brezilya, Meksika, İsrail, Rusya, Güney Afrika, Endonezya, Polonya, Macaristan, Kolombiya. Liste sorudan önce sabitlenir. Sonradan "uyan ülkeleri" seçmek sınıf avcılığıdır (bkz. §3).

---

## 3. Referans sınıfı tuzakları ve "iki sınıf dene" kuralının finansa uyarlanması

**Referans sınıfı problemi.** Her olay sonsuz sınıfa aittir. Nvidia CEO sorusu (`nv-1`) bunun Planck'teki örneği: "büyük şirket CEO'larının ayrılma oranı" alındı (%5), ama olayı tanımlayan koşul (aktif bir soruşturma ve Kongre baskısı) sınıfa girmedi. Soru %7 ile "oldu" kapandı ve Brier'i 0,865. Kahneman–Lovallo ve [Flyvbjerg'in (2006)](https://risknet.de/fileadmin/eLibrary/Flyvbjerg-Nobel-PMJ2006.pdf) önerisi, sınıfı soruyu tanımlayan *en dar ama n'i yeterli* koşulla kurmaktır. Bu soru bugünkü Anayasa'da (§9, adı geçen kişinin görevi) zaten açılamaz. Ama ders genel.

**Hayatta kalma yanlılığı.** ABD borsası 1921–1996'da yılda %4,3 reel değer kazandı. Kesintisiz verisi olan diğer 39 piyasanın medyanı ise %0,8 ([Jorion–Goetzmann, NBER Reporter](https://www.nber.org/reporter/summer-2000/stock-markets-behavior-and-limits-history)). Nasdaq ya da S&P'nin tarihinden çıkan "düşüşten sonra hep toparlandı" tabanı, toparlanmayan piyasaları dışarıda bırakır. Türkiye'de bunun karşılığı da var: EVDS serileri kesintili, TL'den altı sıfır atıldı, TÜFE'nin baz yılı değişti. Uzun seriler birleştirilirken bu kırılmalar epizot notuna yazılmalı.

**Rejim değişikliği.** Laeven–Valencia ve Reinhart–Rogoff büyük ölçüde sabit ya da yarı sabit kur dönemlerinden besleniyor. Yönetilen dalgalı kurdaki bir Türkiye için RS-14 rejim sınıflaması filtre olmadan kullanılamaz. Aynı şey `nv-3` için de geçerli. ABD'nin çip ihracat kısıtlaması sıklığı (2022 ve 2023 Ekim kuralları, 2024–25 ek kurallar) yönetim değiştiğinde aynı tabanı vermez.

**Küçük örneklem.** Fed'in 2023 notu bile "8 epizot, iki değişkenli korelasyon" uyarısı yapıyor. Altın çöküşü sonrası (RS-15) n = 3–4. Bu sınıflardan çıkan oran "%33" diye yazılmaz, "4 durumdan 1'i" diye yazılır. Laplace düzeltmesi önerilir: `(k+1)/(n+2)`.

**Modelin tarih kılığına girmesi.** Bariyer formülü tarihsel taban değildir. `q-nasdaq-25`'in tabanı açılışta %54 iken Motor bugün %36 diyor. Farkın büyük kısmı haberden değil, oynaklık kuralının değişmesinden (σ %30 → taban %24) geliyor. Model değişikliği güncelleme değil, düzeltme olarak kaydedilmeli (ilke 5).

### "İki sınıf dene" kuralının finans sürümü

Anayasa §3.2 iki sınıf istiyor. Finansta bunu **üç ayaklı ve önceden kayıtlı** hale getirmeyi öneriyorum:

1. **Sınıf A, kendi rejim geçmişi.** Türkiye ya da varlığın aynı rejim kesitindeki ampirik sıklığı. Örnek: 2023 sonrası dönemde 12 aylık USD/TRY değişimlerinin dağılımı.
2. **Sınıf B, ülkeler arası ya da uzun tarih.** Örnekler: RS-01, RS-07, RS-16.
3. **Sınıf C, piyasa iması.** Opsiyon oynaklığı, vadeli fiyat ya da anket. Bu ayak "taban" diye etiketlenmez, "piyasa" diye etiketlenir (§3.3a).

Kurallar:
- A, B ve C'nin üçü de sicilde ayrı yazılır. Frekans cümlesi A ya da B'den kurulur, C'den kurulmaz.
- A ile B arasındaki fark 15 puanı aşarsa içerik "belirsizlik yüksek" etiketi alır. Bu, §3.6'daki üç geçiş aralığıyla aynı eşik.
- n < 10 olan sınıf, ağırlık hesabında diğer sınıfa doğru büzülür (§2'deki k kuralı).
- Sınıf seçimi, güncel veriye bakılmadan önce `taban/<id>.json` dosyasında sabitlenir. Sonradan sınıf değiştirmek düzeltme kaydı gerektirir.
- Her taban, karnede **"yalnız taban"** adlı bir rakip olarak puanlanır. Motor ve Claude ayarı bu rakibi yenemiyorsa, dış görünüm iç görünümden iyi çalışıyor demektir. Bu da yayınlanır.

---

## 4. Arşiv değeri: "Taban Oranı" formatı ve uzun ömürlü içerik

KARAR §2.5 çarşamba gününe "Taban Oranı" carousel'ini koydu. Tarihçi gözüyle bu formatın üç kuralı olmalı:

1. **Liste görünür.** Son sayfada epizotlar tarih sırasıyla verilir. "Benzer 14 durum" denip liste gösterilmezse içerik arşiv değeri taşımaz.
2. **Tarih, hikâye değil sınıftır.** "1994'te şöyle olmuştu" anlatısı yerine "kriz tanımına uyan N epizotta şu sıklıkla" yazılır. Tek bir çarpıcı örnek, sınıfın yerine geçmez.
3. **Bugüne bağ, soruyla kurulur.** Sorusuz sayı yok (ilke 1). Her Taban Oranı içeriği sicilde açık bir soruya bağlanır ya da yeni soru açar. Tarihsel sıklık tek başına "yön" olarak okunmamalı (SPK çizgisi). Bu yüzden her içerik "Bu bir fiyat yönü tahmini değildir; geçmiş sıklığı ve belirsizliğin genişliğini gösterir" satırını taşır.

### Beş örnek taslak

Köşeli parantez içindeki sayılar epizot listesi çıkarılmadan doldurulmayacak. Diğer sayılar kaynaktan ya da repodan geliyor.

**T1 · "Enflasyon Düşerken Neden Durur? 100 Şokun Dersi"**
- Sınıf: RS-07 ve RS-08.
- Sayfa 2: 1970'lerden beri 56 ülkede 100'ü aşkın enflasyon şoku incelendi. Bunların yalnız %60'ında enflasyon 5 yıl içinde eski düzeyine döndü. Başaranlarda bile ortalama süre 3 yılı aştı ([IMF](https://www.imf.org/en/publications/wp/issues/2023/09/13/one-hundred-inflation-shocks-seven-stylized-facts-539159)).
- Sayfa 3: Türkiye 2024–26 eğrisi. 19 ayda −45 puan, sonraki 10 ayda −1,1 puan.
- Bağlı soru (yeni): "Haziran 2027 yıllık TÜFE %25'in altında mı?" Kapanış TÜİK, Temmuz 2027.
- Eylem satırı: "İzlenecek gösterge: hizmet enflasyonu ve kira kalemi; plato en çok orada kalır."

**T2 · "TCMB'nin Kasım Tahmini Ne Kadar Tutar? 14 Yılın Karnesi"**
- Sınıf: RS-09 (repo verisi).
- İçerik: Gerçekleşen enflasyon, 14 yılın 8'inde Kasım tahminini yarım puandan az aştı ya da altında kaldı. Ağustos tahmini ise 14 yılın 12'sinde düşük kaldı. TCMB tahminini Ağustos'tan Kasım'a 15 yılın 13'ünde yükseltti. Aykırı yıl 2021 (+17,7 puan).
- Bağlı soru: `q-tr-tufe-30`.
- Ton: Övgü ya da yergi yok. Resmî istatistik sorgulanmaz, yalnız tahminle karşılaştırılır (§9).

**T3 · "Fed Faiz Artırınca Gelişen Ülke Paraları: 8 Epizot"**
- Sınıf: RS-02.
- İçerik: Faiz artışının sebebi sonucu belirledi. Taper tantrum'da (2013) dolar gelişen ülke paralarına karşı %8,8, 2022 sıkılaşmasında %11,4 değer kazandı. Kırılganlık skoru yüksek ülkeler (cari açık, dış borç, enflasyon) daha çok kaybetti ([Fed 2023](https://www.federalreserve.gov/econres/notes/feds-notes/u-s-interest-rates-and-emerging-market-currencies-taking-stock-10-years-after-the-taper-tantrum-20231004.html)).
- Bağlı soru: `q-usdtry-60`.
- Eylem satırı: "Bireysel olarak yapılacak yok; izlenecek gösterge: ABD 2 yıllık getirisi ve TCMB rezervleri."

**T4 · "Petrol Şokları Ne Kadar Sürer?"**
- Sınıf: RS-04 ve RS-05.
- İçerik: ABD'de savaş sonrası 11 resesyonun 10'unu sert bir petrol artışı önceledi ([Hamilton](https://www.nber.org/reporter/2011number2/oil-price-shocks)). Şoklardan sonra zirveye kadar geçen ayların dağılımı: [epizot tablosu, EIA'dan çıkarılacak]. 1990 örneği: Irak'ın Kuveyt'i işgalinden sonra fiyat yaklaşık iki katına çıktı ve birkaç ay içinde geri indi ([EIA ile doğrulanacak]).
- Bağlı sorular: `q-brent-110`, `q-abd-resesyon`.

**T5 · "Kur Krizinden Sonraki 12 Ay: İkinci Dalga Ne Sıklıkla Gelir?"**
- Sınıf: RS-01, Türkiye alt kümesiyle birlikte (1994, 2001, 2018, 2021).
- İçerik: 1970–2017 arasında 236 kur krizi var (Laeven–Valencia). Krizden sonraki 12 ayda ikinci bir ≥%15'lik değer kaybı [k/n, sayılacak]. Türkiye'nin 4 epizodunda [k/4].
- Bağlı soru: `q-usdtry-60`.
- Not: Merkez bankası başkanı değişikliği temasını (RS-13) bilerek dışarıda bıraktım. Kişinin görevine bağlanan bir içerik §9 çizgisine çok yakın.

---

## 5. Mevcut Quant sorularının taban denetimi

| Soru | Mevcut taban | Hüküm | Önerilen sınıflar |
|---|---|---|---|
| `q-tcmb-aralik` (%62) | "Motor %70", yani 7/10 kurum anketi | **Zayıf.** Anket bir oy sayımı. 16 kurumdan 6'sı dışarıda, bu da görüş bildirenlerle ilgili bir seçim yanlılığı yaratıyor. Tarihsel taban yok. | A: RS-11 (Kurul anket çoğunluğundan ne sıklıkla ayrıldı, 2023 sonrası). B: indirim döngülerinde beklentiyi aşan enflasyondan sonraki ilk toplantı (RS-07 içinden). |
| `q-tr-tufe-30` (%52) | "Motor %60" | **Sağlam veri, yanlış kullanım.** Motor `sd = 0,6` *varsayımını* kullanıyor. Elimizde ampirik dağılım var: 8/14 (2021 dahil), 8/13 (2021 hariç). | Frekans cümlesi bugün yazılabilir: "Geçmiş 14 yılın 8'inde gerçekleşen, TCMB'nin Kasım tahminini yarım puandan fazla aşmadı." İkinci sınıf: RS-10, PKA Kasım anketinin Aralık hatası. |
| `q-usdtry-60` (%46) | "Motor %56", σ = %10 varsayımı | **Zayıf.** Oynaklık ve sürüklenme varsayım. 12 aylık PKA kur beklentisinin kendi hata geçmişi kullanılmıyor. Kur sıçrama riski modelde yok. | A: 2023 sonrası 12 aylık değişim dağılımı (n küçük). B: RS-10 kur hataları 2006–2026 (sağ kuyruk: 2018, 2021). C: RS-14 rejim ve RS-12 seçim öncesi yıl (genel seçim 2028'de). |
| `q-fed-artirim` (%97) | "Motor %86", Motor bugün 100 | **Etiket yanlış, soru tükenmiş.** Taban alanı açılıştaki Motor değerini gösteriyor. Soru %90'ı aştı, §2'ye göre sessiz izlemeye alınmalı. | Yerine daha keskin bir soru: "Fed 30 Haziran 2027'ye kadar ikinci bir artırım yapar mı?" A: RS-03 (döngü içindeki ikinci ve üçüncü artırım sıklığı). |
| `q-abd-resesyon` (%33) | "Motor %25", koşulsuz %15 + puanlar | **Taban doğru ama yarım, puanlar kalibre değil.** Ayrıca kapanış kriterinde yapısal bir yanlılık var. NBER resesyonu aylar sonra ilan eder. Mesela Aralık 2007 zirvesi Aralık 2008'de ilan edildi ([NBER](https://www.nber.org/research/business-cycle-dating)). 2027'nin ortasında başlayacak bir resesyon 8 Kasım 2027'ye kadar görünmeyebilir. Bu yüzden P(evet kapanış), P(resesyon) olasılığından düşüktür. | A: RS-06. B: RS-05 (petrol ≥%50, Fed artırıyor). B, A'dan belirgin biçimde yüksek çıkacaktır. Fark etiketlenmeli. Kriterdeki ilan gecikmesi ön-otopsiye yazılmalı. |
| `q-brent-110` (%54) | "Motor %78", OVX ile hesap | **Model, taban değil.** OVX 5 Kasım'dan kalma. Claude ayarı sınırda (−15). | A: RS-04 (şokun kaçıncı ayındayız, zirveden sonra 6 ay). B: Brent'in uzun dönem gerçekleşen oynaklığıyla dokunma sıklığı. OVX tabanından belirgin düşük çıkması beklenir. Fark >15 puan ise "belirsizlik yüksek". |
| `q-altin-4500` (%53) | "Motor %73", GVZ ile hesap | **Model, taban değil.** Çöküş sonrası GVZ yüksek. Uzun dönem oynaklıkla hesap Motor'dan belirgin düşük çıkar. | A: RS-15 (n = 3–4, "4 durumdan k'si" diye yazılır). B: 12 ayda ≥%16 yükseliş sıklığı, LBMA 1971–. |
| `q-nasdaq-25` (%31) | "Motor %54", açılış değeri | **Etiket yanlış.** Bugünkü Motor 36. Fark model değişikliğinden geliyor, haberden değil. Sürüklenmenin 0 alınması düşüş olasılığını şişirir. Kalın kuyrukları yok sayması ise küçültür. | A: RS-16, Nasdaq 1971– (zirveye %5–10 yakınken 12 ay içinde zirveden ≥%25 düşüş). B: S&P 1871– aynı ölçüt. |
| `nv-0`, `nv-2`, `nv-3` | "Taban %75 / %25 / %35" | **Kaynaksız.** Sınıf, n ve dönem yok. | `nv-3` için: BIS'in Çin'e çip kuralları 2022–2025 sıklığı ve yönetim değişikliği notu. `nv-2` için: Entity List'e Çinli aracı firma ekleme sıklığı. |
| `nv-4` (%47) | "Motor %44", SOX | Kabul edilebilir, ama tarihsel sınıf yok. | SOX 1994–, 7 haftada ≥%10 düşüş sıklığı. |
| `nv-1` (kapandı, oldu, %7) | "Taban %5" | **Yanlış sınıf** (bkz. §3). | Iska otopsisinde "taban yanlıştı" diye kaydedilmeli. |

**Genel hüküm.** Hiçbir Quant sorusu Anayasa §2'nin taban şartını karşılamıyor. Biri (`q-tr-tufe-30`) bugün karşılayabilir, çünkü verisi repoda duruyor. Dördünde etiket yanıltıcı: açılıştaki Motor değeri "taban" diye duruyor (`fed`, `brent`, `altin`, `nasdaq`). Yayın yeniden açılmadan önce her soruya en az bir belgeli sınıf (A ya da B) eklenmeli. Eklenemeyen soru `taban yok` etiketi almalı ve ayar sınırı yarıya inmeli (§3.3).

---

## (a) En önemli 5 önerim

1. **Taban alanını Motor'dan ayırın.** `taban` alanı yalnız referans sınıfını taşısın: k/n, sınıf kimliği, kaynak. Motor çıktısı `motor` alanında kalsın. Gerekçe: ilke 2 ve 3, §2.1-3.
2. **`data/quant/taban/` kütüphanesini kurun, ilk dalgada 6 sınıfla.** RS-09, RS-10, RS-11, RS-07, RS-04, RS-16. Bu altısı açık soruların tamamını kapsar ve ücretsiz verilerle kurulabilir (EVDS, IMF, EIA, Nasdaq). EVDS API anahtarı gerekiyor.
3. **İki sınıf kuralını A/B/C ve ön kayıtla uygulayın.** 15 puan fark → belirsizlik etiketi. n < 10 → büzme. Sınıf seçimi veriye bakmadan donar.
4. **"Yalnız taban"ı karneye dördüncü rakip olarak koyun.** Dış görünümün tek başına ne kadar iyi olduğunu ölçmeden, Motor ya da Claude ayarının değer kattığını iddia edemeyiz.
5. **Türkiye'yi karışım dağılımıyla modelleyin.** "Normal yıl" ve "rejim kırılması" iki ayrı bileşen. Kırılma payının kaba tabanı 2/14 (tahmin hatası verisi). 2-makroekonomi raporunun çeyreklik %8–10 sayımıyla tutarlı. İki tahminin uzlaştırılması karar konusu.

## (b) Çatışabileceğim noktalar

- **Nicel modelleme (rapor 1):** Opsiyon iması varsa ilk sıraya koymayı öneriyor. Ben piyasa imasının taban *sayılmamasını*, ayrı bir ayak olmasını istiyorum. Oynaklık şokun hemen ardından (altın, petrol) sistematik olarak şişkin olabilir.
- **Rapor 1'in "Motor yoksa Quant sorusu yoktur" kuralı:** Ben "taban yoksa ayar yarıya iner" kuralının yeterli olduğunu, bazı yapısal soruların (BIS kuralları, not geçişleri) tarihsel tabanla Motor'suz da açılabileceğini düşünüyorum.
- **Davranışsal finans ve ürün:** Tarihsel sıklık "geçmişte hep toparlandı" diye okunabilir. Bu, yön tavsiyesine yaklaşır (SPK). Benim çözümüm: liste görünür, kuyruklar görünür, yön cümlesi yok.
- **Kırmızı takım:** n = 3–4'lük sınıfları hiç yayınlamamayı önerebilir. Ben "4 durumdan 1'i" diye açık yazmanın sessizlikten daha dürüst olduğunu savunuyorum.

## (c) Karar vericiye sorular

1. `taban` alanı tarihsel sınıf ile sınırlansın mı? Açılıştaki Motor değerlerinin "taban" etiketi düzeltme kaydıyla değiştirilsin mi?
2. Kütüphaneye EVDS API anahtarı ve FRED erişimi açılacak mı? (Bu ortamda FRED engelli.)
3. Benzer ülke listesi (§2) onaylanıyor mu? Değişirse her değişiklik sürümlenecek mi?
4. Çarşamba Taban Oranı içeriği Quant yayını kapalıyken News'te mi çıksın, yoksa Quant açılana kadar arşive mi yazılsın?
5. `q-fed-artirim` sessiz izlemeye alınıp yerine ikinci artırım sorusu açılsın mı?

## (d) 90 günde başarı ölçüsü (tarih alanından)

| Ölçü | Hedef (17 Şubat 2027) |
|---|---|
| Belgeli tabanı olan açık Quant sorusu oranı (k/n + kaynak + epizot listesi) | %100. Olmayanlar `taban yok` etiketli. |
| En az iki sınıfı (A ve B) yazılı soru oranı | ≥ %80 |
| Kütüphanede doğrulanmış sınıf sayısı | ≥ 12 (ilk dalga 6) |
| "Yalnız taban" rakibinin karnede görünmesi | Her aylık karnede ayrı satır, n ve şans payıyla |
| Kapanan sorularda "taban yanlıştı" otopsisi | Her ıskada var. Oran raporlanır. |
| Taban Oranı arşiv içeriği | ≥ 10 yayın, her biri epizot listesiyle. Sonradan düzeltme oranı < %10. |

---

### Kaynaklar

- Laeven, L. ve Valencia, F. (2018). *Systemic Banking Crises Revisited*. IMF WP/18/206. https://www.imf.org/-/media/files/publications/wp/2018/wp18206.pdf.md
- Ari, A. ve ark. (2023). *One Hundred Inflation Shocks: Seven Stylized Facts*. IMF WP/23/190. https://www.imf.org/en/publications/wp/issues/2023/09/13/one-hundred-inflation-shocks-seven-stylized-facts-539159
- Reinhart, C. ve Rogoff, K. *This Time Is Different*, veri dosyaları: https://rogoff.scholars.harvard.edu/time-different%E2%80%94data-files ; kriz tanımları: https://mpra.ub.uni-muenchen.de/21485/1/MPRA_paper_21485.pdf
- Ilzetzki, Reinhart, Rogoff, kur rejimi sınıflaması: https://carmenreinhart.com/exchange-rate/
- Jordà–Schularick–Taylor Makrotarih Veritabanı: https://www.nber.org/research/data/jorda-schularick-taylor-macrohistory
- Hamilton, J. (2011). *Historical Oil Shocks*. NBER w16790: https://www.nber.org/papers/w16790 ; özet: https://www.nber.org/reporter/2011number2/oil-price-shocks
- Federal Reserve (2023). *U.S. Interest Rates and Emerging Market Currencies: Taking Stock 10 Years After the Taper Tantrum*: https://www.federalreserve.gov/econres/notes/feds-notes/u-s-interest-rates-and-emerging-market-currencies-taking-stock-10-years-after-the-taper-tantrum-20231004.html
- Goetzmann, W. *Stock Markets, Behavior, and the Limits of History*, NBER Reporter 2000: https://www.nber.org/reporter/summer-2000/stock-markets-behavior-and-limits-history
- Flyvbjerg, B. (2006). *From Nobel Prize to Project Management*: https://risknet.de/fileadmin/eLibrary/Flyvbjerg-Nobel-PMJ2006.pdf
- NBER iş çevrimi tarihleme: https://www.nber.org/research/business-cycle-dating
- Türkiye: Ekonomi Gazetesi (2001 programı): https://www.ekonomigazetesi.com/kose-yazisi/turkiye-bunu-daha-once-basarmisti-79267 ; BSI Economics (2018): https://bsi-economics.org/a-look-back-at-the-turkish-lira-crisis-note/ ; Gulf News (2021): https://gulfnews.com/business/banking/turkeys-lira-logs-worst-year-in-two-decades-1.84692293 ; BNN Bloomberg (Mart 2021): https://www.bnnbloomberg.ca/turkish-markets-slide-as-agbal-s-exit-stokes-lira-turmoil-1.1580419 ; CNBC-e (Mayıs 2024 TÜFE): https://www.cnbce.com/piyasalar/enflasyon-mayis-2024-tuik-h331 ; Milliyet Uzmanpara (1994): https://uzmanpara.milliyet.com.tr/haber-detay/gundem2/5-nisan-1994te-ne-olmustu/1000/590/
- Repo: `data/quant/tcmb-tahmin-hata.json`, `data/sorular.json`, `quant/motor.py`.
