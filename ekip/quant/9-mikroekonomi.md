# 9 · Mikroekonomi, Sektör ve Fiyat Oluşumu

*Quant v2 yöntem ekibi · Mikroekonomi uzmanı · 17.11.2026. Okunanlar: `ekip/quant/BRIEF.md`, `ANAYASA.md` v2, `QUANT.md`, `ekip/KARAR.md`, `data/quant.json`, `data/sorular.json` (iki motorin sorusu), `quant/motor.py`, `data/signals/2026-11-11/14.json`. Hiçbir kural dosyasına dokunulmadı.*

## Özet

1. **Okurun cüzdanına değen fiyatların çoğu "piyasa" değil, kural ya da karar fiyatıdır.** Akaryakıt formüle, kira ve memur ile emekli zammı yasal formüle bağlı. Elektrik, doğal gaz ve asgari ücret ise karar fiyatı. Planck'in Motor'u bu ayrımı bilmeden kurulursa yanlış yerde olasılık üretir.
2. **Üç sınıf, üç ürün.** *Kurallı ve belirsiz* olanlardan soru çıkar (ör. motorin 7 günlük zam). *Kurallı ve neredeyse belirli* olanlar soru olmaz, hesap kartı olur (ör. Aralık kira tavanı, 1 Aralık ÖTV artışı). *Karar fiyatlarına* taban oranı ve takvim modeli kurulur (ör. BOTAŞ Ocak tarifesi, asgari ücret).
3. **Sicildeki motorin sorusunda hata var.** `pb-2026-11-11-motorin-90` Motor'u ÖTV'yi "sabit" saydı. Oysa 13 Ağustos 2026'da Resmî Gazete'de motorin ÖTV takvimi yayımlanmıştı: Kasım 9 TL, Aralık 12 TL, Ocak 2027 13,90 TL. Bu, son tarihte pompaya KDV dahil yaklaşık **+5,9 TL** ekler. Düzeltilmiş Motor **%3–10** bandında; yayınlanan Motor %45, yayınlanan sayı %37 idi (bugün %33). Bu bir olasılık hatası. Anayasa §8'e göre `duzeltme` kaydı gerekir.
4. **Sektör analizinde yön değil, maruziyet anlatılır.** Hangi maliyet kanalı, ne kadar büyük, ne kadar hızlı geçiyor ve yükü kim taşıyor? Kapanan soru, hisse fiyatına değil sektör verisine (TİM, ODMD, TÜRKBESD, SHGM, TÜİK ruhsat) bağlanır.
5. **Ölçüm farkı taraf tutmadan anlatılabilir.** "Kişisel enflasyon hesaplayıcısı" TÜİK'in kendi alt endekslerini okurun kendi harcama payıyla tartar. Böylece resmi veriyi ne yalanlar ne doğrular; okurun deneyimini de mekanizmayla açıklar.

---

## 1. Cüzdan fiyatlarının oluşum haritası

Sınıflar: **H** kurallı formül (girdiler bilinirse sonuç hesaplanır) · **Y** yarı kurallı (formül var, parametreyi karar verici ayarlar) · **K** karar fiyatı (zamanlama ve büyüklük siyasi ya da idari).

