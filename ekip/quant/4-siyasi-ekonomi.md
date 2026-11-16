# 4 · Siyasi Ekonomi ve Jeopolitik Risk (Quant v2)

*Uzman: siyasi ekonomi ve jeopolitik risk · 17.11.2026 · Girdi: BRIEF.md, ANAYASA.md v2, QUANT.md, ekip/KARAR.md, data/quant.json. Bu rapor öneridir; hiçbir kural dosyasına dokunulmadı.*

## Ana tez

Siyaset finansal sonuçları çoğunlukla **yönden değil, dağılımın genişliğinden ve kuyruklarından** etkiler. Seçim, yaptırım, atama ya da savaş gibi olaylar fiyatı nereye götüreceğini nadiren söyler. Ama oynaklığı, sıçrama sıklığını ve rejim değişikliği olasılığını büyütür. Bu durum Quant için iki açıdan işe yarar: (1) SPK çizgisiyle uyumludur, çünkü yön söylemeden ölçülebilir. (2) Kişi ve parti hakkında olasılık yayınlamadan modellenebilir, çünkü ölçülen şey aktör değil olay sınıfının istatistiğidir.

---

## 1. Siyaset nasıl tahmin edilebilir biçimde modellenir?

### 1.1 Araçlar ve kanıt gücü

