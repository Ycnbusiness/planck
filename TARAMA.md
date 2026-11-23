# Planck Tarama Kuralları

> **Önce `ANAYASA.md` okunur.** O belge bütün kanalları bağlar; bu dosya onunla çelişirse Anayasa geçerlidir. Yayınlanan her olasılık `data/sorular.json` siciline kayıtlı olmak zorundadır (`scripts/sicil.py`).

Bu dosya zamanlanmış görevlerin talimat kitabıdır. Görevler her çalışmada bunu okur.

> **Yöntem v2 yürürlükte (16.11.2026, Anayasa v2).** Haberin birimi sorudur; önem S×K; üç insan kapısı; yeni künye. Aşağıdaki "Yöntem v2" bölümü, bu dosyadaki eski puan eşikleriyle çelişirse geçerlidir. Pilot: 17 Kasım – 14 Aralık 2026 (`ekip/PILOT.md`).

## Veri
- `data/risks.json`: güncel olasılıklar (tek doğru kaynak). Her değişiklikten sonra `updated` alanı ve ilgili `p` güncellenir.
- `data/history.json`: günlük kayıt. Her tarama sonunda o günün değerleri eklenir (değişiklik olmasa da).
- `data/signals/YYYY-MM-DD.json`: o günün sınıflanmış olayları (kırmızı/sarı/yeşil), gerekçe ve kaynaklarla.

## Eşikler
| Seviye | Ölçüt | Ne olur |
|---|---|---|
| Kırmızı | Bir riski tek seferde **≥10 puan** oynatan olay ya da listede olmayan büyük ölçekli yeni risk (savaş başlaması, nükleer olay, Hürmüz kapanması, büyük finansal çöküş, büyük altyapı saldırısı) | Hemen FLAŞ kartı + açıklama metni üretilir, kullanıcıya bildirim gider |
| Sarı | **3–9 puan** | Günün SİNYAL kartı olur (en güçlü sarı; günde 1 içerik) — 08:30 yayın önerisi |
| Yeşil | **<3 puan**, mevcut eğilimi doğrulayan gelişme | Tek başına yayınlanmaz. Veriye işlenir; pazartesi haftalık raporun "Haftanın Sessiz Sinyalleri" bölümüne ve site grafiğine girer. 3 ardışık yeşil aynı yönde birikip toplamı ≥3 puan olursa sarıya yükselir |

Sarı yoksa o gün içerik çıkmaz; "sessiz gün" kaydı düşülür. Boşluğu doldurmak için olay şişirilmez.

## Olasılık kuralları
- Bantlar: Çok yüksek ≥80, Yüksek 60–79, Orta-yüksek 45–59, Orta 25–44, Düşük <25. Ufuk 2031.
- Bir olay tek başına bir riski en fazla 15 puan oynatabilir; daha fazlası için ikinci bağımsız kaynak şart.
- Tek kaynaklı iddia kırmızı sayılmaz; en az iki bağımsız, güvenilir kaynak (Reuters, AP, AFP, BBC, FT, Bloomberg, resmi açıklama) gerekir.
- Gerekçe her zaman yazılır: "Neden bu kadar oynadı?"

## Ses
Üçüncü şahıs, resmi, tarafsız. Lider/parti hakkında övgü-yergi yok. "Kesin", "kaçınılmaz", "felaket" yok; emoji ve ünlem yok. Kaynaktan alıntı yok, kendi cümlelerinle. Her içerik "Claude ile hazırlanmıştır" künyesi taşır.

