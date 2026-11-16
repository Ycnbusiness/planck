# 10 · Piyasalar ve Varlık Fiyatlama (Quant v2 yöntem ekibi)

*Uzman: piyasalar ve varlık fiyatlama (piyasada çalışan stratejistin bakışı) · 17.11.2026 · Okunanlar: BRIEF, ANAYASA v2, QUANT.md, ekip/KARAR.md, data/quant.json, data/sorular.json, data/quant-history.json, quant/motor.py. Hiçbir kural dosyasına dokunulmadı.*

## Ana tez

Piyasa fiyatı bir olasılık değildir. İçinde olasılık vardır, ama **riskin fiyatı** ile karışmış hâlde. Opsiyondan, vadeli kurdan ya da CDS'ten çıkan sayı "risk-nötr" olasılıktır. Yatırımcılar kötü senaryodan korunmak için fazladan para ödediği için bu sayı, gerçekleşme sıklığına göre kötü senaryoyu sistematik olarak büyük gösterir. Minneapolis Fed kendi opsiyon olasılıkları sayfasında bunu açıkça yazar: bu sayılar "gerçek dünyadaki olasılığın doğrudan tahmini değildir" ([Minneapolis Fed](https://www.minneapolisfed.org/banking/current-and-historical-market-based-probabilities)).

Quant'ın bugünkü motoru bu ayrımı yapmıyor. Claude ayarlarının neredeyse hepsinin aşağı yönlü olması (−5, −8, −10, −12, −15) büyük ölçüde bu farkın elle ve gerekçesi konmadan düzeltilmesi. Önerim şu: düzeltmeyi kurala bağlayıp motora taşımak, Claude ayarını da gerçekten bilgi taşıyan sapmalara bırakmak.

---

## 1. Piyasanın fiyatladığını okumak

