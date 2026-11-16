# Quant v2 · Makroekonomi ve Para Politikası Raporu

*Uzman: makroekonomi ve para politikası (küresel ve Türkiye) · 17.11.2026 · Girdi: BRIEF.md, ANAYASA.md v2, QUANT.md, ekip/KARAR.md, data/quant.json, data/sorular.json, data/quant/tcmb-tahmin-hata.json, quant/motor.py. Kural dosyalarına dokunulmadı.*

## Özet hüküm

Quant'ın sorunu sayı üretmek değil, **neden** o sayıyı ürettiğini gösterememek. Bugünkü sekiz sorunun altısı tek değişkenli fiyat eşiği. Bunlarda piyasa zaten bizden iyi fiyatlıyor ve Claude ayarı ancak yön görüşü ekleyerek fark yaratabiliyor; SPK çizgisine en yakın yer de burası. Makro uzmanın önerisi: Quant'ın omurgası **aktarım haritası** olsun (şok → kanal → okurun değişkeni), sorular bu haritanın düğümlerinden ve takvimden çıksın, Motor her düğümde rejime duyarlı çalışsın.

---

## 1. Nedensellik haritası: olmalı mı?

**Evet, ama yapısal model gibi değil, kanıt dosyası gibi.** Harita üç iş görür:

1. **"Ne Olur?" zincirlerini denetler.** Her halka haritada var olan bir kenardan geçmek zorunda. Haritada olmayan bir bağlantı kurulursa "yeni kenar" etiketi alır, kaynağı yazılır ve Karşı görüş geçişi onu özellikle sınar. Böylece zincir hikâye anlatıcılığına kaymaz.
2. **LR seçimini disipline eder.** Brent'te %10'luk bir sıçrama, "Aralık TÜFE %30 altı" sorusunu ne kadar oynatmalı? Haritadaki esneklik (aşağıda 2. kanal) beklenen TÜFE etkisini verir. Motor'un dağılımı bunu olasılık farkına çevirir. Claude "orta kanıt, LR 2" diye göz kararı seçmez.
3. **Sorular arası tutarlılığı sağlar.** Aynı olay, aynı yöndeki iki soruyu ters yöne oynatamaz. Haftalık kontrol bunu yakalar.

**Önerilen biçim:** `data/quant/harita.json`. Düğüm: değişken, veri kaynağı (EVDS seri kodu, BLS, ICE vb.), güncel değer. Kenar: işaret, gecikme, esneklik aralığı (tek sayı değil), kaynak, kanıt düzeyi (A kurum/akademik, B tutarlı gözlem, C uzman yargısı), **rejim notu**. Haritayı her yıl ya da her rejim kırılmasında gözden geçirmek zorunlu. Lucas eleştirisi burada somut: kenarlar rejimle değişir (bkz. §2).

### Türkiye için 15 aktarım kanalı