## Kart üretimi
`node scripts/card.js spec.json çıktı.png` — spec alanları dosyanın başında. Çıktı `posts/YYYY-MM-DD-<slug>/01.png` + `caption.txt`.
Caption şablonu:
```
<Başlık>

<2–3 cümle: ne oldu, neden önemli>

Soru: <soru> (<son tarih>)
Sayımız: %<yeni> · 100'de <yeni> (önce %<eski>)
<frekans cümlesi: "Geçmişte benzer N durumun M'sinde oldu." ya da "Tabanı yok.">
Ne yapabilirsin: <eylem ya da "Bireysel olarak yapılacak yok; izlenecek gösterge: …">

Tarama ve hesap: Claude (Anthropic'in yapay zekâ modeli).
İnsan: Kuralları yazar, itirazları karara bağlar. Bu gönderi yayın öncesi insan onayından geçmedi.
Kaynaklar: <en az iki kaynak adı> · Soru kaydı: <id> · Kimseden fon almıyoruz.
Yatırım veya politika tavsiyesi değildir.

#planck #küreselrisk #tahmin
```

## Yayın
Görevler **asla kendi başına yayınlamaz**. Kartı repoya koyar ve kullanıcıya bildirir. Kullanıcı "yayınla" deyince Instagram'a Chrome üzerinden konur (AI etiketi açık, Facebook paylaşımı kapalı).

## Editör (16.11.2026)
Her yayın adayı (News, Story, Dosya) planlanmadan önce **ayrı bir alt çalıştırmada** `ekip/EDITOR.md` listesinden geçer. Üreten çalıştırma editörlük yapamaz. Yalnız **YAYINLA** hükmü alan içerik planlanır; hüküm `data/yayin-log.json` kaydına `editor` alanıyla yazılır.

## Otomatik yayın (09.11.2026 kararı)

İki bağımsız güvenilir kaynakla doğrulanmış içerik onay beklemeden yayınlanır. Yayından önce Claude ana iddiayı kendisi iki bağımsız kaynakta yeniden doğrular; tek kaynak, söylenti veya resmi olmayan iddia yayınlanmaz. Her yayın `data/yayin-log.json`a kaynakları ve doğrulama sonucuyla kaydedilir; yanlış veri oranı buradan izlenir. Planck T+ bu kuralın dışındadır.

## Yayın akışı v2 (09.11.2026 kararı) — olay ve cevap tek içerikte

İlke: her içerik kendi başına anlaşılır; olay ve "Peki Biz?" cevabı aynı gönderidedir. Gönderi sayısına üst sınır yok, haber sayısı belirler. Ana akışta iki gönderi arası en az 2 saat.

### 0a. Hikâye klasörleri (Yusuf kararı 23.11.2026: "Bütün haberlerin kendine ait klasörleri olsun")
- Her haber bir hikâyeye bağlanır: `hikayeler/<slug>/HIKAYE.md` (özet, aktörler, rüzgâr kaydı, denge, yarışan açıklamalar, bağlar, analist notu) + `meta.json` (bağlı sorular ve gönderiler). Hikâye yoksa açılır: `python3 scripts/hikaye.py yeni <slug> "Başlık" <alan>`.
- Her taramada, olay puanlanmadan önce rüzgâr satırı eklenir: `python3 scripts/hikaye.py ruzgar <slug> "tarih | kim | ne | yön | bedel | ağırlık | kaynak"`. Olay tek başına değil, hikâyesinin içinde okunur.
- Açılan her soru ve her gönderi hikâyeye bağlanır (`soru`, `yayin` komutları); `python3 scripts/hikaye.py index` ile `hikayeler/INDEX.md` güncellenir.
- **Analist sentezi (akşam turu):** O gün rüzgâr satırı eklenen her hikâyenin Özet, Denge, Yarışan açıklamalar ve Analist notu bölümleri yeniden yazılır; Güç Okuma (`ekip/GUC-OKUMA.md`) bu dosyaların üstünde çalışır. Sayı güncellemesi denge cümlesine dayanır.

### Yöntem v2.2 (21.11.2026, Yusuf kararı) — önce haber, sonra soru

