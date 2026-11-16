# A/B Testi 1 · 10–16 Kasım 2026 sinyalleri

A = eski sistem (Önem = |Δ| × Türkiye bağı × etki; 2031 risklerinde ölçülür). B = Yöntem v2 + Editör listesi (Önem = S × K, kısa vadeli soruda ölçülür; üç kapı; bahis testi; olgu kontrolü). Veri: `data/signals/2026-11-10…16.json`, `data/yayin-log.json`, `posts/`. B'deki LR ve K değerleri editör yargısıdır (geriye dönük, tek geçiş).

| # | Olay | A (eski) | B (yeni) | B'nin gerekçesi |
|---|---|---|---|---|
| 1 | ABD Başkanı: "İran savaşı fiilen bitti, abluka kalkacak" (10 Kas) | Ana akış (puan 20) | **DÜZELT → Ana akış** | Soru: "Motorin 30 Kasım'a kadar 95 TL altına iner mi?" LR 2 · K 3 → 2,1. Ama "savaş bitti" olgu değil, beyan; başlık "dedi" olmalı. (Sonraki günler: Hürmüz kapalı, saldırılar sürdü.) |
| 2 | Ukrayna Rus rafinerilerinin ~%30'unu devre dışı bıraktı (11 Kas) | Story (8) | **Ana akış** | Motorin sorusu, LR 2 · K 3 → 2,1. Eylem var (dizel alımı zamanlaması), 30 gün sonra önemli. Eski sistem bunu küçümsedi. |
| 3 | Fransa market soğutma saldırısını İran'a atfetti (10 Kas) | Ana akış (12) | **Story** *(16.11 Yusuf itirazıyla düzeltildi; ilk hüküm Dosya)* | İran suçlamayı reddetti (iddia + inkâr, ikisi de yazılır). Emsal: bir AB devleti sivil altyapıya siber saldırıyı ilk kez bir devlete resmen atfetti. Soru: "AB 90 gün içinde İran'a siber yaptırım kararı alır mı?" LR 2 · K 2 (Fransa'daki Türk okur için gıda zinciri; Türkiye için emsal) → 1,4. |
| 4 | Çin kritik mineral kontrollerini askıya aldı (10 Kas) | Dosya (4) | **Dosya** | LR 2 · K 2 → 1,4 sınırda; eylem yok. |
| 5 | ABD Ekim enflasyonu beklentinin üstünde (11 Kas) | Quant (durmuş) → yok | **Story** | Makro takvim artık News'te. Soru: "TCMB Aralık'ta faiz indirir mi?" LR 1,25 · K 3 → 0,66. |
| 6 | İran devlet medyası: Sirik'e hava saldırısı (13 Kas) | Story (6) | **BEKLET** | Tek kaynak (devlet medyası), kimse üstlenmedi. Olgu kontrolü geçmez. |
| 7 | Türkiye–Katar savunma anlaşması (14 Kas) | Story (6) | **Dosya** | Yeni soru açar ama K 1, eylem yok. |
| 8 | ABD'de FAA ülke çapında kalkış yasağı (13 Kas) | Yayın yok (Türkiye bağı 0) → sonra Dosya | **Ses ve İz adayı** | Yasak 4 saatte kalktı → kapı 3 (30 gün) geçmez. Çok konuşuldu, iz bıraktı mı: tam Ses ve İz konusu. |
| 9 | Zelenski: ABD Donbas'tan çekilmeyi sordu (15 Kas) | Story (6) | **Zayıf Sinyal** | Tek kişinin aktarımı, LR 0,95, K 1. |
| 10 | Bahreyn: İran'ın radar saldırısı önlendi (15 Kas) | Yayın yok (Türkiye bağı 0) | **Story** | Doğrulandı (Bahreyn ordusu + ajans). Soru şiddet değil seyahat: "Körfez havalimanlarında 30 gün içinde 24 saati aşan kapanış olur mu?" LR 1,25 · K 2 → 0,44. |
| 11 | Sulina açıklarında gemilere İHA saldırıları (16 Kas) | Ana akış (12) | **DÜZELT → Story** | Mevcut soru "Türk gemisi hasar görür mü? %70" bahis testinden kalır (şiddetin kendisi) ve 91 gün. Yeni soru: "Karadeniz savaş riski sigorta primi 31 Aralık'a kadar artar mı?" LR 2 · K 2 → 1,4 sınırda. |
| 12 | Hürmüz çıkışında tanker vuruldu (UKMTO, 16 Kas) | Yayın yok (0,45) | **Story** | Akaryakıt sorusu, LR 1,25 · K 3 → 0,66. Aynı tema haftada tek kanıt sayılır. |
| 13 | USS Theodore Roosevelt bölgeye ulaştı (16 Kas) | Yayın yok (0) | **Zayıf Sinyal + Ses ve İz adayı** | Ekim'de duyurulan planın beklenen adımı; yeni olay değil. "ABD vurur mu?" sorusu bahis testinden kalır. |
| 14 | ABD Başkanı ara seçim dürüstlüğünü sorguladı (11 Kas) | Yok (0) | **Zayıf Sinyal** | K 1; kişi hakkında olasılık yok. |
| 15 | Hollanda vergi planı meclisten geçti (13 Kas) | Yok (0) | **REDDET** | K 1; ayrıca "76'ya karşı 74" sayısı doğrulanamadı (olgu kontrolü). |
| 16 | Prag'da kamu yayını protestosu (16 Kas) | Yok (0) | **Zayıf Sinyal** | K 1, soru yok. |

## Sonuç

| | A (eski) | B (yeni) |
|---|---|---|
| Ana akış | 3 (#1, #3, #11) | 2 (#1 düzeltilmiş, #2) |
| Story | 4 (#2, #6, #7, #9) | 5 (#3, #5, #10, #11, #12) |
| Dosya | 1 | 2 |
| Bekletilen / düzeltilen | 0 | 1 bekletildi, 2 düzeltildi |
| Ses ve İz adayı | — | 2 (#8, #13) |
| Okura eylem sunan ana akış | 1 / 3 | 2 / 2 |

1. **B daha az ama daha işe yarar ana akış çıkarıyor.** İkisi de okurun cebine değiyor (motorin).
2. **B dört hatayı yayından önce yakaladı:** tek kaynaklı iddia (#6), beyanın olgu gibi yazılması (#1), şiddeti konu eden soru (#11), doğrulanamayan sayı (#15).
3. **A önemli bir haberi kaçırdı:** rafineri saldırısı (#2) Story'de kaldı, B ana akışa taşıdı.
4. **Kalibrasyon bulgusu:** Eski sinyallerdeki LR'ler 2031 riskleri üzerinden yazıldığı için hep 1,05–1,25 civarında; bu değerlerle hiçbir olay 1,4 eşiğine ulaşmıyor. Kural: **S, olayın oynattığı kısa vadeli soruda ölçülür, 2031 endeksinde değil.** Eşikler (1,4 / 0,4) bu ölçümle makul görünüyor; değiştirilmiyor.
5. **Açık mesele:** #11'deki gibi şiddete dayalı mevcut "Peki Biz?" soruları bahis testine göre gözden geçirilmeli (sicilde en az 1: `pb-2026-11-16-karadeniz-turk-gemi`).
