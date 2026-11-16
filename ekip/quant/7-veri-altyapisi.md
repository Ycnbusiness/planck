# 7 · Veri Altyapısı, Tekrarlanabilir Hesap ve Doğrulama

*Quant v2 yöntem ekibi · uzman: veri altyapısı, tekrarlanabilir bilim, doğrulama ("CERN kafası") · 17.11.2026. Bu belge öneridir; hiçbir kural, veri ya da kod dosyasına dokunulmadı. `sicil.py karne` depodaki `data/karne.json`'ı yeniden yazdığı için karne çalıştırması depo dışında, bir kopya üzerinde yapıldı; çıktı depodakiyle aynı çıktı.*

## Özet: beş bulgu

1. **Bugünkü sayılar yeniden üretilemiyor.** Motor aynı snapshot'tan aynı sonucu veriyor (doğrulandı), ama snapshot her gün aynı dosyanın üstüne elle yazılıyor. Girdilerin çoğu ikincil kaynaklardan (Substack bülteni, haber siteleri) elle kopyalanmış. Ham yanıt saklanmıyor, kodun sürümü kaydedilmiyor.
2. **Sicil ile `quant.json` ayrıştı.** 16 Kasım'da sekiz açık sorudan beşinin olasılığı `quant.json`'da değişti, sicile işlenmedi. Haftalık kartın açıklamasında sicilde olmayan sayılar var (ör. TÜFE %52→%40).
3. **Kapanış kriteri ile motorun girdisi farklı şeyleri ölçüyor.** Brent sorusu ICE Brent'e göre kapanıyor, oynaklık ise WTI'ye bağlı OVX'ten geliyor. Altın LBMA öğle fiyatına göre kapanıyor, girdi vadeli kapanış. Motor sürekli izleme varsayıyor, kapanış günlük kapanışa bakıyor. Bu yüzden dokunma olasılıkları birkaç puan yüksek çıkıyor.
4. **Bayat veri yayına giriyor.** OVX için "güncel bulunamadı" denip 5 Kasım değeri (60,29) kullanılmış. Oysa FRED'de 12 Kasım değeri 51,72 olarak duruyor. Ayrıca motor günlüğü Brent için "hesaplanmadı" derken `quant.json` aynı gün Brent motorunu 75 olarak yazmış.
5. **Çözüm ucuz.** GitHub Actions bu depoda zaten çalışıyor (Instagram yayını). Ücretsiz API'lerden ham veri çeken, her dosyanın sha256 özetini alan, motoru commit SHA'sıyla çalıştıran ve ön kaydı OpenTimestamps ile damgalayan bir hat sıfır ya da ayda 25 dolar maliyetle kurulabilir.

---

## 1. Veri kaynakları

**Ortam notu:** Bu bulut konteynerinden 20 uç nokta denendi. EVDS, TCMB kur XML'i, FRED, BLS, ECB, EIA, CME, TÜİK, Dünya Bankası, IMF, Polymarket, Kalshi, Borsa İstanbul ve OpenTimestamps'in hepsi bağlantı kuramadı (izin listesi). Yalnız `api.github.com` ve `raw.githubusercontent.com` açıktı. Bu yüzden veri toplama konteynerde değil, **GitHub Actions** üzerinde yapılmalı. Depo zaten `.github/workflows/publish.yml` ile Actions ve gizli anahtar (secrets) kullanıyor.

