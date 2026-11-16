# 12 · Bankacılık, Kredi ve Finansal İstikrar (Quant v2)

*Uzman raporu · 17.11.2026 · Okunanlar: BRIEF.md, ANAYASA.md v2, QUANT.md, ekip/KARAR.md, data/quant.json, ekip/quant/1, 3, 4, 6. Bu belge öneridir; hiçbir kural dosyasına dokunulmadı.*

## Ana tez

Türk okurunun finansal hayatına en sık değen kanal kur ya da borsa değil, **bankadır**: kart ekstresi, ihtiyaç kredisi taksiti, mevduat getirisi, işletmenin çeki. Bu alan Quant için iki açıdan değerli. Kapanış kaynakları resmi ve takvimlidir (TCMB, BDDK, Risk Merkezi). Serilerin çoğu da yavaş hareket eder; bu yüzden fiyat eşiklerinden çok daha iyi bir Motor kurulabilir. Aynı alan Planck'in en tehlikeli alanıdır: tekil bir banka hakkındaki olasılık hem suç tanımına girer hem de kendini gerçekleştiren bir kehanete dönüşebilir. Önerim şu: **sistem verisi serbest, tekil banka kalıcı olarak yasak, "panik olayı" soruları yasak.**

Bağlam (Kasım 2026): Eylül–Kasım fon krizi ve soruşturması sürüyor. 9 Kasım'da bir BDDK başkan yardımcısı ve bir katılım bankasının genel müdürü tutuklandı. RTÜK, fon haberciliği nedeniyle iki kanala ceza verdi ([Küre özet](https://kureansiklopedi.com/detay/2026-turkiye-sermaye-piyasasi-fon-krizi-ve-manipul), [Foreks](https://www.foreks.com/haber/detay/6af17a3962bc3b2568f2f8f3/PICNEWS/tr/fon-sorusturmasinda-bddk-baskan-yardimcisi-ve-adil-katilim-bankasi-genel-muduru-tutuklandi-09-11-26/)). Okurun gerginliği ve hukuki hassasiyet şu an yüksek. Kurallar buna göre yazılmalı.

---

## 1. Okura değen değişkenler: hangisi tahmin edilebilir?

### 1.1 Güncel durum (doğrulananlar)