| # | Kanal | Tipik gecikme | Güç (kanıt) | Kaynak ve not |
|---|---|---|---|---|
| 1 | **Kur → TÜFE** | Etkinin çoğu ilk 4 ayda, 12 ayda büyük ölçüde tamam | Güçlü (A). Ortalama ~%15; ısınmada ~%25, soğumada <%10. 2023'te TCMB maliyet kanalını ~%25 hesapladı (%10 kur ≈ 2,5 puan TÜFE) | [Kara ve ark., TCMB Blog 2017](https://tcmb.gov.tr/wps/wcm/connect/blog/en/main+menu/analyses/exchange+rate+pass-through); [BloombergHT, 2023-III Enflasyon Raporu](https://www.bloomberght.com/tcmb-kurun-enflasyona-etkisini-hesapladi-2335510); [Rossi ve Leigh, IMF 2002](https://www.imf.org/en/publications/wp/issues/2016/12/30/exchange-rate-pass-through-in-turkey-16188). Büyük şoklardan sonra ve yüksek enflasyonda hızlanır: [Özcan Kodaz ve Yürek, TCMB WP 2304](https://ideas.repec.org/p/tcb/wpaper/2304.html). |
| 2 | **Brent → TÜFE** | 12 ay ~1 puan, 24 ay ~1,2 puan (Brent'te %10 için) | Orta-güçlü (A). Eşel mobil ve ÖTV gecikmeyi ve büyüklüğü değiştirir | [TCMB Merkezin Güncesi, Gökcü ve Sezer, Mart 2026 (haber)](https://www.borsagundem.com.tr/tcmb-analizi-petrol-fiyatlarindaki-artis-enflasyonu-12-ayda-1-puan-yukseltiyor) |
| 3 | **Brent → cari denge → risk primi → TL** | Çeyrekler | Orta (B). Net enerji ithalatçısı; etki finansmanın kolaylığına bağlı | Büyüklüğü bu oturumda doğrulanmadı; harita C ile açılmalı |
| 4 | **Fed sıkılaşması → GOP risk primi → TL ve yerel faiz** | Varlık fiyatında gün; tahvil farkında ~3 çeyrek | Güçlü (A). ABD'de 1 puanlık sıkılaşma, 3 çeyrekte GOP 12 aylık tahvil farkını ~2,3 puan açıyor. Ana kanal faiz farkı değil, **risk primi** | [Kalemli-Özcan, VoxEU/NBER](https://cepr.org/voxeu/columns/us-monetary-policy-international-risk-spillovers-and-policy-options) |
| 5 | **Dolar endeksi ve ABD reel faizi → ons altın** | Gün-hafta | Orta (B). 2022 sonrası merkez bankası alımları ilişkiyi zayıflattı | Gram altın = ons × USD/TRY: Türk okuru için iki kanalın çarpımı |
| 6 | **CDS / risk primi → portföy akımı ve carry → TCMB rezervi → kur** | Gün-hafta | Güçlü, doğrusal değil (B). Sakin dönemde akım, şokta ani çıkış | Mart 2025 ve Mart 2026 olayları; rezerv verisi haftalık (Perşembe) |
| 7 | **TCMB fonlama maliyeti → mevduat ve kredi faizi** | Gün-hafta | Güçlü (A/B). Ağustos 2026'da repo ihalelerine dönüşle bazı bankalarda mevduat faizi 1–2,5 puan geriledi | [QNB Araştırma](https://www.qnbinvest.com.tr/investodak/qnbarastirma/merkez-bankasinin-repo-ihalelerine-donusu-mevduat-faizlerini-asagi-cekti). **Not:** politika faizi ile fiili fonlama faizi ayrışabiliyor (1 Mart–Ağustos 2026: ihale yok, fonlama üst bantta) |
| 8 | **Faiz → kredi → iç talep → çekirdek enflasyon** | Kredi aylar; fiyat 10–20 ay (küçük açık ekonomi) | Kredi kanalı güçlü, fiyat etkisi modele duyarlı (A) | [Beşer, Yurttagüler, Kutlu Horvath 2026](https://dergipark.org.tr/en/pub/epfad/article/1909100); [Havránek ve Rusnák, ortalama 29 ay](https://www.cnb.cz/en/economic-research/research-publications/cnb-working-paper-series/Transmission-Lags-of-Monetary-Policy-A-Meta-Analysis-00001) |
| 9 | **TÜFE → kira artış sınırı (TBK 344, 12 aylık ortalama)** | Mekanik: her ay, 12 ay geriye bakan | Çok güçlü (yasa). Geriye dönük endeksleme kira enflasyonunu yapışkan yapar | Kasım 2026 sınırı %31,23: [Milli Gazete](https://www.milligazete.com.tr/kasim-kira-artis-orani-2026-tufe-12-aylik-ortalama-ve-zam-hesaplamasi) |
| 10 | **6 aylık TÜFE → memur ve emekli zammı** | Mekanik: Ocak ve Temmuz | Çok güçlü (yasa). Talep ve bütçe üzerinden geri besleme | Aralık TÜFE ile 4–5 Ocak'ta belli olur |
| 11 | **Asgari ücret → ücretler → TÜFE** | Etkinin çoğu ilk çeyrekte | Orta-güçlü (A). Asgari ücrette %1 → ortalama ücret ~0,93; TÜFE'ye 1 yılda 0,08–0,12 puan | [TCMB 2023-III, BloombergHT](https://www.bloomberght.com/tcmb-ye-gore-asgari-ucret-artisi-enflasyonu-ne-kadar-etkileyecek-2335595). 2026 net asgari ücret 28.075 TL: [Diken](https://www.diken.com.tr/?p=1671085) |
| 12 | **Yönetilen fiyat ve vergi (ÖTV, elektrik-doğalgaz, harç) → TÜFE** | Aynı ay | Güçlü, takvimli (A). Ocak etkisi | ÖTV güncellemesi Ocak ve Temmuz |
| 13 | **Beklentiler → fiyatlama ve dolarizasyon** | Aylar | Orta (A/B). Ekim 2026'da 12 ay sonrası beklenti: piyasa %23,89, reel sektör %31,80, **hane %43,75** | [Alomaliye, TCMB verisi](https://www.alomaliye.com/2026/10/23/enflasyon-beklentileri-ayristi-piyasa-yukseldi-hanehalki-geriledi/) |
| 14 | **Gıda arz şoku (iklim, don, kuraklık) → TÜFE** | 1–6 ay | Güçlü, oynak (B). TCMB 2026 gıda tahmini %28,5'ten %31,3'e çıktı | `tcmb-tahmin-hata.json` |
| 15 | **Kur ve enflasyon beklentisi → hane portföyü (döviz, altın) → kur baskısı** | Hafta-ay | Orta (B). Geri besleme döngüsü; şokta güçlenir | Hane finansal varlıklarının ~%54'ü para ve mevduat (2026 Ç2): [Dünya, TCMB Finansal Hesaplar](https://www.dunya.com/ekonomi/vatandasin-finansal-varliklarinin-yuzde-54u-para-ve-mevduatta-haberi-844746) |

Örnek zincir, haritadan: *Fed beklenenden sert (4) → risk primi ve TL (6) → TCMB fonlama ya da kur rejimi (7) → mevduat ve kredi faizi (7) → okur.* Bugün zincirin en zayıf halkası 4'ten 6'ya geçiş. Yönetilen kur rejiminde Fed şoku kura değil, **rezerve ve fonlama faizine** yansıyor. Bu yüzden harita "TL" düğümünü üçe bölmeli: kur, rezerv, fiili fonlama faizi.

---

## 2. TCMB tepki fonksiyonu ve rejim değişikliği

**Ne kadar tahmin edilebilir?** Yönü, aynı rejimin içinde iyi; adım büyüklüğünü ve rejim kırılmasını kötü.

- 2005–2025 tahmini: güçlü faiz yumuşatma, enflasyona tepki Taylor kuralının altında. Kırılmalar 2018 ve 2021'de. Tepki 2021 sonrası heterodoks dönemde **çöküyor**, Haziran 2023'ten sonra yalnız kısmen toparlanıyor ([Ünal 2025, MPRA](https://econpapers.repec.org/RePEc:pra:mprapa:126223)).
- Ortodoks dönemde bile büyük sürprizler var: Mart 2024'te %50'ye ([Daily Sabah](https://www.dailysabah.com/business/economy/turkish-central-bank-hikes-key-policy-rate-to-50-in-surprise-move)) ve Nisan 2025'te %46'ya ([Daily Sabah](https://www.dailysabah.com/business/economy/turkish-central-bank-hikes-key-policy-rate-to-46-in-surprise-move)) beklenmeyen artırımlar.
- 2026: Ocak'ta %38 → %37; Mart–Eylül arası sabit; 22 Ekim'de %36 ([QNB](https://www.qnbinvest.com.tr/investodak/qnbarastirma/tcmb-ekim-ayi-faiz-kararini-acikladi-politika-faizi-36ya-indirildi)). Görünmeyen sıkılaşma: 1 Mart'ta bir hafta vadeli repo ihaleleri durdu. Fonlama Ağustos sonuna kadar üst bantta (%40) kaldı ([Forbes](https://www.forbes.com.tr/ekonomi/tcmb-repo-ihalelerine-yeniden-basladi-faiz-yuzde-37)). **Politika faizine bakan bir Motor altı ayda sıfır sinyal görürdü. Okurun mevduat faizini belirleyen fiili faiz ise üç puan yukarıdaydı.**
- TCMB'nin kendi tahmin hatası da rejime bağlı. Q4 raporundaki yıl sonu tahmini 2021 hariç iyi (RMSE 1,46 puan). 2021'de hata +17,7 puan. Q3 raporu 14 yılın 12'sinde düşük kalmış (`data/quant/tcmb-tahmin-hata.json`).

**Rejim değişikliği modeli nasıl bozar?** Üç yoldan: (a) kenar esneklikleri değişir (kur geçişkenliği, faizin kura etkisi); (b) karar kuralı değişir; (c) araç değişir (politika faizi yerine koridor, fonlama kompozisyonu, makroihtiyati araç, KKM). Rejim içi kalibre edilmiş bir Motor, kırılma anında en emin olduğu yerde en çok yanılır.

**Öneri: rejimi açık bir değişken yapmak.**

1. **Rejim etiketi** snapshot'a girer: `ortodoks-sıkı`, `ortodoks-gevşeme`, `heterodoks`, `kriz yönetimi`. Etiketin değişmesi bir olaydır, yayın konusudur.
2. **Tetikleyiciler** önceden yazılır. Biri gerçekleşirse rejim "belirsiz" olur: Başkan ya da ekonomi yönetimi değişikliği; takvim dışı PPK; repo ihalesinin durdurulması ya da fonlamanın banda kayması; haftalık rezerv kaybının önceden yazılı bir eşiği aşması; CDS'te haftalık sert sıçrama (eşik geriye dönük veriyle ayarlanır); 1 günde USD/TRY'de %5+ hareket (QUANT.md kırmızı eşiğiyle aynı).
3. **Karışım olasılığı.** `P = w · P(mevcut rejim) + (1 − w) · P(kırılma senaryosu)`. Kaba taban: 2018–2026 arasında üç rejim kırılması (2018, Mart 2021, Haziran 2023) ve iki rejim içi şok (Mart 2025, Mart 2026). Çeyrek başına kırılma tehlikesi kabaca %8–10. 90 günlük sorularda `1 − w ≈ 0,1` başlangıç değeridir. Bu sayı uydurma değil, kaba bir sayım; sicilde "taban: sayım, n=5 olay" diye yazılır.
4. **Belirsiz rejimde:** ilgili sorular log-odds üzerinde %50'ye doğru büzülür (logit × 0,7 gibi önceden yazılmış bir katsayıyla). Bir PPK boyunca yeni politika sorusu açılmaz. Claude ayar sınırı yarıya iner.
5. **Ölçüm:** karnede rejim etiketine göre ayrı döküm. Motor'un kırılma dönemindeki performansı ayrı görünür.

---

## 3. Takvim omurgası (17 Kasım 2026 – 15 Şubat 2027)

Saatler TSİ. **Düzeltme:** QUANT.md'deki "Fed kararı TSİ 21:00" yalnız ABD yaz saatinde doğru. Aralık ve Ocak toplantılarında karar **22:00**'de, ABD TÜFE ve istihdam **16:30**'da.

| Tarih | Olay | K* | Not |
|---|---|---|---|
| ~20–24 Kas | TCMB sektörel enflasyon beklentileri | 2 | Hane–piyasa farkı |
| 29 Kas | OPEC+ (7 ülke) aylık toplantısı | 2 | [OPEC](https://www.opec.org/pr-detail/2033620-1-november-2026.html) |
| ~1 Ara | TÜİK 3. çeyrek GSYH | 1 | TÜİK takviminden doğrulanmalı |
| 3 Ara | **TÜİK Kasım TÜFE** + Aralık kira sınırı | 3 | |
| 4 Ara | ABD Kasım istihdam | 2 | [BLS](https://www.bls.gov/schedule/2026/12_sched_list.htm) |
| 9 Ara 22:00 | **FOMC** (projeksiyonlu) | 2 | [Fed](https://federalreserve.gov/monetarypolicy/fomccalendars.htm) |
| 10 Ara 14:00 | **TCMB PPK** | 3 | Aynı gün 16:30 ABD Kasım TÜFE |
| 17 Ara | ECB | 1–2 | [ECB](https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html) |
| Aralık | **Asgari ücret 2027**; 2027 bütçesi TBMM'de; TCMB Piyasa Katılımcıları Anketi | 3 | Tarihler açıklanınca sicile |
| Ocak başı | ÖTV güncellemesi, yönetilen fiyatlar | 3 | |
| 4 Oca (doğrulanmalı) | **TÜİK Aralık TÜFE** → yıl sonu, memur-emekli zammı, kira | 3 | 3 Ocak Pazar'a denk geliyor |
| 8 / 13 Oca | ABD Aralık istihdam / TÜFE | 2 | [BLS](https://www.bls.gov/schedule/2027/01_sched_list.htm) |
| 21 Oca 14:00 | **TCMB PPK** | 3 | [QNB takvim](https://www.qnbinvest.com.tr/investodak/qnbarastirma/tcmb-2026-2027-faiz-karari-takvimi-aciklandi-yatirimcilar-icin-kritik-tarihler) |
| Ocak sonu | Moody's ve Fitch Türkiye notu (2027 takvimi henüz açıklanmadı; 2026'da 23 Ocak'tı) | 2 | [QNB](https://www.qnbinvest.com.tr/investodak/qnbarastirma/turkiyenin-kredi-notu-takvimi-netlesti-gozler-23-ocakta) |
| 27 Oca 22:00 | FOMC | 2 | |
| 3 Şub | **TÜİK Ocak TÜFE** (Ocak etkisi) | 3 | |
| 4 Şub | ECB | 1–2 | |
| ~5 / ~10 Şub | ABD Ocak istihdam (yıllık revizyon) / TÜFE | 2 | Tarihler doğrulanmalı |
| 11 Şub | **TCMB 2027-I Enflasyon Raporu** | 3 | 2027 ara hedefi %21 |
| Haftalık | TCMB rezervleri, yerleşik döviz mevduatı | 2 | Rejim tetikleyicisi |

*K: Anayasa §6 karar ilgisi. 3 = okurun parasına 90 gün içinde doğrudan değen.*

**En yüksek karar değeri** mekanik olarak okurun cebine bağlanan beş olayda: Kasım ve Aralık TÜFE (kira sınırı, memur-emekli zammı), TCMB'nin iki kararı (mevduat ve kredi faizi), asgari ücret, Ocak ÖTV ve yönetilen fiyatlar. Fed ve Brent ikinci halka: okura TL, fonlama ve akaryakıt üzerinden ulaşırlar.

---

## 4. Sürekli değişkenler: eşik mi, dağılım mı?

**Öneri: içeride dağılım, dışarıda eşik.**

- **Motor her sürekli değişken için dağılım üretir.** Örnek: Aralık yıllık TÜFE için 5 aralıklı olasılık sepeti ya da medyan ve çeyreklikler. Sicile tam dağılım yazılır. Bu dağılım 30 kapanıştan sonra **CRPS / RPS** ile puanlanabilir ([Gneiting ve Raftery 2007](https://apps.dtic.mil/sti/pdfs/ADA459827.pdf)). Kalshi de TÜFE'yi aralık sepetleriyle sözleşmeleştiriyor ([kural metni](https://kalshi-public-docs.s3.amazonaws.com/regulatory/rulebook/contract_terms/LCPI.pdf)). Dağılım, aynı değişkene ait farklı eşik sorularının **birbiriyle tutarlı** olmasını garanti eder.
- **Yayın birimi Anayasa'ya uygun kalır.** Evet/hayır eşik sorusu aynı dağılımdan türetilir. Ana karne Brier ile sürer.
- **Karşılaştırma tabanı anket olmalı, %50 değil.** Veri sorularında doğal rakip piyasa konsensüsüdür (AA Finans, TCMB anketi). "Konsensüse göre beceri skoru" ayrı satır olsun. Konsensüsü yenemiyorsak bunu söyleriz.

**Türk okuru için eşik seçim kuralı (sırayla):**

1. **Kurumsal ya da yasal anlamı olan eşik.** Kira artış sınırını değiştiren 12 aylık ortalama, memur-emekli zammını belirleyen 6 aylık kümülatif TÜFE, TCMB'nin yıl sonu tahmini ya da ara hedefi, asgari ücret artışının yıl sonu TÜFE'ye göre konumu, mevduat faizinin enflasyona göre konumu (reel getiri işareti).
2. **Konsensüs eşiği.** "Anket medyanının üstünde gelir mi?" Sürprizin kendisini ölçer. Tabanı en sağlam soru tipidir.
3. **Bant kuralı.** Eşik, Motor dağılımında %15–85 aralığına düşmeli. Pratikte medyanın ±0,5–1 standart sapması.
4. **Yuvarlak sayı yalnız psikolojik eşik olarak anlamı varsa.** "Dolar 60" gibi eşikler okur için anlam taşımıyorsa açılmaz.

---

## 5. Hane halkının kararlarıyla köprü, tavsiye vermeden

İlke: **mekanizma ve takvim ver, tercih verme.** Okurun değişkenleri (kira, maaş, mevduat faizi, kredi kartı faizi, vergi, harç) birçok durumda makro sayılara yasa ya da kural ile bağlı. Bu bağı göstermek bilgi vermektir, tavsiye değildir.

| Yapılır (bilgi) | Yapılmaz (tavsiye ya da yön) |
|---|---|
| "Ocak'ta yenilenen kira sözleşmesinde yasal üst sınır 4 Ocak'ta açıklanacak 12 aylık ortalama TÜFE'dir. Bu oranın %X'in altında kalma olasılığı Y." | "Kiranızı şimdi sabitleyin" |
| "Emekli zammı Temmuz–Aralık TÜFE'sinden hesaplanır; şu ana kadar birikmiş oran %Z." | "Emekli olmayı erteleyin" |
| "Mevduat faizi TCMB fonlama faizini birkaç gün içinde izler; 10 Aralık kararı bu faizi belirler." | "Mevduatı şimdi kilitleyin" |
| Fisher aritmetiği: "Nominal faiz − beklenen enflasyon = reel getiri; hane beklentisi %43,75, piyasa %23,89, son gerçekleşen %29,77." | "Altın mı, dolar mı, mevduat mı?" karşılaştırması, getiri sıralaması |
| "Bu karar şu tarihte belli olacak; o güne kadar izlenecek gösterge şu." | "Fırsat", "kaçırmayın", "şimdi" dili |

**En değerli hizmet beklenti kalibrasyonu olabilir.** Hane halkı 12 ay sonrası için %43,75 enflasyon bekliyor. Piyasa %23,89, son gerçekleşen %29,77. Okurun kendi beklentisini sınaması tavsiye değildir ama karar kalitesini doğrudan etkiler. KARAR §2.8 Quant'ta anket kullanımını yasaklıyor. Bu yasak fiyat soruları için mantıklı, ama "Sen yıl sonu enflasyonuna yüzde kaç dersin?" bir fiyat sorusu değil. Karar vericiye soruyorum (bkz. c).

Hukuki not: SPK mevzuatında (6362, Tebliğ III-37.1) yatırım danışmanlığı kişiye ya da benzer profildeki gruba yönelik yönlendirmedir. Genel mekanizma anlatımı bunun dışında kalıyor gibi görünüyor, ancak ben hukukçu değilim. "Eylem satırı" şablonları yayından önce bir kez hukuk görüşüne gösterilmeli.

---

## 6. Mevcut soru setinin makro eleştirisi (`data/quant.json`)

Genel bulgu: açık sekiz sorunun altısının son tarihi 90 günü aşıyor, beşi ~357 gün. Anayasa v2'nin ufuk kuralına (%80'i ≤90 gün) aykırılar ve pilot süresinde kapanmayacaklar. Karne beslenemez.

| Soru | Hüküm | Gerekçe ve öneri |
|---|---|---|
| `tcmb-aralik` (%62) | **İyi soru, zayıf Motor** | K=3, 10 Aralık'ta kapanıyor (son tarih 31 Aralık yerine karar günü olmalı). Motor "7 indirim / 3 sabit" oranını olasılık sayıyor. Bu bir oy sayımı, olasılık değil: 6 kurum görüş vermemiş, veri 4 Kasım'dan kalma. Motor şöyle olmalı: anket medyanının yönü × medyanın tarihsel yön isabeti (yeni veri seti: `tcmb-karar-anket.json`, 2021–2026, kaynaklı). 16.11 kararıyla News'e geçmeli. |
| `tr-tufe-30` (%40) | **İyi** | Mekanik, dağılıma dayalı, kâhin testinden geçer. sd=0,6 varsayımı anket sürpriz geçmişinden ampirik olarak hesaplanmalı. News'e geçmeli. |
| `usdtry-60` (%55) | **Kötü** | 12 aylık soru; lognormal bariyer modeli yönetilen kur rejimine uymuyor (σ=%10 keyfi, gerçekleşen oynaklık çok düşük, risk sıçramada). 60 okur için anlamsız bir sayı. Soru aslında "rejim kırılır mı" sorusu, ama gizli. **Yerine:** (a) "Aralık'ta USD/TRY'nin aylık artışı aylık TÜFE'nin altında kalır mı?" (reel değerlenme sürüyor mu); (b) `kuyruk` etiketli "90 günde bir günde %5+ hareket". Motor: sürüklenme + sıçrama karışımı. |
| `fed-artirim` (%97) | **Kötü artık** | %90 üstü, Anayasa'ya göre sessiz izlemeye girmeli. **Yerine:** "9 Aralık projeksiyonlarında 2027 medyanı en az bir ek artırım gösterir mi?" ya da "Ocak FOMC'de artırım?". |
| `abd-resesyon` (%33) | **Kötü** | Kâhin testi zor: NBER ilanı aylar sonra gelir, iki negatif çeyrek 8 Kasım 2027'de henüz yayımlanmamış olabilir. K=1. **Yerine:** "Şubat istihdam raporunda işsizlik %4,4 ya da üstü?" ya da Sahm göstergesi eşiği. |
| `brent-110` (%60) | **Orta** | K=2 (akaryakıt ve TÜFE kanalı). Altı ay uzun; OVX girdisi 12 gün bayat. 90 güne indirilmeli ve News'teki motorin sorularıyla haritadaki 2. kanal üzerinden tutarlı tutulmalı. |
| `altin-4500` (%45) | **Sorunlu** | Türk okuru için gerçek değişken gram altın, ons değil. Ayar gerekçesi "eğilim aşağı olduğu için ayar aşağı": bu bir **yön görüşü**, SPK çizgisinin gri bölgesi. Fiyat eşiğinde Claude ayarı yalnız ölçülebilir girdilerle (vadeli eğri, oynaklık terim yapısı) yapılmalı, eğilimle değil. |
| `nasdaq-25` (%34) | **Düşük öncelik** | K=1, 12 ay. `kuyruk`a alınmalı ya da kapatılmalı. |
| `abd-tufe-ekim-03` (kapandı) | **Şablon** | Kısa, takvimli, konsensüs tabanlı, kâhin testinden geçiyor. Yeni soruların çoğu bu kalıpta olmalı. |

**Eklenmesi gerekenler (≤90 gün, takvimden).** Hangi kanalda yayınlanacakları 16.11 kararına göre ayrılır:

1. Kasım TÜFE aylık, anket medyanının üstünde mi? (3 Ara)
2. Temmuz–Aralık 6 aylık kümülatif TÜFE, eşik X'in üstünde mi? (Emekli zammı; 4 Oca)
3. Ocak kira artış sınırı (12 aylık ortalama) eşik X'in altına iniyor mu? (4 Oca)
4. TCMB 10 Aralık'ta 100 baz puan ya da daha fazla indiriyor mu? ("Herhangi bir indirim" sorusundan daha bilgilendirici.)
5. 2027 net asgari ücret artışı, 2026 yıl sonu TÜFE'nin üstünde mi? (Açıklandığı gün; kişi ve parti adı geçmez.)
6. TCMB 21 Ocak kararı.
7. Ocak 2027 TÜFE aylık, eşik X'in üstünde mi? (Ocak etkisi; 3 Şub)
8. TCMB 11 Şubat raporunda 2027 ara hedefini %21'in üstüne çekiyor mu?
9. Aralık'ta USD/TRY'nin aylık artışı aylık TÜFE'nin altında mı? (Reel kur)
10. TCMB brüt rezervi 31 Ocak'ta eşik X'in üstünde mi? (Rejim göstergesi)
11. Hane halkının 12 ay sonrası enflasyon beklentisi Ocak ölçümünde %40'ın altında mı? (Beklenti çapalanması)
12. OPEC+ 29 Kasım'da Ocak üretim hedeflerini artırıyor mu?
13. Fed Aralık projeksiyonu (yukarıda).

---

## (a) En önemli 5 önerim

1. **Aktarım haritası** (`data/quant/harita.json`): 15 kanal, esneklik aralığı, gecikme, kaynak, kanıt düzeyi, rejim notu. Her "Ne Olur?" zinciri ve her LR seçimi haritadan geçer.
2. **Rejimi açık değişken yap.** Rejim etiketi, önceden yazılı tetikleyiciler, %10'luk kırılma karışımı, belirsiz rejimde %50'ye büzülme. Politika faizi ile fiili fonlama faizi ayrı izlenir.
3. **Soru setini takvime bağla, 12 aylık eşikleri kapat.** `fed-artirim` sessiz izlemeye, `abd-resesyon` ve `usdtry-60` yeniden yazılır, `nasdaq-25` kuyruğa. Yeni sorular §3 takviminden, ≤90 gün.
4. **İçeride dağılım, dışarıda eşik; rakip konsensüs.** Eşikler yasal ya da kurumsal anlamından seçilir. Karnede "konsensüse göre beceri" satırı olur.
5. **Hane köprüsü = mekanizma + takvim + beklenti kalibrasyonu.** Okurun değişkenine bağlanan kural yazılır, tercih yazılmaz. Fiyat eşiğinde eğilime dayalı Claude ayarı yasaklanır.

## (b) Diğer uzmanlarla çatışabilecek noktalar

- **16.11 kararıyla:** Makro veri ve karar soruları News'e geçti. Quant'ta yalnız fiyat eşikleri kaldı. Fiyat eşikleri ise makro uzmanın en az katkı yapabildiği, piyasanın en iyi fiyatladığı alan. Öneri: Quant, harita ve ortak Motor'un sahibi olsun; soruyu kim yayınlarsa yayınlasın, makro soruların Motor'u ve kanal analizi Quant'tan gelsin.
- **Nicel/finans uzmanıyla:** Bariyer formülleri ve opsiyon ima oynaklığı fiyat soruları için doğru araç. Yönetilen kurda (USD/TRY) ise yanlış dağılım. Sürüklenme + sıçrama karışımı önerim, "tek model, tüm varlıklar" sadeliğiyle çatışır.
- **Davranışsal uzmanla:** Hane beklentisi anketinin Quant'ta kullanılması KARAR §2.8'e takılır.
- **Hukuk ve SPK tarafıyla:** Kira, maaş ve mevduat eylem satırları tavsiyeye yakın okunabilir. Benim çizgim "kural ve takvim", onlarınki daha sıkı olabilir.
- **Yayın ritmiyle:** Aralık'ın ilk on günü çok yoğun (3, 4, 9, 10 Aralık). Günde bir olay gönderisi kuralı bu haftayı sıkıştırır.

## (c) Karar vericiye sorular

1. Makro Motor ve harita Quant'ın mı olsun (News onu kullanır), yoksa her kanal kendi Motor'unu mu yazsın?
2. Beş adet ~12 aylık açık soru: pilot boyunca sessiz izlemeye alınsın mı, yoksa 90 günlük karşılıklarıyla değiştirilsin mi? (Kapanmış hiçbir soru değişmez; açıkların yerine yenisi açılır.)
3. "Hane enflasyon beklentisi" ve "Sen yüzde kaç dersin?" anketi, fiyat sorusu olmadığı için Quant'ta serbest bırakılsın mı?
4. Rejim tetikleyicileri (rezerv ve CDS eşikleri) Yusuf onayıyla mı sabitlensin? Önerim: geriye dönük veriyle ayarlansın, sonra kilitlensin.
5. Eylem satırları için bir kerelik hukuk görüşü alınacak mı?

## (d) Quant'ın başarısını 90 günde nasıl ölçeriz (makro açısından)

| Ölçüt | Hedef (17 Şubat 2027) |
|---|---|
| Makroya bağlı kapanış (Quant + ortak Motor'lu News) | ≥ 15; yeni soruların ≥ %80'i ≤ 90 gün |
| K=3 takvim olayı kapsaması | Penceredeki her K=3 olay için olaydan ≥ 7 gün önce açılmış soru: %100 |
| Konsensüse göre beceri (veri soruları) | Raporlanır, n ile birlikte; hedef ≥ 0. Negatifse söylenir. |
| Motor girdi tazeliği | Motor'a giren hiçbir piyasa girdisi 3 iş gününden bayat değil. Bayatsa sayı "eski veri" etiketi alır. Bugün OVX ve GVZ 12 gün bayat. |
| Harita kapsaması | "Ne Olur?" halkalarının ≥ %80'i mevcut kenarlardan geçer. En az bir kenar Türk verisiyle yeniden tahmin edilir (örn. Brent + kur → pompa fiyatı). |
| Tutarlılık | Aynı değişkene ait sorular arasında çelişkili olasılık çifti: 0 |
| Rejim günlüğü | Her tetik kaydedilir; yanlış alarm ve kaçırılan kırılma sayısı dönem sonunda raporlanır. |
| SPK hijyeni | Fiyat sorularında eğilime dayalı ayar gerekçesi: 0 |