| Araç | Ne ölçer | Tahmin gücüne kanıt | Quant'taki yeri |
|---|---|---|---|
| **Piyasa fiyatlaması** (opsiyon, vadeli, CDS) | Siyasi belirsizliğin fiyatı | Güçlü. Seçim ya da zirve tarihini kapsayan opsiyonlar daha pahalıdır; piyasa siyasi belirsizliği fiyatlar ([Kelly, Pástor, Veronesi 2016, *JF* 71(5)](https://econpapers.repec.org/RePEc:bla:jfinan:v:71:y:2016:i:5:p:2417-2480)) | Motor (a) |
| **Kurumsal takvim + tepki fonksiyonu** | Karar alıcının veriye nasıl cevap verdiği | Kurum kurala bağlıysa yüksek. Türkiye'de tepki fonksiyonu kişi değişince kırılıyor (bkz. §2) | Motor (b–c), rejim değişkeniyle |
| **Seçim döngüsü** | Seçim öncesi maliye ve yatırım davranışı | Orta. Bütçe döngüsü geniş örnekte var, ama esas olarak yeni demokrasilerden geliyor ([Brender ve Drazen 2005, *JME* 52(7)](https://www.econ.umd.edu/publication/political-budget-cycles-new-versus-established-democracies)). Seçim yıllarında şirket yatırımı ortalama %4,8 düşüyor ([Julio ve Yook 2012, *JF* 67(1)](https://lbsresearch.london.edu/id/eprint/340)) | Taban oranı |
| **EPU** (Baker-Bloom-Davis) | Gazetelerde politika belirsizliği | Orta-zayıf. 128 ABD serisinde EPU, faktör modeli kıyasını 1, 3 ve 12 ay ufkunda sırasıyla 35, 44 ve 45 seride yeniyor. Gerçek zamanlı sürümler geriye dönük olanlardan belirgin kötü ([Rogers ve Xu, FEDS 2019-085](https://www.federalreserve.gov/econres/feds/files/2019085pap.pdf)) | Rejim ayarı; olay olasılığı değil |
| **GPR** (Caldara-Iacoviello) | Jeopolitik gerilimin gazete payı | Orta. Yüksek GPR, düşük yatırımı ve istihdamı, yüksek felaket olasılığını ve büyük aşağı yön riskini önceliyor ([AER 112(4) 2022](https://www.aeaweb.org/doi/10.1257/aer.20191823)). Türkiye dahil 44 ülke için endeks var, ama ABD bakışını yansıtıyor ([GPR ülke sayfası](https://www.matteoiacoviello.com/gpr_country.htm)) | Rejim ayarı |
| **Türkçe kaynaklı endeksler** | Türk basınında belirsizlik | Umut verici. Türkçe endeks şoku üretim, istihdam ve ticarette düşüşle ilişkili; İngilizce endekste bu ilişki yok ([Kilic ve Balli 2024, *Empirical Economics*](https://mro.massey.ac.nz/handle/10179/70111); [2026, *World Economy*](https://ideas.repec.org/a/bla/worlde/v49y2026i1p30-51.html)) | Kendi Türkçe sayımımız için yöntem |
| **Oyun teorisi, teşvik analizi** | Aktörlerin tercihleri, taahhüt, son tarih | Doğrudan tahmin gücü zayıf. Uzman siyasi yargısı uzun ufukta şansı zor geçti (Tetlock, *Expert Political Judgment*, 2005). Takım çalışması, eğitim ve uç değerleri açma ise turnuvada isabeti artırdı ([Mellers ve ark. 2014](https://www.psychologicalscience.org/publications/observer/obsonline/predicting-uncertain-events-on-a-global-scale.html)) | Yalnız mercek ve Claude ayarı |

**Hüküm:** Kanıt hiyerarşisi şöyle: piyasa fiyatı > kurumsal takvim ve tepki fonksiyonu tabanı > belirsizlik endeksleri > oyun teorisi ve uzman yargısı. Oyun teorisi sayı üretmez. Hangi taban oranının seçileceğini ve karşı görüş geçişinin neyi savunacağını yapılandırır.

### 1.2 Öneri: "Siyasi rejim katmanı"

Motor'a tek bir durum değişkeni eklensin. Değişken kuralla, üç değerden birini alır: **olağan / gerilim / kriz**.

- **Girdiler:** GPR-Türkiye ve GPR-küresel (aylık yüzdelik dilim), USD/TRY bir aylık örtük oynaklık, Türkiye 5 yıllık CDS, OVX. Eşikler geçmiş verinin yüzdelik dilimlerinden önceden yazılır.
- **Etkisi:** Ortalamayı oynatmaz. Fiyat eşiği sorularında oynaklık varsayımını büyütür ve kalın kuyruklu dağılım (ör. Student-t ya da sıçramalı süreç) kullandırır. "Kriz" rejiminde sıçrama sıklığı, Türkiye'nin kendi tarihsel şok günlerinden hesaplanır.
- **Gerekçe:** Motor'u deterministik tutar (QUANT §2a). Siyasi yargıyı Claude ayarından kurallı hesaba taşır ve puanlanabilir kılar. Rejim değişkeninin kendisi yayınlanmaz, yalnız yöntem sayfasında anlatılır.

Bu, `usdtry-60` gibi sorularda bugünkü sabit `usdtry_vol: 10` varsayımının yerine geçer. Mart 2025 ya da Mart 2021 gibi günlerde %10 yıllık oynaklık anlamsız kalır.

---

## 2. Türkiye: para politikası, siyaset ve sürprizler

### 2.1 Sürprizlerin kısa tarihi

| Tarih | Olay | Piyasa sonucu | Kaynak |
|---|---|---|---|
| 13.09.2018 | PPK faizi 625 baz puan artırarak %24'e çıkardı; piyasa 300–400 bekliyordu. Karardan yaklaşık iki saat önce yürütmeden faizi eleştiren açıklama geldi | TL kararla %5'ten fazla değer kazandı; yılbaşından beri kayıp ~%40 | [CNBC](https://www.cnbc.com/2018/09/13/lira-jumps-as-turkish-central-bank-hikes-rates-to-24-percent.html) |
| Tem. 2019, Kas. 2020 | Başkan değişiklikleri (kararname) | — | *Bu oturumda kaynağı açılmadı; veri setine girmeden doğrulanmalı* |
| 20.03.2021 | Başkan, faiz artırımından iki gün sonra görevden alındı; 2019 ortasından beri üçüncü başkan | TL gün içinde %15'e kadar düştü (7,22 → 8,49) | [Globe and Mail/Reuters](https://www.theglobeandmail.com/business/international-business/european-business/article-turkish-lira-plunges-15-to-all-time-low-after-erdogan-sacks-central) |
| Eyl.–Ara. 2021 | Yükselen enflasyona rağmen 500 baz puan indirim (%19 → %14) | TL yılda %44 kaybetti; 20 Aralık'taki kur korumalı mevduat ilanıyla sert geri dönüş | [The New Arab/Reuters](https://www.newarab.com/news/turkeys-lira-logs-worst-year-two-decades-under-erdogan) |
| 22.06.2023 | Yönetim değişikliği sonrası %8,5 → %15; beklentinin altında | TL zayıfladı | [CNBC](https://www.cnbc.com/2023/06/22/turkeys-central-bank-hikes-interest-rate-to-15percent-in-dramatic-u-turn-to-tackle-40percent-inflation.html) |
| 19.03–17.04.2025 | Siyasi bir gözaltı olayı; ardından takvim dışı sıkılaştırma ve 17 Nisan'da beklenmeyen artırım (%42,5 → %46) | TL ~%12 düştü; yaklaşık 50 milyar dolar rezerv satıldı | [Al-Monitor](https://www.al-monitor.com/originals/2025/04/turkey-hikes-interest-rate-46-amid-turmoil-over-imamoglus-arrest), [FocusEconomics](https://www.focus-economics.com/countries/turkey/news/monetary-policy/turkey-central-bank-meeting-17-04-2025-central-bank-unexpectedly-increases-rates-in-april/) |
| 24.10.2025 | Sıkı tonlu metne rağmen 100 baz puan indirim; beklenti 150'ydi | Sınırlı tepki | [Ekonomi Gazetesi](https://www.ekonomigazetesi.com/ekonomi/sahin-ppk-metnine-ragmen-indirim-sasirtti-62753) |

Akademik çerçeve: [Gürkaynak, Kısacıkoğlu ve Lee (Economic Policy, 2022)](https://economic-policy.org/76th-economic-policy-panel/turkish-experiment/) 2021 dönemini Yeni Keynesyen modelin sınaması olarak okuyor. Zayıf para politikası kur değer kaybı ve enflasyon üretti. Beklentiler çapasını yitirdi, uzun vadeli faizler de yükseldi.

### 2.2 Modele dahil etme: aktör değil, olay sınıfı

Bu tablodan üç ders çıkıyor:

1. **İki ayrı sürpriz türü var.** (a) *Politika sürprizi*: PPK kararının anket medyanından sapması. Takvimlidir ve tabanı hesaplanabilir. (b) *Siyasi şok*: Takvim dışıdır. Kurum bu şoka sonradan tepki verir. İkisi aynı dağılıma konmamalı.
2. **Politika sürprizinin taban oranı hesaplanmalı.** Öneri: 2012–2026 PPK kararları ile karar öncesi anket medyanı (AA Finans/Bloomberg HT anketleri, EVDS) karşılaştırılıp "medyandan ≥100 baz puan sapma" ve "yön sürprizi" oranları çıkarılsın. Bu, `tcmb-aralik` türü sorular için Motor'un dış görünümüdür. `data/quant/tcmb-tahmin-hata.json` ile aynı mantıktır. Sayıyı bu raporda vermiyorum, çünkü hesaplamadım.
3. **Siyasi şok, isnatsız bir sıçrama terimidir.** Model şunu bilir: "Son 10 yılda USD/TRY'nin günlük %5'i aştığı N gün var." Bu günlerin hangi siyasi olayla ilgili olduğu modelin girdisi değildir. Yayınlanan sayı bir kur eşiğinin olasılığıdır. Hangi aktörün ne yapacağının olasılığı değildir.

**Kırmızı çizgi uygulaması (§9) bu alanda şöyle somutlaşır:**

- Adı geçen ya da kimliği belirlenebilir kişinin görevi hakkında soru açılmaz. Ad yazılmasa da "TCMB başkanı değişir mi?" ya da "Hazine ve Maliye Bakanı görevde kalır mı?" kimliği belirlenebilir bir kişinin görevidir. Bu yüzden yasaktır.
- Süren dava, gözaltı ya da soruşturmanın sonucu, ne doğrudan ne de piyasa sorusunun koşulu olarak kullanılır. "Dava X biterse kur…" türü koşullu soru, davanın olasılığını örtük olarak yayınlar.
- Seçim tarihi, kazanan ya da oy oranı Quant'ta hiç yer almaz. 15.12.2026 sonrası süreç kapısı News'e aittir. Quant bu soruları koşul olarak kullanmaz.
- **İzin verilenler:** kurum ve veri çıktıları. Örnekler: "TCMB brüt rezervleri 31 Aralık haftasında X milyar doların altına iner mi?", "PPK 2027'nin ilk çeyreğinde takvim dışı karar açıklar mı?", "Türkiye 5 yıllık CDS'i 31 Ocak'a kadar 400'ü aşar mı?" Bunlar kurumsal sürecin ölçülebilir izleridir.

### 2.3 Hukuki risk

- **SPKn md. 107/2 (bilgi bazlı piyasa dolandırıcılığı):** Fiyatları ya da yatırımcı kararlarını etkilemek amacıyla yalan, yanlış ya da yanıltıcı bilgi, söylenti, haber, yorum veya rapor yaymayı suç sayar. Kasıt ve menfaat unsurları gerekir ([SPK](https://spk.gov.tr/yatirimcilar/sermaye-piyasasinda-piyasa-dolandiriciligi-manipulasyon/bilgi-bazli-piyasa-dolandiriciligi)). Planck'in menfaati yok. Yine de **söylentiye dayalı olasılık** bu maddenin metnine en çok yaklaşan davranıştır. Mevcut "tek kaynak olasılık oynatmaz" kuralı burada hukuki bir kalkandır.
- **TCK 217/A:** Güvenlik, kamu düzeni ya da sağlıkla ilgili gerçeğe aykırı bilgiyi, panik yaratma saikiyle alenen yaymayı suç sayar. 18.10.2022'den beri yürürlükte ([özet](https://kadimhukuk.com.tr/?p=34951)). Kriz rejiminde "çöküş" ya da "kaçış" dili ve doğrulanmamış rezerv veya banka iddiası bu riski doğurur.
- **5411 sayılı Bankacılık Kanunu md. 74:** Bankaların itibarına ilişkin asılsız haberi yasaklar. Metni bu oturumda açılamadı; hukukçuya doğrulatılmalı. O zamana kadar **tekil banka adı Quant'ta yalnız resmi bildirim olgusu olarak geçmeli**, hakkında olasılık açılmamalı.

### 2.4 Gerilimi yönetmek: üç katman

| Katman | İçerik | Kural |
|---|---|---|
| **Olgu** | Ne oldu, kim açıkladı | İki kaynak, en az biri A/B. Kişi adı yalnız resmi unvanla ve olgu cümlesinde geçer |
| **Mekanizma** | Bu tür olay hangi kanaldan fiyata geçer | Genel, tarihsel, aktörsüz: "Takvim dışı politika değişikliklerinde kur oynaklığı tarihsel olarak artar." |
| **Olasılık** | Yalnız kurum, veri ve piyasa çıktısı | Siyasi olay, olasılığın **koşulu ya da konusu** olmaz. Yalnız rejim değişkeni üzerinden oynaklığa girer |

**Dil örnekleri:**

| Yazılmaz | Yazılır |
|---|---|
| "Siyasi baskı TCMB'yi indirime zorlayacak." | "PPK kararları 2012'den bu yana anket medyanından N kez 100 baz puandan fazla saptı. Aralık sorusunun dış görünümü bu tabandan başlar." |
| "Başkan görevden alınırsa dolar 60'ı geçer." | "Takvim dışı politika değişikliği yaşanan günlerde USD/TRY'nin tarihsel günlük oynaklığı X kat arttı. Motor bu riski kalın kuyrukla hesaba katar." |
| "Gözaltı TL'yi çökertti." | "19 Mart 2025'te TL dolara karşı gün içinde yaklaşık %12 değer kaybetti (Reuters, AP). TCMB aynı hafta takvim dışı adım attı." |
| "Hükümet piyasayı kaybetti." | "Türkiye 5 yıllık CDS'i 30 günde 120 baz puan arttı. Kaynak: [veri sağlayıcı]." |
| "Seçim yaklaşırken bütçe gevşer." | "Seçim yıllarında bütçe açığı artışı, demokrasisi yeni ülkelerde daha belirgin (Brender ve Drazen 2005). Türkiye için kendi tabanımız henüz yok." |

---

## 3. Küresel siyasi kırılma noktaları (Kasım 2026)

| # | Kırılma noktası | Bugünkü durum (kaynaklı) | Aktarım kanalı | Peki Biz? halkası | Soru tipi örneği |
|---|---|---|---|---|---|
| 1 | **Fed bağımsızlığı** | Yüksek Mahkeme, 5'e 4 oyla, Fed yöneticilerinin ancak "haklı sebeple" görevden alınabileceğine hükmetti. Dava alt mahkemelerde sürüyor. Başkan Warsh ([WTOP/AP](https://wtop.com/news/2026/06/what-the-supreme-courts-ruling-in-the-cook-case-means-for-federal-reserve-independence/)). Fed 16 Eylül'de faiz artırdı (sicil) | Vade primi, dolar, gelişen piyasa akımları | Taşıma ticareti, USD/TRY | "FOMC Aralık kararında 2'den fazla karşı oy olur mu?" (kurum çıktısı, kişi değil) |
| 2 | **ABD gümrük tarifeleri, IEEPA sonrası** | Mahkeme 20.02.2026'da 6'ya 3 oyla IEEPA tarifelerini iptal etti. Section 122 kapsamındaki %10'luk tarife 150 günle sınırlıydı. Section 232 ve 301 sürüyor ([CFR](https://www.cfr.org/articles/the-supreme-court-clipped-trumps-tariff-powers-and-opened-new-trade-battle-fronts)) | ABD fiyatları, Fed, ticaret hacmi | Çelik, otomotiv ihracatı | "Federal Register'da 31 Ocak'a kadar yeni bir Section 232 tarifesi yayımlanır mı?" |
| 3 | **ABD–Çin ateşkesi** | Çin, nadir toprak kısıtlamalarının askıya alınmasını 10 Ocak'a uzattı. ABD de Section 301 adımını askıya aldı ([The National](https://www.thenationalnews.com/news/us/2026/11/09/china-extends-pause-on-rare-earth-export-curbs-for-two-months/)) | Yarı iletken, nadir toprak, SOX | Elektronik girdi fiyatları | "Ateşkes 10 Ocak'ta resmi olarak uzatılır mı?" |
| 4 | **İran savaşı ve Hürmüz** | ABD, İran limanlarına ablukayı sürdürüyor. IMO Şubat sonundan beri bölgede 130 olay doğruladı ([Baird Maritime/Reuters](https://www.bairdmaritime.com/security/markets-are-betting-on-peace-but-hormuz-ship-attacks-persist)). Hürmüz'den geçen akış 2024'te günde ~20 milyon varil, küresel tüketimin ~%20'si. Boğazı baypas eden kullanılabilir kapasite ~2,6 milyon varil ([EIA](https://eia.gov/todayinenergy/detail.php?id=65504)) | Brent, navlun ve sigorta, LNG | Enerji ithalatı, cari açık, akaryakıt, TÜFE, TCMB | "Brent 31 Aralık'a kadar 110 doları görür mü?" (mevcut) |
| 5 | **ABD ara seçim sonrası** | Cumhuriyetçiler 3 Kasım ara seçimini kaybetti (Reuters, aynı kaynak). Repo özeti iki meclisin de el değiştirdiğini yazıyor; sonuçlar kapanış kaynağıyla yeniden doğrulanmalı | Maliye, tarife yasaları, yaptırım politikası | Dolaylı | "Kongre 31 Mart'a kadar tarife yetkisini sınırlayan yasa geçirir mi?" |
| 6 | **Rusya–Ukrayna** | Üçlü görüşmeler gündemde. Rosneft ve Lukoil'e yaptırımlar sürüyor ([RFE/RL](https://www.rferl.org/a/ukraine-russia-war-sanctions-trump-putin-oil-rosneft-lukoil/33567454.html)) | Gaz, buğday, petrol iskontosu | Rus petrolü ithalatı, ikincil yaptırım | "OFAC 31 Mart'a kadar Rus petrolüne ilişkin genel lisans yayımlar mı?" |
| 7 | **Fransa ve euro bölgesi maliyesi** | OAT-Bund farkı 30 Eylül'de 120 baz puanı aştı, 2012'den bu yana ilk kez. 2027 seçimi gündemde ([City AM](https://www.cityam.com/?p=2462034)) | Euro, ECB, risk primi | Ana ihracat pazarı | "OAT-Bund farkı 31 Aralık'a kadar 150 baz puanı aşar mı?" |
| 8 | **Körfez altyapısı ve Kızıldeniz** | 8 Kasım'da Riyad'da Aramco binasına füze isabeti; sınırlı hasar (Baird/Reuters) | Petrol riski primi | Navlun, Süveyş | "Süveyş Kanalı aylık geçişleri Aralık'ta Ekim'in altında kalır mı?" |
| 9 | **İkincil yaptırım riski** | İran ve Rusya yaptırım ağları genişliyor (bkz. 4 ve 6) | Muhabir bankacılık, dolar erişimi | Türk bankaları, dış ticaret finansmanı | Tekil banka sorusu yok. Yalnız resmi liste olgusu |
| 10 | **Türkiye politika sürekliliği** | Süreç sinyalleri: takvim dışı PPK, rezerv, CDS | TL, CDS, akımlar | Doğrudan | §2.2'deki kurum ve veri soruları |

**Öncelik:** İlk 90 günde 1, 3, 4 ve 7 numaralı başlıklarda soru açılsın. Bunların takvimli kapanış kaynakları var: FOMC açıklaması, Çin Ticaret Bakanlığı, ICE ve EIA verisi, ECB ve Bundesbank verisi. 2 ve 6 ikinci dalgaya bırakılsın, çünkü "ilan" ile "yürürlük" ayrımı zor (bkz. §5).

---

## 4. "Şu olursa şu olur" senaryolarında tarafsızlık

1. **Olgu ile beyanı ayır.** Her cümle üç sınıftan biridir: *doğrulanmış olgu* (A/B iki kaynak), *taraf beyanı* ("X Bakanlığı açıkladı"), *bizim çıkarımımız* ("Planck hesabı"). Taraf beyanı olasılığı oynatmaz; beyanın yapılmış olması oynatabilir. "Ateşkes yakın" diyen bir elçinin sözü olgu değildir, söylenmiş olması olgudur.
2. **İddia ve inkâr simetrik yazılır.** Kalıp: "A tarafı şunu açıkladı. B tarafı reddetti. Bağımsız olarak doğrulanan: …, doğrulanamayan: …" Fiil nötrdür: "açıkladı, belirtti, reddetti". "İtiraf etti", "iddia etti" ya da "çarptı" kullanılmaz. Önce olguyu, sonra beyanı veren "doğruluk sandviçi" düzeni, beyanın tekrarlanarak güçlenmesini önler.
3. **Denge iddiada, ağırlık kanıtta.** Her iddiaya eşit yer vermek sahte denge üretir. BBC'nin 2018 iç rehberi, kabul görmüş bir olgu karşısında "inkârcı" ile denge kurmak gerekmediğini söyler. Tartışma politikaya ve hıza ilişkinse farklı görüşler yer alır ([Carbon Brief](https://www.carbonbrief.org/exclusive-bbc-issues-internal-guidance-on-how-to-report-climate-change/)). Quant için karşılığı: olguda denge aranmaz, olasılıkta karşı görüş geçişi zorunludur (Anayasa §3.6).
4. **Ayna senaryo zorunlu.** Her "X olursa" dalının yanında "X olmazsa" dalı aynı titizlikle yazılır. Tek dallı senaryo, okura X'in olacağını ima eder.
5. **Aktör yerine kurum ve araç.** "ABD yönetimi" değil, "Section 301 kapsamında USTR". "Tahran" değil, "IRIB'in aktardığı Devrim Muhafızları Donanması açıklaması". Bu dil hem tarafsızlık sağlar hem de kapanış kaynağını gösterir.
6. **Kaynak dengesi denetimi.** Çatışma konularında her iki tarafın resmi kaynağı izleme listesine alınır. Taraf medyası C katmanıdır ve tek başına olasılık oynatmaz. Haftalık bir denetim çalıştırması, olasılığı oynatan kanıtların kaynak dağılımını sayar.
7. **Yön hatası, kampa göre değil.** KARAR §1.4'teki ilke Quant'a aynen taşınır: döküm konu alanına ve "kötü sonucu fazla mı bekliyoruz?" sorusuna göre yapılır. Siyasi kampa göre yapılmaz.

---

## 5. Siyasi senaryoların puanlanması

### 5.1 Koşullu sorular

Metaculus'un koşullu çift yapısı uygun bir model: Bir *ebeveyn* ve bir *çocuk* soru vardır. Çocuk için "ebeveyn evet olursa" ve "hayır olursa" olasılıkları ayrı verilir. **Yalnız gerçekleşen dal puanlanır**, öteki dal normal bir evet/hayır sorusu gibi değerlendirilmez ([Metaculus](https://www.metaculus.com/questions/15205/introducing-conditional-pairs/)).

Quant için kurallar:

- Ebeveyn kendi başına geçerli bir sicil sorusu olmalı (§2'nin altı alanı) ve §9'a takılmamalı. **Siyasi aktör ya da süren dava ebeveyn olamaz.**
- Ebeveyn, çocuktan önce kapanmalı. İkisi de en fazla 90 gün içinde kapanmalı.
- Gerçekleşmeyen dal "koşul gerçekleşmedi" diye kaydedilir. Bu ne *belirsiz* ne *hatalı soru* sayılır; karnede ayrı satırda sayılır.
- Okura iki sayının farkı (ör. "Abluka kalkarsa %22, kalkmazsa %61") etki büyüklüğü olarak sunulur. "Koşullu fark" ayrı bir ölçüdür ve kendi kalibrasyonu ancak 30 çift kapandıktan sonra konuşulur.
- Pilotta en fazla 5 açık koşullu çift. Hakem yükü iki katıdır.

### 5.2 Kapanış kriteri yazılabilirliği: siyasi kelimelerin tuzakları

| Belirsiz kelime | Kesin karşılığı |
|---|---|
| "Ateşkes" | "Tarafların ikisinin resmi kanalından ilan edilen ve Reuters ile AP'nin 'ateşkes yürürlüğe girdi' diye aktardığı" |
| "Tarife getirir" | "Federal Register'da yayımlanmış ve yürürlük tarihi son tarihten önce olan başkanlık kararı". Sosyal medya duyurusu sayılmaz |
| "Yaptırım kaldırılır" | "OFAC SDN listesinden çıkarılma ya da genel lisans yayımlanması" (resmi OFAC sayfası) |
| "Hürmüz kapanır" | "EIA ya da IEA'nın bir takvim haftası için Hürmüz akışını X milyon varil/günün altında raporlaması" |
| "Anlaşma imzalanır" | "Metnin her iki tarafın resmi sitesinde yayımlanması" |

**Kâhin testi** siyasi sorularda iki ek kontrole tabi olsun: (1) *ilan ile yürürlük* aynı soruda karışmasın; (2) kapanış kaynağı **taraflardan birinin tek başına beyanı olmasın**. Kaynak resmi bir kayıt (Resmi Gazete, Federal Register, OFAC) ya da iki ajans olmalı.

### 5.3 Belirsiz kapanış riski

- Siyasi sorularda iptal oranı alan bazında izlensin. Hedef ≤%5. %10'u aşarsa o alanda yeni soru açılması durdurulsun ve kriter şablonu yeniden yazılsın.
- Kriterde "son tarihten sonra yapılan geriye dönük ilan sayılmaz" cümlesi standart olsun.
- Savaş ve abluka sorularında olay tarihi ile raporlama tarihi arasındaki gecikme (EIA haftalık verisi gibi) kriterde yazılsın.

---

## (a) En önemli 5 öneri

1. **Siyasi rejim katmanı:** GPR, CDS ve örtük oynaklıktan kurallı olağan/gerilim/kriz değişkeni. Ortalamayı değil oynaklığı ve kuyrukları oynatır. Siyaset Motor'a girer, Claude ayarına kalmaz.
2. **Türkiye politika sürprizi veri seti:** 2012–2026 PPK kararları ile anket medyanı karşılaştırılarak sürpriz tabanı çıkarılsın. `tcmb-tahmin-hata.json` ile aynı dosya ailesinde tutulsun.
3. **Aktör değil olay sınıfı kuralı:** Siyasi olay olasılığın ne konusu ne koşulu olur. Kimliği belirlenebilir kişinin görevi (ad yazılmasa da) ve süren dava Quant'ta yasaktır. Kurum ve veri çıktıları serbesttir.
4. **Üç katmanlı yazım ve dil tablosu:** olgu / mekanizma / olasılık. Nötr fiiller, ayna senaryo zorunluluğu, tekil banka sorusu yok.
5. **Koşullu çift ve siyasi kriter sözlüğü:** Yalnız gerçekleşen dal puanlanır. Ebeveyn kişi ya da dava olamaz. "Ateşkes", "tarife", "yaptırım" gibi kelimelerin resmi kayıtla yazılmış karşılıkları kullanılır.

## (b) Diğer uzmanlarla olası çatışmalar

- **Tahmin bilimcisi**, rejim katmanının aşırı uydurma (overfitting) riski taşıdığını söyleyebilir. Cevabım: Eşikler önceden yazılır, geriye dönük sınanır ve karnede rejimsiz Motor ile kıyaslanır.
- **Davranışsal finans ve iletişim uzmanı**, Türkiye okurunun asıl merak ettiği siyasi soruların yasak kaldığını ve kanalın "kuru" kalacağını söyleyebilir. Hukuki ve güven asimetrisi nedeniyle bu sınırı kabul ediyorum. Merak, mekanizma katmanıyla karşılanır.
- **Piyasa ve mikro yapı uzmanı**, siyasi belirsizliğin opsiyon fiyatlamasında zaten bulunduğunu, ayrıca endekse gerek olmadığını söyleyebilir. USD/TRY opsiyon verisine erişim zayıf. Bu yüzden endeks yedek girdi olarak kalmalı.
- **Ürün uzmanı**, koşullu çiftleri ilgi çekici bir format olarak çoğaltmak isteyebilir. Hakem yükü nedeniyle tavan 5 olmalı.

## (c) Karar vericiye sorular

1. Quant, 15.12.2026'dan sonra News'te açılacak "süreç sorularını" koşul olarak kullanabilir mi? Benim önerim: hayır.
2. Tekil banka ve kamu kurumu adları (5411 md. 74 riski) için hukuki görüş alınacak mı? Alınana kadar tam yasak uygun mu?
3. Rejim değişkeni okura gösterilsin mi ("Bugün rejim: gerilim"), yoksa yalnız yöntem sayfasında mı kalsın? Önerim: yalnız yöntem sayfası. Kendi başına sözel ölçek gibi okunur.
4. Türkçe gazete arşivinden kendi belirsizlik sayımımızı kurmak için kaynak ayrılacak mı? Bu, Kilic ve Balli yöntemiyle yapılabilir; ayda birkaç saatlik iş.
5. İran, Rusya ve Çin gibi aktörlerin resmi medyası izleme listesine C katmanı olarak alınabilir mi?

## (d) 90 günde başarı ölçüsü

| Ölçü | Hedef |
|---|---|
| §9 ya da bu rapordaki kural ihlali (kişi, dava, seçim, tekil banka) | 0 |
| Siyasi ve jeopolitik sorularda iptal oranı (belirsiz + hatalı) | ≤%5 |
| Kırılma noktalarından 1, 3, 4 ve 7'de açılan ve kapanan soru | En az 12 kapanış |
| Rejim katmanlı Motor ile rejimsiz Motor kıyası (fiyat eşiği soruları) | Brier farkı örneklemle birlikte raporlanmış; iddia yok |
| PPK sürpriz veri seti | Tamamlanmış, kaynaklı, sicile bağlı |
| Kaynak dengesi denetimi | Olasılığı oynatan kanıtların %100'ü A/B kaynaklı; taraf beyanı tek başına sıfır kez oynatmış |
| Düzeltme ya da hukuki uyarı | 0 |