| Değişken | Son değer | Kaynak |
|---|---|---|
| Toplam takipteki alacak oranı | %3,2 (Eylül) | TBB Eylül raporu, [Alomaliye](https://www.alomaliye.com/2026/11/10/bankacilikta-aktifler-57-trilyon-tlye-yaklasti/) |
| Bireysel / ihtiyaç / kredi kartı takip oranı | %5,4 / %6,8 / %5,7 (Eylül) | aynı |
| İhtiyaç kredisi takibe dönüşüm | %6,83 (9 Ekim), önceki zirve %6,66 | BDDK, [Bloomberg HT](https://bloomberght.com/fon-krizi-sonrasi-ihtiyac-kredilerinde-takibe-donusum-orani-zirve-yapti-3791680) |
| Ticari kredi takip oranı | %2,5 (2 Ekim); 2024 dibi %1,4; 10 yıl ort. %3,1; 2019–20 zirvesi %6,4 | BDDK, [Bloomberg HT](https://www.bloomberght.com/ticari-kredilerde-takip-orani-yuzde-2-5e-yukseldi-3790935) |
| Yasal takibe giren kişi (Eylül) | Kredi kartı 190.399; bireysel kredi 153.292 | TBB Risk Merkezi, [Alomaliye](https://www.alomaliye.com/2026/11/10/takipteki-bireysel-alacaklar-445-milyar-tl/) |
| Karşılıksız çek (Ekim) | Tutar oranı %3,9 (Eylül %3,3; geçen yıl %2,9); adet oranı %2,95 | [Karar](https://www.karar.com/ekonomi-haberleri/fon-krizinin-ardindan-odeme-alarmi-karsiliksiz-cek-oraninda-urkuten-2082297) |
| Kredi büyüme sınırları (8 haftalık, 11 Kasım) | İhtiyaç %3,5 · taşıt %3,5 · KOBİ TL %5,5 · KOBİ dışı ticari TL %2,5 (her biri +0,5 puan) | TCMB duyurusu 2026-49, [CNBC-e](https://www.cnbce.com/piyasalar/merkez-bankasindan-kredi-buyumesine-yeni-ayar-ihtiyac-ve-tasit-kredilerinde-sinir-yukseldi-h41610) |
| Kredi kartı azami faizi (1 Ocak 2026'dan) | Aylık %3,25 / %3,75 / %4,25 (dönem borcu <30 bin / 30–180 bin / >180 bin TL); nakit avans ve KMH %4,25 | [Ekonomi Gazetesi](https://www.ekonomigazetesi.com/ekonomi/kredi-karti-azami-faiz-oranlarinda-indirim-67110), [Bloomberg HT](https://www.bloomberght.com/kredi-karti-azami-faiz-oranlarinda-indirim-yapildi-3763844) |
| KKM | Bakiye 27 Ağustos 2026'da sıfırlandı | [Evrensel](https://www.evrensel.net/haber/5998029/kur-korumali-mevduat-ta-bakiye-sifirlandi), [Dünya](https://www.dunya.com/ekonomi/kkm-defteri-kapandi-bakan-simsekten-tl-mesaji-haberi-837837) |
| Mevduat sigortası üst sınırı (2026) | 1.200.000 TL (önceki 950.000 TL) | [Bloomberg HT](https://www.bloomberght.com/tmsf-mevduat-sigortasi-ust-limitini-1-2-milyon-liraya-yukseltti-3763846) |
| Takvim | Finansal İstikrar Raporu 27 Kasım; PPK 10 Aralık | [CNBC-e](https://www.cnbce.com/faiz/turkiye-cumhuriyet-merkez-bankasi-2026-yili-para-politikasi-kurulu-ppk-toplantilari-ve-rapor-takvimini-acikladi-h22037) |

**Doğrulanamayanlar:** Kasım 2026 kredi kartı azami oranı, en son haftalık takip oranı (son veri 6 Kasım haftası; değer okunamadı) ve sektör sermaye yeterlilik oranı. Mevduat faizi için elimde yalnız C katmanı bir kaynak var (piyasa ortalaması "%40–42" diyen bir ekonomist; [Milliyet](https://uzmanpara.milliyet.com.tr/uzmanpara/bankada-parasi-olanlar-dikkat-mevduat-faizlerinde-yon-degisti-7698477)). Bu sayılar soru açılmadan önce EVDS'ten çekilmeli.

**KKM'nin tasfiyesi bir soru ailesi olmaktan çıktı.** Bakiye sıfırlandı. KKM yalnız Tesisat formatında "bu deney neye mal oldu" arşiv konusu olarak kalır ([Medyascope](https://medyascope.tv/2026/09/01/kur-korumali-mevduat-sistemi-sona-erdi-peki-maliyeti-ne-oldu/)).

### 1.2 Tahmin edilebilirlik tablosu

| Değişken | Tahmin edilebilirlik | Motor | Kapanış kaynağı |
|---|---|---|---|
| **Kredi kartı azami faizi** | **Yüksek, ama türev.** Oran = TCMB'nin "aktif faiz oranı" + kademe baz puanı (14 / 64 / 114). Ocak 2026'da 3,25 − 0,14 = aylık %3,11, yani yıllık yaklaşık %37,3; o günkü politika faizine yakın. *Bu benim çıkarımım; "aktif faiz oranı"nın tanımı Tebliğ'den teyit edilmeli.* | PPK olasılığı × geçiş kuralı. Oran PPK'dan bağımsız tahmin edilmez. | TCMB azami oran duyurusu (Ocak 2026 oranı 25 Aralık'ta duyuruldu) |
| Tüketici / konut / taşıt / ticari kredi faizi | Orta-yüksek; politika faizi ve büyüme sınırlarıyla birlikte hareket eder | Ampirik k-haftalık değişim dağılımı + PPK koşulu | TCMB haftalık ağırlıklı ortalama faizler (EVDS) |
| TL mevduat faizi | Orta-yüksek; ayrıca stopaj kararı net getiriyi değiştirir | Aynı yöntem | EVDS; stopaj için Resmî Gazete |
| Takipteki alacak oranları (toplam ve segment) | **Yüksek kısa vadede.** Seri yavaş ve kalıcı. İki tuzak var: pay (takipteki kredi) ile payda (kredi büyümesi) ayrı oynar; yıl sonunda bankalar takipteki alacak satıp aktiften siler, oran mekanik olarak düşer | Rastgele yürüyüş + sürüklenme; Aralık için mevsim düzeltmesi | BDDK haftalık bülten; BDDK aylık bülten |
| Yasal takibe giren kişi sayısı | Orta; aylık, mevsimsel, yaklaşık 40 gün gecikmeli | Aynı ayın geçmiş yıllarına göre büyüme dağılımı | TBB Risk Merkezi aylık bülteni |
| Karşılıksız çek oranı | Orta; aylık, fon krizi sonrası oynak | Aylık değişimlerin ampirik dağılımı | TCMB / Risk Merkezi aylık çek istatistikleri |
| Makroihtiyati değişiklik (büyüme sınırı, zorunlu karşılık) | Olay türü; tabanı 2023–2026 duyuru sıklığından kurulur | Poisson (yıllık değişiklik sayısı) | TCMB makroihtiyati basın duyuruları |
| BDDK düzenlemesi (kart limiti, taksit, asgari ödeme, yapılandırma) | Düşük-orta; siyasi zamanlaması var | Poisson + Claude ayarı | BDDK kurul kararı, Resmî Gazete |
| KOBİ krediye erişim | Orta; anket tabanlı | Geçmiş anket dağılımı | TCMB Kredi Eğilim Anketi (çeyreklik); KOBİ büyüme sınırı |
| İcra dosyası sayısı | **Ölçülemiyor** (ilke 7). UYAP sayıları düzenli resmi yayın değil, basına sızan beyanlardır ([Ekonomim](https://www.ekonomim.com/ekonomi/icra-dosyalari-25-milyon-sinirina-dayandi-borc-krizi-derinlesiyor-haberi-856026)) | — | Kâhin testinden geçmez |
| KKB / Findeks bireysel skorlar | Ölçülemiyor; özel veri, düzenli kamu serisi yok | — | — |

**Önemli tasarım notu.** Bu serilerde piyasa fiyatlaması yok. Motor'un sırası (Anayasa §3/3) burada (b) tarihsel taban ve (c) kurallı modeldir. Kalıcı serilerde en güçlü kurallı model **"geçen haftanın değeri + geçmiş k-haftalık değişimlerin dağılımı"**dır. Claude ayarı bu modeli çoğu hafta yenemez; yenebileceği yerler bilinen kırılmalardır: düzenleme, yıl sonu satışları, fon krizi gibi şoklar. Ayar sınırı bu alanda ±10 olmalı, finansın genel ±15'i değil. Nicel modelleme raporu (R1) "kalıcı seride katma değer düşük" diyorsa aynı yerdeyiz.

**Nominal tutar kuralı.** "Takipteki bireysel alacak 445 milyar TL, yıllık %81 arttı" gibi manşetler yüzde 30 enflasyon ve yüzde 35 kredi büyümesi ortamında yanıltır. Quant'ta **nominal TL tutar soru konusu olmaz ve manşete çıkmaz**; oran, reel değişim ya da kişi sayısı kullanılır.

---

## 2. Finansal istikrar riskleri: izleme ve anlatım

### 2.1 İzleme: "Sistem Panosu" (yayın değil, iç gösterge)

Ayda bir güncellenen, soru üretmek için kullanılan iç tablo. Her satırda değer, 10 yıllık bant ve son değişim yer alır.

| Gösterge | Kaynak, sıklık |
|---|---|
| Sermaye yeterlilik standart oranı | BDDK aylık bülten |
| Takipteki alacak oranı (toplam, bireysel, kart, ihtiyaç, KOBİ, ticari) | BDDK haftalık |
| Kredi büyümesi ile 8 haftalık sınır arasındaki fark | BDDK haftalık + TCMB duyurusu |
| YP net genel pozisyon / özkaynak | BDDK aylık |
| Yurt içi yerleşik döviz ve altın mevduatı payı | TCMB haftalık menkul ve mevduat istatistikleri |
| Reel kesimin döviz açık pozisyonu | TCMB "Finansal Kesim Dışındaki Firmaların Döviz Varlık ve Yükümlülükleri" (aylık, gecikmeli) |
| Hanehalkı borcu / GSYH | FİR (yılda iki kez; Mayıs 2026'da %10,1) ([Dünya](https://www.dunya.com/ekonomi/hanehalki-borclulugu-artti-sirketler-dis-finansmana-yoneldi-haberi-826043)) |
| Karşılıksız çek oranı, yasal takibe giren kişi | TCMB / Risk Merkezi aylık |
| Fonlara sıkışmış reel kesim parası | TCMB çalışması (4 Kasım): yaklaşık 3.000 firma, 116 milyar TL ([Karar](https://www.karar.com/ekonomi-haberleri/fon-krizinin-ardindan-odeme-alarmi-karsiliksiz-cek-oraninda-urkuten-2082297)) |

Girdi borusu EVDS-MCP'ye bağlanmalı (R1'in önerisiyle aynı).

### 2.2 Anlatım: panik yaratmadan

Literatür açık. Banka koşusu kendini gerçekleştiren bir denge olabilir (Diamond ve Dybvig, 1983). Sosyal medya bu dengeyi hızlandırır: SVB döneminde Twitter'da önceden yoğun konuşulan bankalar daha büyük kayıp yaşadı ([Cookson ve ark., SSRN](https://papers.ssrn.com/abstract=4422754); [FDIC kopyası](https://www.fdic.gov/system/files/2024-07/cookson-paper.pdf)). Mevduat sigortası koşuyu yalnızca kısmen önler; mevduat sahibinin sosyal ağı, sigortalı olup olmamasından bağımsız olarak çekilme davranışını taşır ([Iyer ve Puri, AER 2012](https://www.nber.org/papers/w14280)). Planck bir ağdır. Yapay zekâ etiketi de taşıdığından (DNR 2026: YZ'ye güven %20) bir uyarı cümlesi haberden çok söylenti gibi dolaşabilir.

Anlatım kuralları:

1. **Önce bant.** Her istikrar göstergesi kendi tarihsel bandıyla verilir: "Ticari takip oranı %2,5; 10 yıllık ortalama %3,1, 2020 zirvesi %6,4." Yön tek başına verilmez.
2. **Pay ve payda ayrı söylenir.** "Oran yükseldi" cümlesinin yanında hangisinin oynadığı yazılır: takipteki kredi mi arttı, kredi büyümesi mi yavaşladı?
3. **Yasak sözcükler** (QUANT §6'ya ek): kriz, çöküş, batık, batma, el koyma, kaçış, panik, alarm, "bankalarda paranız". "Rekor" yalnız seri başlangıcı ve tarihiyle birlikte kullanılır.
4. **Eylem satırı (ilke 9) bu alanda çoğu zaman şudur:** "Bireysel olarak yapılacak yok; izlenecek gösterge şu." Mevduat çekmeye, taşımaya ya da bölmeye dair hiçbir cümle kurulmaz.
5. **Mevduat sigortası anlatımı yalnız sakin günlerde yapılır.** Tesisat formatında, takvimden bağımsız bir açıklayıcı olarak çıkar. Bir banka söylentisi gündemdeyken yayınlanırsa söylentiyi doğrulayan bir sinyal gibi okunur.
6. **FİR haberi** (27 Kasım) "Ne Olur?" formatına girmez. Olgu, bant ve TCMB'nin kendi stres testi sonucu olarak, kurum adıyla aktarılır (Anayasa §9: resmi istatistik ne doğrulanır ne yalanlanır).

### 2.3 Kırmızı çizgi mi olmalı? Evet, iki katmanlı

**Kalıcı kırmızı çizgi (Anayasa §9'a eklenmeli):**

- (a) Adı geçen tek bir banka, katılım bankası, finansman şirketi ya da ödeme kuruluşu hakkında herhangi bir olasılık sorusu.
- (b) Sistem düzeyinde de olsa **panik olayı** soruları: "TMSF'ye banka devredilir mi", "mevduat çekilişi olur mu", "bankalara para çekme sınırı gelir mi", "mevduata el konur mu".

**Serbest alan:** Resmi oran eşikleri (takip oranı, sermaye yeterliliği, büyüme) ve düzenleme kararları.

Gerekçe hukuki ve etiktir. 5411 sayılı Bankacılık Kanunu md. 74, bir bankanın itibarını kırabilecek ya da servetine zarar verebilecek duruma kasten sebep olmayı ve bu yolla asılsız haber yaymayı yasaklar. Md. 158 bunun cezasını 1–3 yıl hapis ve 1.000–2.000 gün adli para cezası olarak belirler; zarar doğarsa ceza artırılır ([Hukuki Haber özeti](https://www.hukukihaber.net/sirket-itibarin-korunmasi-amaciyla-6361-sayili-kanuna-eklenecek-madde)). Bu hüküm 2020'de bir gazeteciye karşı işletildi ([BirGün](https://www.birgun.net/haber/fatih-portakal-hakkinda-3-yila-kadar-hapis-istemiyle-dava-acildi-298907)). TCK 217/A da ayrıca devreye girer (R4). R4 madde metnini açamamıştı; özet metni burada doğrulandı. Yine de resmi metin mevzuat.gov.tr'den bir hukukçuya teyit ettirilmeli. "Yüzde 8" gibi bir olasılık bile "asılsız haber" sayılmayabilir, ama itibara zarar verebilir: suç tanımı "kasten sebep olmak"tır. Bu riske girmeye değmez.

---

## 3. Hızlı kapanan, karar değeri yüksek soru aileleri

Eşikler soru açıldığı gün son veriden kurulur. Aşağıdaki eşikler, son veri ve dağılım hesaplandıktan sonra %15–85 bandına göre ayarlanacak örneklerdir.

| # | Soru kalıbı | Ufuk | Kapanış kriteri ve kaynağı | Taban / Motor | K |
|---|---|---|---|---|---|
| B1 | "TCMB'nin Ocak 2027 için duyuracağı en düşük kademe kredi kartı azami akdi faizi, Aralık 2026 oranından düşük olur mu?" | ~40 gün | TCMB azami oran duyurusu; kademe 1 oranı Aralık'takinden küçükse evet | PPK 10 Aralık indirim olasılığı (News sicilinden alınır) × geçiş kuralı. **Koşullu soru olarak yayınlanır**; iki sayı tutarlı olmak zorunda | 3 |
| B2 | "BDDK haftalık bülteninde 25 Aralık 2026 haftası ihtiyaç kredisi takip oranı %7,0'ı aşar mı?" | ~5–6 hafta | BDDK haftalık bülten tablosu | Son değer + 6 haftalık değişimlerin ampirik dağılımı; Aralık satış mevsimselliği. Ön-otopsi: "yıl sonu takipteki alacak satışları oranı düşürdü" | 3 |
| B3 | "Toplam takipteki alacak oranı 31 Aralık haftasında %3,3'ü aşar mı?" | ~6 hafta | BDDK haftalık | Aynı yöntem | 2 |
| B4 | "Kasım 2026'da karşılıksız çek tutarının ibraz edilen çek tutarına oranı %3,9'u aşar mı?" | ~3 hafta (Aralık başı) | TCMB / Risk Merkezi aylık çek istatistiği | Aylık değişimlerin 10 yıllık dağılımı; fon krizi kırılması Claude ayarında | 3 (işletme) |
| B5 | "Ekim 2026'da kredi kartı borcu nedeniyle yasal takibe giren kişi sayısı 200 bini aşar mı?" | ~4 hafta | TBB Risk Merkezi "Negatif Nitelikli Bireysel Kredi ve Kredi Kartı" bülteni | Aynı ayın yıllık büyüme dağılımı | 2 |
| B6 | "TCMB 31 Ocak 2027'ye kadar ihtiyaç kredisi 8 haftalık büyüme sınırını yeniden değiştirir mi?" | ~75 gün | TCMB makroihtiyati basın duyurusu | 2024–2026 değişiklik sıklığından Poisson | 2 |
| B7 | "TL mevduat stopaj oranında 31 Aralık'a kadar değişiklik Resmî Gazete'de yayımlanır mı?" | ~45 gün | Resmî Gazete Cumhurbaşkanı kararı | 2023–2026 stopaj kararları sayısı | 3 (mevduat) |
| B8 | "TCMB haftalık verisinde 3 aya kadar vadeli TL mevduat ağırlıklı ortalama faizi, 8 Ocak 2027'de biten haftada %X'in altında mı?" | ~7 hafta | EVDS haftalık seri | PPK koşulu + ampirik geçiş | 3 |
| B9 | "BDDK 31 Mart 2027'ye kadar kredi kartı taksit sayısı ya da asgari ödeme oranında değişiklik kararı yayımlar mı?" | ~135 gün (%20 kotasına girer) | BDDK kurul kararı, Resmî Gazete | Geçmiş karar sıklığı; düşük güvenle | 3 |
| B10 | "TCMB Ocak 2027 Kredi Eğilim Anketi'nde bankalar KOBİ kredi standartlarında net sıkılaşma bildirir mi?" | ~2 ay | TCMB anket yayını, net yüzde > 0 | Geçmiş çeyrekler | 2 |

**Önerilmeyenler:** sermaye yeterlilik oranı eşiği (okur kararı yok, K = 1; Panoda kalır), icra dosyası sayısı (resmi kaynak yok), tekil banka ya da XBANK yön soruları. XBANK endeksi kural olarak serbest; ama "banka endeksi %X düşer mi" sorusu bu dönemde "bankalar batıyor" diye okunur, pilot boyunca açılmaz.

**Kanal sınırı (çatışma notu).** 16.11 kararı takvimli makro veri sorularını News'e verdi. B1, B2–B5 ve B8 takvimli veri sorusudur. Önerim: **finansal sistem verisi (BDDK, Risk Merkezi, çek, kredi kartı oranı) Quant'ta kalsın**, PPK ve TÜFE News'te. B1 ve B8, News'in PPK sayısını Motor girdisi olarak kullanır; iki kanal çelişen sayı yayınlayamaz.

---

## 4. "Sana etkisi" anlatımı (tavsiye vermeden)

İlke: **"Hesap, tavsiye değil."** Okura ne yapması gerektiği söylenmez; hangi değişkenin kendi durumunda hangi büyüklükte çalıştığı aritmetikle gösterilir. Yasak kalıplar: "kredi çekin / çekmeyin", "mevduatı taşıyın", "borcunuzu kapatın", "şimdi tam zamanı".

| Okur | Değen değişken | Örnek "sana etkisi" cümlesi | Eylem satırı (ilke 9) |
|---|---|---|---|
| **Kartla borçlanan** | Azami faiz kademesi, asgari ödeme, takibe düşme | "Dönem borcu 30–180 bin TL arasındaysa kademe 2 geçerli. Azami oranda aylık 0,25 puanlık değişiklik, devreden her 50 bin TL için ayda 125 TL eder." | "Ekstrede dönem borcunun hangi kademede olduğunu ve uygulanan oranı kontrol etmek mümkün." (Bilgi; davranış önerisi değil.) |
| **İhtiyaç kredisi borçlusu** | Sabit faizli mevcut kredi değişmez; yeni kredi ve yapılandırma koşulları değişir | "Mevcut sabit faizli kredinin taksiti PPK kararından etkilenmez; etkilenen, yeni açılacak kredinin fiyatıdır." | "Bireysel olarak yapılacak yok; izlenecek gösterge: haftalık tüketici kredisi faizi." |
| **Mevduat sahibi** | Brüt faiz, stopaj, enflasyon, sigorta sınırı | "%40 brüt faiz, %17,5 stopajla net %33 eder. Bunu yıllık enflasyon beklentisiyle yan yana koymak reel getiriyi gösterir." (Stopaj oranı Milliyet'te geçiyor; Resmî Gazete'den teyit edilmeli.) | Hesap şablonu verilir; sayı okurun kendi tutarıyla doldurulur. Sigorta sınırı (1,2 milyon TL) **yalnız sakin gün açıklayıcısında** geçer. |
| **Kiracı** | Bankacılık kanalı **dolaylıdır**; dürüstçe söylenir | "Konut kredisi faizi ve kredi oranı sınırları konut satın alma talebini etkiler; kiraya geçişi aylarla ölçülür ve zayıf bir bağdır. Kira artışının asıl belirleyicisi TÜFE'dir (News)." | "Bu ay senin için doğrudan bir değişiklik yok." Bağ uydurulmaz. |
| **Küçük işletme** | KOBİ büyüme sınırı, ticari kredi faizi, karşılıksız çek oranı | "Ekim'de ibraz edilen her 100 liralık çekin yaklaşık 3,9 lirası karşılıksız çıktı; bir yıl önce 2,9 liraydı." | "Çek kabul etmeden önce karekodlu çek sorgulaması yapılabilir" (var olan bir aracın bilgisi). Kredi ürünü ve banka adı geçmez. |

Davranışsal finans raporu (R3) "aciliyet dili yok" diyor; buna bir şey ekliyorum: **kayıp çerçevesi yalnız aritmetikle kurulur.** "Kaybediyorsunuz" denmez; "reel getiri −%X" denir.

---

## 5. Tekil banka hassasiyeti: kurallar

1. **K1 · Olasılık yok.** Adı geçen tek bir kuruluş hakkında soru, olasılık, senaryo ve "Ne Olur?" zinciri yapılmaz. Sınırı kişi adına uygulanan sınırla aynıdır (Anayasa §9/3).
2. **K2 · Küçük grup tekil sayılır.** BDDK grup verisi (kamu, özel, yabancı, katılım, kalkınma-yatırım) kullanılabilir. Ama bir grup üç ya da daha az kuruluştan oluşuyorsa ya da tek bir kuruluş grubun çoğunluğunu taşıyorsa, o grup tekil banka sayılır.
3. **K3 · Ad yalnız resmi olgu olarak geçer.** Tekil ad ancak KAP bildirimi, BDDK, TMSF ya da TCMB kararı olgusu olarak geçer. İki kaynak gerekir, en az biri A katmanında olmalı. Haberin öznesi kurum kararıdır, bankanın akıbeti değil.
4. **K4 · Soruşturmadaki banka çifte yasaktır.** Fon soruşturması gibi süren davalarda bankanın adı §9/1 (süren dava) ve K1 kapsamına aynı anda girer. Yalnız iddianame ya da karar olgusu, kurum adıyla aktarılır.
5. **K5 · Söylenti sessizliği.** Tekil bir banka hakkında söylenti dolaşıyorsa Quant 72 saat bu konuda ve genel "mevduat güvenliği" konusunda içerik üretmez. Resmi açıklama gelirse yalnız olgu aktarılır. DM'lere standart yanıt verilir: "Planck tekil kuruluşlar hakkında olasılık yayınlamaz; resmi açıklamalar BDDK ve TMSF sitelerindedir."
6. **K6 · Banka hissesi yok.** Banka hisseleri de dahil, tekil hisse yönü zaten yasak (SPK). Banka bilançosu yalnız sektör toplamının parçası olarak geçer.
7. **K7 · Görsel kural.** Banka logosu, şube fotoğrafı, ATM kuyruğu görseli kullanılmaz (çağrışımla panik). Kırmızı alarm estetiği yasağı burada mutlaktır.
8. **K8 · Hukuk onayı.** Kurallar Yusuf onayından önce bir bankacılık hukukçusuna okutulur. Onaya kadar K1–K7 pilot kuralı olarak uygulanır.

---

## (a) En önemli 5 öneri

1. **Bankacılık için kalıcı kırmızı çizgi, iki katmanlı:** tekil kuruluş hakkında olasılık yok; sistem düzeyinde panik olayı sorusu yok. 5411 md. 74 ve 158 ile kendini gerçekleştiren koşu literatürü bunu zorunlu kılıyor. Anayasa §9'a eklenmeli.
2. **Finansal sistem verisi Quant'ta kalsın**, eşik soruları BDDK haftalık, Risk Merkezi ve çek istatistikleriyle kurulsun. Motor: "son değer + ampirik k-haftalık değişim dağılımı", yıl sonu satış mevsimselliğiyle. Ayar sınırı ±10.
3. **Kredi kartı ve mevduat faizi soruları News'in PPK sorusuna koşullu bağlansın.** Tutarlılık otomatik denetlenir; Quant bağımsız bir PPK görüşü yayınlamaz.
4. **Nominal TL tutar manşet ve soru konusu olmasın.** Oran, reel değişim ya da kişi sayısı kullanılsın; her gösterge 10 yıllık bandıyla çıksın.
5. **"Hesap, tavsiye değil" şablonu:** dört okur tipi için aritmetik etki cümlesi ve gerektiğinde dürüst "doğrudan etki yok" satırı. Mevduat sigortası açıklayıcısı yalnız sakin günlerde.

## (b) Diğer uzmanlarla olası çatışmalar

- **News ve Quant kanal sınırı (KARAR 16.11):** Takvimli veri sorusu News'e geçti. Ben finansal sistem verisini Quant'ta tutmayı öneriyorum. Karar verilmeli.
- **R1 (nicel modelleme):** Piyasa fiyatlamasını Motor'un ilk basamağı sayıyor. Bankacılık serilerinde piyasa yok; burada Motor taban ve kurallı modeldir. R1 "kalıcı seride Claude değer katmaz" derse hemfikiriz, ama o zaman Brier karşılaştırmasında "rastgele yürüyüş" ayrı bir rakip olmalı.
- **R3 (davranışsal finans) ve "Sen Yüzde Kaç Dersin?":** Okura "takip oranı aşar mı" diye sormak zararsız. "Bankalar zorlanır mı" türü bir anket ise toplu kaygı üretir. Banka konulu anketler B2–B5 tipiyle sınırlanmalı.
- **R4 (siyasi ekonomi):** Tekil banka için "hukuki görüşe kadar tam yasak" diyordu. Ben madde metnini doğruladım ve **kalıcı** yasak öneriyorum; R4 geçici diyorsa ayrışıyoruz.
- **R6 (medya ve arşiv):** Tesisat'ın konuları arasında mevduat var. Konu zamanlaması K5'e tabi olmalı, yoksa arşiv içeriği yanlış anda panik sinyaline dönüşür.

## (c) Karar vericiye sorular

1. Finansal sistem verisi (BDDK, Risk Merkezi, çek, kart faizi) Quant'ta mı kalsın, News'e mi geçsin?
2. Tekil banka yasağı kalıcı mı olacak? Bir bankacılık hukukçusuna 1–2 saatlik görüş için bütçe ayrılabilir mi?
3. XBANK gibi sektör endeksi eşik soruları pilot sonrasında açılsın mı?
4. Kredi kartı oranı gibi PPK türevi koşullu sorular karnede ayrı satır mı olsun, yoksa ana karneye mi karışsın?
5. "Sistem Panosu" hiç yayınlanmasın mı, yoksa ayda bir sakin bir tablo olarak çıksın mı? Bence ilk 90 gün iç gösterge kalmalı.

## (d) Quant'ın başarısı 90 günde nasıl ölçülür (bu alandan)

| Ölçüt | Hedef |
|---|---|
| Kapanan bankacılık sorusu | ≥ 12 (B1–B8 ailesinden) |
| Kâhin testi | Her kapanış resmi kaynak bağlantısıyla ≤ 15 dakikada; belirsiz ya da hatalı iptal 0 |
| Motor'a karşı beceri | Planck ile "rastgele yürüyüş Motoru" Brier'i yan yana raporlanır; 12 kapanışta iddia değil, ham döküm |
| PPK türevi tutarlılığı | News ile Quant arasında çelişen sayı 0 |
| Kırmızı çizgi ihlali | Tekil banka ya da panik olayı içeriği 0; nominal TL manşeti 0 |
| Hukuki ve şikâyet | BDDK, RTÜK ya da banka itirazı 0 |
| Okur değeri | Bankacılık gönderilerinde kaydetme oranı kanal medyanının üstünde; DM'de "hangi bankaya" sorusu standart yanıtla 100% karşılanır |
| Veri borusu | EVDS-MCP'den haftalık takip, faiz ve mevduat serileri otomatik; ≥ 1 yıllık geriye dönük taban veri seti (`data/quant/` altında) kurulmuş |

---

### Kaynaklar (ek)

- Diamond, D. ve Dybvig, P. (1983), "Bank Runs, Deposit Insurance, and Liquidity", *Journal of Political Economy* 91(3). (Klasik; bu oturumda bağlantısı açılmadı.)
- Cookson, J. A. ve ark. (2023), "Social Media as a Bank Run Catalyst": [SSRN](https://papers.ssrn.com/abstract=4422754)
- Iyer, R. ve Puri, M. (2012), "Understanding Bank Runs", *AER* 102(4): [NBER WP 14280](https://www.nber.org/papers/w14280)
- BDDK kart limiti ve gelir uyumu düzenlemesi (Şubat 2026): [Bloomberg HT](https://www.bloomberght.com/kredi-karti-limit-duzenlemesinde-egitim-ve-saglik-istisnasi-3768220)
- TCMB Finansal İstikrar Raporu sayfası: [tcmb.gov.tr](https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Yayinlar/Raporlar/Finansal+Istikrar+Raporu)
- Fon krizi zaman çizelgesi (ikincil özet, C katmanı): [Küre Ansiklopedi](https://kureansiklopedi.com/detay/2026-turkiye-sermaye-piyasasi-fon-krizi-ve-manipul)
