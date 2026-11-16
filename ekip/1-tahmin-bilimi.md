# 1 · Tahmin Bilimi ve Epistemoloji Raporu

*Planck iş geliştirme ekibi · 16.11.2026 · Hazırlayan: tahmin bilimi masası (Claude)*

## Özet

Planck'in sorunu tahmin yöntemi değil, **neyin tahmin edildiği**. Anayasa'nın çekirdeği bilimsel olarak sağlam: sorusuz sayı yok, dış görünüm önce, log-odds güncelleme, uygun skor kuralı (Brier), ayrı hakem. Ama yayının birimi, sonucu zaten neredeyse belli olan beş yıllık endeks maddeleri. Böyle bir soruda haberin taşıyabileceği bilgi çok az, karne de yıllarca dolmaz. Önerim şu: birim **kısa ve orta vadeli, sonucu belirsiz sorulardan oluşan bir havuz** olsun. Endeksler bu havuzdan türetilen bir görüntü olarak kalsın. Haberin önemi de **sorulardaki bilgi değişimiyle (sürpriz) ve karar ilgisiyle** ölçülsün.

---

## 1. Bulgular

### 1.1 Tahmin edilebilir soru nasıl kurulur

- Metaculus'un kılavuzu şu ölçütleri koyuyor: takdire az yer bırakan çözüm kriteri, tanımlı terimler, veri kaynağı kesilirse ne olacağı ve "Clairvoyance Test" (bir kâhin kriterin gerçekleşip gerçekleşmediğini tartışmasız söyleyebilir mi?). Bulanık temalar ayrı ayrı sınanabilir önermelere bölünür. Çözümü 15 dakikadan uzun sürecek sorular genelde reddedilir. Kaynak düzenli yayımlanan, otoriter bir kaynak olmalıdır. ([Question writing and submission guidelines](https://www.metaculus.com/question-writing/))
- Metaculus iki durumu ayırır: gerçeklik belirsizse soru **ambiguous**, gerçeklik açık ama soru kötü yazılmışsa **annulled** olur. İkisi de puanlanmaz. ([Metaculus FAQ](https://www.metaculus.com/faq)) Planck'in `iptal` kuralı bu ayrımı yapmıyor.
- Good Judgment Project'te olasılık eğitimi (referans sınıfı kullanımı, tahmin ortalaması), takım çalışması ve en iyi tahmincileri bir araya toplamak hem kalibrasyonu hem ayırt etme gücünü artırdı. ([Mellers ve ark. 2014, Psychological Strategies…](https://escholarship.org/uc/item/4rg4n9vr))
- **Ufuk:** Tetlock'un *Expert Political Judgment* çalışmasında doğruluk yaklaşık 5 yıl sonra şans düzeyine iniyor. GJP'de sıradan tahminciler kapanıştan ~375 gün önce şans düzeyindeydi, süper tahminciler daha iyiydi. 10 yıl ve üstü tahminlerin isabeti hakkında güvenilir bir şey söylemek ise zor. ([Open Philanthropy, How accurate are long-range forecasts?](https://www.openphilanthropy.org/?p=3360)) Metaculus verisinde Brier skoru ufuk uzadıkça kötüleşiyor (<1 yıl: 0,151; 5–10 yıl: 0,169). PredictionBook'ta ters yönde bir eğilim var, örneklem de küçük. ([Data on forecasting accuracy across different time horizons](https://forum.effectivealtruism.org/posts/hqkyaHLQhzuREcXSX/data-on-forecasting-accuracy-across-different-time-horizons))
- **Uzun vadeyi kısa vadeye bağlamak:** "Conditional trees" yönteminde uzmanlar uzak sorunun olasılığını en çok oynatacak ara olayları belirliyor. Her ara soru için bilgi değeri (VOI) ölçülüyor: cevabı öğrenmek uzak tahmini beklenen olarak ne kadar oynatır? Bu yöntemle üretilen 13 sorunun 9'u, platformlardaki popüler 10 sorunun hepsinden daha bilgilendirici çıktı. Yakın vadeli sorular ortalamada yaklaşık 9 kat daha bilgilendiriciydi. ([Conditional Trees](https://forum.effectivealtruism.org/posts/iMmpeCmfBk9sm6aLJ/conditional-trees-generating-informative-forecasting)) Çözülemeyen uzun vadeli sorular için önerilen bir başka araç "reciprocal scoring". Henüz hakem incelemesinden geçmemiş bir ön baskıda sunuluyor. ([Karger ve ark., Reciprocal Scoring](https://faculty.wharton.upenn.edu/wp-content/uploads/2022/03/SSRN-id3954498.pdf))

### 1.2 Olasılık neye bağlanmalı, haber önemi nasıl ölçülür

- **Bayesçi sürpriz:** Itti ve Baldi sürprizi gözlemcinin önceki inancıyla sonraki inancı arasındaki KL ıraksaması olarak tanımlıyor. İnancı değiştirmeyen veri sürpriz değildir, aykırı bir değer bile olsa. Bu ölçü, insanların videoda nereye baktığını test edilen altı ölçünün en iyisi olarak öngördü: bakışların ~%72'si ortalamadan sürprizli noktalara düştü. ([Bayesian Surprise Attracts Human Attention](https://proceedings.neurips.cc/paper_files/paper/2005/file/0172d289da48c48de8c5ebf3de9f7ee1-Paper.pdf)) Planck'in "Sürpriz mi?" adımının bilimsel karşılığı budur.
- **Doyum tuzağının asıl kaynağı:** Bunu kendi hesabımla gösteriyorum. %88'deki bir soruda 1 puanlık oynama 0,001 bit bilgi taşır. %50'den %60'a geçiş 0,029 bit, %10'dan %20'ye geçiş 0,064 bit taşır. Yani sorun puan ölçeğinde değil, **sorunun kendisinde**: sonucu neredeyse belli olan bir soru haberden bilgi alamaz. Log-odds güncellemesi (Anayasa §3) bunu matematikte düzeltiyor. Ama "|Δ puan| × …" ile hesaplanan yayın puanı düzeltmeyi geri alıyor.
- **Karar ilgisi:** VOI, ancak bir tahmini değiştirebilen bilginin değerli olduğunu söyler ([Conditional Trees](https://forum.effectivealtruism.org/posts/iMmpeCmfBk9sm6aLJ/conditional-trees-generating-informative-forecasting)). Okur açısından da bir haberin önemi, okurun bir kararını etkileyen soruyu ne kadar oynattığıdır.
- **Koşullu sorulara dikkat:** Koşullu olasılık nedensellik gibi okunabilir. Örnekte, maske zorunluluğu ölümlerin yüksek olduğu dönemlerde geldiği için koşullu tahmin "zorunluluk → daha çok ölüm" gibi görünüyor. ([Karger ve ark.](https://faculty.wharton.upenn.edu/wp-content/uploads/2022/03/SSRN-id3954498.pdf))
- **Sayı zamanla nasıl hareket etmeli:** Tahmin bir martingale gibi davranmalıdır. Yeni bilgi gelmeden sistematik olarak sürüklenmemeli. ([Gelman ve ark., Grappling with uncertainty… 2024](https://statmodeling.stat.columbia.edu/2024/07/03/grappling-with-uncertainty-in-forecasting-the-2024-u-s-presidential-election/))

### 1.3 Kalibrasyon ve hesap verebilirlik

- Brier ve log skoru **kesin uygun (strictly proper)** skor kurallarıdır. Bu kurallarla puanlanan biri en iyi skoru gerçekten inandığı olasılığı söyleyerek alır. Uygun olmayan kurallar neredeyse kesin tahminleri ödüllendirir. ([Gneiting ve Raftery, Strictly Proper Scoring Rules](https://apps.dtic.mil/sti/pdfs/ADA459827.pdf))
- Brier skoru güvenilirlik (kalibrasyon), ayırt etme gücü ve belirsizlik bileşenlerine ayrılabilir. Ancak sonlu örneklemde bu bileşenlerin tahmini hem gürültülü hem yanlıdır. ([Siegert, Variance estimation for Brier Score decomposition](https://arxiv.org/abs/1303.6182)) Kalibrasyon grafiklerine "tutarlılık çubukları" eklenmesi öneriliyor: kalibrasyon kusursuz olsaydı gözlenen sıklıkların hangi aralıkta kalacağını gösteren çubuklar. ([Bröcker ve Smith, Increasing the reliability of reliability diagrams](https://researchonline.lse.ac.uk/id/eprint/22217))
- **Küçük örneklem:** Simülasyonlarda 100 soruda bile belirgin bir beceri farkı yarıdan az olasılıkla istatistiksel olarak anlamlı çıkıyor. 50 soruda gürültülü tahminci kusursuz olanı %8 olasılıkla yeniyor. Sorular birbiriyle ilişkiliyse gereken örneklem daha da büyüyor. ([Comparing two forecasters in an ideal world](https://forum.effectivealtruism.org/posts/DzqSh7akX28JEHf9H/comparing-two-forecasters-in-an-ideal-world)) Kısa turnuvayı kazanmak üstün beceri için zayıf bir kanıttır. ([Aldous, The prediction tournament paradox](https://www.stat.berkeley.edu/users/aldous/Papers/prediction_paradox.pdf))

### 1.4 Yanlış kesinlik ve "benzin kadranı"

- Westwood, Lelkes ve Messing'in deneylerinde kazanma olasılığı gösterilen katılımcılar, oy oranı gösterilenlere göre sonuçtan daha emin oldu. Oyun tabanlı deneyde önde görünen tarafın destekçileri bedel ödeyip "oy vermekten" daha sık vazgeçti. ([Pew Research, 2018](https://www.pewresearch.org/short-reads/2018/02/06/use-of-election-forecasts-in-campaign-coverage-can-confuse-voters-and-may-lower-turnout/))
- 2022 ara seçim deneyinde belirsizlik görselleri güveni ve duygusal tepkiyi artırdı. Ama partizan gruplar arasındaki güven farkını da açtı. ([Hullman Lab, Swaying the Public?](https://www.hullmanlab.northwestern.edu/paper/2023/08/01/swaying-the-public.html))
- "Yarın %30 yağmur" ifadesini yalnızca New York'ta çoğunluk doğru yorumladı. Avrupa kentlerinde insanlar "günün %30'u" ya da "bölgenin %30'u" diye anladı. Öneri: **referans sınıfını açıkça söylemek**. ([Gigerenzer ve ark. 2005](https://ideas.repec.org/a/wly/riskan/v25y2005i3p623-629.html))
- Sözel olasılık terimleri ("muhtemel") kişiden kişiye çok farklı anlaşılıyor. Sözel ve sayısal ifadeyi birlikte vermek yorumları tutarlı hale getiriyor, bu etki ideolojiden de bağımsız. ([Budescu ve ark. 2012, IPCC](https://link.springer.com/doi/10.1007/s10584-011-0330-3))
- Bir sayıyı "tahmini" diye etiketleyip aralığıyla vermek (ör. "%3,9, aralık %3,7–4,1") okurun belirsizliği anlamasını artırdı, güveni neredeyse hiç azaltmadı. 5 deney ve 5.780 katılımcıyla, BBC sahasında da sınandı. ([ScienceDaily, van der Bles ve ark. 2020](https://sciencedaily.com/releases/2020/03/200323152106.htm))
- Belirsizlik iki düzeyde ayrı söylenmelidir: **doğrudan** belirsizlik (sayının kendisi) ve **dolaylı** belirsizlik (kanıtın kalitesi). "Bilmiyoruz" demek ayrı ve meşru bir iletişim seçeneğidir. ([van der Bles ve ark. 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6549952))
- Bununla birlikte olasılıkları sözel kategorilere yuvarlamak 888.328 jeopolitik tahminde doğruluğu tutarlı biçimde düşürdü. ([Friedman ve ark., Value of Precision](https://www.hks.harvard.edu/publications/value-precision-probability-assessment-evidence-large-scale-geopolitical-forecasting)) Yani bant sayının yanında verilir, yerine geçmez.

### 1.5 Var olan örnekler

- **FiveThirtyEight 2016:** Model Trump'a ~%30 şans verdi, Silver bunu "oldukça olası" diye niteledi. Silver'a göre başarısızlık verinin değil, olasılığı kesinlik gibi okuyan medya ve kanaatin başarısızlığıydı. ([Harvard Gazette](https://news.harvard.edu/gazette/story/2017/03/nate-silver-says-conventional-wisdom-not-data-killed-2016-election-forecasts)) Aynı dönemde kablolu TV'de günde ortalama 16 olasılık anılıyordu. ([Pew](https://www.pewresearch.org/short-reads/2018/02/06/use-of-election-forecasts-in-campaign-coverage-can-confuse-voters-and-may-lower-turnout/))
- **The Economist (Gelman ve ark.):** Yöntemi açık bir Bayesçi model kullanıyor. Model geçmiş seçimlere geriye dönük uygulanarak sınanıyor. Sistematik anket hatası modele dahil ediliyor ve modellenmeyen olaylar açıkça yazılıyor. ([2024](https://statmodeling.stat.columbia.edu/2024/07/03/grappling-with-uncertainty-in-forecasting-the-2024-u-s-presidential-election/)) Ekip, tahmincinin hem aşırı hem eksik güven teşviklerini ayrıca tartışıyor. ([Information, incentives, and goals in election forecasts](https://statmodeling.stat.columbia.edu/2020/09/08/information-incentives-and-goals-in-election-forecasts/))
- **Metaculus / Good Judgment:** Açık çözüm kriterleri, puanlanmayan iptal kategorisi, sıralama tabloları ve eğitimle ölçülebilir iyileşme sağlıyorlar ([FAQ](https://www.metaculus.com/faq), [Mellers 2014](https://escholarship.org/uc/item/4rg4n9vr)).
- **Polymarket:** Columbia araştırmacılarına göre son üç yılda işlem hacminin ortalama ~%25'i "wash trading" (aynı tarafın kendisiyle alım-satımı). Bu oran Aralık 2024'te ~%60'a çıkmış, seçim piyasalarında ~%17 olarak ölçülmüş. Çalışma henüz hakem incelemesinden geçmedi. ([Fortune, 2025](https://fortune.com/2025/11/07/polymarket-wash-trading-inflated-prediction-markets-columbia-research/)) Piyasa fiyatı Motor için iyi bir girdi, ama sorgusuz kabul edilecek bir hakem değil.

---

## 2. Mevcut tasarım: doğrular ve yanlışlar

**Doğru (korunmalı):** sorusuz sayı yok; dış görünüm önce; log-odds güncelleme; %3–97 sınırı; uygun skor kuralı; tahmini yazan ile kapatanın ayrı olması; 30 kapanıştan önce isabet iddiası yok; ön-otopsi; öncü sorular; "ölçülemiyor" etiketi; ıskanın önce gösterilmesi. Bunlar literatürle uyumlu.

**Yanlış ya da uygulanmıyor:**
1. **Birim endeks maddesi.** `risk-catisma` %88'de. Sorunun kriteri (üç bölgede 2031'de çatışma sürüyor mu) yapısı gereği neredeyse kesinleşmiş durumda. Hiçbir haber bu sorudan bilgi koparamaz.
2. **Önem = çarpım.** Türkiye bağı 0 olduğunda sonuç da 0 oluyor. Etki ve bağ ölçeksiz katsayılar. |Δ puan| da log-odds düzeltmesini geri alıyor.
3. **Mikro güncellemelerde sürüklenme.** `risk-catisma` 9–15 Kasım arasında çoğu LR 1,05 olan art arda güncellemelerle 85'ten 88'e çıktı. Martingale ilkesine göre gürültü sayıyı tek yöne itmemeli. Aynı temanın tekrar haberleri birikiyor.
4. **Ufuk karması kâğıtta kalıyor.** Açık 51 sorunun yalnızca 18'i (%35) 90 gün içinde kapanıyor, 30 gün içinde kapanan tek bir soru var. Kural %60 diyor.
5. **Karne aç:** 2 kapanış var. Anlamlı bir beceri iddiası için 100'ü aşkın bağımsız soru gerekiyor (§1.3). Mevcut hızla bu yıllar sürer.

---

## 3. Planck için tasarım ilkeleri

**İ1 · Birim soru havuzudur, endeks onun görüntüsüdür.** Her risk 2031 sorusu olarak kalır ama kendisi yayın birimi olmaz. Her risk için 4–8 öncü soru kurulur, conditional trees mantığıyla seçilir: "Bu soru evet çıkarsa 2031 tahminimiz kaç puan oynar?" Bu, VOI'nin basit bir tahmini. VOI'si düşük öncü soru açılmaz. Endeks çizgisi, öncü sorulardan türetilen ve gerekçesi yazılı bir özet olur.

**İ2 · Haber önemi = Σ (sürpriz × karar ilgisi), çarpım yok.** Sürpriz, olayın oynattığı her soruda bit cinsinden KL ıraksaması (ya da |Δ logit|) olarak ölçülür ve oynayan sorular üzerinden toplanır. Karar ilgisi 1–3 arası bir puandır: soru okurun bir kararını etkiliyor mu (kredi, kur, seyahat, iş)? Türkiye bağı çarpan olmaktan çıkar ve **yönlendirme etiketi** olur (Peki Biz? var mı, yok mu). Böylece küresel bir şok Türkiye bağı yüzünden silinmez.

**İ3 · Sonucu belirsiz sorular sorulur.** Havuzdaki açık soruların çoğu %15–85 aralığında tutulur. %90 ve üstüne çıkan soru sessizce izlenir, haber üretmez, yerine daha keskin bir soru açılır (eşik yükseltilir, süre kısaltılır).

**İ4 · Ufuk portföyü sabit oranlıdır.** Hedef dağılım: %35 ≤30 gün, %35 31–90 gün, %20 91–365 gün, %10 uzun vade. Takvimi önceden belli veri olayları omurga olur (TÜFE, TCMB/Fed kararları, kur ve Brent eşikleri, Resmî Gazete tarihleri). Çözüm kaynağı belli ve hakem işi 15 dakikanın altında. Hedef ayda ≥25 kapanış, sorular da birbirinden mümkün olduğunca bağımsız.

**İ5 · Gürültü güncellemesi biriktirilir, uygulanmaz.** LR'si <1,2 olan olgular sayıya hemen işlenmez, "zayıf sinyal" defterine yazılır. Haftalık gözden geçirmede toplu olarak değerlendirilir, aynı tema tek kanıt sayılır. Bir sayı yeni ve bağımsız olgu olmadan iki haftada 3 puandan fazla tek yöne gidiyorsa sürüklenme alarmı çalar.

**İ6 · Her sayı üç katmanla verilir:** (a) tam sayı yüzde, ondalıksız; (b) üç geçişin min–maks bandı ("%30, aralık 22–38"); (c) referans sınıfıyla doğal sıklık ("benzer 10 durumun ~3'ünde oldu"). Bunların yanında ayrı bir **kanıt kalitesi** etiketi (A/B/C ya da "taban yok") konur. Sözel bant sayının yanında durur, yerine geçmez.

**İ7 · Karne belirsizliğiyle birlikte yayınlanır.** Her karne şunları gösterir: Planck, %50, Motor ve (varsa) piyasa için Brier skoru; farkın güven aralığı; kalibrasyon grafiğinde tutarlılık çubukları; "N kapanış, bu farkın şans eseri olma olasılığı yüksek/düşük" cümlesi. Kolay sorularla Brier şişirmeyi önlemek için ana ölçü **taban/Motor'a göre beceri skorudur**. İptaller ayrıca sayılır, ambiguous/annulled ayrımıyla.

**İ8 · Kazanan çerçevesi yok, "bilmiyoruz" meşru.** Seçim ve parti sorularında tek bir kazanma olasılığı manşete çıkmaz, aralık ve senaryo dili kullanılır. Modellenemeyen olay riski içerikte açıkça yazılır.

---

## 4. Riskler

- **Goodhart:** Kısa vadeli kolay sorular Brier'i yapay biçimde iyileştirir. Karşılığı: beceri skoru ve zorluk dağılımının yayınlanması.
- **İlişkili sorular:** Aynı olaya bağlı on soru on bağımsız kanıt değildir, etkin örneklem düşer. Karşılığı: karnede küme başına ağırlık.
- **Soru enflasyonu:** Hacim artarken kriter kalitesi düşebilir. Karşılığı: Clairvoyance Test ve 15 dakika kuralı sicil doğrulamasına eklenir.
- **Kitle psikolojisi:** Olasılık kesinlik gibi okunabilir, kutuplaşma yaratabilir (§1.4). Karşılığı: bant ve referans sınıfı zorunlu, okur testleri ("Sen yüzde kaç dersin?" verisiyle) yapılır.
- **Piyasa referansının güvenilirliği:** Hacmi yapay olarak şişirilmiş piyasalar Motor'u yanıltabilir. Karşılığı: likidite ve hacim eşiği, tek kaynak olarak kullanılmama.
- **Model belirsizliği:** Tek bir Claude çalıştırmasının yapısal yanlılığı üç geçişte de tekrar edebilir. Bu durumda band dar görünür ama yanıltıcıdır. Karşılığı: Motor ile Claude'un ayrı puanlanması sürer, karşı görüş geçişi farklı bir referans sınıfı kullanmak zorunda olur.
