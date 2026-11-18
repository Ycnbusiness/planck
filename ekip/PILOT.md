# Pilot · Yöntem v2 (17 Kasım – 14 Aralık 2026)

Yayın turları (sabah 08:00, akşam 20:40) her çalışmada bu dosyayı okur, o haftanın maddelerinden yapılmamış olanı yapar ve yanına `[x] tarih` yazar. Kurallar: ANAYASA.md v2, TARAMA.md "Yöntem v2". Gerekçe: ekip/KARAR.md.

## Hafta 1 · 17–23 Kas — ölç ve hazırlan
- [x] 16.11 · 10–16 Kasım sinyallerinde S×K geriye dönük hesaplandı (`ekip/AB-TEST-1.md`). Eşikler kalır; S kısa vadeli soruda ölçülür, 2031 endeksinde değil.
- [x] 17.11 · `pb-2026-11-11-motorin-90` düzeltildi %33 → %15 (sicilde DÜZELTME kaydı; ÖTV takvimi PwC bülteni/RG 33339). Okura düzeltme notu 17.11 eklendi (3 gönderi: 11.11 carousel, Reel, Günün Dosyası). Eski madde: hesap hatası (mikro raporu, 17.11): Motor 2026 ÖTV takvimini (13.08.2026 RG: 1 Ara 12 TL, 1 Oca 13,90 TL) saymamış. Önce Resmî Gazete'den doğrula; doğruysa `sicil.py guncelle` ile düzeltme kaydı (Anayasa §8) ve sessiz izleme. `pb-2026-11-10-motorin`'in kurallı Motor'u yok, aynı turda not düş.
- [ ] Şiddeti konu eden mevcut soruları bahis testine göre gözden geçir (ilk: `pb-2026-11-16-karadeniz-turk-gemi`)
- [ ] `risk-catisma` yuvarlama düzeltmesi: geçmişi LR tablosuyla ondalıklı yeniden hesapla, `sicil.py guncelle` ile "düzeltme" notuyla işle
- [ ] `nv-1` "Neden Yanıldık" taslağı (Quant durduğu için yayın Yusuf onayıyla)
- [~] 18.11 · 6 kısa vadeli soru açıldı (Kasım TÜFE %30, TCMB Aralık %35, Brent yıl sonu 90$, Kerkük–Ceyhan 300 bin v/g, asgari ücret %25, ABD–İran ateşkes); 9 soru daha gerekli. Hedef: 15 yeni soru: hepsi ≤90 gün, en az 6'sı ≤30 gün, açılışta %15–85. Omurga: TÜİK Kasım enflasyonu (3 Ara), TCMB faiz kararı, akaryakıt zammı, ECB/Fed kararı, resmi takvimli olaylar
- [ ] Taban ölçümü Story'leri (eski biçimle): "%12 sence ne demek?" ve "Bir risk haberinden sonra ne yapacağını biliyor musun?" (anket çıkartması MBS'de yoksa Yusuf'a telefondan ekleme notu)
- [ ] `data/zayif-sinyal.json` dosyasını aç
- [ ] Olay ve Cevap v2 (5 sayfa: Haber · Neden? · Ne olur? · Olasılıklar · Karne ve riskler) betiğini yaz (`news/olaycevap2.js`), örnek çıktıyı Yusuf'a göster
- [ ] 10×10 kare dizisi ve yeni künyeyi kart betiklerine ekle (`news/pekibiz.js`, `news/dosya.js`, `card.js`); örnek çıktıyı Yusuf'a göster

## Hafta 2 · 24–30 Kas — yeni biçim yayında
- [ ] Yeni sunum standardı + kare dizisi + yeni künye bütün gönderilerde
- [ ] Pzt Haftanın Soruları · Çrş Taban Oranı · Prş ilk Ses ve İz · Cuma ilk Dedik / Oldu

## Hafta 3 · 1–7 Ara
- [ ] İlk "Sen Yüzde Kaç Dersin?" anketi
- [ ] Zayıf Sinyal Defteri ilk toplu değerlendirme
- [ ] Aralık karnesi yeni kalıpla (ham döküm, örneklem cümlesi, yön hatası) — 7 Aralık pazartesi

## Hafta 4 · 8–14 Ara — karar
- [ ] Anlama ve etkinlik anketlerinin tekrarı
- [ ] Ses ve İz devam/bırak kararı (bırakma ölçütü KARAR §2.6)
- [ ] Pilot raporu + Anayasa v3 taslağı → Yusuf
- [ ] 15 Aralık: süreç soruları kapısı açılır (Anayasa §9)

## Başarı ölçütleri
| Ölçüt | Hedef | Tutmazsa |
|---|---|---|
| News kapanışı | ≥ 20 | <10 ise günlük açılış tavanı 6, takvimli veri payı artar |
| İptal oranı | ≤ %10 | aşılırsa açılış tavanı 2 |
| Anlama anketi (≥30 yanıt) | doğru okuma artar | artmazsa kare dizisi geri alınır |
| Etkinlik anketi | "biliyorum" artar | eylem satırı ölçütü yeniden yazılır |
| Gönderim/erişim medyanı | pilot öncesinin altına inmez | 6 içerikten sonra medyan altı format bırakılır |
| Planck vs Motor (≥20 kapanış) | Planck kötü değil | kötüyse Claude ayar sınırı ±10 |

## Sayaç
| Hafta | Açılan | Kapanan (News) | İptal | Iska |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

## Ses ve İz aday listesi
- 18.11 (öğle) · ABD'de bir haftalık kesinti dizisi (FAA, United, JPMorgan, Apple, Microsoft); Rubio 18.11'de siber saldırı kanıtı olmadığını söyledi. İz ölçütü adayı: FAA kök neden raporu ya da Kongre brifingi (resmi karar/düzenleme). Kaynak: data/signals/2026-11-18.json
