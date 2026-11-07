# Planck Quant — Kurumsal Kurallar

**Planck Quant**, Planck'in finans, ekonomi ve piyasa kanalıdır. Fiyat tahmini yapmaz, yön söylemez; piyasayı ilgilendiren olayların gerçekleşme olasılığını ölçer.

- Kanal: Instagram **@planck.quant** · Web: **planck.news/quant**
- Üst slogan (değişmez): *Bilginin bittiği yerde tahmin başlar.*
- Kanal sloganı: **Fiyat değil, olasılık.**
- Ad: "Quant" hem kuantumu (Max Planck) hem de sayısal yatırım analistini anlatır: duyguyla değil, modelle çalışan.

## 1. Yasal çizgi (SPK uyumu) — pazarlık konusu değil

Türkiye'de kişiye özel yatırım tavsiyesi SPK iznine tabidir. Quant bu yüzden **olay olasılığı** yayınlar, **işlem önerisi** yayınlamaz.

| Yapılır | Yapılmaz |
|---|---|
| "TCMB'nin Aralık'ta faiz indirme olasılığı %60" | "Faiz inecek, tahvil alın" |
| "Brent'in 6 ayda 110 doları görme olasılığı %25" | "Petrol 110 olacak" |
| Endeks, kur, emtia, merkez bankası, makro veri | Tek bir şirket hissesi için hedef fiyat, al/sat/tut |
| Senaryo: "Fed artırırsa ne değişir?" | Portföy, sepet, "şimdi alma zamanı" |
| Geçmiş tahminlerin puanlanması | Getiri vaadi, "kaçırmayın", aciliyet dili |

- Hiçbir içerikte **al, sat, tut, topla, hedef fiyat, kaçırma, fırsat** sözcükleri geçmez.
- Tekil hisse adı ancak makro bir olayın haberinde (ör. bilanço açıklaması) olgu olarak geçer, hakkında yön söylenmez.
- DM'den gelen "ne alayım" sorularına standart yanıt: *"Planck Quant olay olasılığı yayınlar, kişisel yatırım tavsiyesi vermez."*
- Her gönderinin son satırı: **"Yatırım tavsiyesi değildir. Bu içerik Anthropic'in yapay zekâ modeli Claude tarafından hazırlanmıştır."**

## 2. Tahmin formatı

Her tahmin **evet/hayır ile sonuçlanabilen, tarihli** bir soru olmalıdır.

- Doğru: "Dolar/TL 8 Kasım 2027'ye kadar 60'ı aşar mı?"
- Yanlış: "Dolar ne olur?"

Her tahminin dört alanı vardır: **Soru · Olasılık (%) · Son tarih · Gerekçe (2 cümle)**. Bantlar Planck ile aynıdır: Çok yüksek ≥80, Yüksek 60–79, Orta-yüksek 45–59, Orta 25–44, Düşük <25.

## 3. Karne (Quant'ı farklı kılan şey)

Son tarihi gelen her tahmin kapatılır ve **Brier skoru** ile puanlanır (0 = kusursuz, 0,25 = yazı-tura). Sonuç ne olursa olsun yayınlanır; yanılan tahmin silinmez.

- Kapanan tahmin `data/quant.json` → `resolved` listesine taşınır: sonuç, kapanış tarihi, Brier puanı.
- Her ayın ilk pazartesi **"Quant Karnesi"** yayınlanır: kaç tahmin kapandı, ortalama Brier, en iyi ve en kötü tahmin.
- Bu karne kanalın güvenilirliğinin kanıtıdır; reklamı budur.

## 4. Takvim

Finans, takvimle çalışır. İçerik önceden bilinen veri ve toplantılara kurulur.

| Ne zaman | İçerik |
|---|---|
| Her iş günü 09:00 (BIST açılış öncesi) | **Açılış Sinyali**: günün sarı eşikli gelişmesi (yoksa yayın yok) |
| Kritik veri/toplantıdan 1 gün önce | **Önizleme**: "Yarın TÜFE: %X'in üzerinde gelme olasılığı %Y" |
| Veri/karar açıklanınca | **Sonuç**: tuttu mu, olasılıklar nasıl değişti |
| Pazartesi | Haftalık Quant raporu (8 tahmin + Δ + sessiz sinyaller) |
| Ayın ilk pazartesi | Quant Karnesi |

Sabit takvim: TÜİK TÜFE (her ayın 3'ü, 10:00) · TCMB PPK · Fed FOMC (karar TSİ 21:00) · ABD TÜFE ve istihdam · OPEC+ toplantıları.

## 5. Eşikler

| Seviye | Ölçüt | Ne olur |
|---|---|---|
| Kırmızı | Bir tahmini ≥15 puan oynatan olay **veya** piyasa şoku: BIST'te devre kesici, Dolar/TL'de günlük %5+ hareket, beklenmeyen ara faiz kararı, büyük banka/borsa çöküşü | Anında FLAŞ kartı + bildirim |
| Sarı | 5–14 puan | Ertesi sabah 09:00 Açılış Sinyali |
| Yeşil | <5 puan | Veriye işlenir, haftalık raporda "Sessiz Sinyaller"e girer |

Piyasalar oynak olduğundan eşikler ana Planck'ten (10 / 3) daha geniştir; gürültü sinyal sayılmaz.

## 6. Ses ve ton

Ana Planck kurallarının hepsi geçerlidir: üçüncü şahıs, resmi, tarafsız; emoji ve ünlem yok; "kesin, kaçınılmaz, çöküş, felaket" yok; kaynaktan alıntı yok, iki bağımsız kaynak şartı. Ek olarak:

- Hükümet, TCMB veya Fed hakkında övgü/yergi yok; kararlar olgu olarak aktarılır.
- Rakamlar Türkçe yazımla: 4.050 dolar, %29,77, 36,00.
- Başlıklarda her kelimenin baş harfi büyük.

## 7. Görsel kimlik

Planck tasarım sisteminin aynısı; ayrı bir renk yok. Quant'ı ayıran üç şey:

1. **Kilit logo:** ħ işareti + PLANCK + ince dikey çizgi + **QUANT** (IBM Plex Mono).
2. **Profil:** `void` zemin üzerinde ħ işareti, altında mono **QUANT** etiketi.
3. **Kartlarda üst satır:** `PLANCK QUANT · <TÜR>` ve alt satır `@PLANCK.QUANT`. Kartta her zaman **son tarih** ve **"Yatırım tavsiyesi değildir"** satırı bulunur.

`signal` turuncusu yalnızca "Etki: Çok yüksek" ve FLAŞ etiketi içindir. Fiyat yükseldi/düştü için yeşil-kırmızı kullanılmaz.

## 8. Ana Planck ile ilişki

Quant, Planck'in içindedir: aynı model, aynı yöntem, aynı künye. Jeopolitik bir olay (ör. Hürmüz) ana Planck'te risk olarak, Quant'ta piyasa etkisi olarak işlenir; iki kanal birbirini etiketleyebilir ama içerik kopyalanmaz.