**Neden:** 18–19 Kasım'da 26 olay tarandı, 0 yayın çıktı. Sebep: S yalnız açık sorulardan geliyordu; sicil dar olduğu için dünyadaki büyük olaylar (Nvidia CEO'sunun ayrılışı gibi) otomatik sıfır aldı. Sistem "bu haber mi?" yerine "sicilimizi oynatıyor mu?" diye soruyordu. Bu bölüm aşağıdaki v2 yönlendirmesiyle çelişirse geçerlidir.

**1. Haber kapısı (önce, sicilden bağımsız).** Her olay için üç soru, her biri 0–2:
- *Ölçek:* kaç insanı, ne kadar parayı, hangi kurumları etkiler? (0 yerel/küçük · 1 bir ülke ya da sektör · 2 küresel ya da dünyanın en büyük kurumlarından biri)
- *Yenilik:* bir şey ilk kez mi oluyor, bir dengeyi mi bozuyor? (0 beklenen adım · 1 sürpriz · 2 emsal ya da kırılma)
- *Açık uç:* "Şimdi ne olacak?" sorusunun birden fazla gerçek cevabı var mı? (0 sonuç belli · 1 tek belirsizlik · 2 birden çok analitik soru doğuruyor)

**Haber puanı ≥ 4 → haberdir.** Haberse içerik çıkar; tartışılan yalnız formattır.

**2. Soru yoksa soru açılır.** Haber kapısını geçen olay sicildeki bir soruya dokunmuyorsa "S = 0, yayın yok" denmez; olayın doğurduğu 2–3 analitik soru o gün açılır (Anayasa §2 altı alanı, Motor + ayar). Örnek (Nvidia, 12.11): "Nvidia 31 Mart 2027'ye kadar kalıcı CEO açıklar mı?", "Kalıcı CEO şirket içinden mi gelir?", "Nvidia 90 gün içinde Çin'e yapay zekâ çipi satışını yeniden başlatır mı?" Soru açılınca açılış olasılığı yayınlanır; S yeni sorularda açılış belirsizliği olarak sayılır (|logit(p) − logit(taban)|, en az 0,69).

**3. Kırmızı çizgi soruyu yeniden yazdırır, haberi öldürmez.** Yasak bir soru (kişi sağlığı, dava, siyasetçinin görevi, şiddetin kendisi, fiyat yönü) haberi düşürmez; kurum, süreç ya da sonuç sorusuyla yeniden yazılır. Haber kendisi çizgiyi aşıyorsa (ör. yalnız bir davanın sonucu) olasılıksız Dosya maddesi olabilir.

**4. S × K yalnız formatı seçer.** ≥ 1,4 ana akış (Olay ve Cevap + Reel) · 0,4–1,4 Story ya da Dosya · < 0,4 ve haber kapısını geçmiş → Dosya maddesi. Haber kapısını geçmeyen olay Zayıf Sinyal Defteri'ne gider.

**5. K yeniden:** 3 = 90 gün içinde okurun (nerede yaşarsa yaşasın) parasına, işine, güvenliğine, seyahatine doğrudan değer · 2 = sektörleri, piyasaları ya da büyük kurumları yeniden şekillendirir (yapay zekâ yatırımı, çip zinciri, ittifak kararı) · 1 = dünyayı anlamak için. "Peki Biz?" doğal bağ varsa yazılır, zorla eklenmez; yoksa "Neden Önemli" + izlenecek gösterge.

**6. Günlük taban.** Her gün en az **1 Olay ve Cevap ve 1 Günün Dosyası**. Ana akış eşiğini geçen olay yoksa günün en yüksek haber puanlı olayı Olay ve Cevap olur. Sessiz gün yalnız haber kapısını geçen hiçbir olay yoksa ilan edilir ve bunu tarama dosyasında olay listesiyle gerekçelendirir.

