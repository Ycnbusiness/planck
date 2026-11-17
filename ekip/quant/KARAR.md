# KARAR · Planck Quant v2 Yöntemi (Denetim ve Hüküm)

*Denetçi ve karar verici: Claude · 17.11.2026 · Girdi: 15 uzman raporu, BRIEF, Anayasa v2, QUANT.md, TARAMA.md, ekip/KARAR.md (16.11), EDITOR, PILOT, sicil, `quant.json`, `motor.py`. Bu belge öneridir; hiçbir kural, veri ya da sicil dosyasına dokunulmadı.*

## Karar özeti

1. **Quant piyasayı yenme iddiası kurmaz.** İddiası: piyasanın ve kurumların ne beklediğini doğru çevirmek, mekanizmayı göstermek, kendi sayısının hesabını vermek. Birincil okuru tasarruf eden hanedir.
2. **Üç katman ve bir yan ürün:** Ne Olur? (mekanizma zinciri) · Piyasa Ne Fiyatlıyor? (çeviri) · Planck'in sayısı (dar) · Hesap Kartı (olasılıksız aritmetik).
3. **Planck sayısı yalnız şu sorularda çıkar:** en çok 90 gün, açılışta %15–85, kayıtlı Motor şablonu ve önceden yazılmış bir doğal rakip.
4. **Motor şablon kütüphanesidir.** Parametreyi soru değil, soru türü seçer. Risk primi düzeltmesi Motor'un içindedir, Claude ayarında değil.
5. **Claude önce kör tahmin yazar,** sonra Motor açılır. Ayar dardır (±5); toplam sapma Motor'dan en çok ±10 puan.
6. **Ortak havuz, tek kayıt, iki vitrin.** Ekonomi sorularının Motor'u Quant masasındadır; soru sicilde bir kez durur, News ve Quant aynı sayıyı gösterir. 16.11 kararı pilot sonuna kadar aynen geçerli; revizyon açılışla başlar.
7. **İlk 90 gün kapalı soru sınıfları:** TL kuru, gram altın, BIST ve sektör endeksi eşikleri, kripto fiyatı. **Kalıcı yasak:** tekil banka ve "panik olayı" soruları.
8. **Tek kayıt kaynağı sicildir.** `quant.json` ondan türetilir. Veri API'den, ham haliyle ve özetiyle (hash) saklanır; her soru ön kayıtla kilitlenir.
9. **Denetimin dört dış hakemi var:** gerçeklik, piyasa, kod, ön kayıt. Yusuf'un payı haftada en çok 60 dakika.
10. **Eylem satırı Quant'ta yalnız bilgi eylemidir.** Açılış Sinyali ve fiyat FLAŞ'ı kalkar. Çıkar beyanı ve yeni künye açılış şartıdır.
11. **Web arşivi açılış ön koşuludur.** Instagram vitrindir. X ve bülten ilk 90 günde açılmaz; gün içi olasılık botu hiç açılmaz.
12. **Karne beş sütunludur:** %50 · doğal rakip · Motor · kör Claude · Planck. "Beceri" sözcüğü 100 kapanıştan önce kullanılmaz.
13. **Açılış 4–10 Ocak 2027 haftasına ertelendi.** Aralık "sessiz prova"dır: sorular kaydedilir ve puanlanır, yayın yapılmaz.
14. **Hemen:** Fed sorusu sessiz izlemeye; motorin-90'a düzeltme kaydı; 16.11 `quant.json` sayıları geçersiz taslak.

---

## 1. Denetim

### 1.1 Kendim doğruladığım iddialar