| Kaynak | Erişim | Gecikme | Revizyon | Lisans / yeniden yayın | Güven |
|---|---|---|---|---|---|
| **TCMB EVDS** | EVDS 3, Ocak 2026'da açıldı; EVDS 2 geçiş için açık ([duyuru](https://www.alomaliye.com/2026/01/26/tcmb-elektronik-veri-dagitim-sisteminin-yenilenmesine-iliskin-basin-duyurusu/)). Ücretsiz üyelik ve API anahtarı. Ekim 2026'dan beri EVDS-MCP de var ([duyuru](https://www.alomaliye.com/2026/10/26/evds-mcpnin-devreye-alinmasina-iliskin-basin-duyurusu/)). | Seriye göre; TÜFE açıklandığı gün | Seriye bağlı; kaynak kurumun politikası geçerli | Kullanım şartları EVDS 3'te; atıfla yeniden kullanım yaygın, ama metni okunmalı | A |
| **TCMB gösterge kur** (`kurlar/today.xml`) | Ücretsiz, anahtarsız | Her iş günü yaklaşık 15:30 | Yok | Resmi duyuru | A. `usdtry-60` bununla kapanıyor |
| **TCMB Piyasa Katılımcıları Anketi** | EVDS | Aylık; yanıt toplandıktan 2 iş günü sonra | **Revize edilmez** ([metaveri](https://www.tcmb.gov.tr/wps/wcm/connect/f7471426-8864-4850-809f-426de2266e03/PKA-Metaveri.pdf?MOD=AJPERES)) | EVDS şartları | A. 12 ve 24 aylık enflasyon için olasılık dağılımı da tahmin ediliyor |
| **TÜİK** | Bülten ve veri portalı; TÜFE serileri EVDS'de de var | TÜFE her ayın 3'ü, 10:00 | TÜFE kural olarak revize edilmez. İstisna: Ocak 2014'te sigara fiyatı giriş hatası, bülten 2 gün sonra düzeltilerek yeniden yayımlandı ([haber](https://www.posta.com.tr/ekonomi/enflasyonda-sehven-hata-215928)). 2026'da baz yılı 2025 ve COICOP 2018'e geçildi; geçmiş oranlar değişmedi ([TCMB blog](https://tcmb.gov.tr/wps/wcm/connect/blog/tr/main%20menu/analizler/2026%20yili%20tuketici%20fiyat%20endeksindeki%20guncellemeler%20ve%20etkileri)). GSYH revize edilir. | Resmi istatistik; kurum adıyla verilir | A |
| **BIST / VİOP** | Dağıtım için lisans gerekir; gecikmeli veri için alt dağıtıcı lisansı var ([BIST SSS](https://borsaistanbul.com/sss/veri-dagitim-ve-endeks-lisanslama)) | Anlık veri lisanslı | Yok | **Seri halinde yeniden yayın lisansa tabi.** Haberde tek kapanış değeri vermek ayrı konu; sosyal medya kapsamı BIST'e sorulmalı | A, ama ücretli |
| **Hazine ve Maliye Bakanlığı** | Kamu finansmanı tabloları (Excel); bir kısmı EVDS'de | Aylık | Az | Resmi | A |
| **BDDK** | Aylık bülten ve FinTürk etkileşimli tablolar | Aylık, yaklaşık 4–6 hafta | Var | Resmi | A. API olup olmadığı doğrulanamadı |
| **FRED / ALFRED** | Ücretsiz anahtar; ALFRED geçmiş sürümleri (vintage) verir | Kaynağa göre; Cboe endeksleri ertesi gün | ALFRED her sürümü saklar | Üçüncü taraf serileri ("Copyright" notlu) kişisel kullanım dışında **sahibinin izniyle** kullanılabilir; "FRED API kullanılmıştır, onaylı değildir" ibaresi zorunlu ([şartlar](https://fred.stlouisfed.org/docs/api/terms_of_use.html)). OVXCLS ve GVZCLS Cboe telifli ([OVX](https://fred.stlouisfed.org/series/OVXCLS), [GVZ](https://fred.stlouisfed.org/series/GVZCLS)) | A (aracı). Motorda kullanmak sorun değil, seriyi grafik olarak yayınlamak izin ister |
| **BLS** | API v2 için kayıt gerekir; günde 500 sorgu, sorguda 50 seri, 20 yıl ([SSS](https://www.bls.gov/developers/api_faqs.htm)) | TÜFE ve istihdam takvimli, 08:30 ET | Mevsimsellikten arındırılmış TÜFE her şubat geriye dönük 5 yıl revize edilir. 11 Şubat 2027'de 2022–2026 değişecek ([BLS](https://www.bls.gov/cpi/seasonal-adjustment/)). Ekim 2025 TÜFE'si kapanma nedeniyle **hiç yayımlanmadı** ([BLS](https://www.bls.gov/cpi/additional-resources/2025-federal-government-shutdown-impact-cpi.htm)). | ABD federal verisi; atıfla serbest | A |
| **BEA** | Ücretsiz anahtar | GSYH öncü tahmin çeyrek bitiminden yaklaşık 30 gün sonra | Öncü, ikinci, üçüncü tahmin, yıllık ve kapsamlı revizyon ([Aruoba 2008](https://doi.org/10.1111/j.1538-4616.2008.00115.x): revizyonlar rastgele gürültü gibi davranmıyor) | Serbest | A |
| **ECB Data Portal** | `data-api.ecb.europa.eu`, anahtarsız | Günlük referans kurlar 16:00 CET | Olabilir | Ticari kullanım dahil ücretsiz; "Kaynak: ECB" atfı, veri değiştirilmez ([politika](https://www.ecb.europa.eu/stats/ecb_statistics/governance_and_quality_framework/html/usage_policy.en.html)) | A |
| **CME FedWatch** | Gün sonu API "ayda 25 dolardan başlıyor" ([CME](https://www.cmegroup.com/market-data/market-data-api/fedwatch-api.html)) | Gün sonu | Yok | Lisans şartları ayrı belgede; ekran görüntüsünü yeniden yayınlamak riskli | A, ama ücretli. Bugün haberden aktarılıyor (C) |
| **EIA** | API v2, ücretsiz anahtar; saatte yaklaşık 9.000 istek ([SSS](https://www.eia.gov/opendata/faqs.php)) | Spot fiyatlar birkaç gün gecikmeli | Az | ABD federal verisi; atıfla kullanılır (sayfa açıkça yazmıyor) | A. Brent ve WTI spot için en temiz ücretsiz kaynak |
| **OPEC** | Aylık Petrol Piyasası Raporu (MOMR), PDF | Aylık | Önceki ay revize edilir | OPEC telifi | A, ama yapılandırılmış veri değil |
| **IMF / Dünya Bankası** | IMF SDMX API; Dünya Bankası API (CC BY 4.0) | Çeyrek ve yıl | WEO her turda revize edilir | Atıfla serbest | A. Taban oran için uygun, günlük kullanım için değil |
| **Tahmin piyasaları** (Kalshi, Polymarket) | Okuma uçları anahtarsız | Anlık | Yok | Şartlar okunmalı; Anayasa'nın "bahis dili yok" kuralı nedeniyle **yalnız motor girdisi** olarak kullanılmalı, kartta adı geçmemeli | B/C. Sığ piyasalarda manipülasyon riski var |
| **LBMA altın fiyatı** | IBA üzerinden; kullanım ve yeniden dağıtım lisans ister ([IBA](https://www.ice.com/iba/licensing)) | Gün içi veri 4 saat sonra, gecikmeli veri gece yarısından itibaren | Yok | Lisanslı. Kapanışta "eşik aşıldı mı" olgusu yazılabilir, seri yayınlanamaz | A |

**Ücretsiz minimum set:** EVDS (TÜFE, Piyasa Katılımcıları Anketi, politika faizi, kurlar), TCMB `today.xml`, FRED/ALFRED (VIXCLS, OVXCLS, GVZCLS, DGS10, DGS3MO, DGS2, UNRATE, SAHMREALTIME, NASDAQCOM, DCOILBRENTEU, DCOILWTICO), BLS, BEA, EIA, ECB, Kalshi/Polymarket okuma uçları. Maliyet: **0 TL**.

İsteğe bağlı: CME FedWatch gün sonu API, ayda yaklaşık 25 dolar. Fed sorularında bugünkü "C katmanı haberden %100" sorununu çözer.

Ertelenebilir: BIST lisansı. BIST eşik sorusu açılmadıkça gerekmez.

**Pratik yollar, kurmadan değerlendirme:**

- **GitHub Actions (önerilen).** Her iş günü TSİ 17:00'de (TCMB kurundan sonra) ve 23:30'da (ABD kapanışından sonra) zamanlanmış iş çalışır. Anahtarlar `secrets`'ta durur. Ham yanıt `data/ham/`e yazılır ve commit'lenir. Zamanlanmış işler yoğun saatlerde gecikebilir, saatler UTC'dir ([GitHub](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule)). Özel depoda ayda 2.000 ücretsiz dakika yeter.
- **Supabase `pg_net` + `pg_cron`.** Çalışır, ama ham dosya git dışında kalır, tekrarlanabilirlik zayıflar. Yedek olarak tutulmalı.
- **Kullanıcının bilgisayarı.** Makine kapalıysa veri kaçar. Yalnız elle yedek olarak kullanılmalı.

---

## 2. Tekrarlanabilir tahmin hattı

### 2.1 Mevcut yapıdaki açıklar

| # | Açık | Kanıt |
|---|---|---|
| 1 | Snapshot yerinde güncelleniyor. `quant-history.json` yalnız 12 alan saklıyor, anket ve oynaklık girdilerinin çoğu yok. Geçmiş bir motor değeri yalnız git'te `quant.json`'ın eski sürümü aranarak bulunabiliyor. | `data/quant-history.json` snapshot alanları |
| 2 | Kod sürümü kaydedilmiyor. `NASDAQ_VOL_TABAN=24` kuralı sonradan eklendi; öncesi ve sonrası motor değerleri karşılaştırılamaz. | `quant/motor.py` satır 111–119 |
| 3 | **Ufuk (T) sabit.** Brent için 0,5, diğerleri için 1. Süre geçtikçe ufuk kısalmıyor; motor bugünün tarihini bilmiyor. 16 Kasım'da Brent için doğru T değeri 0,48. | `motor_brent_110`, `motor_altin_4500`, `motor_nasdaq_25`, `motor_usdtry_60` |
| 4 | Girdiler elle ve ikincil kaynaktan geliyor. Örnekler: cappnotes.substack.com, aposto, istanbulticaretgazetesi. Ham sayfa saklanmıyor, link çürüyebilir. | `data/quant/gunluk/2026-11-16.json` |
| 5 | `--apply` girdi ile çıktıyı aynı dosyaya yazıyor; sicil ayrı ve elle güncelleniyor. Sonuç: ayrışma (bkz. §6). | `motor.py` satır 158–170 |
| 6 | Bayat veri kuralı kodda yok. Bayatlık serbest metin olarak `_varsayimlar`a yazılıyor; motor bayat girdiyle sessizce hesaplıyor. `motor-gecmis.json` ise aynı gün aynı girdi için "hesaplanmadı" diyor. | `data/quant/motor-gecmis.json` 16.11 ile `quant.json` |
| 7 | Sicil `gecmis` alanı yalnız tarih tutuyor, saat yok. Motor bazen tamsayı, bazen ondalık. Sicil kaydından o sayıyı üreten hesaba bir bağ yok. | `data/sorular.json` |
| 8 | Derlenmiş Python dosyası (`quant/__pycache__/motor.cpython-313.pyc`) git'te izleniyor. | `git ls-files` |
| 9 | Test yok. | — |

### 2.2 Önerilen şema

```
data/ham/2026-11-16/fred-OVXCLS.json        # API'nin ham yanıtı, hiç değiştirilmez
data/ham/2026-11-16/MANIFEST.json           # her dosya: url, cekim_utc, http, sha256, lisans_notu
kayit/kosu/2026-11-16T14:05Z-q-brent-110.json   # tek hesap = tek dosya
kayit/on-kayit/q-brent-110.json             # §3
kayit/kapanis/q-brent-110.json              # §4
quant/kurallar/brent_110.py                 # kural başına modül; KURAL_SURUM sabiti
quant/yeniden.py                            # bir koşu dosyasını yeniden hesaplar, farkı raporlar
tests/test_veri.py, tests/test_motor.py
```

Koşu kaydının (`kayit/kosu/…json`) alanları:

```json
{
 "kosu_id": "2026-11-16T14:05Z-q-brent-110",
 "soru_id": "q-brent-110",
 "zaman_utc": "2026-11-16T14:05:12Z",
 "veri_kesim": "2026-11-13T22:00Z",
 "kod": {"commit": "4964a38…", "kural": "brent_110", "kural_surum": 3, "python": "3.13.1"},
 "girdiler": [
  {"ad": "brent", "deger": 95.84, "birim": "USD/varil", "seri": "EIA RBRTE",
   "gozlem_tarihi": "2026-11-13", "ham": "data/ham/2026-11-16/eia-RBRTE.json",
   "sha256": "…", "katman": "A", "durum": "taze", "yas_is_gunu": 1},
  {"ad": "oynaklik", "deger": 51.72, "seri": "FRED OVXCLS", "durum": "vekil",
   "not": "OVX WTI'ye (USO) bağlı; Brent için vekil"}
 ],
 "parametreler": {"K": 110, "T_yil": 0.4819, "mu": 0.0, "izleme": "gunluk_kapanis"},
 "varsayimlar": ["mu=0: vadeli eğri verisi yok"],
 "cikti": {"motor": 70.11},
 "claude": {"adj": -15, "gerekce": "…", "gecisler": [55, 60, 52]},
 "p_yayin": 55,
 "girdi_ozeti_sha256": "…",
 "kosu_sha256": "…"
}
```

İlkeler:

- Ham dosya değişmez, yalnız yenisi eklenir. Hesap ondalıkla saklanır, yalnız yayında yuvarlanır (Anayasa §3 ile uyumlu).
- Ufuk her zaman `deadline − veri_kesim` farkından hesaplanır; elle girilmez.
- Sicil `gecmis` kaydına `kosu_id` alanı eklenir. Sicilde olmayan sayı karta giremez: kart betiği sayıyı sicilden okur, `quant.json`'dan okumaz.
- Lisanslı kaynakların (LBMA, ICE, BIST) ham yanıtı depoya konmaz. Yalnız değer, özet (hash) ve erişim zamanı saklanır; depo açık olduğu için bu gerekli.
- Doğrulama komutu: `python3 quant/yeniden.py kayit/kosu/X.json`. Komut `git show <commit>:quant/kurallar/…` ile o günkü kodu alır, ham dosyalardan girdileri okur, sonucu ±0,01 içinde üretemezse hata verir. Bu, [Sandve vd. 2013](https://doi.org/10.1371/journal.pcbi.1003285)'ün on kuralının (her sonucun üretim yolunu kaydet, ham veriyi sakla, sürüm kontrolü) uygulamasıdır.

---

## 3. Ön kayıt

**Ne kilitlenir:** soru metni, kapanış kriteri, kapanış kaynağı (seri kimliği, URL ve "ilk yayım" kuralı), revizyon ve iptal kuralı, motor kuralı ve sürümü, girdi listesi, ilk koşunun kimliği, açılış olasılığı, ön-otopsi. Bunlar `kayit/on-kayit/<id>.json` dosyasına yazılır. Dosya kanonik JSON'a çevrilir, sha256 özeti alınır ve özet commit mesajına yazılır.

**Damga:** Git commit tarihi yazarın beyanıdır ve geçmiş yeniden yazılabilir (KARAR §1.2/5 bunu doğru tespit etmiş). İki ucuz katman önerilir:

- **(i) Depoyu hemen herkese açmak.** GitHub dışından kopyalandığı ve arşivlendiği an tarih kanıtlanmış olur.
- **(ii) OpenTimestamps.** Özet ücretsiz takvim sunucularına gönderilir. Saniyeler içinde bekleyen bir damga döner; birkaç saat içinde Bitcoin bloğuna bağlanır. Kesinliği "birkaç saat" düzeyindedir ([Todd 2016](https://petertodd.org/2016/opentimestamps-git-integration)). `.ots` dosyası depoda saklanır.
- Alternatif: RFC 3161 zaman damgası hizmeti.

**Değeri:** Anayasa ilke 5 ("kriter sonradan değiştirilmez") okurun denetleyebileceği bir hale gelir. Ön kayıt, sonuç görüldükten sonra yöntemi değiştirmeyi engeller; bu, bilimdeki "sonucu görüp hipotez kurma" hatasının finanstaki karşılığıdır ([Nosek vd. 2018](https://doi.org/10.1073/pnas.1708274114)). "Kayıt değiştirilemez" künye cümlesi de ancak bununla dürüst olur.

**Maliyeti:** Kurulum yaklaşık bir iş günü. Soru başına birkaç saniye. Para maliyeti yok.

**Sınırları:**

- Ön kayıt doğruluğu kanıtlamaz, yalnız sırayı kanıtlar.
- Seçici yayını (yalnız iyi tutanları göstermeyi) engellemez. Bunun için **yayınlanmayanlar dahil her ön kayıt** herkese açık sicilde durmalıdır.
- Damga saat düzeyinde kesin olduğundan, takvimli veri sorusu **açıklamadan en az bir iş günü önce** kilitlenmelidir. `q-abd-tufe-ekim-03` sicilde verinin açıklandığı gün açılmış görünüyor. Gerçek tahmin 9 Kasım'da yapılmış (`posts/2026-11-09-quant-onizleme-abd-tufe`), ama sicil bunu kanıtlayamıyor.

---

## 4. Veri revizyonları ve kapanış

**Önerilen kural (Kapanış Değeri Kuralı):**

1. **Varsayılan: ilk resmi yayım.** Soru, kriterde adı geçen kurumun o dönem için **ilk** yayımladığı değerle kapanır. Kalshi'nin ABD TÜFE sözleşmeleri de böyle işler: "sona ermeden sonraki revizyonlar dikkate alınmaz" ([Kalshi ACPI](https://kalshi-public-docs.s3.amazonaws.com/contract_terms/ACPI.pdf)). Gerekçe: okur kararını açıklanan sayıya göre verir; hakem 15 dakikada kapatabilir (kâhin testi).
2. **Hata düzeltme penceresi: 7 gün.** Kurum aynı bülteni "hata" gerekçesiyle 7 gün içinde yeniden yayımlarsa düzeltilmiş değer geçerlidir. TÜİK'in Ocak 2014 düzeltmesi bu türdendir. Mevsimsel faktör, benchmark, baz yılı ve yıllık revizyonlar yok sayılır.
3. **Kapanış anlık görüntüsü.** Kapanışta ham bülten ya da API yanıtı `data/ham/` altına konur; ALFRED'de varsa sürüm tarihi de yazılır. `kayit/kapanis/<id>.json` dosyası değer, ham dosya özeti ve iki bağlantı tutar.
4. **Veri yayımlanmazsa:** Son tarihten sonraki 14 gün içinde yayımlanırsa o değer kullanılır. Yayımlanmazsa soru *belirsiz* olarak iptal edilir. Emsal: BLS Ekim 2025 TÜFE'sini hiç yayımlamadı.
5. **Revize edilmiş değeri ölçmek istenen soru** (ör. resesyon) kriterde bunu açıkça yazar: "BEA'nın X tarihine kadar yayımladığı en güncel sürüm". Hangi sürüm (vintage) kullanıldığı kapanış kaydına girer ([Croushore ve Stark 2001](https://doi.org/10.1016/S0304-4076(01)00072-0): gerçek zamanlı veri ile son veri ayrı tahmin problemleridir).
6. **Motor da aynı sürümü kullanır.** İlk yayımla kapanan bir soruda motorun tahmin hatası dağılımı ilk yayım verisinden tahmin edilir, revize seriden edilmez. Aksi halde hata sistematik olarak küçük görünür.

---

## 5. Doğrulama: yayından önce otomatik testler

Testler `tests/` altında yalnız standart kütüphaneyle yazılır, her koşudan önce GitHub Actions'ta çalışır. Kırmızı test yayını durdurur.

| Test | Kural | Bugün yakalardı mı? |
|---|---|---|
| **Tazelik** | Her girdinin `gozlem_tarihi` değeri seri tipine göre izin verilen yaşı aşmaz (piyasa ≤2 iş günü, anket ≤35 gün). Aşarsa motor `null` döner; kart "hesaplanamadı" der. | Evet: OVX ve GVZ bayattı |
| **Çift kaynak** | Her A katmanı fiyat, ikinci bir bağımsız kaynakla ≤%0,5 (kur), ≤%1 (emtia) farkla tutmalı. | Kısmen: Brent 95,84 / 96,70 |
| **Çapraz kur** | `eurtry/usdtry` ile `eurusd` arasındaki fark ≤%0,3 olmalı. | **Evet:** 55,60/50,28 = 1,106, ama `eurusd` 1,1226. Fark %1,5; bir değer bayat |
| **Gram altın kimliği** | `ons × usdtry / 31,1035` ile gram altın arasındaki fark ≤%1 olmalı. | Geçerdi (6.282 / 6.283), bu iyi |
| **Aralık** | Fiziksel sınırlar: oynaklık 5–150, getiri −1–30, TÜFE aylık −3–+15, kur günlük değişim ≤%10. Dışındaysa insan onayı gerekir. | — |
| **Birim** | Yüzde mi oran mı? `adj` puan mı? `us10y` 5,15 mi 0,0515 mi? Şemada birim alanı zorunlu olmalı. | — |
| **Tarih kayması** | Hafta sonu ya da tatil günü gözlem olmamalı (TR ve ABD takvimi). Ayrıca `veri_kesim ≤ zaman_utc` olmalı, gelecek tarihli veri olmamalı. | — |
| **Seri eşleşmesi** | Motor girdisinin `seri` alanı ile ön kayıttaki kapanış serisi aynı olmalı ya da girdi açıkça "vekil" etiketi taşımalı. | **Evet:** OVX/Brent, vadeli altın/LBMA, piyasa kuru/TCMB kuru |
| **Metin–veri tutarlılığı** | Gerekçe metnindeki her sayı snapshot'ta aynı değerle bulunmalı (düzenli ifadeyle sayı çıkarılır). | **Evet:** `tr-tufe-30` gerekçesinde "%29,8", snapshot'ta 30,04; `usdtry-60` gerekçesinde "59,26", snapshot'ta 60,77 |
| **Sicil eşitliği** | Kartta görünen her p için sicildeki son `gecmis.p` aynı olmalı. | **Evet:** 5 soru |
| **Yeniden üretim** | `yeniden.py` son koşuyu ±0,01 içinde üretmeli. | — |
| **Ufuk** | T değeri `deadline − veri_kesim` farkından hesaplanmalı, kodda sabit olmamalı. | **Evet** |
| **Sınırlar** | Ayar en fazla ±15; p %3–97 arasında; p %90'ın üstündeyse "sessiz izleme" etiketi. | **Evet:** `fed-artirim` %97 olmasına rağmen etiketsiz |

---

## 6. Sicilin denetimi

**Çalıştırılan komutlar:**

- `sicil.py dogrula`: "eksikli kayıt: 0". Açık 43 soru var (endeks hariç); 90 gün içinde kapananların payı %42, hedef %60 ve üstü.
- `sicil.py karne`: Quant için n=2, Brier 0,5124, %50'ye göre beceri −1,05. Motor için n=1, Brier 0,1849. Otopsi bekleyen soru: `nv-1`.

`dogrula` yalnız alanların boş olup olmadığına bakıyor; aşağıdaki hataların hiçbirini yakalamıyor.

**Bulunan hatalar (düzeltilmedi):**

1. **Sicil ile `quant.json` ayrışmış.** `tr-tufe-30`, `usdtry-60`, `brent-110`, `altin-4500` ve `nasdaq-25` için 16.11 değerleri sicilde yok:

   | Soru | `quant.json` (p/motor) | Sicil (p/motor) |
   |---|---|---|
   | `tr-tufe-30` | 40/48 | 52/60 |
   | `usdtry-60` | 55/65 | 46/56 |
   | `brent-110` | 60/75 | 54/69 |
   | `altin-4500` | 45/57 | 53/65 |
   | `nasdaq-25` | 34/39 | 31/36 |

   Haftalık kart (`posts/2026-11-16-quant-haftalik/caption.txt`) sicilde olmayan sayılar içeriyor. Kart yayımlandıysa bu ilke 1'in ihlalidir; `yayin-log.json`'da Quant kaydı bulunmadı.
2. **Açılış tarihleri göç tarihi.** Tüm `q-*` sorularında `acilis` 2026-11-10 görünüyor, oysa tahminler 9 Kasım'da da vardı (`quant-history.json`). Ufuk istatistiği ve ön kayıt sırası buna göre yanlış.
3. **`taban` alanı yanlış kullanılıyor.** Anayasa §2'ye göre bu alan referans sınıfını tutmalı. Alanda bunun yerine eski motor değeri yazıyor ("Motor %86"; güncel değer 100). Hiçbir Quant sorusunda gerçek taban oran yok.
4. **`mercekler` 13 Quant sorusunun hepsinde boş** (Anayasa §3.5 en az iki mercek ister). `dogrula` bu alanı denetlemiyor.
5. **Kapanış tarihi tutarsız.** `q-abd-tufe-ekim-03` sicilde 11.11'de, `quant.json`'da 12.11'de kapanmış görünüyor. Ayrıca soru açıklama günü açılmış görünüyor (§3).
6. **`fed-artirim` %97'de ama sessiz izlemeye alınmamış** (§2 bant kuralı). Motor girdisi "%100" C katmanı haberden alınmış. Aynı günün günlük dosyasında Kalshi ve Polymarket toplam artırım olasılığını yaklaşık %96–97 veriyor; kaynaklar arası fark kayda geçmemiş.
7. **`abd-resesyon` kriteri yapısal olarak "hayır"a eğilimli.** NBER başlangıç ilanı genellikle aylar sonra gelir. BEA'nın 2027 3. çeyrek öncü tahmini Ekim sonunda çıkar; bu yüzden 2027 ortasında başlayan bir resesyon son tarihe kadar görünmez. Hangi sürümün (öncü mü, revize mi) kullanılacağı da yazılmamış.
8. **`nasdaq-25` kriteri hareketli bir zirveye bakıyor,** motor ise sabit zirve (27.244) kullanıyor. Snapshot "6 Ekim'de yeni rekor bildirildi, seviye doğrulanamadı" diyor; yani eşik K belirsiz.
9. **Sürekli ve günlük izleme farkı.** Kapanış günlük kapanış ya da günlük fiyatlamaya bakıyor. Broadie–Glasserman–Kou düzeltmesiyle ([1997](https://doi.org/10.1111/1467-9965.00035)) Brent motoru 75'ten 71'e, altın 57'den 55'e iner.
10. **Bayat oynaklık.** OVX'in FRED'deki 12.11 değeri (51,72) kullanılsaydı Brent motoru, doğru T ile, 75 değil 70 olurdu. GVZ'nin 13.11 değeri 25,35.
11. **Türetilmiş girdiler doğrulanmamış.** `us3m` 3,9 politika aralığından türetilmiş (FRED DGS3MO var). `wti_ytd_degisim` 74, türetilmiş bir 2025 kapanışından hesaplanmış ve resesyon motorunun %50 eşiğine yakın; EIA'dan kontrol edilmeli. `_varsayimlar` listesindeki `sp500_zirveden_dusus=%5` ve `wti %71` notları bayat; değerler 2,6 ve 74.
12. **`nv-1` için otopsi 5 gündür bekliyor** (%7 dendi, oldu; Brier 0,86). Quant karnesindeki 0,51'in ana kaynağı bu soru. `quant.json` → `neolur` listesinde `nv-1` hâlâ açık görünüyor. Ayrıca `nv-1` "adı geçen kişinin görevi" sorusu; §9'un Türkiye çizgisine yakın.
13. **Ne Olur? sorularında motor yok.** `nv-4` sicilde "Motor %44" diyor, ama `motor` alanı `null`; bu yüzden karne bu soruyu motor sütununda saymıyor.
14. **`tcmb-aralik` motoru 4 Kasım tarihli, 10 kurumluk bir haber sayımı.** Kurumların görüş oranı olasılık değildir; kalibre edilmemiştir. EVDS'deki Piyasa Katılımcıları Anketi'nin PPK beklentisi kullanılmalı.
15. **`tr_tufe_2ay_tahmin_hatasi_sd=0,6` bir varsayım.** Depodaki `tcmb-tahmin-hata.json` ve EVDS'deki anketin geçmişi bu değeri ölçmeye yeter, ama kullanılmıyor.

---

## (a) En önemli 5 öneri

1. **Ham veri, hash ve koşu kaydı (§2.2).** Sicildeki her sayı tek bir `kosu_id`'ye bağlansın. Kart sayıyı yalnız sicilden okusun.
2. **GitHub Actions ile API'den veri toplama.** EVDS, FRED, BLS, BEA, EIA ve ECB'nin ücretsiz minimum seti kullanılsın. Haber sitelerinden sayı kopyalanmasın; haberler yalnız ikinci kaynak olarak kontrol için kullanılsın.
3. **Ön kayıt ve OpenTimestamps.** Depo açılsın; takvimli veri soruları açıklamadan en az bir iş günü önce kilitlensin.
4. **Kapanış Değeri Kuralı (§4).** İlk yayım esas alınsın; 7 günlük hata penceresi, 14 günlük yayımlanmama kuralı uygulansın; hangi sürümün kullanıldığı kayda geçsin.
5. **Yayın kapısı olarak 13 otomatik test (§5).** "Seri eşleşmesi" ve "sicil eşitliği" testleri ilk günden zorunlu olsun.

## (b) Diğer uzmanlarla olası çatışmalar

- **Yöntem ve model uzmanı:** Motorun "yeniden üretilemiyorsa hesaplanmaz" kuralı, bazı günler sayı çıkmaması demek. Yayın ve ürün ekibi boşluk istemeyebilir. Benim görüşüm: Anayasa ilke 7 ("ölçemediğimizi söyleriz") benden yana.
- **Medya ve ürün ekibi:** Tahmin piyasası verisini motor girdisi yapıp kartta adını anmamak "kaynak şeffaflığı" ile çelişiyor gibi görünebilir. Uzlaşma: yöntem sayfasında açıklanır, kartta "piyasa fiyatlaması" diye geçer.
- **Hukuk ve SPK:** Açık depoya lisanslı veri konmaz. Bu yüzden ham kayıt eksik kalır ve tekrarlanabilirlik o kaynaklarda yalnız hash düzeyinde olur.
- **Davranışsal finans:** İlk yayım kuralı, revizyonla anlamı değişen verilerde (ör. istihdam benchmark'ı) okura "tuttu" deyip sonra çelişki doğurabilir. Bu durumda kart dili "ilk açıklanan değere göre" demeli.
- **Hız isteyen tarama masası:** Bir iş günü önce kilitleme kuralı, son dakika önizlemelerini engeller.

## (c) Karar vericiye sorular

1. Depo (ya da yalnız `kayit/` ve sicil) herkese açılsın mı, ne zaman? Ön kaydın güven değeri buna bağlı.
2. CME FedWatch gün sonu API için ayda yaklaşık 25 dolar onaylanıyor mu?
3. Kapanışta ilk yayım kuralı tüm kanallar (News dahil) için Anayasa'ya eklensin mi?
4. Bayat veri günü motor sayısı yayınlanmasın mı ("hesaplanamadı"), yoksa bayat girdi etiketiyle yayınlansın mı?
5. Sicil ile `quant.json` ayrışmasında hangi sayılar geçerli kabul edilecek, düzeltme kaydı nasıl düşülecek? (Anayasa §8: eski sayı görünür kalır.)
6. BIST eşik soruları açılacak mı? Açılacaksa lisans için Borsa İstanbul'a başvurulsun mu?

## (d) 90 günde başarı ölçütleri

- **Yeniden üretim oranı:** Rastgele seçilen 20 koşunun en az 19'u `yeniden.py` ile ±0,01 içinde üretilsin. Hedef %100.
- **Sicil eşitliği:** Yayınlanan sayılarla sicil arasındaki uyumsuzluk 0 olsun.
- **Birincil kaynak payı:** Motor girdilerinin en az %90'ı A katmanından API ile gelsin. Bugün bu oran yaklaşık %10.
- **Bayat girdi oranı:** Koşuların ≤%5'i.
- **Ön kayıt kapsamı:** Yeni soruların %100'ü damgalı ön kayda sahip olsun. Takvimli veri sorularının %100'ü açıklamadan en az 24 saat önce kilitlensin.
- **Yayın sonrası düzeltme:** Veri hatası kaynaklı düzeltme sayısı her 100 yayında ≤1 olsun; `yayin-log.json`'dan ölçülür.
- **Kapanış süresi:** Vadesi gelen sorunun ortalama kapanış süresi ≤2 iş günü olsun; iptallerde belirsiz ve hatalı soru ayrı sayılsın.

---

### Akademik ve teknik kaynaklar

- Sandve, G. K. vd. (2013). *Ten Simple Rules for Reproducible Computational Research.* PLoS Comput Biol 9(10). https://doi.org/10.1371/journal.pcbi.1003285
- Nosek, B. A. vd. (2018). *The preregistration revolution.* PNAS 115(11). https://doi.org/10.1073/pnas.1708274114
- Croushore, D. ve Stark, T. (2001). *A real-time data set for macroeconomists.* J. Econometrics 105. https://doi.org/10.1016/S0304-4076(01)00072-0
- Aruoba, S. B. (2008). *Data Revisions Are Not Well Behaved.* JMCB 40(2–3). https://doi.org/10.1111/j.1538-4616.2008.00115.x
- Broadie, M., Glasserman, P. ve Kou, S. (1997). *A Continuity Correction for Discrete Barrier Options.* Mathematical Finance 7(4). https://doi.org/10.1111/1467-9965.00035
- Kurum belgeleri: tablo içindeki bağlantılar.

*Not: EVDS 3 kullanım şartlarının ve BIST'in sosyal medya yayın koşullarının metni okunamadı. Bu iki konuda "doğrulanmalı" uyarısı geçerlidir.*
