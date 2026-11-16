# 15 · Bilim Metodolojisi ve İç Hakemlik: Quant'ın Denetim Mimarisi

*Uzman raporu · 17.11.2026 · Öneridir; hiçbir kural dosyasına dokunulmadı.*

## Özet

Quant'ta denetimin asıl sorunu, denetçinin sayısı değil **bağımsızlığıdır**. Bütün masalar Claude olduğu için "üç bağımsız geçiş" ve "ayrı editör" görev olarak ayrıdır ama hata olarak **korele** kalır. Bu yüzden önerim, denetimi Claude'un Claude'u okumasına değil, Claude'un kör noktalarını paylaşmayan dört hakeme dayandırmak: **gerçeklik** (kapanış), **piyasa** (opsiyon fiyatından çıkan olasılık), **kod** (deterministik yeniden hesap) ve **önceden kilitlenmiş kayıt** (ön kayıt ve körleme). Yusuf'un zamanı her kartı onaylamaya değil, soru ve Motor tasarımının kilitlenmesine ve istisnalara harcanmalı.

---

## 0. Depoda bulduklarım (denetim gerektiren somut durumlar)

1. **İki sicil birbirini tutmuyor.** `data/quant.json` ile `data/sorular.json` aynı sorulara farklı sayı veriyor: Dolar/TL 60 → 55 (Motor 65) ile 46 (Motor 56); Brent 110 → 60 (75) ile 54 (69); altın 4.500 → 45 (57) ile 53 (65). Hangisinin yayınlanacağı belli değil. Bu bir **süreç hatası**: tek doğru kaynak yok.
2. **Model ile kriter birbirine uymuyor.** `quant/motor.py` dokunma olasılığını sürekli izleme varsayımıyla hesaplıyor. Oysa Brent kriteri "günlük **kapanış**", altın kriteri "LBMA PM **fiksi**". Ayrık gözlem, sürekli izlemeden daha az dokunma üretir. Motor bu yüzden sistematik olarak yüksek çıkar. Literatürde bunun bilinen bir düzeltmesi var: bariyer `exp(0,5826·σ·√Δt)` kadar kaydırılır ([Broadie, Glasserman, Kou 1997](https://ideas.repec.org/a/bla/mathfi/v7y1997i4p325-349.html)).
3. **Claude ayarı hep aynı yöne gidiyor.** Açık sekiz Quant sorusunun yedisinde ayar negatif (−3 ile −15 arası); Brent sınıra dayanmış (−15). İki açıklama mümkün. Ya Claude kötümser, ya da Motor'un yapısal yüksekliğini (2. madde, sıfır sürüklenme, opsiyon oynaklığındaki risk primi; bkz. [Carr ve Wu 2009](https://ideas.repec.org/a/oup/rfinst/v22y2009i3p1311-1341..html)) her seferinde elle telafi ediyor. İkincisiyse bu bir **yargı** değil, yargı kılığına girmiş bir **model hatasıdır**. Yeri Motor'dur; orada açıkça yazılır ve sınanır.
4. **Motor'un girdileri elle seçiliyor.** `usdtry_vol = 10`, `NASDAQ_BETA = 1.07`, `nasdaq_vol_sabit` kapısı ve "OVX güncel değil, hesaplanmadı" notu (`motor-gecmis.json`) şunu gösteriyor: Motor deterministik ama **parametresini seçen Claude**. Motor Claude'dan bağımsız değil. Bu, finans araştırmasındaki "çatallanan yollar" sorunudur. [Menkveld ve ark. 2024](https://pure.eur.nl/en/publications/nonstandard-errors/) aynı veriyi alan 164 ekibin büyük ölçüde farklı sonuçlara vardığını gösterdi ("standart olmayan hata"). Akran incelemesi bu dağılmayı azaltıyor.
5. **Bant dışı soru.** Fed sorusu Motor 100, yayın 97. Anayasa §2'ye göre sessiz izlemede olmalı.

Bu beş bulgunun hiçbiri "Claude'a tekrar baktırma" yöntemiyle yakalanmazdı. Hepsi **kodla, kayıt karşılaştırmasıyla ya da modelin kendi varsayımını kriterle karşılaştırarak** yakalandı. Raporun geri kalanı bu gözleme dayanıyor.

---

## 1. Beş gelenekten beş mekanizma

| Gelenek | Pratik | Quant'a uyarlama |
|---|---|---|
| **Parçacık fiziği** | **Kör analiz.** Sinyal bölgesi ya da sonuç gizli bir sabitle kaydırılır. Yöntem, kesimler ve sistematik hatalar sonucu görmeden kilitlenir. Kutu bir kez açılır ([Klein ve Roodman 2005](https://ar5iv.labs.arxiv.org/html/physics/0312102)). CMS'te analiz alt grupta savunulur, bağımsız analiz inceleme komitesi körlemeyi açma izni verir, sonra bütün iş birliği yorum yapar, en son yayın komitesi okur. Bir makalenin onay süreci dört ay sürebilir ([Symmetry](https://www.symmetrymagazine.org/article/behind-the-scenes-of-the-cms-experiments-1000th-paper)). | **Motor şablonu kör kilitlenir** (§4). "Körlemeyi açma" anı: Motor sayısının ve Claude'un kör tahmininin birlikte açıldığı an. İş birliği çapında incelemenin karşılığı **yayın sonrası açık itiraz kaydı**. |
| | **Bağımsız tekrar.** ATLAS ile CMS aynı soruyu farklı dedektörle sınar. OPERA'nın ışıktan hızlı nötrino ölçümünü ([2011–12](https://en.wikipedia.org/wiki/2011_OPERA_faster-than-light_neutrino_anomaly)) sonunda gevşek bir fiber kablo açıkladı. Aynı ışın hattındaki ICARUS ölçümü de sonucu çürüttü. Ders şu: hata çoğu zaman yargıda değil, **veri boru hattındadır**. | Veri hatası için ikinci analiz değil, **ikinci veri kaynağı**: her fiyat girdisi iki bağımsız kaynaktan çekilir, %0,5'i aşan fark yayını durdurur. |
| **Klinik araştırma** | **Ön kayıt** (birincil sonuç, analiz planı, durdurma kuralı veriden önce) ([Nosek ve ark. 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC5856500)). **Bağımsız veri izleme kurulu (DMC):** ara karşılaştırmalı veriyi yalnız kurul görür. Durdurma sınırları körlemeyi açmadan önce yazılır. Sponsor ile kurul arasında "güvenlik duvarı" vardır ([FDA 2006](https://fda.gov/media/75398/download)). | **Soru + kriter + Motor şablonu + kapanış kaynağı açılıştan önce hash'lenir** (git commit). DMC'nin karşılığı **Hakem masası**: ara karneyi (Motor'a karşı beceri) üretim masaları görmez. Böylece ayar, karneye bakarak "kovalanmaz". |
| **İstihbarat analizi** | **ICD 203:** dokuz zanaat standardı; aralarında kaynak kalitesini tanımlamak, varsayımı bilgiden ayırmak, alternatif analiz ve "yargının neden değiştiğini açıklamak" var. Ayrıca bağımsız bir **analitik ombudsman** ve ürün değerlendirme programı ([ODNI](https://irp.fas.org/dni/icd/icd-203.pdf)). **Rakip Hipotezler Analizi (ACH)**, Şeytanın Avukatı, Kırmızı Takım, "Ya olursa?" ([CIA Tradecraft Primer 2009](https://www.stat.berkeley.edu/users/aldous/157/Papers/Tradecraft%20Primer-apr09.pdf)). **Team A/Team B (1976)**: dışarıdan kurulan B takımının Sovyet kapasitesini sonradan abarttığı görüldü ([NYRB 1980](https://www.nybooks.com/articles/1980/11/06/the-cias-tragic-error/)). Karşı ekip, kendi önyargısını da getirir. | **ICD 203'ün 3. ve 7. standardı** Quant kartının kuralı olur. Varsayım ile olgu ayrı satırda yazılır; her güncellemede "neden değişti" tek cümle. **ACH**, "Ne Olur?" zincirinde kullanılır: her halkada en az iki rakip mekanizma ve hangi verinin bunları ayırt edeceği. Team B dersi: karşı görüş geçişi **puanlanır** (aşağıda). Puanlanmayan muhalefet bir tiyatrodur. |
| **Havacılık güvenliği** | **ASRS:** gönüllü, gizli, cezasız bildirim. 2025'te 121.128 rapor, günde ~485. Rapor kimliksizleştirilir, çıkan dersler aylık CALLBACK bülteniyle dağıtılır ([NASA ASRS](https://asrs.arc.nasa.gov/docs/ASRS_ProgramBriefing.pdf)). **Suçlamasız otopsi:** tetikleyiciler önceden tanımlıdır; "insanı düzeltemezsin, sistemi düzeltirsin"; "incelenmemiş otopsi hiç yazılmamış gibidir" ([Google SRE](https://sre.google/sre-book/postmortem-culture/)). | **Ramak kala defteri.** Her çalıştırma, yayına çıkmayan hatayı da kaydeder: editörün yakaladığı, iki sicilin çeliştiği, verinin eksik çıktığı durumlar. Otopsi tetikleyicileri §3'te. Otopsi "Claude yanıldı" diye değil, hangi kural ya da girdi hatayı mümkün kıldı diye yazılır. |
| **Süper tahminciler** | GJP'de eğitim (referans sınıfı, ortalama alma), takım çalışması ve **izleme** (en iyileri seçkin takımlarda toplamak) hem kalibrasyonu hem ayırt ediciliği artırdı ([Mellers ve ark. 2014](https://escholarship.org/uc/item/4rg4n9vr)). | Quant'ta "kişi" yok; izlenecek olan **talimat sürümüdür**. Her geçiş türü (dış, iç, karşı, kör Claude) ayrı Brier'le izlenir. Değer katmayan geçiş ağırlık kaybeder. |

Bir de gürültü denetimi var. Kahneman ve ark., aynı poliçeye sigortacıların verdiği fiyatlarda medyan **%55** fark buldu; yöneticilerin beklentisi %10'du ([strategy+business](https://strategy-business.com/article/How-noisy-is-your-company)). Quant'ın karşılığı: aynı soruyu aynı girdilerle ayda bir **yeniden çalıştırıp** dağılmayı ölçmek (§3, periyodik katman).

---

## 2. Yapay zekâ ajanlarıyla bağımsızlık

### 2.1 Aynı modelin kendini denetlemesinin sınırları

- **Hatalar korele.** 350'den fazla modelde, iki model birlikte yanıldığında aynı yanlış cevabı verme oranı Helm'de ~%60; rastlantı beklentisi ~%33. Aynı şirketten ve aynı mimariden gelen modellerde korelasyon daha yüksek. Daha isabetli modellerde de daha yüksek ([Kim ve ark., ICML 2025](https://arxiv.org/html/2506.07962v1)). Aynı Claude'un üç çalıştırması bu ölçeğin en uç noktasıdır: aynı ağırlıklar, aynı eğitim verisi.
- **Kendini kayırma.** LLM değerlendiriciler kendi metinlerini tanıyor ve daha yüksek puanlıyor ([Panickssery ve ark., NeurIPS 2024](https://arxiv.org/abs/2404.13076v1)). Kim ve ark. da yargıç modelin kendi hatasını paylaşan cevabı "doğru" saydığını buldu.
- **Dış geri bildirimsiz öz-düzeltme işe yaramıyor.** Modele "tekrar kontrol et" demek akıl yürütme hatalarını düzeltmiyor, bazen bozuyor ([Huang ve ark., ICLR 2024](https://arxiv.org/abs/2310.01798)).
- **Çapalanma.** LLM'ler önlerine konan sayıya doğru kayıyor ([Anchors in the Machine, 2025](https://arxiv.org/pdf/2511.05766); küçük açık modellerle, genelleme sınırlı). İnsan medyanını gören GPT-4 ve Claude 2 isabeti artırdı, ama bu, iki tahminin basit ortalamasından kötü kaldı ([Schoenegger ve ark. 2024](https://arxiv.org/abs/2402.19379)). Bu bulgu, uzlaştırmanın sözel değil **mekanik** yapılmasının gerekçesidir (§4).

**Sonuç:** Anayasa §3'teki "üç bağımsız geçiş" Quant'ta *talimat çeşitliliği* sağlar, *hata bağımsızlığı* sağlamaz. Medyanı almak gürültüyü azaltır, ortak yanlılığı azaltmaz. Kartta "üç bağımsız hesabın aralığı" ifadesi bu nedenle fazla iddialı. Önerim "üç ayrı hesabın aralığı".

### 2.2 Bağımsızlık merdiveni (güçlüden zayıfa)

| Basamak | Hakem | Neyi yakalar | Neyi yakalayamaz |
|---|---|---|---|
| 1 | **Gerçeklik** (kapanış, kalibrasyon) | Her şeyi, ama gecikmeli ve istatistiksel | Tekil hatayı zamanında |
| 2 | **Piyasa** (opsiyon/vadeli fiyatından çıkan olasılık, FedWatch) | Motor ve ayarın piyasadan sapmasını | Piyasanın kendi risk primini |
| 3 | **Kod** (deterministik yeniden hesap, şema doğrulama, sicil karşılaştırma) | Veri, hesap, süreç hatası | Yargı hatası |
| 4 | **Farklı model ailesi** (yalnız denetimde) | Claude'a özgü kör noktaların bir kısmı | Tüm LLM'lerin ortak hatası |
| 5 | **Farklı bilgi erişimi** (kör geçiş: Motor sayısını, haberi ya da taslağı görmeyen çalıştırma) | Çapalanma, hikâyeye kapılma | Ortak model yanlılığı |
| 6 | **Farklı talimat** (karşı görüş, şeytanın avukatı) | Tek yönlü gerekçe | Korele hata |

Bugünkü sistem ağırlıkla 5. ve 6. basamakta çalışıyor. Önerim **1–3'ü zorunlu, 4'ü periyodik** yapmak. 4. basamak Anayasa §7 ("bütün masalar Claude") ile çelişebilir. Bunu yalnız *üretimde değil denetimde* olmak koşuluyla Yusuf'a soruyorum (bkz. c).

Piyasa hakemi, Quant'ın News'e göre en büyük avantajı. Varlık fiyatı eşiği sorularında opsiyon zinciri, risk-nötr bir olasılık verir. Bu olasılık, Claude'un üretmediği bir sayıdır. Motor ile risk-nötr olasılık arasındaki fark >10 puansa kart "piyasa ile ayrışıyoruz" satırı taşımalı ve fark puanlanmalı.

### 2.3 İnsanın en verimli denetim noktası

Yusuf'un karşılaştırmalı üstünlüğü hesap kontrolü değil (bunu kod daha iyi yapar). Üstünlüğü **soru seçimi, kırmızı çizgi ve "bu mantıklı mı?" sezgisi**. Hata ekonomisi de bunu destekliyor: kötü yazılmış bir kriter, soruyu ya "hatalı soru" iptaline ya da kalıcı yanlış puana mahkûm eder ve kayıt geri alınmaz. Yanlış bir ayar ise tek bir Brier'dir. Önerilen üç nokta:

1. **Ön kayıt onayı (açılışta, soru başına ~2 dk):** soru, kriter, kapanış kaynağı, Motor şablonu. Yusuf burada "bu kriter Brent'in kapanışını mı, gün içini mi ölçüyor?" türü soruyu sorar.
2. **İstisna onayı (yayında):** her kart değil, yalnız bayraklı kartlar: |ayar| ≥10, geçiş aralığı >15, piyasa ile fark >10, yeni Motor şablonu, kırmızı eşik.
3. **Aylık kalibrasyon toplantısı (30 dk):** karne, ramak kala sayımı, otopsiler. Kural değişikliği burada karar bulur.

---

## 3. Denetim mimarisi

Maliyet birimi: **Ç** = bir Claude çalıştırması, **dk** = Yusuf'un dakikası. Rakamlar tahmindir; ilk ay ölçülüp düzeltilmeli.

| Katman | Mekanizma | Ne zaman | Maliyet | Yakaladığı hata türü |
|---|---|---|---|---|
| **K0 · Ön kayıt** | Soru + kriter + kapanış kaynağı + Motor şablonu + ön-otopsi commit edilir, hash sicile yazılır. Kâhin testi ve **model–kriter uyum testi** (ayrık/sürekli izleme, kapanış/gün içi, hangi kur) | Açılışta | 1 Ç + Yusuf 2 dk | Süreç, model (yapısal) |
| **K1 · Kod denetimi** | `motor.py` yeniden çalıştırılır; girdi iki kaynakla çekilir; iki sicil karşılaştırılır; %3–97, ±15, bant ve log-odds hesabı (`sicil.py lr`) | Her yayın, otomatik | ~0 Ç | Veri, hesap, süreç |
| **K2 · Kör ikinci analiz** | Motor'u ve taslağı görmeyen bir çalıştırma kendi tahminini yazar (§4) | Ana akış ve bayraklı sorular | 1–2 Ç | Çapalanma, yargı |
| **K3 · Editör** | `EDITOR.md`'nin Quant uyarlaması (aşağıda): SPK dili, sunum, ICD 203 ayrımı, piyasa farkı | Her yayın | 1 Ç | İletişim, kırmızı çizgi |
| **K4 · Yayın sonrası** | 24 saat açık itiraz kaydı (okur, DM); olgu hatası aynı gün "Düzeltme:", olasılık hatası sicilde `duzeltme` | Sürekli | 0,2 Ç/gün | Olgu, iletişim |
| **K5 · Aylık kalibrasyon denetimi** | Hakem masası: Planck/Motor/piyasa/%50 Brier, **ayar yönü testi** (ayarların işareti ve ortalaması), geçiş türü başına Brier, **gürültü denetimi** (5 soruyu aynı girdiyle yeniden çalıştır, dağılmayı ölç), ramak kala sayımı | Ayın ilk pazartesisi | 3–4 Ç + 30 dk | Model (sistematik), yargı (yanlılık), gürültü |
| **K6 · Üç aylık dış gözden geçirme** | Farklı model ailesi (ya da insan uzman) Motor şablonlarını ve 10 rastgele kartı ICD 203 ölçütleriyle puanlar; yöntem belgesi halka açık | Çeyrekte bir | 1 gün iş + 60 dk | Ortak kör nokta |
| **K7 · Olay bazlı otopsi** | Tetikleyiciler: §5 ıskası; ±15 sınırına dayanan ayarın ters çıkması; yayından sonra bulunan veri hatası; iki sicil çelişkisi; "hatalı soru" iptali; Motor'un hesaplanamadığı gün | Olaydan sonra 7 gün içinde | 1–2 Ç + 15 dk | Hepsi; öğrenme |

**Quant editörü, News listesinden şu farklarla ayrılır:** A bölümü fiyat verisinde "iki kaynak" yerine **iki veri sağlayıcı ve %0,5 tolerans** kullanır. B bölümüne SPK sözcük listesi (al, sat, tut, topla, hedef fiyat, fırsat, kaçırma) ve "yön ima eden görsel" eklenir. E bölümüne model–kriter uyumu ve piyasa farkı eklenir. Quant için hüküm, yayın yeniden açılana kadar her durumda **YUSUF'A SOR** olarak kalır.

**Ön koşul:** K1'den önce tek doğru kaynak kararı gerekir. Önerim `data/sorular.json`. `quant.json` ondan **türetilen** bir görünüm olmalı, elle yazılmamalı.

---

## 4. Ön kayıt ve kör analiz finans tahmininde

Soru şu: Claude ayarı Motor'dan önce mi yazılmalı, sonra mı? İki sıranın da ayrı bir riski var:

- **Motor önce, Claude sonra.** Claude Motor'a çapalanır ve yetersiz ayar yapar (Tversky-Kahneman çapalama). Bugünkü sistem bu.
- **Claude önce, Motor sonra.** Motor'un serbest parametreleri (σ kaynağı, μ, referans sınıfı, bariyer tanımı) Claude'un sayısına doğru "ayarlanır". Bu, çatallanan yollar sorunudur ve daha sinsidir, çünkü Motor "deterministik" etiketi taşır.

**Önerim: ikisini de kilitleyen dört adımlı sıra.**

1. **Şablon kilidi (soru açılmadan, soru türü başına bir kez):** Her soru türünün Motor şablonu (ör. "fiyat dokunma, günlük kapanış": BGK düzeltmeli bariyer, σ = ilgili örtük oynaklık endeksi, endeks yoksa 1 yıllık gerçekleşen oynaklık, μ = vadeli eğriden, yoksa 0) kod olarak commit edilir. Parametre seçimi **kural**dır, soru başına seçilmez. Kural dışı parametre (`nasdaq_vol_sabit` gibi) yalnız sicilde gerekçeli `sapma` kaydıyla kullanılır ve Hakem tarafından sayılır. Klinik ön kaydın karşılığı budur.
2. **Kör Claude:** Motor sayısını görmeyen bir çalıştırma, taban oranı ve kanıtla kendi olasılığını yazar. Sicile `p_kor` olarak commit edilir. Fizikteki "gizli sonuç" yöntemi budur.
3. **Körlemeyi açma:** Motor hesaplanır. İki sayı ve isteğe bağlı piyasa olasılığı yan yana konur.
4. **Mekanik uzlaştırma ve sınırlı ayar:** Başlangıç noktası Motor ile `p_kor`'un log-odds ortalamasıdır (ağırlık başta 0,5; 30 kapanıştan sonra karneye göre). Claude bu noktadan en fazla ±5 puan oynatabilir, gerekçeyi tek cümle yazar. Anayasa'nın ±15 sınırı Motor'a göre korunur.

Bu sıra, her soru için üç puanlanabilir sayı bırakır: Motor, kör Claude ve yayın. Böylece çapalanmanın değer katıp katmadığı **ölçülür**, tartışılmaz. Schoenegger bulgusu, mekanik ortalamanın sözel uzlaştırmadan iyi olabileceğini düşündürüyor. Bu bir hipotezdir, Quant verisiyle sınanmalı.

**Ek kural (kör nokta yasası):** Aynı yönde art arda 5 ayar varsa (bugün 8 sorudan 7'si negatif) Hakem bunu **model hatası şüphesi** olarak işaretler. Düzeltme ayarda değil, Motor şablonunda yapılır ve yeni şablon sürümü ön kayda girer. Böylece öğrenme kişide (çalıştırmada) değil kuralda birikir.

---

## 5. Hata taksonomisi ve öğrenen kayıt

| Tür | Tanım (Quant örneği) | Yakalama yöntemi | Sorumlu kural dosyası |
|---|---|---|---|
| **Veri** | Yanlış/eski girdi: OVX'in 5 Kasım değeri, yanlış kur türü | K1: iki sağlayıcı, tazelik damgası (>1 iş günü → hesap yok) | `motor.py` girdi şeması |
| **Model** | Motor'un yapısı kriteri ölçmüyor: sürekli/ayrık izleme, risk-nötr/gerçek olasılık | K0 uyum testi, K5 ayar yönü testi, K6 | Motor şablonu |
| **Yargı** | Ayar ters ya da aşırı; çapalanma; hikâyeye kapılma | K2 kör analiz, K5 geçiş türü Brier'i | Talimat sürümü |
| **İletişim** | Doğru sayı, yanlış okuma: yön ima eden görsel, "kesin", eksik ters taraf | K3 editör, K4 okur itirazı, aylık anlama anketi | Sunum standardı |
| **Süreç** | Kural doğru ama uygulanmadı: iki sicil, bant dışı soru, kendi işini kapatan çalıştırma | K1 şema/kayıt kontrolü, K7 | Organizasyon (§7) |

**Kayıt şeması** (`data/hata-defteri.json`, ramak kala dahil; yalnız Hakem ve otopsi yazar):

```json
{
  "id": "H-2026-11-001",
  "tarih": "2026-11-17",
  "tur": "model | veri | yargi | iletisim | surec",
  "seviye": "ramak_kala | yayinda_duzeltildi | puanlandi",
  "soru": "q-brent-110",
  "nasil_yakalandi": "K0 | K1 | K2 | K3 | K4 | K5 | K6 | K7 | okur",
  "tespit_gecikmesi_gun": 0,
  "etki_puan": 4,
  "aciklama": "Motor sürekli izleme varsayıyor, kriter günlük kapanış",
  "katki_eden_kosul": "Şablonda kriter-uyum alanı yok",
  "aksiyon": {"dosya": "quant/motor.py", "degisiklik": "BGK düzeltmesi", "sahip": "Yusuf onayı", "durum": "acik"},
  "tekrar_sayisi": 1
}
```

**Öğrenme döngüsü:** Aynı `katki_eden_kosul` üç kez tekrarlanırsa kural değişikliği önerisi Yusuf'a gider (EDITOR.md'deki haftalık sayımla aynı mantık). Aksiyonu açık kalan otopsi aylık karnede "kapanmamış ders" olarak görünür. İzlenecek ana ölçü **hangi katmanın neyi yakaladığıdır**. Hiçbir şey yakalamayan katman bütçeden düşer; yakalanmadan yayına sızan tür yeni katman ister.

---

## 6. Denetimin aşırısı ve denetim bütçesi

Aşırı denetimin üç bedeli var. (1) **Hız:** Quant'ın değeri takvime bağlı. Önizleme veriden önce çıkmazsa sıfırdır. (2) **Sahte güven:** aynı modelin beş kez okuması, korele hatayı beş kez onaylar ve "beş kez denetlendi" duygusu yaratır. Bu, hiç denetlenmemekten daha tehlikelidir. (3) **Sulandırma:** her şey bayraklanırsa Yusuf bayrağı okumayı bırakır.

**Denetim bütçesi**, denetim çabasını beklenen kayba göre dağıtan önceden yazılı bir tavandır:

- **Kural:** Bir katman, *yakaladığı hata sıklığı × hatanın bedeli* maliyetini aşıyorsa kalır. Bedel sıralaması (geri alınamazlıktan): kırmızı çizgi/SPK > kriter hatası > veri hatası > yargı > sunum.
- **Tavan önerisi:** Kod denetimi sınırsız (bedava). LLM denetimi, üretim çalıştırmasının en fazla **1,5 katı**. Yusuf için haftada en fazla **60 dakika** (ön kayıt + istisna) ve ayda 30 dakika toplantı. Tavan aşılıyorsa çözüm daha çok denetim değil, daha az soru açmaktır.
- **Ayarlanabilir sıklık (kabul örneklemesi):** Endüstriyel muayenenin normal/sıkı/gevşek geçiş kuralları uyarlanır ([ISO 2859-1 geçiş kuralları](https://www.sqconline.com/switching-rules-iso-2859-1)). Bir katman art arda 20 kontrolde hiçbir şey yakalamazsa örneklemeye geçer (her 3 karttan 1'i). Ardışık 5 kontrolün 2'sinde hata çıkarsa tam ve sıkı moda döner. K0 ve K1 hiçbir zaman gevşemez.
- **Durma noktası:** Ek bir denetim katmanı, yeni bir **bağımsızlık basamağı** (§2.2) getirmiyorsa eklenmez. Dördüncü bir Claude okuması, ilk üçün yakaladığını yakalar.

---

## (a) En önemli 5 önerim

1. **Tek doğru kaynak ve kod denetimi önce.** `sorular.json` tek kayıt olsun, `quant.json` ondan türetilsin. K1 (yeniden hesap, iki veri sağlayıcı, tazelik, sicil karşılaştırma) her yayında otomatik çalışsın. Gerekçe: bulduğum beş sorunun hepsi bu düzeyde.
2. **Motor şablonu ön kayıtla kilitlensin ve kriterle uyum testi zorunlu olsun.** Parametre seçimi soru başına değil, soru türü başına kural olsun. Fiyat eşiklerinde ayrık izleme düzeltmesi (BGK) eklensin.
3. **Kör Claude → körlemeyi açma → mekanik uzlaştırma.** `p_kor` sicile ayrı alan olarak girsin. Motor, kör Claude ve yayın ayrı puanlansın; uzlaştırma ±5 ile sınırlansın.
4. **Bağımsızlığı Claude dışında arayın:** piyasa olasılığı her fiyat sorusunda yan sayı olsun. Üç ayda bir farklı model ailesi ya da insan uzman denetimi yapılsın. Kartta "bağımsız" yerine "ayrı hesap" yazılsın.
5. **Hata defteri + ramak kala + kör nokta yasası.** Aynı yönde 5 ayar Motor hatası şüphesi sayılsın. Aynı katkı koşulu 3 kez tekrarlanırsa kural önerisi çıksın. Yusuf'un denetimi ön kayıt + istisna + aylık toplantıya, haftada 60 dakika tavanla yoğunlaşsın.

## (b) Diğer uzmanlarla çatışabilecek noktalar

- **Tahmin bilimi uzmanı** "üç geçiş medyanı"nı güçlü bir topluluk olarak savunabilir. Benim iddiam, aynı modelde bunun hata bağımsızlığı sağlamadığı ve kartta "bağımsız" denmemesi gerektiği.
- **Finans ve modelleme uzmanları** Motor'un esnek kalmasını (piyasa koşuluna göre σ seçimi) isteyebilir. Ben esnekliği sicilde gerekçeli ve sayılan `sapma` kaydına bağlıyorum.
- **Ürün ve medya uzmanı** hız ve takvim için istisna onayını bile yavaş bulabilir. Önizleme formatında K2 kör analizi atlanabilir; K0 ve K1 atlanamaz.
- **Mekanik uzlaştırma**, Yusuf'un "Claude hesap makinesi olmasın, yargı eklesin" isteğiyle gerilim yaratabilir. Yanıtım şu: yargı korunuyor, ama önce kör yazılıyor, sonra değeri ölçülüyor.
- **Farklı model ailesi** önerisi Anayasa §7 ve künye ("Tarama ve hesap: Claude") ile çelişebilir. Yalnız denetimde önerdim.

## (c) Karar vericiye sorular

1. Dış denetimde (yalnız üç aylık K6 ve gürültü denetimi) Claude dışı bir model kullanılabilir mi, yoksa "bütün masalar Claude" denetimi de kapsıyor mu?
2. Quant yeniden açıldığında her kartı mı onaylamak istersin, yoksa ön kayıt + bayraklı istisna modeline mi geçelim? Künye cümlesi buna göre değişir.
3. Tek doğru kaynak `sorular.json` mu olsun?
4. Açık 8 sorunun Motor'u model–kriter uyum testinden geçirilip düzeltilirse, bu bir **düzeltme kaydı** olarak mı işlensin (eski sayı görünür ve puanlanır), yoksa yalnız ileriye dönük mü uygulansın?
5. Piyasa olasılığı (opsiyon zincirinden) kartta görünür bir "rakip" mi olsun, yoksa yalnız iç denetimde mi kalsın?

## (d) 90 günde başarı ölçütleri (denetim alanından)

| Ölçüt | Hedef (90 gün) |
|---|---|
| Yayında bulunan veri ya da hesap hatası (K1'in kaçırdığı) | 0 |
| Ön kayıtlı soru oranı (hash'li kriter + şablon) | %100 |
| "Hatalı soru" iptali | ≤ %5 |
| İki sicil çelişkisi | 0 (otomatik kontrol) |
| Ramak kala kaydı | ≥ 1/hafta. Sıfır, iyi haber değil, kör nokta işaretidir. |
| Otopsiler 7 gün içinde yazılmış ve aksiyonu kapanmış | ≥ %80 |
| Ayar yönü testi | Art arda 5 aynı yönlü ayar Motor'a taşınmış |
| Gürültü denetimi (aynı girdi, yeniden çalıştırma) | Medyan fark ≤ 3 puan; aşılırsa talimat sıkılaştırılır |
| Kör Claude, Motor ve yayın ayrı Brier'i | Her kapanışta kayıtlı. Karşılaştırma ≥30 kapanışta, "şans olabilir" uyarısıyla. |
| Yusuf denetim süresi | ≤ 60 dk/hafta, kayıtlı |

Son not: 90 günde Quant'ın 30 fiyat eşiği kapanışına ulaşması zor (açık soruların çoğu 6–12 ay vadeli). Bu yüzden ilk 90 günün denetim başarısı **isabetle değil, süreç ölçütleriyle** ölçülmeli. İsabet iddiası, Anayasa §5'in 30 kapanış kuralını bekler.