**6a. Senaryo sayfası (Yusuf onayı 22.11.2026, HEMEN GEÇERLİ).** Olay ve Cevap'ın 3. sayfası "Ne olur? · Senaryolar"dır: 2–3 birbirini dışlayan dal, her dalda KOŞUL (bunun olması için ne gerekir), OLURSA (mekanizma ve sonuç), EMSAL (tarihte benzer durum; yoksa "emsal yok"), İZ (izlenecek işaret) ve en altta AĞIRLIK %. Dal ağırlıkları toplamı 100'dür ve sicildeki ilgili sorularla tutarlıdır. Ürün analizdir; yüzde ağırlıktır, manşet değildir. Spec alanı: `senaryolar: {baslik, dallar:[{ad,p,kosul,olursa,emsal,iz}]}` (news/olaycevap2.js). Eski `neolur` listesi yalnız senaryo kurulamayan takvimli veri olaylarında kullanılır.

**6b. Güç Okuma (Yusuf kararı 23.11.2026).** Sonucu bir kişi ya da kurumun kararına bağlı her soruda ayrı bir Güç Okuma çalıştırması aktör tablosu, rüzgâr kaydı (bedelli/bedelsiz sinyal) ve bağ okuması yapar (`ekip/GUC-OKUMA.md`). Motor yalnız taban oranı ise ve rüzgâr kaydı yoksa sayı yayınlanmaz. Piyasa fiyatı zorunlu değil, yalnız kıyas.

**7. Doğruluk aynen:** iki bağımsız kaynak, iddia ile olgu ayrımı, bahis dili yok, SPK çizgisi, künye. Gevşeyen "yayınlanır mı" kararıdır; "doğru mu" denetimi değişmez. Editör varsayılanı DÜZELT'tir; BEKLET yalnız olgu doğrulanamıyorsa ve en çok 6 saat sürer (sonra düşer ya da B katmanı kaynakla çıkar).

### Önem puanı ve yönlendirme (Yöntem v2)
Her olay için: **Önem = S × K**.
- **S (sürpriz)** = olayın oynattığı her soruda |Δlogit| toplamı (`ln(LR)`; zayıf 0,22 · orta 0,69 · güçlü 1,39 · belirleyici 2,30).
- **S her zaman olayın oynattığı kısa vadeli (≤90 gün) soruda ölçülür, 2031 endeksinde değil** (A/B testi 1).
- **K (karar ilgisi)**, oynayan sorular içinde en yükseği: 3 Türkçe okuyan okurun — Türkiye'de ya da yurt dışında, nerede yaşarsa yaşasın — 90 gün içinde parasına, işine, güvenliğine ya da seyahatine doğrudan değen eşik; 2 fiyat ya da iş zinciri üzerinden dolaylı; 1 dünyayı anlamak için.

| Önem | Nereye | Ne üretilir |
|---|---|---|
| ≥ 1,4 ya da LR ≥ 10 (kırmızı) | Ana akış | "Olay ve Cevap" carousel'i (4 sayfa) + olay Reel'i; günde en fazla 1 (kırmızı hariç) |
| 0,4–1,4 | Story ya da Günün Dosyası (o gün en az iki olay varsa) | Story görseli / Dosya sayfası |
| < 0,4 | Zayıf Sinyal Defteri (`data/zayif-sinyal.json`) | Yayın yok, sayı oynamaz; haftada bir toplu değerlendirme |

Eşikler pilotun ilk haftasında 8–15 Kasım sinyalleriyle geriye dönük ayarlanır (`ekip/PILOT.md`).

**Üç insan kapısı** (Anayasa §6) önemden sonra uygulanır; biri hayırsa içerik çıkmaz, olay yalnız sicile işlenir.

**Türkiye bağı:** çarpan değil, filtre hiç değil; yalnız yönlendirme. Bağ varsa 3. sayfa "Peki Biz?", yoksa "Neden Önemli". Küresel olay ana akışa çıkabilir. "Türkiye'deki okura değmiyor" bir eleme gerekçesi **değildir** (17.11.2026, Yusuf): ABD'de, Almanya'da, Körfez'de yaşayan okur da Planck okurudur; olay onların parasına, işine, güvenliğine, seyahatine değiyorsa K ona göre verilir ve eylem satırı ona yazılır.

