# Planck Tarama Kuralları

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