| Araç | Cevapladığı soru | Türkiye'de erişim | Tuzak |
|---|---|---|---|
| **Faiz vadeli / OIS** (Fed fon vadelisi, SOFR; TL'de TLREF swapları) | "Merkez bankası X tarihinde faizi değiştirir mi?" | ABD: CME FedWatch, ücretsiz. TL: TLREF OIS eğrisi Bloomberg/Refinitiv'de, ücretsiz kaynak zayıf. Kısa vadeli DİBS ve repo ihaleleri vekil olarak kullanılabilir. | Kısa vadede risk primi küçük, en iyi öngörücü budur ([Gürkaynak, Sack, Swanson 2007](https://doi.org/10.1198/073500106000000387)). 6 ayın ötesinde vade primi karışır. |
| **Getiri eğrisi** (2Y–10Y, 10Y–3A) | "Piyasa sıkılaşma döngüsünün bitişini, resesyonu bekliyor mu?" | DİBS gösterge getirileri her gün yayımlanıyor (Gedik ve benzeri bültenler, BIST). | TL eğrisi uzun süredir ters: Ağustos 2026'da 2Y %40,85, 10Y %34,80 ([Gedik DİBS bülteni, 24.08.2026](https://cdn.gedik.com/cdn/bulletin/2026/08/24/DIBS_Bulten_24_08_2026_bace32ab.pdf)). Türkiye'de ters eğri resesyon değil dezenflasyon beklentisi demek; ABD kuralları buraya taşınamaz. |
| **Enflasyona endeksli tahvil – nominal tahvil farkı** | "Piyasa 1–5 yılda ortalama ne enflasyon bekliyor?" | TÜFE'ye endeksli DİBS'ler var, likiditesi sınırlı. | İçinde enflasyon risk primi ve likidite primi var. Aylık TÜFE sorusuna cevap vermez. |
| **5 yıllık CDS** | "Devletin borcunu ödememe riski nasıl fiyatlanıyor?" Kabaca yıllık temerrüt yoğunluğu ≈ spread / (1 − geri kazanım). 300 bp için yıllık %5'e yakın. | Günlük haber akışında bol (BloombergHT, AA). Ham seri ücretli. | CDS'in büyük kısmı küresel risk iştahıyla hareket eder, ülkeye özgü değildir ([Longstaff ve ark. 2011](https://doi.org/10.1257/mac.3.2.75)). Temerrüt olasılığı olarak okunursa Türkiye'nin riskini abartır. En iyi kullanımı göreli okumadır: "bölgeye göre ayrıştı mı?" |
| **Vadeli kur (forward, swap noktaları)** | "İki para arasındaki faiz farkı ne?" Bir tahmin değildir. | Bankaların forward kotasyonları; VİOP USD/TRY vadelileri halka açık, ücretsiz. | Fama'dan bu yana bilinir: forward iskontosu ileride gerçekleşen kuru tahmin etmez, çoğu zaman yanlış yönde yanılır ([Fama 1984](https://doi.org/10.1016/0304-3932(84)90046-1)). TL'de aradaki fark carry getirisinin ta kendisidir (§2). |
| **Opsiyon ima oynaklığı ve çarpıklık** (VIX, VXN, GVZ, OVX; USD/TRY risk reversal) | "Belli bir eşiğe dokunma ihtimali ne? Hangi yönde kuyruk korkusu var?" | ABD endeksleri ücretsiz (Cboe). USD/TRY opsiyon oynaklığı yalnız terminallerde; ücretsiz güvenilir kaynak bulamadım. VİOP opsiyonları sığ. | İma oynaklığı ortalamada gerçekleşenden yüksektir (**oynaklık risk primi**) ([Carr ve Wu 2009](https://doi.org/10.1093/rfs/hhn038)). Risk-nötr yoğunluklar kuyrukları şişirir ([Bliss ve Panigirtzoglou 2004](https://doi.org/10.1111/j.1540-6261.2004.00627.x)). |
| **Emtia vadeli yapısı** (contango/backwardation) | "Piyasa bugünkü sıkışıklığın süreceğini mi düşünüyor?" Backwardation demek bugünkü kıtlığın geçici görülmesi demek. | Brent eğrisi ICE'ta, gecikmeli olarak ücretsiz. | Vadeli fiyat petrolde gelecekteki spot fiyatın iyi bir öngörücüsü değildir, rastgele yürüyüşü ancak az farkla geçer ([Alquist ve Kilian 2010](https://doi.org/10.1002/jae.1159)). Ama soru eşiğe dokunmaysa, risk-nötr sürüklenmenin işareti eğriden gelir. |
| **Tahmin piyasaları** (Kalshi, Polymarket) | Doğrudan "evet/hayır" fiyatı | Türkiye'den erişim ve kullanım hukuken sorunlu. Yalnız okunur, bağlantı verilmez. | Favori–uzak ihtimal yanlılığı ve sığlık var ([Wolfers ve Zitzewitz 2004](https://doi.org/10.1257/0895330041371321)). Fed gibi derin sorularda vadeli faizle aynı yere çıkar. |

**Türkiye için öncelik sırası** (erişilebilirlik × anlam): (1) DİBS eğrisi ve TLREF; (2) TCMB rezervleri ve yabancı akımları (haftalık, ücretsiz, A katmanı); (3) 5Y CDS, göreli okuma için; (4) VİOP USD/TRY vadelileri, yalnız "faiz farkı" olarak; (5) TCMB Piyasa Katılımcıları Anketi, piyasa değil anket olarak etiketlenmeli. USD/TRY opsiyon verisi bir terminal aboneliği alınmadan motora girmemeli; bugün `usdtry_vol = %10` bir varsayım ve bu varsayım soruyu belirliyor.

**Kural önerisi:** Motor girdisi olan her piyasa verisi `tur` etiketi taşısın: `risk-nötr` (opsiyon, vadeli, CDS), `anket`, `gerçekleşen` (geçmiş fiyat davranışı). Kartta "piyasa" sözcüğü yalnız ilk tür için kullanılır. Bugün `quant.json` anket beklentisini (TCMB anketi) ve opsiyon oynaklığını aynı motor satırında "piyasa fiyatlaması" diye karıştırıyor.

---

## 2. Kur soruları için piyasa çerçevesi (USD/TRY)

### 2.1 Üç çapa, üç farklı anlam

Bugün için yaklaşık hesap (S = 50,28; 13.11 kapanışı):

1. **Forward (faiz farkı):** 12 aylık TL faizi %33–37, dolar %4,5 alınırsa F ≈ 64–66. Bu bir tahmin değil, carry yatırımcısının taşıdığı riskin fiyatıdır. Gerçekleşme bu sayının altında kaldığı sürece yabancı kazanır. Temmuz 2026'da yıl sonu forward'ı 53,85, Bloomberg medyan tahmini 51'di ([BloombergHT, 6.7.2026](https://www.bloomberght.com/carry-getirisinde-tl-ust-siralarda-3782076)). Kasım ortasında kur 50,3: forward 2026'da da gerçekleşeni aştı.
2. **Anket:** TCMB anketinde 12 ay sonrası beklentisi 60,77. Anket piyasa değildir ve 2024'ten beri gerçekleşenin üzerinde kalma eğiliminde (bunu `quant.json` da not ediyor).
3. **Gerçekleşen tempo:** Son 12 ayda kur yaklaşık 42,3'ten 50,3'e çıktı, %19 civarı. 60'a 8 Kasım 2027'ye kadar varmak için yıllık ~%18 log değer kaybı gerekiyor. Bu, son yılın temposuyla neredeyse aynı. Soru tam bıçak sırtında.

### 2.2 Yönetilen kurda doğru model: rejim karışımı

Motor bugün USD/TRY'yi %10 oynaklıklı lognormal yürüyüş gibi hesaplıyor. Yönetilen kur böyle davranmaz. Davranışı iki parçalıdır: düşük oynaklıkla ilerleyen, neredeyse belirlenmiş bir **sürünme yolu** ve seyrek ama büyük **sıçramalar** ([Calvo ve Reinhart 2002, "dalgalanma korkusu"](https://doi.org/10.1162/003355302753650274); fiilî rejim sınıflaması için [Ilzetzki, Reinhart, Rogoff 2019](https://doi.org/10.1093/qje/qjy033)). Önerilen motor:

`P(eşik) = h + (1 − h) × P(sürünme ≥ gereken tempo)`

- **h, rejim kırılması tehlikesi:** 12 ayda kurun bir ay içinde %15'ten fazla sıçrama olasılığı. Taban için Türkiye'nin 2001'den beri yaşadığı ataklar sayılır (2001, 2018, 2021, Haziran 2023). Mart 2025 ve Mayıs 2026 şokları rezerv satışıyla kontrol altında tutuldu; bunlar "kırılma" değil, "savunulan atak" sınıfına girer. Akademik tanım için [Laeven ve Valencia (IMF WP 18/206)](https://www.imf.org/en/Publications/WP/Issues/2018/09/14/Systemic-Banking-Crises-Revisited-46232): yıllık %30 değer kaybı ve önceki yıla göre 10 puan hızlanma.
- **Sürünme temposu:** beklenen enflasyon farkından TCMB'nin reel değerlenme hedefi çıkarılarak bulunur. Kaynaklar TCMB Enflasyon Raporu ve anket. Tempo için belirsizlik payı dar tutulur (yıllık ±3 puan).
- **h'yi güncelleyen göstergeler** (hepsi haftalık, çoğu A katmanı): swap hariç net rezerv, yabancının TL türev pozisyonu, DİBS'te yabancı akımı, yerleşiklerin döviz mevduatı, 5Y CDS'in bölgeden ayrışması, forward–anket farkı. Bugünkü okuma alarm veriyor: 30 Ekim haftasında brüt rezerv 158,1 milyar dolar, swap hariç net rezerv 24,3 milyar dolar ve yedi ayın en düşüğü ([BloombergHT](https://www.bloomberght.com/tcmb-rezervlerinde-gerileme-ivmesi-suruyor-3793646)). Aynı sayfanın ilgili başlıklarında yabancının TL türev işlemlerinin üç haftada 10 milyar dolar azaldığı geçiyor. Bu rakam ikinci bir kaynakla doğrulanmadı.

Kabaca bir hesap: h = %10–15 ve P(sürünme) = %45–50 alınırsa P ≈ %50–57 çıkar. Saf risk-nötr hesap (forward sürüklenmesiyle) %80–87 verir. Fark, carry kazancının ta kendisi. **Kartta forward'ı "piyasanın beklentisi" diye sunmak yanlış olur.** Doğru cümle: "Faiz farkı kurun yılda %30 civarı artmasına yetecek kadar koruma sağlıyor; yabancı yatırımcı bunun altında kalacağına para yatırıyor."

**Carry'nin tuzağı:** carry getirisi bir "çöküşte birden kaybetme" riskiyle birlikte gelir ([Brunnermeier, Nagel, Pedersen 2008](https://www.nber.org/papers/w14473)). Kalabalık pozisyonun çözülmesi h'yi yükselten bir mekanizmadır. Kırmızı alarm eşiği (günlük %5 kur hareketi) bu soruda LR = 10 sayılmalı.

---

## 3. "Piyasa yanlış fiyatlıyor olabilir mi?": sapma kuralı

Varsayılan kabul: **derin ve likit bir piyasayı yenmeyiz.** Kısa vadeli Fed fiyatlamasında, majör endekslerde ve altında Planck'in bilgi avantajı yoktur. Sapma ancak aşağıdaki gerekçelerden biriyle yapılır ve gerekçe kayda türüyle yazılır:

| Gerekçe türü | Örnek | Nerede yaşar |
|---|---|---|
| **S1 · Bilinen sistematik yanlılık** | Oynaklık risk primi, forward'daki carry primi, CDS'teki küresel faktör, uzak ihtimal yanlılığı | **Motorda kural olarak.** Claude ayarı değil. Katsayı geçmiş veriyle bir kez kalibre edilir, açıklanır, üç ayda bir yeniden ölçülür. |
| **S2 · Soru ile enstrüman uyuşmuyor** | OVX WTI opsiyonundan gelir, soru Brent'tir. VIX S&P'nin 30 günlük oynaklığıdır, soru Nasdaq'ın 12 ayıdır. Opsiyon terminal fiyatı ölçer, soru "herhangi bir gün dokunma"yı sorar. | Motorda dönüşüm kuralı |
| **S3 · Sığ ya da yönetilen piyasa** | USD/TRY (yönetilen), VİOP opsiyonları (sığ) | Motorda rejim modeli (§2.2) |
| **S4 · Bilgi gerekçesi** | Piyasanın henüz fiyatlamadığı, iki kaynakla doğrulanmış olay (ör. kapanıştan sonra gelen karar) | Claude ayarı, LR tablosuyla |

**Sınır:** Claude ayarı (S4), piyasa olasılığına göre log-odds cinsinden en fazla ±0,6 olur. Bu %50'de yaklaşık ±15 puan, %90'da yaklaşık ±6 puan eder. Böylece kuyruklarda Anayasa'nın ±15 puan sınırından daha sıkı kalır. Derin piyasalarda (Fed vadelisi, S&P/Nasdaq, altın, Brent) S4 için **iki bağımsız kaynakla doğrulanmış ve kapanıştan sonra gelen** olay şartı aranır. "Piyasa aşırı iyimser" gibi bir sezgi gerekçe sayılmaz.

**Puanlama:** Karneye dördüncü bir rakip eklenir: **piyasa referansı (ham risk-nötr olasılık)**. Her kapanışta üç Brier ayrı yazılır: ham piyasa, motor (S1–S3 düzeltmeli), Planck (+S4). Asıl test şudur: *düzeltmelerimiz ham piyasayı yeniyor mu?* 30 kapanıştan önce iddia yok (Anayasa §5). S4 ayarları ayrıca "sapma defteri"nde tutulur: yön, büyüklük, gerekçe türü, sonuç. 20 sapmadan sonra S4'ün ortalama katkısı negatifse S4 sınırı yarıya iner.

---

## 4. Kripto

**Kapsanmalı, ama dar ve olay odaklı.** Gerekçe: Türkiye MENA'nın en büyük kripto hacmine sahip, yıllık yaklaşık 200 milyar dolar. Ama Chainalysis bu büyümenin benimsemeden çok spekülasyondan geldiğini, kurumsal işlemlerin öne çıktığını, perakende işlemlerin ise sert düştüğünü yazıyor ([Cointelegraph, Chainalysis 2025](https://cointelegraph.com/news/turkey-s-200b-crypto-boom-is-built-on-speculation-not-adoption-chainalysis)). Okurun dolarizasyon ve enflasyondan korunma davranışı açısından kripto, altın ve döviz mevduatıyla aynı karar setinde duruyor. Görmezden gelmek bir boşluk bırakır. Fiyat eşiği soruları ise SPK çizgisine en çok yaklaşan alan.

Öneriler:
1. **Soru türleri:** (a) düzenleme ve kurum olayları: SPK yetki belgesi süreçleri, saklama kuruluşlarının faaliyete geçmesi, ABD'de ETF ve stablecoin kuralları; (b) piyasa yapısı: stablecoin arzı, ETF akımları; (c) yalnız BTC (gerekirse ETH) için **endeks düzeyinde** eşik soruları. Altcoin, token, borsa adı ve "yeni listeleme" yok.
2. **Motor:** Deribit BTC opsiyon ima oynaklığı (DVOL) kullanılabilir. Oynaklık risk primi düzeltmesi kriptoda daha büyüktür; S1 kuralı ayrı katsayıyla uygulanır.
3. **Türkiye düzenlemesi:** Kripto varlık hizmet sağlayıcıları 7518 sayılı Kanun'la (2024) SPK iznine bağlandı. SPK'nın 26.03.2026 tarihli 18/617 sayılı kararı yetki belgesi ve saklama sözleşmesi sürelerini saklama hizmetinin yaygınlaşmasına bağladı ([özet, üçüncü taraf](https://sigortafinansakademi.com/mevzuat/kripto-varlik-hizmet-saglayicilarin-uyum-sureleri-spk-2026-18/); resmî bülten metnini açmadım). Bu süreç iyi bir takvimli soru kaynağı: "SPK X tarihine kadar ilk saklama kuruluşuna izin verir mi?"
4. **Hukuk uzmanına açık soru:** Kripto hakkında olasılık yayını, sermaye piyasası mevzuatındaki yatırım danışmanlığı ve tanıtım kurallarına hangi ölçüde giriyor? Bu belirsizlik çözülene kadar kripto fiyat eşiği sorusu açılmamalı. Olay ve düzenleme soruları açılabilir.

---

## 5. Mevcut 8 sorunun piyasa gözüyle eleştirisi

**Veri notu:** 13–17 Kasım kapanışlarını bağımsız olarak tam doğrulayamadım. Bulabildiklerim: 11 Kasım ons altın spot ~4.005–4.044 dolar (BloombergHT sayfası kendi içinde tutarsız), aynı gün kapanış 4.031 ([ISA Bullion](https://www.isabullion.com/?p=9185)); Brent 93,83; USD/TRY 50,23 ([BloombergHT 11.11](https://www.bloomberght.com/piyasalarda-gunun-ozeti-11-kasim-2026-bist-100-de-degisimler-ve-doviz-fiyatlari-pkh-3794237)). 10 Kasım itibarıyla Aralık Fed artırımı FedWatch'ta ~%99 ([StockWireX](https://stockwirex.com/?p=55671)). `quant.json`'daki 13.11 ons değeri 3.886 bir vadeli sözleşme kapanışı. Kriter ise LBMA spot. Bu tutarsızlık tek başına motoru 57 ile 67 arasında oynatıyor. Güncel 5Y CDS seviyesini, USD/TRY opsiyon oynaklığını ve Brent 6 aylık vadeli fiyatını güvenilir bir kaynaktan bulamadım.

| Soru | Piyasa-ima (risk-nötr, yaklaşık) | Bizim motor / Planck | Hüküm |
|---|---|---|---|
| **Altın 4.500$ (12 ay, dokunma)** | GVZ %25,8 ile dokunma %57 (S=3.886) ya da %67 (S=4.031). Yıl sonunda üstünde olma (terminal) yalnız %29–34. | 57 / 45 | −12'lik ayar aslında oynaklık risk primi (σ'yı %20'ye çekmek %46 verir). Motora S1 olarak taşınmalı. "Eğilim aşağı" gerekçesi yön iddiasıdır; SPK çizgisine yakın ve bilgi değeri zayıf. |
| **USD/TRY 60 (12 ay)** | Forward ile %80–87. Bu sayı carry primini içerir, tahmin değildir. | 65 / 55 (sicilde 46) | Model yanlış sınıfta (§2.2). Rejim karışımı modeli ~%50–57 verir. `adj_why` metni hâlâ eski anket değerini (59,26) yazıyor, snapshot 60,77. |
| **Nasdaq zirveden −%25 (12 ay)** | σ = %24 ile %39. VXN ve 1 yıllık vade yapısı kullanılmalı. σ = %20 ile %30, pozitif sürüklenmeyle %23. | 39 / 34 | Kayıt Nasdaq Bileşik, motor S&P'nin VIX'iyle çalışıyor (S2). Daha önemlisi, eşiği belirleyen zirve (27.244) doğrulanmamış: "6 Ekim'de yeni rekor bildirildi, seviye doğrulanamadı". Kâhin testi şu an geçmez. Açılış anında eşik sayı olarak sabitlenmeli. |
| **Brent 110$ (6 ay)** | OVX %60 ile %75. Backwardation ile sürüklenme negatif. σ = %45 ve 6 aylık vadeli 86–90 alınırsa %56–61. | 75 / 60 (sicilde 54) | OVX WTI'dan gelir ve 5 Kasım'dan beri bayat. Eğrinin eğimi motora girmiyor (`brent_fwd_6ay = null`). −15'lik ayarın tamamı S1+S2 düzeltmesi; bunlar kural olmalı. |
| **Fed artırımı (12 ay)** | Aralık için ~%99 (FedWatch), tahmin piyasalarında %96–97 | 100 / 97 | Bilgi değeri yok. Anayasa §2 gereği sessiz izlemeye alınmalı. Yerine daha keskin sorular: "Aralık'ta 50 bp mi?", "Mart 2027'de ikinci artırım mı?" (vadeli fiyatlamayla doğrudan ölçülür, ≤120 gün). |
| **ABD resesyonu (12 ay)** | Doğrudan piyasa yok. Getiri eğrisi modeli: 10Y–3A ≈ +125 bp, düşük olasılık ([NY Fed modeli](https://www.newyorkfed.org/research/capital_markets/ycfaq.html)). | 25 / 33 | +8'lik ayar piyasa göstergelerinin tersine. Gerekçesi (YZ yatırım döngüsü) iki kaynakla belgelenmeli. Yüksek getirili tahvil spreadi motora eklenmeli. |
| **TCMB Aralık indirimi** | TLREF OIS ve 1–3 aylık DİBS bir şey ima ediyor olmalı; ücretsiz veri bulamadım. | 70 / 62 | 16.11 kararıyla News'e geçti. Motor anket oranı kullanıyor; görüş bildirmeyen 6 kurumu dışarıda bırakıyor. |
| **TÜFE %30 altı** | Piyasa yok | 48 / 40 | News'e geçti. Doğru yöntem dağılım hesabı; dokunulmasın. |

**Genel bulgular:**

1. **Sicil ile `quant.json` ayrışmış.** Beş soruda yayınlanan sayı farklı: USD/TRY 46/55, TÜFE 52/40, Brent 54/60, altın 53/45, Nasdaq 31/34. Karne hangisini puanlayacak? Yayın yeniden açılmadan bu tek kaynağa bağlanmalı (ilke 5).
2. **Fiyat eşiği olasılığı fiyatın mekanik bir dönüşümüdür.** Altın motoru bir haftada fiyat %5,6 düştü diye 73'ten 57'ye indi. Günlük yayınlanan dokunma olasılığı, kılık değiştirmiş bir fiyat yorumudur ve "benzin kadranı"dır. Öneri: varlık fiyatı eşiklerinde güncelleme haftada bir yapılsın. Kartta "bu sayı fiyatla birlikte otomatik oynar" satırı bulunsun.
3. **Ufuk Anayasa ile çelişiyor.** 12 aylık eşik soruları 2027'nin sonunda kapanır. 90 gün içinde Quant karnesi beslenmez. Yeni eşik soruları 30–90 gün olmalı. Opsiyon vadeleri de bu ufukta en likit.
4. **Dokunma ile terminal karışıyor.** "Herhangi bir gün aşar mı" sorusu, "o tarihte üstünde mi" sorusunun yaklaşık iki katıdır. Okur ikisini ayırt etmez. Kart hangisini sorduğunu açık yazmalı. Günlük fiksing için süreklilik düzeltmesi küçük ama kurala yazılmalı ([Broadie, Glasserman, Kou 1997](https://doi.org/10.1111/1467-9965.00039)).
5. **C katmanı kaynak riski.** USD/TRY için bulduğum bir aracı kurum yazısı Nisan 2026 enflasyonunu %78, net rezervi −65 milyar dolar veriyor. İkisi de açıkça yanlış. Piyasa verisi yalnız A/B kaynaktan alınmalı: TCMB EVDS, Cboe, CME, ICE, BIST.

---

## 6. Okura dil: "piyasa şunu fiyatlıyor"

**Üç katmanlı kart:** (1) *Piyasanın ima ettiği:* "Opsiyon fiyatlarına göre piyasa, 100 benzer durumdan yaklaşık 57'sinde altının 4.500 dolara dokunacağı varsayımıyla fiyatlama yapıyor." (2) *Hesabımız:* "Piyasa fiyatları korunma maliyetini de içerir. Bunu düzeltince 100'de 46." (3) *Fark neden:* tek cümle, gerekçe türüyle.

**Kalıplar:** "Piyasa … fiyatlıyor" · "Vadeli işlemler … ima ediyor" · "Faiz farkı … kadar değer kaybını karşılıyor" · "Bu sayı bir tahmin değil, bir fiyat".
**Kullanılmaz:** "Piyasa yanılıyor", "fiyatlanmamış fırsat", "piyasa yanlış fiyatlıyor", "ucuz/pahalı", "aşırı satılmış". Sapma ancak "hesabımız X puan farklı; nedeni …" biçiminde gösterilir. Gerekçe: "piyasa %57, biz %46" yan yana konunca okur bunu işlem sinyali gibi okuyabilir. Bu dil, sapmayı yöntemsel bir düzeltme olarak sunar, yanlış fiyat iddiası olarak değil.

**Eğitim serisi (Çarşamba "Taban Oranı" slotu, 4 carousel):** (1) "Fiyat neden olasılık değildir: sigorta primi örneği" (kasko primi kaza olasılığından yüksektir, çünkü sigortacı riski taşır); (2) "Forward kur tahmin değildir: carry nasıl çalışır?"; (3) "Dokunmak ile kapanmak: aynı eşik, iki farklı olasılık"; (4) "CDS'ten temerrüt olasılığına: neden abartır?" Türkiye'de sayısallığın düşük olduğu göz önüne alınırsa (KARAR §1.1, PIAAC) bu dört kavram rakamdan önce gelir.

---

## (a) En önemli 5 öneri

1. **Risk-nötr ile gerçek dünya olasılığını ayır.** Oynaklık risk primi, carry primi ve CDS'in küresel faktörü motora kural (S1) olarak girsin. Claude ayarı yalnız yeni bilgiyi taşısın. Kalibre edilmiş bir katsayı, bugünkü −10/−15'lik gerekçesiz ayarlardan daha dürüst.
2. **USD/TRY için rejim karışımı modeli** (h + sürünme). h'yi haftalık rezerv ve akım göstergeleriyle güncelle. Forward'ı "beklenti" diye sunma.
3. **Piyasa referansını karneye dördüncü rakip olarak ekle.** Sapma sınırı log-odds ±0,6. S4 sapmaları ayrı defterde tutulsun, 20 sapma sonra denetlensin.
4. **Eşik sorularını yeniden kur:** 30–90 gün ufuk; eşik açılışta sayı olarak sabit; enstrüman soruyla aynı (VXN, Brent opsiyonu); haftalık güncelleme; dokunma/terminal açık. Fed sorusu sessiz izlemeye alınsın.
5. **Kripto: olay ve düzenleme soruları evet, fiyat eşiği hukuk görüşüne kadar hayır.** Kapsam BTC endeks düzeyiyle sınırlı.

## (b) Diğer uzmanlarla olası çatışmalar

- **Nicel modelleme:** Lognormal dokunma formülünü savunabilir. Benim itirazım formüle değil girdilere (σ, μ, enstrüman) ve USD/TRY'nin dağılım sınıfına.
- **Davranışsal finans:** "Piyasa irrasyoneldir, sapalım" diyebilir. Ben sapmayı yalnız belgelenmiş sistematik yanlılıkla sınırlıyorum; anlatı temelli sapma Claude ayarına girmemeli.
- **Makro ve siyasi ekonomi:** h'yi siyasi takvimle yükseltmek isteyebilir. Anayasa §9 seçim ve dava olasılığını yasaklıyor. h'ye yalnız piyasa ve rezerv göstergeleri girmeli, siyasi olay kendisi değil.
- **Hukuk:** "Piyasa ima" sunumunu tekil varlık için riskli bulabilir. Ben endeks/emtia/kur düzeyinde güvenli, sapma diliyle birlikte yönetilebilir görüyorum.
- **Medya:** Günlük kur ve altın kartını erişim için isteyebilir. Ben haftalık güncelleme öneriyorum.
- **Veri altyapısı:** Ücretli terminal maliyetini sorgulayacaktır. Ücretsiz kaynakla yapılamayanı "ölçülemiyor" diye etiketlemek (ilke 7) bir alternatif.

## (c) Karar vericiye sorular

1. USD/TRY ve TL OIS için ücretli bir veri kaynağına (terminal ya da veri sağlayıcı) bütçe var mı? Yoksa USD/TRY sorusu "anket + rejim modeli" olarak mı kalsın?
2. Kartta "piyasa %X · biz %Y" yan yana gösterilsin mi, yoksa piyasa sayısı yalnız sitede ve karnede mi dursun? (SPK yorumu için hukuk görüşü gerekli.)
3. 12 aylık mevcut eşik soruları kapanana kadar sürsün mü, yoksa sessiz izlemeye alınıp yerlerine 30–90 günlük sorular mı açılsın?
4. Kripto, Quant'ın kapsamına bugün mü girsin, hukuk görüşünden sonra mı?
5. Sicil ile `quant.json` arasındaki farkta hangi sayı resmîdir?

## (d) 90 günde başarı ölçüsü (bu alandan)

- **Veri bütünlüğü:** Motor girdilerinin %100'ü A/B kaynaklı, `tur` etiketli ve tarih damgalı. Bayat girdi (>3 iş günü) ile hesaplanan motor sayısı 0. Sicil ile `quant.json` farkı 0.
- **Piyasaya karşı beceri:** Piyasa referansı olan en az 15 kapanış. Motor (S1–S3) Brier'i ham piyasa Brier'inden kötü değil. Örneklem küçük olduğundan "şans payı" notuyla raporlanır.
- **Sapma defteri:** S4 sapmalarının hepsi gerekçe türüyle kayıtlı. Ortalama katkısı (Brier farkı) işaretiyle yayınlanmış.
- **Ufuk:** Yeni Quant sorularının en az %80'i ≤90 günde kapanıyor.
- **Okur anlayışı:** Eğitim serisinden sonraki Story anketinde "forward kur bir tahmin midir?" sorusuna doğru cevap oranı ölçülür. Hedef seriden önceki ölçüme göre artış; seviye hedefi koymadan.

---

*Kaynak notu: Fama, Gürkaynak ve ark., Carr–Wu, Bliss–Panigirtzoglou, Longstaff ve ark., Alquist–Kilian, Wolfers–Zitzewitz, Brunnermeier ve ark., Calvo–Reinhart, Ilzetzki ve ark., Laeven–Valencia ve Broadie ve ark. künyeleri bellekten verildi; bu oturumda açılmadı. Taşıyıcı iddialardan önce doğrulanmalı. Minneapolis Fed, BloombergHT, Gedik, ISA Bullion, StockWireX, Cointelegraph ve SPK kararı özeti bu oturumda açıldı. USD/TRY "son 12 ayda %19" hesabı Kasım 2025 kurunun ~42,3 olduğu hatırlanarak yapıldı; EVDS'ten teyit edilmeli.*
