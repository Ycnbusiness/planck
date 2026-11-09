# Planck T+ — Kurumsal Kurallar

> **Önce `ANAYASA.md` okunur.** O belge bütün kanalları bağlar; bu dosya onunla çelişirse Anayasa geçerlidir. Yayınlanan her olasılık `data/sorular.json` siciline kayıtlı olmak zorundadır (`scripts/sicil.py`).

**Planck T+** (profil adı), Planck'in spor kanalıdır. Instagram: **@planck.sports**.

- **Ad:** T, sporun evrensel mola işaretidir: oyunun durduğu, hesabın yapıldığı an. Fizikte T zamanın ve sıcaklığın sembolüdür; Planck zamanı ve Planck sıcaklığı temel Planck birimleridir. Uzay fırlatmalarında T+ kalkıştan sonraki zamandır.
- **Üst slogan:** Bilginin bittiği yerde tahmin başlar.
- **Kanal sloganı:** Oyun durur, hesap başlar.
- **Kapsam:** Futbol öncelikli (Süper Lig, Avrupa kupaları, büyük ligler), ardından basketbol, tenis, Formula 1 ve büyük turnuvalar.

## 1. Kırmızı çizgi: bahis
- Bahis oranı (katsayı) yayınlanmaz, bahis sitesiyle karşılaştırma yapılmaz.
- Bahis şirketlerinden reklam, sponsorluk ya da işbirliği kabul edilmez. Yorumlarda bahis linkleri silinir.
- "Kupon", "banko", "kesin maç", "yatır" gibi sözcükler kullanılmaz.
- Her gönderinin son satırı: **"Bahis tavsiyesi değildir. Bu içerik Anthropic'in yapay zekâ modeli Claude tarafından hazırlanmıştır."**

## 2. Olasılık: Motor + Claude
- **Motor:** Lig içi maçlarda attığı/yediği gole dayalı Poisson + Dixon-Coles güç modeli; ligler arası (Avrupa kupaları) maçlarda ClubElo puanı + iç saha avantajı. Kod: `sports/motor.py`. Aynı veriyle aynı sonuç. Parametreler geçmiş maç verisinden ölçülür ve `sports/params.json`'da durur; ölçüm raporu `sports/EGITIM.md`.
- **Genişleme sırası:** Futbol (Türkiye + Avrupa) → basketbol (NBA, EuroLeague; sayı farkı Elo) → tenis (oyuncu Elo) → Formula 1.
- **Claude ayarı:** Sakat/cezalı oyuncular, teknik direktör değişikliği, rotasyon, derbi baskısı, kulüp krizi. Tek maçta en fazla ±10 puan (spor verisi zengin olduğu için sınır finanstakinden dardır). Gerekçe yazılır.
- Kartta gösterim: `Ev %44 · Beraberlik %27 · Deplasman %29` ve altında `Motor · Claude ayarı`.

## 3. Karne
- Her maç bitince kapanır, Brier skoru (üç sonuçlu) hesaplanır; motor ve Claude ayrı puanlanır.
- Her pazartesi **"Haftanın Karnesi"**: kaç maç, ortalama Brier, en büyük sürpriz (en düşük olasılıkla gerçekleşen sonuç).
- Sezon sonu tablo: Planck'in tahmini puan durumu ile gerçek puan durumu.

## 4. Takvim
| Ne zaman | İçerik |
|---|---|
| Cuma 12:00 | **Hafta Sonu Haritası**: Süper Lig'in tüm maçları + Avrupa'nın 5 büyük liginden haftanın 2–3 büyük maçı |
| Salı / Çarşamba / Perşembe 12:00 | **Avrupa Gecesi**: Şampiyonlar Ligi, Avrupa Ligi, Konferans Ligi; Türk takımları her zaman dahil (ClubElo tabanlı) |
| Büyük maç günü 10:00 | **Mola**: tek maç derin analizi (derbi, Avrupa maçı) |
| Pazartesi 10:00 | **Haftanın Karnesi** |
| Ayın sonu | Şampiyonluk ve küme düşme olasılıkları |

## 5. Ses ve ton
Ana Planck kuralları geçerli: üçüncü şahıs, tarafsız, emoji ve ünlem yok. Kulüp, taraftar veya hakem hakkında aşağılayıcı ya da kışkırtıcı ifade yok; hiçbir kulübün tarafı tutulmaz. Takım adları resmî ve baş harfleri büyük.

## 6. Görsel kimlik
Planck tasarım sisteminin aynısı.
- **Profil:** `void` zemin üzerinde T işareti: ħ ile aynı geometri, beyaz gövde ve `cherenkov` üst çubuk.
- **Kilit logo:** ħ PLANCK + dikey çizgi + T.
- **Kart üst satırı:** `PLANCK T · <TÜR>`, alt satırı `@PLANCK.SPORTS`.
- Kulüp logoları ve forma görselleri kullanılmaz (tescilli). Takımlar adla ve kısaltmayla yazılır.