**Eski kural (arşiv, v2 ile geçersiz) — Türkiye bağı 0 olan olaylar (11.11.2026 kararı):** Risk ve sicil hesabına her zaman girer (Δ, LR, `risks.json`, `sorular.json` Türkiye bağından bağımsızdır). Yayın için ayrı puan kullanılır: **Küresel önem = |Δ puan| × etki**. Küresel önem ≥ 2 ise olay yalnızca "Günün Dosyası"na girer; "Peki Biz?" alanları (`pq`, `pp`) boş bırakılır, `pdo` tek cümlelik "neden önemli" açıklamasıdır. Bu olaylar Story'ye ve ana akışa gitmez; onlar Türkiye bağı olan olaylar içindir. Zorla "Peki Biz?" yazılmaz.

### Haftalık ritim (Yöntem v2)
| Gün | Format |
|---|---|
| Pazartesi | **Haftanın Soruları** (Reel, 30 sn): bu hafta kapanacak sorular ve sayılarımız |
| Salı | **Sen Yüzde Kaç Dersin?** (Story anketi; Planck'in sayısı 24 saat sonra). Haftada en fazla 2 anket; Quant, T+ ve §9 hassas alanlarında yok |
| Çarşamba | **Taban Oranı** (carousel): "X olduğunda ne sıklıkla Y olur?" |
| Perşembe | **Ses ve İz** (pilot, 4 sayı; kuralları `ekip/KARAR.md` §2.6) |
| Cuma 18:00 | **Dedik / Oldu**: o hafta kapanan sorular. Iska (≥%80 ya da ≤%20 verilip ters çıkan) ilk sayfada |
| Olay olunca | **Olay ve Cevap**, günde en fazla 1 (kırmızı hariç) |
| Gerektiğinde 21:00 | **Günün Dosyası**, yalnız en az iki olay eşiği geçtiyse |
| Ayın ilk pazartesisi | **Karne** + Düşen Riskler + Uzun Ufuk |
| Pazar | Boş (yalnız kırmızı) |

Takvim formatları olay şişirmez; sessiz gün sessiz kalır.

### Günlük takvim (saatler)
- 08:30 — pazartesi Haftanın Soruları Reel'i; diğer günler varsa olay gönderisi.
- 11:00'den itibaren — "Olay ve Cevap" gönderileri, önem sırasıyla, en az 2 saat arayla (11:00, 13:00, 15:00, 17:00, 19:00…). Sıra `data/kuyruk/YYYY-MM-DD.json`.
- 21:00 — "Günün Dosyası" carousel'i (kapak + olay başına 1 sayfa + kapanış; olay yoksa yayın yok).
- Kırmızı alarm kuyruğu beklemez, hemen çıkar.

### Formatlar
- **Olay ve Cevap v2 (Yusuf onayı 19.11.2026, HEMEN GEÇERLİ; betik: `node news/olaycevap2.js spec.json çıktı/`, örnek: posts/ornek/olaycevap2/spec.json)** — 5 sayfa:
  1. **Haber:** olgu, iki kaynak, yorum yok.
  2. **Neden?:** tarafların söyledikleri; kendi cümlelerimizle, taraf tutmadan. İddia ile olgu ayrı.
  3. **Ne olur?:** olayın kendisi değil, sonuçları soru olur (1–3 soru; bahis testi). Her biri: soru + son tarih + %X · 100'de X.
  4. **Olasılıklar — bu sayılar nasıl çıktı?:** Motor (taban/piyasa), Claude ayarı (+/− ve neden), frekans cümlesi, üç bağımsız hesabın aralığı (yalnız ana soru için).
  5. **Karne ve riskler:** bu konudaki kapanışlarımız + genel karne ("N kapanış; az örnek" uyarısı 30 kapanışa kadar), izlenecek gösterge, ne yapabilirsin.
  Türkiye bağı varsa 3. sayfadaki sorulardan en az biri Türkiye'deki okura değer; olay yurt dışındaki okura değiyorsa bir soru da ona değer (benzin, uçuş, kur değil — kur Quant'ta). Görsel: 10×10 kare dizisi.