| Fiyat | Belirleyen | Mekanizma ve bileşenler | Geçiş hızı | Sınıf |
|---|---|---|---|---|
| **Benzin, motorin** | Tüpraş (rafineri), dağıtıcı, bayi; vergiyi Cumhurbaşkanı kararı belirler | Pompa = [(Akdeniz ürün fiyatı $/ton × USD/TRY → TL/litre) + ÖTV (maktu, TL/L) + EPDK gelir payı + dağıtıcı ve bayi marjı] × 1,20 KDV. Referans Brent değil, Platts Akdeniz (Cenova/Lavera) ürün fiyatıdır; korelasyon benzinde ~%90, motorinde ~%96 ([Hürriyet, 2022](https://www.hurriyet.com.tr/ekonomi/10-soruda-akaryakit-fiyatlari-nasil-olusuyor-42025338)). Rafineri fiyatı, son günlerin referans ortalaması bir bandı aşınca değişir; yeni fiyat ertesi gün 00:00'da pompaya geçer. | 1–3 gün (bant aşılınca) | **H** (ÖTV takvimi dışında) |
| **ÖTV (akaryakıt)** | Cumhurbaşkanı kararı | Maktu. Kanuna göre Ocak ve Temmuz'da son altı ayın Yİ-ÜFE'si kadar güncellenir, ama karar bunu sık sık değiştirir: Ocak 2026'da ÜFE yerine %6,95 uygulandı ([Ekonomi Gazetesi](https://www.ekonomigazetesi.com/ekonomi/akaryakitta-yuzde-695-sigara-ve-alkollu-iceceklerde-yuzde-795-otv-artisi-68770)). 2026'da eşel mobil 5 Mart'ta devreye girdi (artışın %75'i ÖTV'den karşılanıyordu; [PwC, 10995 s. karar](https://www.pwc.com.tr/tr/hizmetlerimiz/vergi/dolayli-vergi/bultenler/kdv-otv-bultenleri/2026/akaryakitlarda-esel-mobil-sistemi-uygulamasi.html)). Kademeli olarak azaltıldı (%50, sonra %25) ve 1 Ekim'de bitti ([Bloomberg HT](https://www.bloomberght.com/esel-mobil-sisteminin-kademeli-sonlandirilmasi-kararlastirildi-3781912)). **Motorin:** 13 Ağustos'ta sıfırlandı; sonra 3 → 6 → 9 → **12 (1 Aralık)** → **13,9006 TL (1 Ocak 2027)** ([Bloomberg HT](https://www.bloomberght.com/ay-sonuna-kadar-motorinde-otv-sifirlandi-3785344), [QNB Yatırım](https://www.qnbinvest.com.tr/investodak/qnbarastirma/motorinde-otv-duzenlemesi-akaryakit-fiyatlarinda-yeni-donemi-baslatti)). **Benzin:** 4,44 → 7,90 → 11,36 → **14,8277 TL (1 Aralık)** ([Foreks](https://www.foreks.com/haber/detay/6abdc42624008d7d4373a113/PICNEWS/tr/benzine-4-27-tl-zam-geldi-otv-artisi-kasim-ve-aralikta-surecek-01-10-26/)). | Takvimli, önceden bilinir | **Y** |
| **Elektrik (konut)** | EPDK (ulusal tarife), Hazine sübvansiyonu | Tarife dönemleri üçer aylık; Nisan 2026'da %25 zam. Son kaynak tedarik limiti 2027'de 4.000'den **3.000 kWh/yıl**'a iniyor; yaklaşık 6,5 milyon abone etkilenecek ([Bloomberg HT, 30.10.2026](https://www.bloomberght.com/epdk-son-kaynak-tedarik-tarifesinde-limiti-dusurdu-3792931)). | Karar günü | **K** |
| **Doğal gaz (konut)** | BOTAŞ (aylık tarife), EPDK (dağıtım ve kademe limiti) | BOTAŞ maliyetin altında satıyor; fark görev zararı olarak kalıyor. Nisan 2026: %25 zam ve iki kademeli fiyat. İl bazlı aylık limit aşılırsa **bütün tüketim** üst kademeden faturalanır. Ankara, Ekim: limit 76,86 m³ iken 1.334 TL; 77 m³'te 2.015 TL ([Alomaliye, 4.11.2026](https://www.alomaliye.com/2026/11/04/konutlarda-tuketilen-dogal-gaz-bedellerinde-kademelendirme/)). | Ayın 1'i | **K** |
| **Kira (konut)** | TBK; TÜİK oranı ilan eder | %25 sınırı 1 Temmuz 2024'te bitti; yenilemede tavan TÜFE'nin 12 aylık ortalama değişimi. Kasım 2026 tavanı %31,23 ([Paratic](https://paratic.com/kasim-2026-kira-artis-orani-belli-oldu-yuzde-31-23/)). Yeni sözleşme serbest; TÜİK kira alt endeksi yıllık %39,71 ([TCMB Ekim fiyat raporu](https://www.tcmb.gov.tr/wps/wcm/connect/15fe8641-cdde-4e1e-846a-446eed1d9447/afiyatekim26.pdf?MOD=AJPERES)). | Tavan aylık; piyasa kirası sözleşmede | Tavan **H**, piyasa kirası serbest |
| **Gıda** | Serbest; ekmekte il düzeyi karar, çiğ sütte Ulusal Süt Konseyi tavsiye fiyatı, hububatta TMO alım fiyatı | Maliyet: enerji, gübre, yem (kura bağlı), işçilik, iklim. Ekim 2026'da işlenmemiş gıda aylık %6,04 arttı. | Taze ürün haftalık; işlenmiş gıda aylık–çeyreklik | Çoğu serbest; ekmek ve süt **K** |
| **İlaç** | Sağlık Bakanlığı | Referans ülke fiyatı (euro) × "dönemsel avro değeri". Ağustos 2026 tebliğinden beri euro değerindeki değişim otomatik yansıyor: liste cuma ilan ediliyor, salı yürürlüğe giriyor ([Evrensel, 29.08.2026](https://www.evrensel.net/haber/5998288/ilac-fiyatlarinda-avro-kuruna-gore-otomatik-zam-fiyatlar-haftalik-guncellenecek)). *Avro değerinin nasıl hesaplandığını (oran, ortalama dönemi) tebliğ metninden doğrulayamadım.* | Haftalık | **Y** |
| **Otomobil** | Distribütör liste fiyatı; ÖTV matrah dilimleri karar | Euro/dolar bazlı fiyat × kur; ÖTV oranı matrah dilimine göre değişir; dilimler karar ile güncellenir. Dilim sınırını aşan küçük bir fiyat artışı vergiyi sıçratır. | Liste aylık; vergi kararla | **Y** |
| **Ulaşım** | İstanbul'da UKOME; otoyol ve köprüde KGM; uçakta serbest | Toplu taşımada belediye kararı; otoyolda yıllık Ocak ayarı. | Karar günü | **K** |
| **İletişim** | Operatörler serbest; vergi ve harç devlette | Tarife kur, enflasyon ve vergiyle değişir; rekabet sınırlı. | Çeyreklik | Serbest |
| **Eğitim (özel)** | Okul; MEB üst sınır yöntemi | Yıllık, akademik yıl başında. | Yıllık | **Y** |
| **Asgari ücret** | Asgari Ücret Tespit Komisyonu | 2026 net 28.075,50 TL; 2027 için komisyon Aralık'ta toplanacak ([Haber Gazetesi](https://www.habergazetesi.com.tr/2027-asgari-ucret-ne-kadar-olacak-bakan-isikhan-tarih-verdi-yuzde-20-25-30-35-ve-40-zam-hesaplamasi)). | Yılda bir | **K** |
| **Emekli ve memur aylığı** | Kanun ve toplu sözleşme | SSK ve Bağ-Kur: altı aylık TÜFE. Memur: sözleşme oranı + enflasyon farkı. Ocak 2027 için yaygın hesap: emekli %8,7, memur %6,67 ([Dünya](https://www.dunya.com/foto-galeri/ekonomi/milyonlarin-ocak-zammi-icin-yeni-hesap-emekliye-yuzde-87-memura-yuzde-667-galeri-836156)). En düşük emekli aylığı ayrı yasa gerektirir. | Ocak ve Temmuz | **H** (taban aylık **K**) |
| **Kredi kartı faizi** | TCMB (azami oranlar) | Borç tutarına göre kademeli: aylık akdi %3,25 / %3,75 / %4,25 (1 Eylül 2026). 2026 başından beri değişmedi ([Halk TV](https://halktv.com.tr/ekonomi/kredi-karti-faiz-karari-merkez-bankasi-acikladi-1052431h)). | Aylık ilan | **K** (TCMB karar fonksiyonu) |

**Yapışkanlık notu.** Serbest fiyatlarda değişim seyrek ve kümelidir ([Nakamura ve Steinsson 2008](https://doi.org/10.1162/qjec.2008.123.4.1415)). Akaryakıtta "yükselişte roket, düşüşte tüy" asimetrisi uluslararası literatürde güçlü biçimde belgelenmiştir ([Borenstein, Cameron ve Gilbert 1997](https://doi.org/10.1162/003355397555118)). Türkiye için Rekabet Kurumu'nun 2024 raporu pazarın oligopol yapısını vurgular: ilk beş dağıtıcının payı yaklaşık %76'dır. Rapor ayrıca dağıtıcıların bayilere bildirdiği tavsiye fiyatlarının koordinasyon doğurabileceğini söyler ([Rekabet Kurumu raporu](https://www.rekabet.gov.tr/Dosya/akaryakit-sektor-incelemesi-raporu-20240318105053196.pdf); [EY özeti](https://www.ey.com/tr_tr/insights/law/rekabet-hukuku-uyum-hizmetleri/akaryakit-sektor-raporu-yayimlandi)). Motor asimetriyi varsaymamalı; kendi verimizle ölçmeli. Kur geçişinin Türkiye'de gecikmeli olduğu bulgusu da TCMB çalışmalarında yer alır ([Kara ve Öğünç 2008, TCMB WP 08/10](https://www.tcmb.gov.tr/wps/wcm/connect/en/tcmb+en/main+menu/publications/research/working+paperss/2008/08-10)). *Bu bağlantıyı bu oturumda açmadım.*

## 2. Soruyu nereden çıkarmalı: üç sınıfın ürünü

| Sınıf | Belirsizlik kaynağı | Ürün | Neden |
|---|---|---|---|
| **H, girdisi oynak** (pompa fiyatı, emekli zammı eşiği) | Girdinin dağılımı (ürün fiyatı, kur, aylık TÜFE) | **Soru** + Motor | Formül sabit; olasılık girdinin oynaklığından hesaplanır. Motor deterministik ve denetlenebilir olur. |
| **H, girdisi neredeyse bilinen** (Aralık kira tavanı, 1 Aralık ÖTV artışı) | Çok küçük | **Hesap kartı** | Olasılık %90'ın üstünde çıkar; Anayasa §2'nin %15–85 bandına girmez. Değeri bilginin kendisinde. |
| **K** (BOTAŞ, EPDK, asgari ücret, TCMB kart faizi) | Karar vericinin davranışı | **Soru**: taban oranı + takvim + maliyet açığı | Dış görünüm: "Ocak aylarında BOTAŞ kaç kez zam yaptı?" İç görünüm: görev zararı, seçim takvimi, OVP. |

**Ana tavsiye:** Her mikro soruda Motor iki katmanlı yazılsın. **(1) Takvim katmanı:** önceden ilan edilmiş vergi, tarife ve kademe değişiklikleri; bunlar olasılık değil, olgudur. **(2) Stokastik katman:** ürün fiyatı, kur ve aylık TÜFE dağılımı. Motorin vakası, birinci katman unutulduğunda neler olduğunu gösteriyor (bkz. §7).

## 3. Soru aileleri

Her aile için: örnek soru · Motor · veri · geçmiş veri · kanal. 16.11 kararıyla takvimli veri ve karar soruları News'e geçti. Aşağıdakilerin çoğu News'in "Peki Biz?" omurgasıdır; Quant bunlara **Motor altyapısını** sağlar.

### A. Akaryakıt kısa vade (7–14 gün) · en yüksek değer

- **Soru:** "İstanbul Avrupa Yakası'nda motorinin pompa fiyatı 24 Kasım'a kadar 17 Kasım fiyatından en az 1,00 TL yukarı çıkar mı?" Eşik yön ve büyüklük içerir; "herhangi bir değişiklik" sorusu fazla kolaydır.
- **Motor:** (1) *Birikmiş fark:* son N gün Akdeniz motorin ortalaması × USD/TRY, son rafineri fiyatı değişikliğindeki referansla karşılaştırılır. Fark TL/L'ye ve KDV'ye çevrilir. (2) *Bant kuralı:* geçmiş değişikliklerden "farkın kaç TL'yi aşınca fiyatın değiştiği" kestirilir. (3) Kalan 7 gün için ürün fiyatının oynaklığıyla (ICE gasoil vadelisi) aşma olasılığı hesaplanır. (4) Takvim katmanı: aradaki ÖTV adımı eklenir.
- **Güncel duyarlılıklar** (USD/TRY 50,28): ürün fiyatında 1 $/varil ≈ litrede 0,32 TL KDV hariç, **≈0,38 TL KDV dahil**. Kurda %1 ≈ pompada ~%0,7 (motorinin vergi dışı payı ~%70 varsayımıyla; ayrıştırma doğrulanmalı).
- **Veri:** Platts Akdeniz ücretli. Ücretsiz vekil: ICE Low Sulphur Gasoil vadelisi + TCMB kuru. Pompa: dağıtıcı ilanları (Opet, PO, Shell) ve EPDK il ve dağıtıcı sorgusu (arşiv derinliğini doğrulayamadım). "Sektör kaynakları" haberi değişiklikten genellikle bir gün önce düşer; **soru o haberden önce açılmalı**, yoksa kâhin testi bozulur.
- **Geçmiş veri:** Kalite bakımından en zayıf halka. Günlük pompa serisinin kamuya açık, makine okunur bir arşivini doğrulayamadım. **Bugünden itibaren günlük kazıma başlatılmalı** (`data/mikro/pompa.jsonl`). Geçmiş için haber arşivi elle doldurulabilir ("zam/indirim geldi" haberlerinin tarih ve tutarı; 2026 için birkaç yüz kayıt).
- **Karar değeri:** Depo doldurma zamanı, nakliye ve taksi maliyeti. Haftada 1–2 kapanış verir; karne N'ini hızla büyütür. **Uyarı:** aynı petrol şokuna bağlı sorular birbiriyle ilişkilidir; etkin örneklem kapanış sayısından küçüktür. Karne bunu söylemeli.

### B. ÖTV ve tarife takvimi · hesap kartı, soru değil

1 Aralık'ta motorine vergiden **+3,60 TL**, benzine **+4,16 TL** (KDV dahil) gelecek. 1 Ocak'ta motorine bir +2,28 TL daha eklenecek. Ocak'taki olağan Yİ-ÜFE güncellemesinin 13,9006 TL'ye ayrıca uygulanıp uygulanmayacağı açık değil; kararla değişebilir. Bu bilgi okur için değerli ama olasılık değil. **"Takvim kartı"** olarak yayınlanmalı. Güncellemeyi "Ocak'ta ÜFE güncellemesi uygulanır mı?" karar sorusu olarak açmak mümkün; tabanı son yıllarda ÜFE oranının tam uygulandığı dönemlerin sayısı.

### C. Emekli ve memur Ocak zammı eşiği

- **Soru:** "SSK ve Bağ-Kur emekli aylıklarının Ocak 2027 artışı (Temmuz–Aralık TÜFE) %9,0'u aşar mı?"
- **Motor:** Temmuz–Ekim kümülatifi TÜİK'ten biliniyor. Kasım ve Aralık için anket medyanı ± tarihsel iki aylık tahmin hatası kullanılır (snapshot'ta `tr_tufe_2ay_tahmin_hatasi_sd 0,6` zaten var). Memur için: `(1,05) × (1 + 6 aylık TÜFE)/(1,07) − 1`. Bu formül Dünya'nın %6,67 hesabını yeniden üretiyor.
- **Kapanış:** 5 Ocak 2027, TÜİK. **Not:** `tr-tufe-30` ile aynı girdiye dayanır; iki soru bağımsız sayılmamalı.
- **Karar değeri:** Çok yüksek; 16 milyonu aşan emekli.

### D. Karar fiyatları: enerji tarifeleri

- **Soru:** "BOTAŞ 1 Ocak 2027'de konut doğal gaz tarifesini artırır mı?" / "EPDK 1 Ocak'ta konut elektrik tarifesini artırır mı?"
- **Motor:** Taban oranı: BOTAŞ aylık tarife arşivinden "Ocak aylarında konut zammı sıklığı" ve "son zamdan bu yana geçen ay". Ayar girdileri: ithal gaz maliyetinin petrole 6–9 ay gecikmeli bağlı olması, kur, görev zararı ve bütçe açıklamaları.
- **Veri:** BOTAŞ tarife arşivi (yıllara yayılan aylık tablolar), EPDK tarife tabloları. Geçmiş veri var ve iyi.
- **Not:** 3.000 kWh limiti gibi **kademe uçurumları** (notch) okur için en büyük mikro risk. Bunlar hesap kartıdır (§5).

### E. Asgari ücret

- **Soru:** "2027 net asgari ücreti 35.000 TL'yi aşar mı?"
- **Motor:** 2004–2026 serisinden "Ocak artışı ÷ gerçekleşen yıl sonu TÜFE" ile "Ocak artışı ÷ OVP/TCMB hedefi" oranları; ara zam yılları ayrıca işaretlenir. Eşik, anket TÜFE'sine göre ölçeklenir. Kapanış Aralık sonunda, Resmî Gazete. Kişi ve parti adı içermez; Anayasa §9'un dışındadır.

### F. TCMB kredi kartı azami faizi

- **Soru:** "TCMB 1 Ocak 2027 için kredi kartı azami akdi faizini düşürür mü?"
- **Motor:** Politika faizi değişiklikleri ile azami oran değişiklikleri arasındaki gecikmeli eşleşmenin taban oranı. 2026'da politika faizi oynarken azami oran sabit kaldı; bu bilgi tabanı aşağı çeker. `tcmb-aralik` ile koşullu bağlıdır.

### G. Kira tavanı ve gıda alt kalemleri

Kira tavanı hesaplanabilir ve yavaş hareket eder: yıllık TÜFE %29,77, 12 aylık ortalama %31,23; ortalama her ay birkaç onda bir puan aşağı iner. Soru olarak bant dışında kalır; **kart olur**. Gıdada "Kasım'da işlenmemiş gıda aylık %X'i aşar mı?" News'in TÜFE dosyasına alt soru olabilir. Ekmek ve çiğ süt karar fiyatlarıdır (il kurulu, USK); tabanı kurumların geçmiş karar aralığından çıkar.

### H. Sektör verisi soruları (aşağıda §4)

**Sıralama (karar değeri × hız × hesaplanabilirlik):** A > C > D > E > F > G. Pilot için A ve C yeterli; ikisi de dört hafta içinde kapanış üretir.

## 4. Sektör ve firma düzeyi: yön söylemeden değer üretmek

SPK çizgisi tekil hisse yönünü yasaklar (QUANT.md §1). Hukuki ayrıntı hukuk uzmanının alanı; mikro tarafın önerisi **"maruziyet dili"**dir.

**Maruziyet kartı (dört satır):**
1. **Kanal:** Hangi maliyet ya da talep kalemi? (havacılık: jet yakıtı; tekstil: kur ve ücret; beyaz eşya: tüketici kredisi ve iç talep; inşaat: konut kredisi faizi ve demir-çimento; tarım: gübre (doğal gaza bağlı) ve mazot).
2. **Büyüklük:** Kalemin maliyet ya da gelir içindeki payı. Kaynak: sektör dernekleri, IATA, TÜİK girdi-çıktı tabloları ve sektör toplamı düzeyinde KAP finansal tabloları.
3. **Hız:** Sözleşme yapısı (hedge oranı, sabit fiyatlı ihracat sözleşmeleri, kredi vadesi).
4. **Yükü kim taşır:** Tüketiciye geçer mi (talep esnekliği, rekabet), marja mı vurur?

**Güvenli dil:** "Jet yakıtındaki %10'luk artış, yakıtın maliyetteki payı ~%30 ise birim maliyete yaklaşık 3 puan ekler; ne kadarının bilete yansıyacağı rekabete bağlıdır." **Güvensiz dil:** "Havacılık hisseleri baskı altında kalır", "sektör için olumlu", "fırsat". *Bence endeks ve sektör yönü de pilot süresince yazılmamalı; "sektör endeksi düşer mi" sorusu okurda tekil hisse kararına dönüşür.*

**Kapanan soru, fiyata değil faaliyete bağlanır:**
- "Kasım hazır giyim ve konfeksiyon ihracatı (TİM) yıllık dolar bazında düşer mi?"
- "Kasım beyaz eşya iç satışları (TÜRKBESD) yıllık azalır mı?"
- "Aralık otomobil ve hafif ticari pazarı (ODMD) yıllık büyür mü?"
- "Ekim–Aralık yapı ruhsatı daire sayısı (TÜİK) yıllık düşer mi?"
- "Aralık dış hat yolcusu (SHGM/DHMİ) yıllık artar mı?"

Bunlar aylık kapanır, tabanları dernek arşivlerinde uzun serilerle bulunur ve hiçbir hisseye işlem önerisi taşımaz.

**KAP'tan yön söylemeden değer:** Tekil şirket yerine **toplam** üretilir. Örnekler: "BIST'te net döviz pozisyonu açık şirketlerin sektörlere dağılımı", "TMS 29 enflasyon muhasebesinin kârları nasıl değiştirdiği (mekanizma)", "sektörün yakıt hedge oranlarının ortalaması". Tekil şirket adı yalnız olgu olarak geçer (QUANT.md §1). Bilanço haberinde soru şirkete değil sektör verisine bağlanır.

## 5. Hane halkı hesap kartları

**İlke: hesap makinesi, danışman değil.** Girdiyi okur verir, parametre resmi kaynaktan gelir, çıktı bir sayı ve bir duyarlılıktır. Kart "yapmalısın" demez, araçları birbirine göre sıralamaz.

**Şablon:** *"Eğer [senin girdin] ve [resmi parametre, kaynak, tarih] ise → [sonuç]. [Parametre] ±X değişirse sonuç ±Y. Bu bir hesaptır, olasılık ya da tavsiye değildir."*

| Kart | Girdi | Parametre (kaynak) | Çıktı |
|---|---|---|---|
| Kira yenileme | Mevcut kira, yenileme ayı | 12 aylık ortalama TÜFE (TÜİK) | Yasal tavan TL. Yeni sözleşmenin serbest olduğu ayrıca yazılır. |
| Doğal gaz kademesi | İl, ay, tahmini m³ | EPDK il limiti, BOTAŞ kademe fiyatı | Limitin altında ve hemen üstünde fatura farkı (Ankara örneği: 0,14 m³ fark ≈ 681 TL) |
| Elektrik 2027 limiti | 2026 yıllık kWh | 3.000 kWh eşiği, geçiş tarihleri (EPDK) | "Mevcut tüketiminle hangi tarifeye ve hangi tarihte geçersin" |
| Depo maliyeti | Litre/ay | ÖTV takvimi, son pompa fiyatı | Aralık ve Ocak vergi adımlarının aylık TL etkisi |
| Kart borcu | Dönem borcu, ödenen tutar | TCMB azami oranları (kademeli) | Bir aylık faiz TL'si; tam ödeme ile asgari ödeme farkı. *Asgari ödeme oranı parametresi BDDK düzenlemesinden doğrulanmalı.* |
| Mevduat reel getiri | Tutar, brüt faiz, vade | Stopaj (karar), **iki ayrı** enflasyon beklentisi: TCMB piyasa anketi ve hane halkı anketi | Her iki beklentiye göre reel getiri yan yana. Başka araçla karşılaştırma yok. |
| Zam ve alım gücü | Maaş, zam oranı | Yıllık TÜFE ve kişisel sepet (§6) | Reel değişim |
| Emekli ve memur Ocak | Aylık tutar | Temmuz–Ekim TÜFE (TÜİK), Kasım–Aralık senaryoları | Senaryo tablosu: sonuç Aralık TÜFE'siyle kesinleşir |

**Kural önerileri:**
1. Her parametrede kaynak ve tarih yazılır.
2. Geleceğe dair parametre (enflasyon beklentisi) **en az iki kaynakla** ve aralık olarak verilir.
3. Kartta karşılaştırmalı sıralama ("mevduat mı altın mı") yer almaz; bu SPK çizgisine yaklaşır.
4. Kart, sicildeki bir soruya bağlanabiliyorsa bağlanır (ör. emekli kartı → C sorusu).

Anayasa ilke 1 ("sorusuz sayı yok") olasılıklar için yazılmıştır; hesap kartının bu ilkeden muaf olup olmadığı karar vericiye sorulmalı (§9c).

## 6. Mikro ölçüm sorunları: taraf tutmadan

**Olgu:** TÜİK'e göre yıllık TÜFE %29,77 (Ekim 2026). TCMB'nin hane halkı anketinde 12 ay sonrası beklentisi %43,75, piyasa katılımcılarında %23,89 ([Foreks, 23.10.2026](https://www.foreks.com/haber/detay/6adb07dc4a09973672cb8146/PICNEWS/tr/enflasyon-beklentilerinde-ayrisma-piyasanin-tahmini-yukseldi-hanehalkinin-beklentisi-geriledi-23-10-26/)). Bu fark ne Türkiye'ye özgü ne de kendi başına bir veri hatası kanıtıdır. Hane halkı beklentileri düşük enflasyonlu ülkelerde de gerçekleşenin belirgin biçimde üstünde seyreder ([D'Acunto ve ark. 2025, BIS](https://www.bis.org/publ/qtrpdf/r_qt2503.htm), aktaran [Alomaliye](https://www.alomaliye.com/2026/01/30/hanehalki-enflasyon-beklentileri-neden-yuksek-hissedilen-enflasyonun-rolu/); TCMB Enflasyon Raporu 2024-IV, Kutu 3.1).

**Mekanizmalar** (yargı değil, açıklama; her biri okurun deneyimini meşru kılar):
1. **Sık alınan ürün etkisi.** İnsan enflasyonu market fişinden algılar. Sık alınan ürünlerdeki fiyat değişimi beklentiyi en çok oynatır ([D'Acunto, Malmendier, Ospina ve Weber 2021, JPE](https://econpapers.repec.org/RePEc:ucp:jpolec:doi:10.1086/713192)). Ekim'de işlenmemiş gıda aylık %6,04, enerji yıllık %51,37 arttı; ikisi de sık alınan kalemler.
2. **Sepet ağırlığı ile kişisel sepet farkı.** Kirada oturan hane için kira payı, ev sahibi olanların da içinde olduğu ulusal ortalamadan çok yüksektir. Kira alt endeksi yıllık %39,71.
3. **Seviye ile oran karışıklığı.** "Enflasyon düştü", fiyatların düştüğü anlamına gelmez; artış hızı yavaşladı demektir. Okurun "ama her şey pahalı" itirazı seviyeye dair bir gözlemdir; doğrudur.
4. **Bölge.** TÜİK, İBBS Düzey 2 (26 bölge) için ayrı TÜFE yayımlar; bölgeler arası fark yayımlanabilir bir olgudur.
5. **Kademe uçurumları.** Doğal gaz ve elektrik kademeleri, ortalama fiyatı değil marjinal faturayı sıçratır. Endekste görünmez, faturada görünür.
6. **Yöntem değişikliği.** TÜİK 2026'da baz yılını 2025'e taşıdı ve ağırlıkları ulusal hesaplara dayandırdı ([BirGün](https://www.birgun.net/haber/tuik-enflasyon-hesaplamasini-degistiriyor-2026-da-yapilacak-degisikligin-detaylari-neler-675224)). Ayrıntıyı TÜİK metodoloji notundan doğrulamak gerekir.
7. **Kayıt dışılık.** Fiyat tarafında değil, gelir ve ücret tarafında ölçümü zorlaştırır. Asgari ücret ve kayıtlı ücret artışları kayıt dışı çalışanın gelirini temsil etmez. TÜİK kayıt dışı istihdam oranını işgücü istatistiklerinde ayrıca yayımlar.

**Öneri: "Senin Enflasyonun" hesaplayıcısı.** Okur yedi büyük harcama grubuna kendi payını girer; araç **TÜİK'in kendi alt endeksleriyle** kişisel oranı hesaplar. Sonuç ne TÜİK'i yalanlar ne doğrular: aynı resmi veri, farklı sepet. Böylece Anayasa §9'un iki şartı birlikte karşılanır (resmi istatistik kurum adıyla; deneyim küçümsenmez).

**Dil kuralları:**
- "Gerçek enflasyon" ifadesi kullanılmaz.
- Resmi olmayan endeksler (bağımsız gruplar, sendika açlık sınırı, İTO) yalnız haber değeri taşıdığında, kurum adıyla ve resmi seriyle yan yana tablo kurmadan anılır. Kapanış kaynağı daima TÜİK'tir.
- "Algılanan" yerine "hissedilen" ya da "yaşanan" sözcüğü tercih edilir; "algı" okurda "yanılıyorsun" diye okunur.

*TÜİK'in madde düzeyinde düzenli ortalama fiyat yayımladığını doğrulayamadım. Brif "TÜİK madde fiyatları"nı veri kaynağı sayıyor; Motor'u ortalama fiyata değil alt endekse kurmak daha sağlam.*

## 7. Sicil vakası: iki motorin sorusu

### `pb-2026-11-10-motorin`: "30 Kasım'a kadar 95 TL'nin altına iner mi?"

- **Motor yok.** Sicildeki `motor: 88` değeri kurallı bir hesaptan değil, düzeltme anındaki sezgiden geliyor. `quant/motor.py`'de akaryakıt fonksiyonu yok.
- **Bayat referans.** Kriter 1 Kasım fiyatını (100,50 TL) referans alıyor. Oysa 7 Kasım'da 5,44 TL indirimle fiyat 95,09 TL'ye inmişti ([Bloomberg HT](https://www.bloomberght.com/motorine-indirim-geldi-3793870)). Doğru fiyat görülünce eşiğe uzaklık 9 kuruştu. Bu, soru değil gürültü: karar değeri sıfıra yakın, olasılık da bandın tavanında (%85).
- **Kriterde "Opet, PO veya Shell, herhangi bir gün" var.** Üç kaynak ve dokunma koşulu birlikte olasılığı şişirir; kâhin testi de zorlaşır.
- **Nasıl kurulmalıydı:** Tek kaynak (ör. Opet İstanbul Avrupa) ve tek gün (son tarihteki fiyat). Eşik, açılış fiyatından anlamlı bir uzaklıkta, Motor %15–85 bandına düşecek biçimde seçilmeli. Motor = A ailesi modeli. 1 Aralık ÖTV adımı son tarihten sonra olduğu için bu soruyu etkilemez; ama bir gün sonraya konan bir son tarih sonucu tersine çevirirdi. Takvim katmanının neden zorunlu olduğu buradan da görülüyor.

### `pb-2026-11-11-motorin-90`: "31 Ocak 2027'de 90 TL'nin altında olur mu?"

- **Esas hata:** `taban` alanı ve mercek "ÖTV sabit" diyor. Ön-otopsi de "Ocak'ta ÖTV ayarlaması"nı bir *risk* olarak yazıyor. Oysa adımlar 13 Ağustos'tan beri Resmî Gazete'de: 11 Kasım'daki 9 TL'den son tarihteki 13,9006 TL'ye **+4,90 TL ÖTV**, KDV ile **≈ +5,88 TL**.
- **Düzeltilmiş Motor (taslak):** 95,20 TL'den başlanır. +5,88 TL vergi ve Ocak sonuna kadar ~%3–4 kur kayması (anket yıl sonu 51,61) ≈ +2,5 TL eklenir. Böylece Ocak sonu için "ürün fiyatı değişmezse" pompa ≈ **103–104 TL** çıkar. 90'ın altı için ürün fiyatında ≈ 35 $/varil düşüş gerekir; Brent karşılığı ~96'dan ~60'lara iniş demektir. OVX 60 ile son gün seviyesi için olasılık ≈ %10; oynaklık %40 alınırsa ≈ %3. Ocak Yİ-ÜFE güncellemesi uygulanırsa daha da düşer. **Motor bandı: %3–10.** Yayınlanan Motor %45, sayı %37 idi; bugün %33.
- **Sonuç:** Bu, Anayasa §8 anlamında bir **olasılık (hesap) hatası**. Sicilde `duzeltme` kaydı açılmalı; eski sayı görünür kalmalı ve puanlanmalı. Düzeltilmiş sayı %10'un altında kalacağından soru **sessiz izlemeye** geçer (§2). Bu işi Hakem ya da Doğrulama masası yapmalı; ben sicile yazmadım.
- **Ders:** Ön-otopsiye "bilinen takvim" yazılmışsa Motor eksik kurulmuş demektir. `sicil.py dogrula`'ya bir kontrol önerilir: akaryakıt, enerji ya da vergi içeren her soruda `takvim` alanı zorunlu olsun; boşsa soru açılamasın.

## 8. Önerilen Motor modülü (taslak)

`quant/mikro/akaryakit.py`:

```
pompa(t) = (U_$(t) × kur(t) / 1183 + ÖTV_takvim(t) + gelir_payı + marj) × 1,20
U_$  : ICE gasoil vadelisi (Platts vekili), log-normal, σ = gerçekleşen 30 günlük
kur  : TCMB anket patikası ± kur oynaklığı
ÖTV_takvim : data/mikro/otv-takvim.json (Resmî Gazete bağlantısıyla, el ile)
marj : son 90 günde gözlenen ortalama (pompa − vergiler − ürün), sabit kabul
```

Kalibrasyon: kazınan günlük pompa serisiyle formülün tahmin hatası haftalık izlenir. Asimetri katsayısı veri biriktikçe kestirilir.

---

## 9. Son bölüm

### (a) En önemli 5 önerim

1. **Mikro Motor'a takvim katmanı zorunlu olsun.** Vergi, tarife ve kademe adımları `takvim` dosyasında Resmî Gazete bağlantısıyla tutulsun; `sicil.py dogrula` bu alanı arasın. *Gerekçe:* motorin-90 hatası tam olarak bu.
2. **`pb-2026-11-11-motorin-90` için düzeltme kaydı açılsın**, Motor yeniden hesaplansın (%3–10) ve soru sessiz izlemeye alınsın. Iska olmadan önce hatayı açıklamak, karnenin itibarını korur.
3. **Pilotta iki mikro soru ailesi açılsın:** A (7–14 günlük akaryakıt eşiği) ve C (Ocak emekli zammı eşiği). Günlük pompa kazıması bugün başlasın. *Gerekçe:* hızlı kapanış, karar değeri yüksek, Motor deterministik.
4. **Hesap kartı ayrı bir ürün olsun.** Kira, doğal gaz kademesi, 2027 elektrik limiti, depo maliyeti ve kart faizi için şablon: girdi okurda, parametre kaynaklı, çıktı sayı ve duyarlılık, tavsiye yok.
5. **Sektör içeriğinde "maruziyet dili" kullanılsın.** Kapanan sorular hisse ya da endeks fiyatına değil sektör faaliyet verisine (TİM, ODMD, TÜRKBESD, SHGM, TÜİK) bağlansın. "Senin Enflasyonun" hesaplayıcısı ölçüm tartışmasının taraf tutmayan cevabı olsun.

### (b) Diğer uzmanlarla olası çatışmalar

- **Makroekonomi uzmanı:** TÜFE ve emekli zammı sorularının News'te mi Quant'ta mı duracağı tartışılabilir. Aynı girdi (Kasım–Aralık TÜFE) birden çok soruyu sürer; ilişkili sorular karnede tek kümede sayılmalı.
- **Nicel modelleme:** Benim Motor taslağım marjı sabit ve ürün fiyatını log-normal kabul ediyor. Daha zengin bir model (asimetri, bant eşiği kestirimi) isteyebilirler; ben veri birikene kadar sade modeli savunuyorum.
- **Hukuk:** Mevduat reel getiri kartının SPK veya BDDK açısından "tavsiye" sayılıp sayılmayacağı. Benim önerim tek araç ve karşılaştırmasız; daha katı bir yorum kartı kaldırabilir.
- **Finans medyası:** Yüksek tıklanan "benzine zam gelir mi" formatı ile "sessiz gün sessiz kalır" ilkesi çatışabilir. A ailesi yalnız Motor %15–85 bandındayken açılmalı.
- **Kırmızı takım:** Akaryakıt sorularındaki "sektör kaynakları" sızıntısı nedeniyle kâhin ve bilgi asimetrisi itirazı gelebilir. Açılış saatinin kaydı ve "sızıntı haberi çıktıysa açılmaz" kuralı gerekir.
- **Siyasi ekonomi:** Asgari ücret ve enerji tarifesi soruları seçim takvimine duyarlı. Ben bunları §9 dışı (kişi ve parti yok) sayıyorum; aksi görüş çıkabilir.
- **Veri altyapısı:** Platts ücretli, pompa arşivi yok. Kazıma ve hukuki kullanım koşulları onların alanı.

### (c) Karar vericiye sorular

1. Hesap kartı "sorusuz sayı yok" ilkesinden muaf mı? Muafsa hangi künyeyle çıkar?
2. motorin-90 düzeltmesi bir okur notuyla mı duyurulsun ("Hesabımızda vergi takvimi eksikti"), yoksa yalnız sicilde mi kalsın?
3. Akaryakıt kısa vade soruları News'e mi aittir (takvimli karar) yoksa Quant'a mı (fiyat eşiği)? 16.11 kararı ikisine de okunabilir.
4. Sektör endeksi yönü (ör. BIST Ulaştırma) pilotta tamamen kapalı mı kalsın?
5. ICE gasoil gibi ücretli ya da gecikmeli veriye küçük bir bütçe ayrılabilir mi, yoksa yalnız ücretsiz vekil mi?
6. Resmi olmayan enflasyon endeksleri haber metninde hiç anılmasın mı, yoksa kurum adıyla ve tablo kurmadan anılabilir mi?

### (d) 90 günde başarı ölçüsü (mikro alan)

- **Kapanış hacmi:** A ve C ailelerinden en az **20 mikro kapanış**; bunların en az 12'si ≤14 gün ufuklu.
- **Motor isabeti:** Mikro sorularda Motor Brier'i %50 referansına karşı beceri skoru > 0. Rapor edilirken "N kapanış, bu fark şans olabilir" cümlesi ve ilişkili sorular için etkin N verilsin.
- **Formül hatası:** Pompa formülünün bir gün sonraki fiyat için ortalama mutlak hatası < 0,50 TL/L, haftalık ölçülsün.
- **Takvim disiplini:** Bilinen bir takvim adımını kaçıran soru sayısı **0** (motorin-90 tipi hata).
- **Hesap kartı kullanımı:** En az 4 kart yayında. Her kartta kaydetme ve paylaşım oranı, aynı dönemdeki olasılık gönderilerinin medyanıyla karşılaştırılsın.
- **Dil denetimi:** Sektör içeriğinde yön sözcüğü (al, sat, fırsat, olumlu/olumsuz hisse) sayısı **0**.

---

## Kaynaklar (bu oturumda açılanlar)

- Eşel mobil ve ÖTV: [PwC KDV-ÖTV Bülteni 2026/6](https://www.pwc.com.tr/tr/hizmetlerimiz/vergi/dolayli-vergi/bultenler/kdv-otv-bultenleri/2026/akaryakitlarda-esel-mobil-sistemi-uygulamasi.html) · [Bloomberg HT, 3.7.2026](https://www.bloomberght.com/esel-mobil-sisteminin-kademeli-sonlandirilmasi-kararlastirildi-3781912) · [Midas](https://www.getmidas.com/midasin-kulaklari/akaryakitta-esel-mobil-sistemi-1-ekim-2026da-kaldirilacak-p-611373) · [Bloomberg HT, 13.8.2026](https://www.bloomberght.com/ay-sonuna-kadar-motorinde-otv-sifirlandi-3785344) · [QNB Yatırım](https://www.qnbinvest.com.tr/investodak/qnbarastirma/motorinde-otv-duzenlemesi-akaryakit-fiyatlarinda-yeni-donemi-baslatti) · [Foreks, 1.10.2026](https://www.foreks.com/haber/detay/6abdc42624008d7d4373a113/PICNEWS/tr/benzine-4-27-tl-zam-geldi-otv-artisi-kasim-ve-aralikta-surecek-01-10-26/) · [Ekonomi Gazetesi](https://www.ekonomigazetesi.com/ekonomi/akaryakitta-yuzde-695-sigara-ve-alkollu-iceceklerde-yuzde-795-otv-artisi-68770) · [Dünya](https://www.dunya.com/ekonomi/otv-duzenlemesi-yururlukte-sigara-ve-akaryakitta-zam-formulu-degisti-haberi-830867)
- Pompa fiyat oluşumu: [Hürriyet, 2022](https://www.hurriyet.com.tr/ekonomi/10-soruda-akaryakit-fiyatlari-nasil-olusuyor-42025338) · [Rekabet Kurumu Akaryakıt Sektör İncelemesi 2024](https://www.rekabet.gov.tr/Dosya/akaryakit-sektor-incelemesi-raporu-20240318105053196.pdf) · [EY özeti](https://www.ey.com/tr_tr/insights/law/rekabet-hukuku-uyum-hizmetleri/akaryakit-sektor-raporu-yayimlandi) · [Bloomberg HT, 7.11.2026](https://www.bloomberght.com/motorine-indirim-geldi-3793870)
- Enerji: [Bloomberg HT, 30.10.2026](https://www.bloomberght.com/epdk-son-kaynak-tedarik-tarifesinde-limiti-dusurdu-3792931) · [Alomaliye, 4.11.2026](https://www.alomaliye.com/2026/11/04/konutlarda-tuketilen-dogal-gaz-bedellerinde-kademelendirme/)
- Fiyat ve beklenti: [TCMB Ekim 2026 Aylık Fiyat Gelişmeleri](https://www.tcmb.gov.tr/wps/wcm/connect/15fe8641-cdde-4e1e-846a-446eed1d9447/afiyatekim26.pdf?MOD=AJPERES) · [Paratic, kira](https://paratic.com/kasim-2026-kira-artis-orani-belli-oldu-yuzde-31-23/) · [Foreks, beklentiler](https://www.foreks.com/haber/detay/6adb07dc4a09973672cb8146/PICNEWS/tr/enflasyon-beklentilerinde-ayrisma-piyasanin-tahmini-yukseldi-hanehalkinin-beklentisi-geriledi-23-10-26/) · [Alomaliye, hissedilen enflasyon](https://www.alomaliye.com/2026/01/30/hanehalki-enflasyon-beklentileri-neden-yuksek-hissedilen-enflasyonun-rolu/) · [BirGün, TÜİK yöntem](https://www.birgun.net/haber/tuik-enflasyon-hesaplamasini-degistiriyor-2026-da-yapilacak-degisikligin-detaylari-neler-675224)
- Ücret, aylık, kredi: [Dünya, Ocak 2027 hesabı](https://www.dunya.com/foto-galeri/ekonomi/milyonlarin-ocak-zammi-icin-yeni-hesap-emekliye-yuzde-87-memura-yuzde-667-galeri-836156) · [Haber Gazetesi, asgari ücret](https://www.habergazetesi.com.tr/2027-asgari-ucret-ne-kadar-olacak-bakan-isikhan-tarih-verdi-yuzde-20-25-30-35-ve-40-zam-hesaplamasi) · [Halk TV, kart faizi](https://halktv.com.tr/ekonomi/kredi-karti-faiz-karari-merkez-bankasi-acikladi-1052431h) · [Evrensel, ilaç](https://www.evrensel.net/haber/5998288/ilac-fiyatlarinda-avro-kuruna-gore-otomatik-zam-fiyatlar-haftalik-guncellenecek)
- Akademik: [D'Acunto, Malmendier, Ospina, Weber 2021 (JPE)](https://econpapers.repec.org/RePEc:ucp:jpolec:doi:10.1086/713192) · Borenstein, Cameron, Gilbert 1997 (QJE) · Nakamura ve Steinsson 2008 (QJE) · Kara ve Öğünç 2008 (TCMB WP). *Son üçü bu oturumda açılmadı; künye bilgisi bellekten, doğrulanmalı.*
