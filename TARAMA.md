# Planck Tarama Kuralları

> **Önce `ANAYASA.md` okunur.** O belge bütün kanalları bağlar; bu dosya onunla çelişirse Anayasa geçerlidir. Yayınlanan her olasılık `data/sorular.json` siciline kayıtlı olmak zorundadır (`scripts/sicil.py`).

Bu dosya zamanlanmış görevlerin talimat kitabıdır. Görevler her çalışmada bunu okur.

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

Etkilenen risk: <risk adı>
Olasılık: %<eski> → %<yeni> (<bant>)

Bu değerlendirme Anthropic'in yapay zekâ modeli Claude tarafından güncel haberler taranarak hazırlanmıştır. Yatırım veya politika tavsiyesi değildir.

#planck #küreselrisk #tahmin
```

## Yayın
Görevler **asla kendi başına yayınlamaz**. Kartı repoya koyar ve kullanıcıya bildirir. Kullanıcı "yayınla" deyince Instagram'a Chrome üzerinden konur (AI etiketi açık, Facebook paylaşımı kapalı).

## Otomatik yayın (09.11.2026 kararı)

İki bağımsız güvenilir kaynakla doğrulanmış içerik onay beklemeden yayınlanır. Yayından önce Claude ana iddiayı kendisi iki bağımsız kaynakta yeniden doğrular; tek kaynak, söylenti veya resmi olmayan iddia yayınlanmaz. Her yayın `data/yayin-log.json`a kaynakları ve doğrulama sonucuyla kaydedilir; yanlış veri oranı buradan izlenir. Planck T+ bu kuralın dışındadır.

## Yayın akışı v2 (09.11.2026 kararı) — olay ve cevap tek içerikte

İlke: her içerik kendi başına anlaşılır; olay ve "Peki Biz?" cevabı aynı gönderidedir. Gönderi sayısına üst sınır yok, haber sayısı belirler. Ana akışta iki gönderi arası en az 2 saat.

### Önem puanı ve yönlendirme
Her olay için: **Önem = |Δ puan| × Türkiye bağı (0 yok · 1 dolaylı · 2 doğrudan) × etki (1 orta · 2 yüksek · 3 çok yüksek)**.

| Puan | Nereye | Ne üretilir |
|---|---|---|
| ≥ 12 veya KIRMIZI | Ana akış | "Olay ve Cevap" carousel'i (4 sayfa) + olay Reel'i (16 sn) |
| 6–11 | Story | Olay Reel'i (Story olarak) |
| 2–5 ve kayda değer | Akşam | "Günün Dosyası"na tek sayfa |

**Türkiye bağı 0 olan olaylar (11.11.2026 kararı):** Risk ve sicil hesabına her zaman girer (Δ, LR, `risks.json`, `sorular.json` Türkiye bağından bağımsızdır). Yayın için ayrı puan kullanılır: **Küresel önem = |Δ puan| × etki**. Küresel önem ≥ 2 ise olay yalnızca "Günün Dosyası"na girer; "Peki Biz?" alanları (`pq`, `pp`) boş bırakılır, `pdo` tek cümlelik "neden önemli" açıklamasıdır. Bu olaylar Story'ye ve ana akışa gitmez; onlar Türkiye bağı olan olaylar içindir. Zorla "Peki Biz?" yazılmaz.

### Günlük takvim
- 08:30 — pazartesi haftalık Reel (30 sn, tüm riskler, 8'li sayfalar); diğer günler ilk olay gönderisi.
- 11:00'den itibaren — "Olay ve Cevap" gönderileri, önem sırasıyla, en az 2 saat arayla (11:00, 13:00, 15:00, 17:00, 19:00…). Sıra `data/kuyruk/YYYY-MM-DD.json`.
- 21:00 — "Günün Dosyası" carousel'i (kapak + olay başına 1 sayfa + kapanış; olay yoksa yayın yok).
- Kırmızı alarm kuyruğu beklemez, hemen çıkar.

### Formatlar
- **Olay ve Cevap** (`node news/pekibiz.js spec.json çıktı/`, spec'te `"header":"PLANCK · OLAY VE CEVAP"`, `slides:4`, tek ring): 1 olay ve olasılık · 2 ne oldu (3 satır, iki bağımsız kaynak) · 3 Peki Biz? (Türkiye'ye uyarlanmış 1–2 tarihli soru, Taban + Claude) · 4 Ne yapabiliriz + soru.
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
5. **Geçiş işi (16 Kasım'a kadar):** Her taramada sıradaki üç `risk-*` kaydı için 2031 kapanış kriteri, kaynağı, tabanı ve ön-otopsisi yazılır; ayrıca o riski sınayan iki öncü soru (son tarih ≤ 6 ay, tercihen ≤ 90 gün) açılır ve `bagli` alanına risk kimliği yazılır. `sicil.py dogrula` sıfır eksik gösterene kadar sürer.
6. Kapanan her soru için `posts/<tarih>-kapandi-<id>/` altında "Tuttu / Tutmadı" kartı taslağı üretilir; cuma 18:00 toplu yayına girer (STRATEJI.md).

## İzleme listesi

`data/izleme.json`: doğrulanmamış ama önemli iddialar. Her tarama, kırmızı alarm ve Günün Dosyası görevi önce bu listeyi kontrol eder; `eksik` alanındaki doğrulama geldiyse `olursa` alanındaki işi yapar ve `durum`u günceller. `bitis` tarihine kadar doğrulanmayan öğe `durum: düştü` olur. Doğrulanmamış öğe hiçbir içerikte olgu olarak geçmez.

## Model ve alarm düzeni (11.11.2026)

- Opus 5.5: Günlük Tarama, Haftalık Rapor, Günün Dosyası, T+ Hafta Sonu Haritası, T+ Karne. Sonnet 5.5: Kırmızı Alarm, T+ Avrupa Gecesi, Quant Açılış, Quant Haftalık (Quant yayını açılana kadar).
- Ana oturumdaki 3 saatlik kontrol kaldırıldı. Bulut Kırmızı Alarm, @planck.news için KIRMIZI flaş üretip push ettiğinde "Planck flaş yayın (alarmla uyanır)" görevini (trig_01GgZkfkri4DJsWqzNgPyqDe) fire_trigger ile çalıştırır; ana oturum uyanır, olayı bağımsız olarak doğrular ve Chrome ile yayınlar. Sabah 08:00 ve akşam 20:40 yayın turları sürer.