- **Olay ve Cevap v1 (arşiv; 19.11'den itibaren kullanılmaz)** (`node news/pekibiz.js spec.json çıktı/`, spec'te `"header":"PLANCK · OLAY VE CEVAP"`, `slides:4`, tek ring): 1 olay ve olasılık · 2 ne oldu (3 satır, iki bağımsız kaynak) · 3 Peki Biz? (Türkiye'ye uyarlanmış 1–2 tarihli soru, Taban + Claude) · 4 Ne yapabiliriz + soru.
- **Olay Reel'i** (`node scripts/olayreel.js spec.json çıktı.mp4`): olay → risk değişimi → Peki Biz? → kapanış, 16 sn.
- **Günün Dosyası** (`node news/dosya.js spec.json çıktı/`).
- **Haftalık Reel** (`node scripts/reel.js`, 30 sn; liste 15–20 riske kadar sayfalanır).
- Haftalık uzun rapor (`rapor.md`) arşiv içindir; Instagram'da uzun carousel yok.

Tüm "Peki Biz?" soruları `data/pekibiz.json`a son tarihleriyle yazılır ve karnede puanlanır.

### Risk listesi
Üst sınır yok (15–20 olabilir). Giriş: 2031 ufkunda olasılık ≥ %10 ve etki "yüksek" veya üstü, iki bağımsız kaynakla desteklenen gelişme. Çıkış: üç ay üst üste < %10 kalan risk "izleme listesi"ne (`data/risks.json` → `watch`) taşınır.

## Sicil ve hakem görevleri (Anayasa v1 · 10.11.2026)

Günlük taramanın **ilk adımı hakemliktir**, sonra tarama gelir:

1. `python3 scripts/sicil.py vadesi` — vadesi gelen soruları listeler. Her biri için kriterde yazan kaynağa bakılır; sonuç iki kaynakla kesinse `python3 scripts/sicil.py kapat <id> evet|hayir <bağlantı>`. Kesin değilse dokunulmaz, ertesi gün yeniden bakılır. Tarihinden önce kesinleşen soru da kapatılır.
2. `python3 scripts/sicil.py karne` — `data/karne.json` yenilenir. "ISKA" uyarısı çıkan soru için `posts/<tarih>-neden-yanildik-<id>/` altında otopsi taslağı yazılır.
3. Tarama sırasında olasılığı değişen her soru `sicil.py guncelle <id> <p> "<neden>"` ile işlenir; sayı Anayasa §3'teki LR tablosuyla hesaplanır (`sicil.py lr`). `risks.json`, `quant.json` ile sicil aynı sayıyı taşımak zorundadır.
4. İçerikte geçen her yeni olasılık (Olay ve Cevap, Ne Olur?, Peki Biz?, Dosya) yayın kuyruğuna girmeden önce `sicil.py ekle` ile kaydedilir. Zorunlu alanı eksik soru yayınlanmaz.
5. **Yeni soru açma (v2):** Açılan soru Anayasa §2 ufuk ve bant kurallarına uyar (≥%80'i ≤90 gün, açılışta %15–85, günde en fazla 4). `kuyruk` etiketi havuzun %15'ini aşamaz. %90 üstüne ya da %10 altına geçen soru `sessiz` işaretlenir.
   **Eski geçiş işi (tamamlandı, arşiv):** Her taramada sıradaki üç `risk-*` kaydı için 2031 kapanış kriteri, kaynağı, tabanı ve ön-otopsisi yazılır; ayrıca o riski sınayan iki öncü soru (son tarih ≤ 6 ay, tercihen ≤ 90 gün) açılır ve `bagli` alanına risk kimliği yazılır. `sicil.py dogrula` sıfır eksik gösterene kadar sürer.
6. Kapanan her soru için `posts/<tarih>-kapandi-<id>/` altında "Dedik / Oldu" kartı taslağı üretilir ("Dedik: %60 · Oldu."); cuma 18:00 toplu yayına girer.

## İzleme listesi

`data/izleme.json`: doğrulanmamış ama önemli iddialar. Her tarama, kırmızı alarm ve Günün Dosyası görevi önce bu listeyi kontrol eder; `eksik` alanındaki doğrulama geldiyse `olursa` alanındaki işi yapar ve `durum`u günceller. `bitis` tarihine kadar doğrulanmayan öğe `durum: düştü` olur. Doğrulanmamış öğe hiçbir içerikte olgu olarak geçmez.

## Model ve alarm düzeni (11.11.2026)

- Opus 5.5: Günlük Tarama, Haftalık Rapor, Günün Dosyası, T+ Hafta Sonu Haritası, T+ Karne. Sonnet 5.5: Kırmızı Alarm, T+ Avrupa Gecesi, Quant Açılış, Quant Haftalık (Quant yayını açılana kadar).
- Ana oturumdaki 3 saatlik kontrol kaldırıldı. Bulut Kırmızı Alarm, @planck.news için KIRMIZI flaş üretip push ettiğinde "Planck flaş yayın (alarmla uyanır)" görevini (trig_01GgZkfkri4DJsWqzNgPyqDe) fire_trigger ile çalıştırır; ana oturum uyanır, olayı bağımsız olarak doğrular ve Chrome ile yayınlar. Sabah 08:00 ve akşam 20:40 yayın turları sürer.

## Story planlama yolu (15.11.2026, çalışıyor)
- planck.news, Meta Business Suite "Planck" portföyüne bağlandı (business_id 3974879262655090, IG asset 17841405514232179); Yusuf'a İçerik/Mesajlar/Topluluk/İstatistik izni atandı.
- Yol: business.facebook.com/latest/content_calendar?asset_id=17841405514232179&business_id=3974879262655090 → "Gönderi oluştur" yanındaki ok → Hikaye oluştur.
- Dosya girişi gizli: önce JS ile HTMLInputElement.prototype.click'i yamala (type=file ise body'ye ekle, picker açma), sonra "Fotoğraf/video ekle"ye tıkla, find ile file-input ref'ini bul, file_upload.
- Video (reel.mp4) "Medya işleniyor"da takılıyor (15.11, üç deneme). Bulgular: (1) eski dosyalar Instagram özelliğine uymuyordu: ses 96 kHz (sınır 48 kHz), moov atomu sonda (başta olmalı). Reel scriptleri düzeltildi (-ar 48000 -b:a 128k -movflags +faststart). (2) Düzeltilmiş dosya da takıldı; tarayıcı videoyu çözebiliyor ama MBS video yükleme isteğini hiç başlatmıyor (yalnız foto uç noktasına ön istek). Yusuf'un elle denemesi de takıldı; tamamen kurala uygun yeniden kodlanmış dosya (edit list yok, 44.1 kHz, faststart) ve sıradan bir ffmpeg test videosu da takıldı. Sonuç: sorun bizim dosyalarımızda ya da otomasyonda değil, MBS web Story video yolunda (bu Mac/ağ/hesap). Sıradaki testler: gizli pencere + eklentisiz, MBS mobil uygulaması. Kalıcı çözüm adayı: Instagram Graph API (media_type=STORIES, herkese açık video URL'si). O zamana kadar Reel'in ~4. saniye karesi PNG (ffmpeg -ss 4 -frames:v 1) yüklenir.
- Planla → saat/dakika spinbutton'larına ayrı ayrı tıklayıp iki hane yaz; en az 20 dk sonrası. Planlayıcıda saat görünür.