| # | İddia (rapor) | Hüküm |
|---|---|---|
| 1 | Sicil ile `quant.json` ayrışmış (R1, R7, R10, R15) | **Doğru, 5 soruda** (TÜFE 52/40, kur 46/55, Brent 54/60, altın 53/45, Nasdaq 31/34). R1 dört, R15 üç soru sayıyor; eksik. |
| 2 | Brier 0,51'in kaynağı tek soru (R1, R7, R8) | **Doğru.** (0,16 + 0,865) / 2 = 0,512. Motor'lu tek kapanışta Planck 0,16, Motor 0,185. |
| 3 | Ayar 8 sorunun 7'sinde eksi, ortalama −6,6 (R8, R15) | **Doğru.** |
| 4 | 15 Şubat'a kadar yalnız 4 Quant sorusu kapanır; 5'i 8.11.2027'de (R8) | **Doğru.** |
| 5 | OVX bayat; FRED'de 12 Kasım 51,72 (R7) | **Doğru.** [FRED OVXCLS](https://fred.stlouisfed.org/series/OVXCLS). Motor günlüğü Brent için "hesaplanmadı" derken `quant.json` 75 yazıyor. |
| 6 | Motor duyarlılıkları (R1, R7, R10, R11) | **Doğru; yeniden hesapladım.** Brent: σ %60 → 75; güncel OVX → 70; günlük kapanış düzeltmesiyle 66; σ %35 → 54. Altın: σ %20 → 46. Kur: anket 57 alınırsa 65 → 41. |
| 7 | Motorin ÖTV takvimi (R9, R11) | **Doğru.** 11606 sayılı Karar, 13.08.2026 tarihli 33339 sayılı Resmî Gazete: Kasım 9, Aralık 12, 1 Ocak 2027'den itibaren 13,9006 TL ([PwC bülteni](https://www.pwc.com.tr/tr/hizmetlerimiz/vergi/dolayli-vergi/bultenler/kdv-otv-bultenleri/2026/motorinde-otv-indirimi.html)). Pompaya etkisi KDV dahil +5,88 TL. |
| 8 | Polymarket Türkiye'de erişime kapalı (R1, R5) | **Doğru.** Milli Piyango İdaresi, 16.07.2026, karar 2026/10 ([Webtekno](https://www.webtekno.com/polymarket-erisim-engeli-h220708.html)). |
| 9 | Bankacılık Kanunu md. 74 ve 158 (R12) | **Doğru** (1–3 yıl hapis, 1.000–2.000 gün, zararda altıda bir artırım). Kaynak ikincil: [Hukuki Haber](https://www.hukukihaber.net/sirket-itibarin-korunmasi-amaciyla-6361-sayili-kanuna-eklenecek-madde/amp). Resmi metin açılamadı. |
| 10 | III-37.1 md. 45/2, 73/3, 78, 79, Ek/3 (R8) | **Doğru.** Md. 73/3'ün muhatapları sayılı: yatırım kuruluşları, portföy yönetim şirketleri, 6112 kapsamındaki medya hizmet sağlayıcıları, 5187 kapsamında süreli yayın yapanlar ([Tebliğ](https://alomaliye.com/2013/07/11/yatirim-hizmetleri-ve-faaliyetleri-ile-yan-hizmetlere-iliskin-esaslar-hakkinda-teblig-iii-37-1/)). |
| 11 | SPKn md. 107/2 kast ve menfaat arar; VI-104.1 md. 6/4 beş iş günü içinde ters işlemi yasaklar (R4, R5, R8) | **Doğru** ([SPK](https://spk.gov.tr/yatirimcilar/sermaye-piyasasinda-piyasa-dolandiriciligi-manipulasyon/bilgi-bazli-piyasa-dolandiriciligi); [hukukcularevi](https://hukukcularevi.com/piyasa-bozucu-eylemler-vi-104-1-sosyal-medya-hesap-kullandirma/), ikincil). |
| 12 | TCMB tahmin hatası istatistikleri (R1, R2, R13) | **Doğru.** 2021 hariç ortalama −0,01, mutlak hata 1,17; 14 yılın 8'inde gerçekleşen tahmini yarım puandan fazla aşmadı. |
| 13 | Örneklem hesapları (R8) | **Doğru.** Kendi simülasyonum: %50'ye karşı anlamlılık için 114 kapanış (R8: 108); 30 kapanışta Brier ±0,062. Piyasaya karşı "2.100" ve "7.500+" varsayıma bağlı; doğrulanmadı. |
| 14 | FOMC kışın TSİ 22:00 (R2) | **Doğru.** 16.11 taslağının takvimi 9 Aralık için 21:00 yazıyor: hata. |

### 1.2 Yanlış, abartılı ya da kaynaksız iddialar

1. **R9 ve R11 · "motorin-90'ın düzeltilmiş Motor'u %3–10 / tek hane."** Hata tespiti doğru, yeni sayı fazla düşük ve fazla kesin. İki rapor da gereken düşüşü Brent'e bire bir çeviriyor (96'dan 60'a, −%37). Oysa pompa fiyatından geriye gidince vergi dışı ürün bedeli yaklaşık 62 TL/litre, yani varil başına 190–200 dolar çıkıyor (benim çıkarımım; gözlem değil, marj varsayımına bağlı). Bu tabanda gereken düşüş %15–18'dir; σ %35–60 ile olasılık **%11–24** çıkar. "Sessiz izlemeye geçer" hükmü doğrulanmadı.
2. **R13 · "Kırılma payı 2/14, R2'nin çeyreklik %8–10'uyla tutarlı."** Tutarlı değil. 2/14 yılda %14, çeyrekte yaklaşık %3,7 eder. Fark iki-üç kat; iki rapor farklı olayları sayıyor.
3. **R1 · "Beş soru da aynı ABD makro etkenine bağlı."** Abartı: biri Dolar/TL.
4. **R8 · "Ek/3 uyarı notu tam metin girmeli" (zorunluluk gibi).** Md. 73/3'ün muhatapları sayılı; bir Instagram hesabı bunlardan değil. planck.news düzenli haber sitesi olursa (5187) kapsama girebilir. Hüküm: gönüllü uyum; zorunluluk sorusu avukata.
5. **R5 · md. 107/2 için "3–5 yıl" ve izinsiz faaliyet için "md. 109/2".** Doğrulanamadı.
6. **R10 · Akademik künyelerin çoğu bellekten** (yazar belirtmiş). Süreklilik düzeltmesinin DOI'si raporlar arasında tutarsız. R10 "Mayıs 2026 şoku", R2 "Mart 2026 şoku" diyor; biri yanlış.
7. **R1 ve R8 · ForecastBench "0,994 korelasyon" ve "kopyacı çizgisi".** Kaynak blog ve forum; açılmadı. Karar buna dayandırılmadı.
8. **R4 · Rejim katmanına "USD/TRY örtük oynaklık" girdisi.** R1 ve R10'a göre kamuya açık kaynağı yok; uygulanamaz.
9. **R12'nin fon krizi bağlamı** tek ansiklopedi özetine dayanıyor; **R6'nın platform payları ve hedef eşikleri** ile **R3'ün 2026 Türkiye verileri** ikincil ya da yazarın yargısı.

**Açılamayan kaynaklar:** resmi mevzuat metinleri, EVDS, ForecastBench, R10'un akademik listesi. Bunlara dayanan iddialar taşıyıcı yapılmadı.

### 1.3 Denetçinin kendi bulguları (raporlarda yok)

- **Dolar/TL Motoru oynaklığa duyarsız.** σ %5 de %10 da 65 veriyor. "Model" fiilen tek soruya iniyor: anket beklentisi 60'ın üstünde mi? Sorun oynaklık değil, sürüklenmenin anketten alınması.
- **TÜFE Motoru da tahmin hatası varsayımına duyarsız.** sd 0,4 ile 1,0 arasında sonuç 47–49. Eşik anket medyanına yapışık; Motor fiilen yazı-tura, yayın sayısını −8'lik ayar belirliyor.
- **Belgeler çelişiyor.** Ayar sınırı QUANT.md'de ±20, Anayasa ve `motor.py`'de ±15. QUANT.md hâlâ "otomatik yayın"ı anlatıyor; Anayasa §7 onay istiyor.
- **16.11 haftalık taslağı** sicilde olmayan sayılar taşıyor. `yayin-log.json`'da Quant kaydı yok; taslak yayınlanmamış sayıldı. 9–12 Kasım Quant kartlarının yayınlanıp yayınlanmadığı kayıttan anlaşılmıyor.

### 1.4 Ortak bulgular ve güven düzeyi

| Bulgu | Bağımsız varan raporlar | Güven |
|---|---|---|
| Sicil ile `quant.json` ayrışması; tek kayıt kaynağı gerek | 1, 7, 10, 15 | Çok yüksek (depodan) |
| Girdi ile kriter uyuşmuyor: WTI oynaklığı–Brent sorusu, 30 günlük endeks–12 aylık soru, sürekli izleme–günlük kapanış, vadeli fiyat–LBMA; girdiler bayat | 1, 7, 10, 11, 15 | Çok yüksek |
| Risk-nötr olasılık gerçek olasılık değildir; eksi ayarların çoğu Motor tamiridir; düzeltme Motor'a taşınmalı | 1, 3, 10, 11, 15 | Yüksek (yön kesin; katsayı henüz yok) |
| Fed sorusu %97'de, sessiz izlemede olmalı | 1, 2, 3, 6, 7, 8, 10, 13, 15 | Çok yüksek |
| 12 aylık eşikler karneyi beslemez | 1, 2, 8, 10, 11, 13 | Çok yüksek |
| motorin-90 Motor'u bilinen ÖTV adımını saymamış | 9, 11 | Hata: çok yüksek · Yeni sayı: düşük |
| Dolar/TL için lognormal model yanlış sınıf; TCMB Motoru oy sayımı | 1, 2, 4, 7, 10, 13 | Yüksek |
| `taban` alanı referans sınıfı taşımıyor; `mercekler` boş | 7, 13 | Çok yüksek (depodan) |
| Eylem satırı yön içeremez; Açılış Sinyali ve fiyat FLAŞ'ı kalkmalı | 3, 5, 8, 12 | Yüksek |
| Tekil banka hakkında olasılık yok | 4, 5, 12 | Çok yüksek |
| Çıkar beyanı (5, 6, 8, 14) ve açılıştan önce avukat görüşü | 2, 3, 5, 8, 10, 12, 14 | Çok yüksek |
| `nv-1`: Motor'suz kişi sorusu, yanlış referans sınıfı | 1, 7, 8, 13 | Çok yüksek |

### 1.5 Çelişkiler ve hüküm

| Çelişki | Hüküm ve gerekçe |
|---|---|
| **Tahmin piyasası:** R1 çapraz kontrol; R7 Motor girdisi; R5 "görünmez"; R15 hakem | **Yalnız iç çapraz kontrol; kartta adı, oranı, bağlantısı yok.** Polymarket hiç kullanılmaz: erişim engeli olan bir sitenin verisini açık depoda taşımak gereksiz risk. Piyasa hakemi vadeli faiz ve opsiyondur. |
| **News/Quant sınırı:** 16.11 kararı; R2, R9, R11, R12 Motor'u Quant'ta ister | **Ortak havuz, tek kayıt, iki vitrin** (§2.4). 16.11 ayrımı Quant'a en az katkı yapabildiği ve hukuken en riskli soruları bırakıyordu. |
| **Anket:** KARAR §2.8 yasak; R2 enflasyon anketi ister; R3 kavram anketi; R14 kimlik anketi | **Fiyat ve yön anketi kalıcı yasak. Kavram ve algı ölçüm anketi serbest** ("%55 ne demek?"). Enflasyon tahmin anketi News vitrininde yapılır. Anonim kimlik anketi Yusuf onayıyla. |
| **Eylem satırı:** Anayasa ilke 9; R5 yalnız bilgi; R3 "planlama"; R14 kümeye özel cümle | **Yalnız bilgi eylemi:** izlenecek gösterge ve tarih, kural ve takvim, "kendi hesabını yap". Kümeye özel cümle ("Maaşın TL ise…") avukat görüşüne kadar yok: "benzer profildeki grup" ölçütüne yaklaşıyor. |
| **Platform önceliği:** R6 web ve bülten önce, X birlikte; STRATEJI X hafta 10, bülten hafta 11; R5 bot riski | **Web arşivi ön koşul → Instagram vitrin → ikinci ayda tek Planck bülteni → X 90 günden sonra.** Tek kişilik operasyonda dört kanalı birden açmak hata üretir. |
| **Olasılıksız Quant** (R8 İtiraz 7) | **Reddedildi; oran değişti.** Puanlanmayan anlatı §0'ı düşürür. Ana ürün mekanizma olur, Planck sayısı daralır. R8'in yarı yarıya denemesi "gözlem" olarak yapılır; örneklem hükme yetmez. |
| **Ayar sınırı:** Anayasa ±15; R1, R8 ±5; R10 log-odds ±0,6; R12 ±10; R15 kör tahmin + ±5 | **§2.3.** Kurucunun "hesap makinesi olmasın" isteği korunur: yargı kör tahminde ve mekanizmada yaşar, değeri ölçülür. |
| **Motor'suz soru:** R1 yasak; R13 taban yeter | Belgeli taban oranı (k/n, epizot listesiyle) bir Motor şablonudur (Anayasa §3.3b). Kayıtlı şablonu olmayan soru açılmaz. |
| **Türkiye varlıkları:** R1 havuzun ≥%40'ı; R8 pilotta kapalı; R14 2018 davası; R11 gram altını savunur | **İlk 90 gün kapalı.** Model hazır değil, veri terminalde, okur bunu işlem sinyali diye okur, R14'ün aktardığı emsal dava dört yıl sürmüş (kaynağını açmadım). Türkiye'deki katma değer kural ve karar fiyatlarındadır (R9, R12). |
| **Dağılım:** R1 beş kuantil yayınlansın; R2 içeride dağılım dışarıda eşik; R6 eşik merdiveni | **R2.** Dağılım sicilde durur ve iç puanlanır. Varlık fiyatında merdiven yayınlanmaz (hedef fiyat aralığı gibi okunur). |
| **Dokunma mı, vade sonu mu:** R11 vade sonu; R10 hangisi olduğu yazılsın | **Varsayılan vade sonu** ("o gün üstünde mi"). Dokunma yalnız çift eşikte, günlük kapanış düzeltmesiyle. |
| **"Piyasa %X · biz %Y" yan yana:** R6, R10, R15 göster; R1, R3 örtük pozisyon önerisi | **Varlık fiyatında tek kartta iki sayı yok;** ikisi yalnız web'de ve karnede yan yanadır. **Makro veride** (resmi veri · piyasa anketi · hane anketi · Planck) yan yana serbest (R14). |
| **Kriz anı:** R5, R8 sayı yok; R14 susmak "saklıyorlar" diye okunur | **Susmak yok, sayı da yok.** Aynı gün olgu Story'si ve "Sayılar kapanıştan sonra güncellenir; izlenecek gösterge şu" satırı. Güncelleme ertesi sabah, onayla. Banka söylentisinde 72 saat sessizlik (R12). |
| **İnsan onayı:** Anayasa §7 her yayın; R15 ön kayıt + istisna | **İlk sekiz hafta her yayın onaylı,** haftada iki toplu oturum. Sonra istisna modeline geçiş Yusuf'un kararı. Künye hangisi geçerliyse onu yazar. |
| **Rejim kırılma payı:** R2 çeyrekte %8–10; R13 yılda 2/14; R10 12 ayda %10–15 | **90 günlük sorularda başlangıç %5,** "sayım, n küçük" etiketiyle. R2'nin sayımı savunulan atakları da kırılma sayıyor. |
| **Dış denetçi:** R15 farklı model ailesi; Anayasa §7 | **Üretimde yalnız Claude; çeyreklik dış göz insan uzman** (soru 9). |

### 1.6 Uzman varsayımları ve kurucunun hedefi

- **"CERN kafası."** R7 ve R15 doğru okudu: ön kayıt, kör analiz, yeniden üretim, hata defteri. Alınacak şey denetimin çokluğu değil, **bağımsızlığıdır**; dördüncü bir Claude okuması ilk üçün gördüğünü görür.
- **"Arşivde değer."** R6 web adresine bağladı, R8 ölçülmesini istedi; ikisi de kabul.
- **"Sıkıcı hoca olmamak."** En büyük risk raporların toplamıdır: 20 referans sınıfı, 15 kanal, 13 test, beş kuantil birlikte kurucunun korktuğu şeyi üretir. İlk dalga bu yüzden küçük. Heyecan mekanizmada aranır (R8).
- **"Kandırmamak."** Üç karşılık: zincirin birleşik olasılığı yazılır (üç halka %70 ise sonu %34); varlık kartında "bu sayı büyük ölçüde bugünkü fiyattan türer" satırı durur; karne satırı sayıdan önce gelir.

---

## 2. Karar: Quant v2 yöntemi

### 2.1 Kimlik ve iddia

Quant, Planck'in ekonomi ve finans masasıdır. **İddiası:** belirsiz bir ekonomik olayda okura dört şeyi verir: ne bekleniyor (piyasa ve anket), neden (mekanizma), biz ne diyoruz (dar, puanlanan sayı), geçen sefer ne demiştik (karne). **İddia etmediği:** piyasadan iyi tahmin, fiyat yönü, erken bilgi. Slogan "Yorum değil, hesap" kalır; "hesap" üçüncü bir anlam kazanır: okurun kendi hesabını yapabilmesi.

### 2.2 Ürün katmanları

| Katman | Ne | Sayı kimin | Puanlanır mı |
|---|---|---|---|
| **1 · Ne Olur?** | Olaydan cüzdana zincir: aktör → kurum → piyasa → hane. Her halka aktarım haritasındaki bir kenardan geçer. Zincirin birleşik olasılığı ve "karşı hikâye" kutusu zorunlu. | Planck (soru olan halkalarda) | Evet |
| **2 · Piyasa Ne Fiyatlıyor?** | Vadeli faiz, opsiyon, anket beklentisinin Türkçe ve "100'de X" çevirisi. Kaynak adıyla. "Bu bir tahmin değil, fiyattır" satırı. | Piyasanın | Karnede rakip sütunu olarak |
| **3 · Planck'in sayısı** | §2.4 koşullarını sağlayan sorular. Kartta: karne satırı, soru, son tarih, %X · 100'de X, ters taraf (her kartta), Motor ayrı. | Planck | Evet, beş sütunla |
| **Yan ürün · Hesap Kartı** | Olasılıksız aritmetik: girdi okurda, parametre resmi kaynaktan, çıktı sayı ve duyarlılık. Kira tavanı, ÖTV takvimi, doğal gaz kademesi, kart faizi. | — | Hayır |

İlişki: Katman 1 soruları doğurur; Katman 2 her sorunun rakibini verir; Katman 3 yalnız fark yaratabildiğimiz yerde konuşur. Hesap Kartı olasılık olmadığı için ilke 1'den muaftır; künyesinde "Bu bir hesaptır; olasılık ya da tavsiye değildir" yazar.

### 2.3 Motor mimarisi

**Şablonlar (ilk dalga beş tane; her biri kod, sürüm numarası ve ön kayıtla):**

| Şablon | Soru türü | Hesap | Doğal rakip |
|---|---|---|---|
| **V · Veri sürprizi** | TÜFE, istihdam, emekli zammı eşiği | Anket medyanı ± ampirik tahmin hatası dağılımı (ilk yayım verisinden) | Anket konsensüsü |
| **K · Kurum kararı** | PPK, FOMC, ECB; tarife, asgari ücret | Piyasa fiyatlı ise vadeli faiz; değilse anket yönü × tarihsel isabet ya da taban oranı (k/n) | Ham piyasa ya da taban |
| **E · Eşik** | Brent, TTF gibi küresel fiyatlar | Vade sonu lognormal; σ ufka uygun, yoksa gerçekleşen ile örtük oynaklığın harmanı; sürüklenme vadeli eğriden; dokunmada günlük kapanış düzeltmesi; T son tarihten hesaplanır | Ham piyasa (risk-nötr) |
| **A · Aktarım** | Pompa fiyatı | Ürün fiyatı (ICE gasoil vekili) × kur + **takvim katmanı** (ÖTV, KDV) + marj; önce takvim, sonra dağılım | Son fiyat |
| **S · Kalıcı seri** | Takip oranı, çek, kart faizi | Son değer + geçmiş k-haftalık değişimlerin ampirik dağılımı | Son değer (rastgele yürüyüş) |

**Kurallar:**

1. **Parametre kuralla seçilir.** Kural dışı her seçim sicilde gerekçeli `sapma` kaydıdır ve Hakem sayar.
2. **Risk-nötr düzeltmesi iki sayı bırakır:** `motor_rn` (ham piyasa) ve `motor` (düzeltilmiş). Katsayı geçmiş veriden hesaplanana kadar yalnız kesin bilinen düzeltmeler uygulanır (enstrüman eşleşmesi, ufuk, günlük kapanış); oynaklık primi için katsayı uydurulmaz.
3. **Takvim katmanı zorunlu.** Vergi, tarife ya da kademe içeren her soruda `takvim` alanı Resmî Gazete bağlantısıyla dolar; boşsa soru açılmaz.
4. **Tazelik.** Piyasa girdisi 2 iş gününden, anket 35 günden eskiyse şablon sonuç vermez; kart "hesaplanamadı" der (ilke 7).
5. **Rejim katmanı ilk dalgada yalnız kayıt tutar.** Etiket ve tetikleyiciler önceden yazılır; 90 gün Motor'u oynatmaz, yayınlanmaz. Tek istisna: 90 günlük Türkiye sorularında %5 kırılma karışımı. Gerekçe: katmanlar sınanmamış.
6. **Kör Claude ve uzlaştırma.** Sıra: şablon kilidi → kör tahmin (`p_kor`, Motor'u görmeden, sicile yazılır) → Motor açılır → ikisinin log-odds ortalaması → Claude en çok ±5 puan oynatır, tek cümle gerekçeyle.
7. **Ayar sınırları.** Yayın sayısı Motor'dan en çok ±10 puan ve log-odds ±0,6 uzaklaşır (hangisi darsa). Piyasa fiyatlı likit sorularda (Fed, Brent) yayın = düzeltilmiş Motor; ayar yalnız kapanıştan sonra gelen, iki kaynaklı bir olayla ve ±5. Taban yoksa ±5. "Eğilim aşağı" türü gerekçe yasak.
8. **Kör nokta yasası.** Aynı yönde art arda beş ayar Motor hatası şüphesidir; düzeltme şablonda yapılır.
9. **Taban oranı kütüphanesi** (`data/quant/taban/`): k/n, epizot listesi, rejim notu; sınıf sorudan önce donar. `taban` alanı yalnız bunu taşır. İlk dalga üç sınıf: TCMB tahmin hatası (veri hazır), PPK kararı ile anket, Ocak etkisi.
10. **Aktarım haritası** (`data/quant/harita.json`): ilk sürüm sekiz kenar (kur→TÜFE, Brent→pompa, Brent→TÜFE, TÜFE→kira tavanı, TÜFE→emekli zammı, politika faizi→mevduat ve kart faizi, ÖTV→pompa, Fed→risk primi). Her kenar: işaret, gecikme, esneklik aralığı, kaynak. Haritada olmayan halka "yeni kenar" etiketi alır.
11. **Üç geçiş** sürer ama kartta "üç ayrı hesabın aralığı" denir; "bağımsız" denmez (R15).

### 2.4 Soru havuzu

**Ortak havuz kuralı.** Sicilde `kanal` yerine `aile` ve `vitrin` alanları. Soru bir kez kaydedilir, bir kez puanlanır. **Olayla gelen News vitrininde, takvimle gelen Quant vitrininde çıkar;** aynı soru ikisinde de görünebilir, sayı aynıdır. Karne aile bazında satır açar. Varlık fiyatı eşikleri yalnız Quant'ta kalır.

| Aile | Örnek | Vitrin | Durum |
|---|---|---|---|
| Makro veri ve kurum kararı | TÜFE, PPK, FOMC, ECB | İkisi | Açık (pilot boyunca News) |
| Cüzdan fiyatları | Motorin 7–14 gün, tarife, asgari ücret, emekli zammı | İkisi; Hesap Kartı Quant | Açık; akaryakıt, pompa kaydı başladıktan sonra |
| Finansal sistem verisi | Takip oranı, çek, kart azami faizi | Quant | Açık |
| Küresel enerji | Brent (vade sonu ve çift eşik), ABD stokları | Quant | Açık |
| Küresel kurum çıktıları | FOMC karşı oy sayısı, tarife kararı (Federal Register) | Quant | İkinci dalga |
| Ons altın çift eşik | 3.500 / 4.300 dolar, gram çevirisiyle | Quant | Avukat görüşü ve algı ölçümünden sonra |
| TL kuru, gram altın, BIST, sektör endeksi, kripto fiyatı | — | — | **90 gün kapalı** |
| Rezerv, CDS eşiği | — | — | Avukat sonrası, Yusuf onayıyla |
| Tekil banka, panik olayı, kişi, dava, seçim | — | — | **Kalıcı yasak** |

**Kurallar.** Yeni soruların tamamı ≤90 gün; en az üçte biri ≤30 gün (varlık eşikleri 60–90 gün). Açılışta %15–85. **Eşik:** önce yasal ya da kurumsal anlamı olan, sonra konsensüs eşiği; fiyat sorusu tek yönlü açılmaz (çift eşik). **Sürekli değişken:** dağılım sicilde, kartta ondan türetilen eşik. **Koşullu çift:** en çok beş açık; koşul §9'a takılamaz; gerçekleşmeyen dal ayrı sayılır; koşulsuz sayı her zaman puanlanır. Aynı girdiye bağlı sorular karnede tek kümedir. Takvimli veri sorusu açıklamadan en az bir iş günü önce kilitlenir. **Kapanış:** ilk resmi yayım; 7 günlük hata düzeltme penceresi; 14 gün yayımlanmazsa iptal.

**Mevcut sekiz soru:**

| Soru | Hüküm |
|---|---|
| `q-tcmb-aralik` (%62) | **Kalır.** Karar günü (10 Aralık) kapatılır. Motor oy sayımı ve 4 Kasım'dan: "Motor bayat" notu; yeni şablon (K) hazır olunca düzeltme kaydı. |
| `q-tr-tufe-30` (sicil %52) | **Kalır.** Sicildeki sayı geçerli; ilk taze veriyle normal güncelleme. Frekans cümlesi bugün yazılabilir (14 yılın 8'i). |
| `q-usdtry-60` (sicil %46) | **Sessiz izleme.** Yerine soru açılmaz. Model sınıfı notu düşülür; düzeltme, rejim modeli sınandıktan sonra. |
| `q-fed-artirim` (%97) | **Hemen sessiz izleme** (Anayasa §2). Yerine açılışta "27 Ocak FOMC'de artırım olur mu?" türü ≤90 gün soru. |
| `q-abd-resesyon` (%33) | **Sessiz izleme.** Kriter değiştirilmez; "ilan gecikmesi nedeniyle hayıra eğilimli" notu düşülür. Puan tablosu kalibre değil: "taban yok" etiketi. |
| `q-brent-110` (sicil %54) | **Sessiz izleme + düzeltme kaydı** (bayat ve yanlış enstrüman oynaklığı, sürekli izleme varsayımı). Eski sayı görünür ve puanlanır. Yerine 90 günlük vade sonu ve çift eşik. |
| `q-altin-4500` (sicil %53) | **Sessiz izleme + düzeltme kaydı** (vadeli fiyat–LBMA uyumsuzluğu, bayat GVZ). "Eğilim aşağı" gerekçeli ayar bir daha kullanılmaz. |
| `q-nasdaq-25` (sicil %31) | **Sessiz izleme; iptal değil.** Kriter hesaplanabilir (koşan zirve); Hakem yorum notu düşer. Motor'un zirve girdisi doğrulanana kadar "hesaplanamadı". |

`nv-0`, `nv-2`, `nv-3`, `nv-4`: sessiz izleme; içerik üretmez. `nv-4`'ün boş `motor` alanı göç hatasıdır, düzeltme kaydıyla 44 yazılır. `nv-1`: otopsi ("taban yanlıştı; Motor'suz kişi sorusu").

### 2.5 Kırmızı çizgiler ve dil

- **SPK:** al, sat, tut, hedef fiyat, yön yok. "Piyasa yanlış fiyatlıyor" denmez; "hesabımız X puan farklı, nedeni şu" denir. Tekil hisse yok; sektör içeriği "maruziyet dili"yle (kanal, büyüklük, hız, yükü kim taşır) yazılır.
- **Bankacılık (Anayasa §9'a eklenmeli):** adı geçen banka ya da finans kuruluşu hakkında olasılık, senaryo, zincir yok; üç ya da daha az kuruluşluk grup tekil sayılır. Panik olayı sorusu yok. Sistem oranları serbest; her gösterge tarihsel bandıyla verilir. Nominal TL tutar manşet olmaz.
- **Kur ve altın:** soru yok (90 gün). Açıklamada aritmetik çeviri serbest ("gram = ons × kur / 31,1").
- **Kripto:** fiyat sorusu, token ve borsa adı yok.
- **Siyaset:** siyasi olay olasılığın ne konusu ne koşulu olur; yalnız kurum ve veri çıktısı.
- **Zamanlama:** olasılık güncellemesi BIST seansı dışında ya da resmi veri açıklandıktan sonra. Varlık eşikleri haftada bir güncellenir.
- **Künye (Quant):**
  > **Yatırım tavsiyesi değildir.** Kişiye özel değildir. Olasılıklar yanılabilir; karnemiz açıktır: planck.news/karne.
  > Hesap: Motor (kurallı; yöntem açık) · Yargı: Claude (Anthropic'in yapay zekâ modeli). Planck, Anthropic'ten bağımsızdır.
  > İnsan: Kuralları yazar; bu gönderi yayın öncesi insan onayından geçti. Veri: [tarih, saat].
  > Çıkar beyanı: planck.news/beyan · Planck reklam, sponsorluk ya da aracı kurum geliri almaz. Kaynaklar: … · Soru kaydı: …
  ("Fon almıyoruz" finans kanalında "yatırım fonu" diye okunabilir.)
- **Çıkar beyanı:** Yusuf, birinci derece yakınları ve Planck'e iş yapanlar. Açık soru konusu varlıkta yayından beş iş günü önce ve sonra işlem yok; kaldıraçlı ve türev pozisyon hiç yok. Uzun vadeli birikim, tutar yazılmadan türüyle, üç ayda bir beyan edilir. Aracı kurum, banka ve kripto borsası sponsorluğu kalıcı yasak.
- **Yasaklı sözlük (QUANT.md'ye ek, otomatik taranır):** sinyal, fırsat, kaçırma, şimdi, hedef, destek/direnç, uçtu, fırladı, patladı, çöktü, eridi, kriz, batık, panik, alarm, güvenli liman, garanti, akıllı para, gerçek enflasyon, faiz lobisi, borç batağı; "rekor" yalnız dolar ya da reel bazda. **Serbest kalıplar:** "X'ten Y'ye çıktı (+%Z)", "piyasa … fiyatlıyor", "bu sayı bir tahmin değil, fiyattır", "Dedik %X · Oldu / Olmadı", "izlenecek gösterge: …".

### 2.6 Denetim mimarisi ve Yusuf'un rolü

| Katman | Ne zaman | Kim |
|---|---|---|
| K0 · Ön kayıt: soru, kriter, kaynak, şablon, doğal rakip; kâhin testi ve model–kriter uyum testi | Açılışta | Tahmin masası + **Yusuf, soru başına 2 dk** |
| K1 · Kod: yeniden hesap, iki veri sağlayıcı, tazelik, sicil eşitliği, sınırlar | Her koşu, otomatik | Kod |
| K2 · Kör tahmin | Her soru | Ayrı çalıştırma |
| K3 · Editör (sözlük taraması, 8 hukuk sorusu, sunum) | Her yayın | Ayrı çalıştırma |
| K4 · Yayın onayı | İlk 8 hafta her yayın | **Yusuf, haftada iki oturum × 15 dk** |
| K5 · Aylık kalibrasyon: beş sütun, ayar yönü, gürültü denetimi, hata defteri | Ayın ilk pazartesisi | Hakem + **Yusuf 30 dk** |
| K6 · Çeyreklik dış göz | Üç ayda bir | Dış uzman + **Yusuf 60 dk** |
| K7 · Otopsi | Olaydan sonra 7 gün | Hakem |

**Yusuf'un haftalık tavanı 60 dakika:** ön kayıt 10, onay 30, istisna ve pay 20. Aşılıyorsa çözüm daha az soru. Hata defteri (`data/hata-defteri.json`) yayına çıkmayan hataları da yazar; aynı koşul üç kez tekrarlanırsa kural önerisi Yusuf'a gider.

### 2.7 Veri ve tekrarlanabilirlik

- **Tek kayıt kaynağı:** `data/sorular.json`. `quant.json` ondan üretilir, elle yazılmaz. Kart betiği sayıyı sicilden okur.
- **Veri toplama:** GitHub Actions (depoda zaten çalışıyor), iş günü 17:00 ve 23:30. Ücretsiz çekirdek: EVDS, TCMB kur dosyası, FRED, BLS, EIA, ECB. Ham yanıt `data/ham/<tarih>/` altında, özeti (sha256) ve çekim saatiyle. Lisanslı kaynakta yalnız değer ve özet saklanır. Haber sitesinden sayı kopyalanmaz.
- **Koşu kaydı:** her hesap tek dosya (girdiler, kod sürümü, çıktı); sicil kaydına `kosu_id` eklenir.
- **Ön kayıt:** dosya özeti commit mesajına; depo açıldıktan sonra zaman damgası (OpenTimestamps). Yayınlanmayan ön kayıtlar da açık sicilde durur.
- **Revizyon kuralı:** ilk resmi yayım (§2.4); Motor'un hata dağılımı da ilk yayım verisinden.
- **Otomatik testler (ilk günden yedi tane; kırmızı test yayını durdurur):** sicil eşitliği · tazelik · seri eşleşmesi · ufuk · sınırlar ve bant · çapraz kur kimliği · metin–veri tutarlılığı. Yeniden üretim ve çift kaynak testleri ikinci ay.

### 2.8 Formatlar, platformlar, ritim, arşiv

| Format | Sıklık | Yer |
|---|---|---|
| **Önizleme ve Sonuç** (takvimli veri ve karar) | Olay günü; günde en çok bir | Instagram, web |
| **Ne Olur?** | Olayda en çok bir | Instagram, web |
| **Piyasa Ne Fiyatlıyor?** | Haftada bir (pazartesi sabahı, cuma kapanışıyla) | Instagram Story, web |
| **Tesisat** (mekanizma anlatımı) | Haftada bir | Instagram, web kütüphanesi |
| **Hesap Kartı** | Takvim adımı olunca | Instagram, web |
| **Beklenti Defteri / Taban Oranı** | Ayda bir; epizot listesi görünür | Web, özet carousel |
| **Dedik / Oldu, Karne, Neden Yanıldık** | News ritmiyle | İkisi |

Kalkanlar: günlük Açılış Sinyali, fiyat FLAŞ'ı, sekiz sorulu haftalık Δ tablosu. Haftada en çok dört Quant gönderisi. Web arşivi (`planck.news/quant`): sicil, karne, yöntem, beyan, Tesisat ve taban kütüphanesi; her sayfa tarihli ve sürümlü.

### 2.9 Karne

- **Sütunlar:** %50 · doğal rakip (ön kayıtta yazılı tek rakip) · Motor · kör Claude · Planck. Ana ölçü: Planck ile doğal rakip arasındaki fark.
- **Örneklem dürüstlüğü:** her farkın yanında kapanış sayısı, güven aralığı ve küme sayısı (aynı etkene bağlı sorular tek gözlem). 30 kapanışa kadar ham döküm; 30'dan sonra yalnız kalibrasyon taslağı. "Beceri" sözcüğü %50'ye karşı en az 100 kapanış ve küme düzeltmesinden önce kullanılmaz. Piyasaya karşı beceri iddiası hiç kurulmaz: gereken örneklem binlerce kapanış.
- **Ayrı satırlar:** koşulu gerçekleşmeyen çiftler; sessiz izlemedeki eski sorular; düzeltme kayıtlı sorular; ayar yönü; yön hatası.
- **Kart üstü satır:** "Quant'ın N kapanışı var; henüz kanıtlanmış bir beceri değildir."

### 2.10 Okur

**Birincil okur:** TL geliriyle tasarruf etmeye çalışan hane ve birikimini altın-dövizde tutan orta yaş (R14'ün K1 ve K4'ü). **İkincil:** meraklı öğrenci ve profesyonel (K5); arşiv ve atıf onlar üzerinden yayılır. **Hedef olmayan:** sinyal arayan işlemci. Kapsayıcılık: cüzdan halkası her zincirde; okurun birimi (TL, gram) açıklamada; "birikimin yoksa" satırı; katılım bankası okuru için "kâr payı oranı da politika faiziyle hareket eder" cümlesi; okuru suçlayan dil yok. Kümeler hipotezdir; anonim kimlik anketi ve DM kodlamasıyla ilk 90 günde sınanır.

---

## 3. Uygulama planı

### 3.1 Yayın kapalıyken hemen (17–23 Kasım)

| İş | Kim | Doğrulama |
|---|---|---|
| `q-fed-artirim` sessiz izleme etiketi | Hakem çalıştırması | Sicilde etiket; `dogrula` çıktısı |
| `pb-2026-11-11-motorin-90`: düzeltme kaydı. Yeni sayı gözlenen ürün fiyatıyla, Aktarım şablonunun ilk sürümünden (kaba aralık %10–25); %10'un altına inerse sessiz izleme. 11.11 gönderisine "Düzeltme: hesabımızda ÖTV takvimi eksikti" notu. | Doğrulama masası; hesabı ayrı çalıştırma kontrol eder | Sicilde `duzeltme`; `yayin-log` kaydı; RG bağlantısı |
| `pb-2026-11-10-motorin`: Motor'u yok ve referansı bayat notu; güncelleme | Aynı tur | Sicil notu |
| 16.11 `quant.json` sayıları "yayınlanmamış taslak, geçersiz" sayılır; dosya sicilden yeniden üretilir. | Tahmin masası (Yusuf onayından sonra) | Sicil eşitliği testi: fark 0 |
| `nv-1` "Neden Yanıldık" taslağı; `nv-4` boş Motor alanına düzeltme kaydı | Hakem | Taslak Yusuf'ta; karnede Motor n = 2 |
| 9–12 Kasım Quant kartları yayınlandı mı? Kayıt tamamlanır. | Yayın turu, Yusuf'a sorarak | `yayin-log` |
| Günlük pompa fiyatı kaydı başlar (`data/mikro/pompa.jsonl`) | Tarama | Dosyada günlük satır |
| API anahtarları: EVDS, FRED, EIA, BLS (ücretsiz) | **Yusuf, 30 dk** | Depo ayarlarında dört anahtar |

### 3.2 Açılışa kadar haftalık plan

**Açılış 4–10 Ocak 2027 haftasına ertelendi (üç hafta).** Gerekçe: (1) 14–20 Aralık haftası News pilot raporu, Anayasa v3 ve "27 Soru" hazırlığıyla dolu; (2) veri hattı ve şablonlar bir tam takvim döngüsünde (TÜFE, FOMC, PPK) yayınsız sınanmalı; (3) avukat görüşü, çıkar beyanı ve web arşivi Yusuf'un zamanına bağlı; (4) 1 Ocak tarifeleri ve Aralık TÜFE'si en değerli açılış içeriği. Beklemenin bedeli ödenebilir; yanlış sayıyla açılmanın bedeli ödenemez.

| Hafta | İş |
|---|---|
| **24–30 Kas** | Sicilden `quant.json` üreten betik. Veri hattı (Actions, ham kayıt). İlk dört test. Şablon V ve K. ÖTV takvim dosyası. Taban: TCMB tahmin hatası. |
| **1–7 Ara** | **Sessiz prova başlar:** 3 Aralık TÜFE, 4 Aralık istihdam; ön kayıt ve kör tahmin protokolü. Şablon E, A, S. Hata defteri. QUANT.md v2 taslağı. Avukat görüşmesi (Yusuf). |
| **8–14 Ara** | 9 Aralık FOMC, 10 Aralık PPK ve ABD TÜFE kapanışları. Web sayfaları: sicil, karne, yöntem, beyan. Kart betikleri: üç katman, zincir (birleşik olasılık, karşı hikâye), Hesap Kartı. |
| **15–21 Ara** | **Ara denetim:** açılış ölçütleri sayılır. Yusuf'a üç örnek kart. QUANT.md v2 ve Anayasa ekleri onayı. Aktarım haritası ilk sekiz kenar. |
| **22–28 Ara** | 12–15 açılış sorusunun ön kaydı (Ocak takvimi). İlk Hesap Kartı taslağı (1 Ocak vergi ve tarife adımları). |
| **29 Ara–3 Oca** | 1 Ocak tarife kapanışları. Son ölçüt denetimi. Açılış gönderisi: "Durduk, şunları bulduk, şunları değiştirdik"; ilk satırda Brier 0,51 (n = 2). |
| **4–10 Oca** | **Açılış.** |

### 3.3 Açılış ölçütleri (biri eksikse açılış bir hafta kayar)

1. Sicil ile türetilmiş dosya farkı 0; yedi test art arda yedi gün yeşil.
2. Motor girdilerinin en az %90'ı API'den ve A katmanından; yedi günde bayat girdiyle hesap 0.
3. Açık her soruda kayıtlı şablon, doğal rakip, taban ya da "taban yok" etiketi, ön kayıt özeti.
4. Sessiz provada en az 8 kapanış; her biri 15 dakikada kapatılmış; iptal en çok 1.
5. Avukat görüşmesi yapılmış; çıkar beyanı ve künye onaylı; sözlük taraması çalışıyor.
6. Web'de sicil, karne, yöntem ve beyan sayfaları yayında.
7. QUANT.md v2 onaylı.
8. §3.1'deki düzeltmelerin tamamı kapanmış.
9. Yusuf'un haftada iki onay oturumu takvimde.

### 3.4 90 günlük başarı ve bırakma ölçütleri (açılıştan 4 Nisan 2027'ye)

| Başarı ölçütü | Hedef |
|---|---|
| Kapanış (ekonomi aileleri, prova dahil) | ≥ 50; iptal ≤ %5 |
| Yayına çıkan veri ya da hesap hatası | Ayda en çok 1; sicil farkı 0 |
| "Bu kart al/sat işareti" algısı (Story, ≥30 yanıt) | < %25 |
| "%55 ne demek?" doğru okuma | ≥ %70 ya da ilk ölçüme göre +15 puan |
| Arşiv | 8 Tesisat, 4 Hesap Kartı, 3 taban içeriği web'de; kaydetme/erişim oranı hesap medyanının üstünde |
| Hukuk ve dil | Resmi yazı 0; sözlük ihlali 0; DM'de kişiye özel yanıt 0 |
| Yusuf'un süresi | ≤ 60 dk/hafta, kayıtlı |

| Bırakma ölçütü | Sonuç |
|---|---|
| Bir ayda yayına çıkan iki veri hatası | Quant, kapı düzelene kadar durur |
| SPK, BDDK ya da RTÜK yazısı | İlgili soru sınıfı 24 saatte durur; ikinci yazıda kalıcı kapanır |
| Al/sat algısı ≥ %25 (iki ölçüm) | Varlık eşiği soruları kalkar |
| Üçüncü ayın sonunda ayda < 8 kapanış | Planck sayısı katmanı askıya; Quant Katman 1–2 ve Hesap Kartı ile sürer |
| 20 olay ayarının ortalama katkısı eksi | Likit sorularda ayar sıfıra iner |
| Piyasa fiyatlı 100 kapanışta Planck ham piyasadan kötü | O sınıfta yalnız çeviri |

### 3.5 Kural dosyalarında gereken değişiklikler (Yusuf onayıyla)

- **Anayasa:** Hesap Kartı muafiyeti (ilke 1); Quant ayar kuralı (§3.7); doğal rakip ve 100 kapanış kuralı (§5); Quant künyesi (§8); bankacılık çizgisi (§9); "Quant'ta yalnız bilgi eylemi" (ilke 9).
- **QUANT.md v2:** §2a, §2b, §3, §4, §5 ve "Otomatik yayın" bölümü yeniden yazılır. **EDITOR.md:** Quant eki.
- **sicil.py:** `aile`, `vitrin`, `p_kor`, `motor_rn`, `takvim`, `dogal_rakip`, `kosu_id` alanları; `dogrula`ya takvim ve kardeş soru tutarlılığı kontrolü.

---

## 4. Kurucuya sorular (önem sırasıyla)

1. **Çıkar beyanı.** Senin ya da yakınlarının altın, döviz, endeks, petrol gibi varlıklarda kaldıraçlı, vadeli ya da kısa vadeli işlemi var mı? §2.5'teki kuralı kabul ediyor musun? *Önerim: kabul; finans kanalında geri dönüşü olmayan güven kaybı ve asıl hukuki risk buradan gelir.*
2. **Avukat.** Açılıştan önce sermaye piyasası ve bankacılık alanında çalışan bir avukatla bir-iki saatlik görüşmeye bütçe ayırır mısın? *Önerim: evet; yedi uzman bağımsız olarak istedi ve üç karar buna bağlı.*
3. **Ana ürün ve okur.** Quant'ın ana ürünü mekanizma analizi ve piyasa çevirisi, kendi sayısı dar; birincil okur tasarruf eden hane. Onaylıyor musun? *Önerim: evet; piyasayı yenme iddiası kanıtlanamaz, senin tarif ettiğin "şu olursa şu olur" zihni mekanizma analizidir.*
4. **Açılış tarihi.** Açılışı 4–10 Ocak'a erteleyip Aralık'ı yayınsız prova yapalım mı? *Önerim: evet; yeni hattı bir TÜFE–Fed–TCMB döngüsünde sınamadan açmak, bu denetimde bulduğumuz veri hatalarını yayına taşır.*
5. **Onay ve zamanın.** İlk sekiz hafta her Quant yayınını haftada iki 15 dakikalık oturumda onaylar mısın (toplam en çok 60 dk/hafta)? *Önerim: evet; sonra "yalnız bayraklı içerik" modeline geçeriz, çünkü en değerli katkın soru ve kriter onayıdır.*
6. **Kapalı sınıflar.** İlk 90 gün Dolar/TL, gram altın, BIST ve kripto fiyatı sorusu açmayalım; tekil banka kalıcı yasak olsun. Kabul mü? *Önerim: evet; modelimiz zayıf ve okur bunları işlem işareti diye okur.*
7. **Ortak havuz.** Ekonomi soruları sicilde tek kayıt olsun, iki hesapta aynı sayıyla görünsün; hesabı Quant masası yapsın (16.11 kararının açılıştan sonraki revizyonu). *Önerim: evet; iki hesap çelişen sayı veremez ve Quant yalnız en riskli sorularla kalmaz.*
8. **Açıklık.** Depo ve sicil açılıştan önce herkese açılsın mı? Planck'in giderlerini kim karşılıyor; künyeye "giderlerini kurucu karşılar; reklam, sponsorluk, aracı kurum geliri almaz" yazabilir miyiz? *Önerim: ikisine de evet; "kayıt sonradan değişmedi" sözünü ancak açık kayıt kanıtlar.*
9. **Küçük bütçe.** Fed fiyatlaması için aylık yaklaşık 25 dolarlık veri aboneliğine ve üç ayda bir bir saatlik dış uzman gözüne (ekonomist) onay verir misin? Pahalı terminal almıyoruz. *Önerim: evet; dış göz, Claude'un kendi kör noktasını yakalamanın tek yolu.*
10. **Platform.** İlk 90 günde X, ayrı bülten, YouTube ve İngilizce hesap açmayalım; bülten ikinci ayda tek Planck bülteni içinde başlasın. Kabul mü? *Önerim: evet; her yeni kanal ayrı hukuki yük ve hata yüzeyi getirir.*

İtirazın yoksa uygulanır: 16.11 `quant.json` sayılarının geçersiz sayılması; motorin-90 düzeltmesinin okura duyurulması; Hesap Kartı muafiyeti; kartta "üç ayrı hesap" ifadesi.
