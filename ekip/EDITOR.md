# Editör · Yayın Karar Listesi (v1 · 16.11.2026)

Editör, içeriği **üreten çalıştırmadan ayrı** bir çalıştırmadır (Anayasa §7: kimse kendi işini denetlemez). Taslağı ve kaynak listesini alır, kaynakları **kendisi yeniden arar**, aşağıdaki listeyi sırayla uygular ve tek bir hüküm verir. Hüküm ve gerekçe `data/yayin-log.json` kaydına `editor` alanıyla yazılır.

## Hükümler

| Hüküm | Anlamı |
|---|---|
| **YAYINLA** | Bütün kapılar geçti. |
| **DÜZELT** | Hata giderilebilir (dil, sayı yuvarlama, eksik alan). Editör neyin değişeceğini madde madde yazar; üretici düzeltir, editör yeniden bakar. En fazla iki tur; üçüncüde REDDET. |
| **BEKLET** | Olgu henüz doğrulanamadı. `data/izleme.json`'a bitiş tarihiyle girer. |
| **REDDET** | Kırmızı çizgi, kapı ya da bahis testi geçmedi. Gerekçe tek cümle. Olay yalnız sicile işlenebilir. |
| **YUSUF'A SOR** | Liste bir sonuca varamıyorsa, hukuki risk şüphesi varsa ya da Quant / T+ içeriğiyse. |

Liste sırayla işlenir; bir aşamada REDDET ya da BEKLET çıkarsa sonraki aşamalara geçilmez.

---

## A · Olgu (doğru mu?)

1. Ana iddia **iki bağımsız kaynakta** var mı, en az biri A katmanında (resmi açıklama, birincil veri) ya da B katmanında (Reuters, AP, AFP, BBC, FT, Bloomberg) mı? → Hayırsa **BEKLET**.
2. İki kaynak gerçekten bağımsız mı (biri ötekini aktarmıyor)? Tek bir ajansı aktaran on site tek kaynaktır.
3. Olay **yeni mi**? Tarihi kontrol et: daha önce açıklanmış bir şeyin gerçekleşmesi yeni olay değildir (ör. Ekim'de duyurulan uçak gemisinin Kasım'da varması).
4. Tarafın **iddiası** ile **olgu** ayrılmış mı? "İran vurduğunu açıkladı" ≠ "İran vurdu". Doğrulanmamış iddia olgu diliyle yazılmışsa **DÜZELT**.
5. Her rakam (tarih, sayı, yüzde, isim) kaynakla birebir tutuyor mu?
6. Sosyal medya paylaşımı, köşe yazısı ya da tek kişinin yorumu ("yığınak tamamlanıyor") olgu olarak geçiyor mu? → Geçiyorsa **DÜZELT**.

## B · Kırmızı çizgiler (yayınlanabilir mi?) — biri bile ihlalse **REDDET**

7. Süren dava, soruşturma, mahkeme kararı, parti kapatma hakkında olasılık var mı?
8. Seçim ya da referandumda kazanan veya oy oranı olasılığı var mı? (15.12.2026'dan sonra kişi ve parti adı geçmeyen süreç soruları serbest.)
9. Adı geçen kişinin görevi, sağlığı, ölümü, hukuki durumu hakkında olasılık var mı?
10. Terör saldırısı, suikast ya da belirli yer ve tarih için deprem olasılığı var mı?
11. Al / sat / hedef fiyat, yön tavsiyesi (SPK) var mı?
12. Kişi ya da parti hakkında övgü veya yergi, dinî dille alay, okurun yaşadığını küçümseme var mı?
13. Kaynaktan doğrudan alıntı var mı? (Kendi cümlelerimizle yazılır.)

## C · Bahis testi — biri bile hayırsa **REDDET** ya da soruyu yeniden yazdırmak için **DÜZELT**

14. Soru **okurun hayatına etkiyi mi** ölçüyor, yoksa olayı seyirlik bir yarış gibi mi sunuyor? ("ABD vurur mu?" yerine "Brent 90 doları geçer mi?")
15. Şiddetin ya da insan kaybının **kendisi** olasılık konusu yapılmamış mı? Olasılık yalnız sonuçlara verilir.
16. Oran formatı (1,40), "tahmin et kazan", sıralama, ödül, tahmin piyasası bağlantısı ya da "tuttu / tutturduk" dili yok mu?

## D · Önem ve insan kapıları (gerekli mi?)

17. **Önem = S × K** hesaplanmış ve yazılmış mı? S, LR tablosundan; K, karar ilgisinden (1–3).
    - ≥ 1,4 ya da kırmızı → ana akış · 0,4–1,4 → Story ya da Günün Dosyası · < 0,4 → Zayıf Sinyal Defteri, yayın yok.
    - Taslağın gittiği yer bu eşikle uyuşmuyorsa **DÜZELT** (doğru yere yönlendir).
18. **Kapı 1:** "Bu sayıyı bilen okur neyi farklı düşünür ya da yapar?" tek cümleyle yazılmış mı?
19. **Kapı 2:** Bu hafta yapılabilecek, düşük bedelli bir eylem ya da dürüst "bireysel olarak yapılacak yok; izlenecek gösterge şu" cümlesi var mı?
20. **Kapı 3:** Olay 30 gün sonra hâlâ önemli mi?
    → Kapılardan biri hayırsa **REDDET** (olay sicile işlenebilir, ilgisi varsa perşembe Ses ve İz adayı yazılır).
21. Bugün ana akışta zaten bir Olay ve Cevap var mı? Varsa ve olay kırmızı değilse **BEKLET** (yarın ya da Dosya).

## E · Sayı (hesap doğru ve dürüst mü?)

22. Her olasılık sicilde (`data/sorular.json`) kayıtlı bir soruya bağlı mı ve bu sorunun altı zorunlu alanı tam mı? (`sicil.py dogrula`)
23. Güncelleme LR tablosuyla log-odds üzerinde mi yapılmış? Editör `sicil.py lr <eski> <LR>` ile yeniden hesaplar; fark ≥1 puansa **DÜZELT**.
24. Sayı %3–97 sınırı içinde mi? Tek olay ±15 puanı aşıyor mu?
25. Ana akış içeriğinde üç bağımsız geçiş yapılmış mı ve yayınlanan sayı bunların medyanı mı? Aralık 15 puanı aşıyorsa "belirsizlik yüksek" etiketi var mı?
26. Motor ile Claude ayarı ayrı yazılmış mı?
27. Yeni sorular ufuk ve bant kurallarına uyuyor mu (≤90 gün, açılışta %15–85; kuyruk etiketi değilse)?

## F · Sunum standardı (doğru okunur mu?)

28. Soru ve son tarih sayıyla aynı satırda mı?
29. Tam sayı yüzde ve "100'de X" birlikte mi? Ondalık yok mu?
30. Frekans cümlesi var mı (taban varsa gerçek sayılarla, yoksa "Tabanı yok")?
31. %80 üstü ya da %20 altıysa ters taraf yazılmış mı ("100'de 12 durumda olmaz")?
32. "Kesin", "kaçınılmaz", "felaket" gibi kelimeler, ünlem, emoji ya da kırmızı alarm estetiği var mı? → Varsa **DÜZELT**.
33. Olay ve Cevap v2'de beş sayfa sırası tam mı (Haber · Neden? · Ne olur? · Olasılıklar · Karne ve riskler)? 4. sayfada Motor ile ayar ayrı, 5. sayfada örneklem uyarısı var mı?
34. Görselde taşma, yanlış tarih ya da yanlış hesap adı var mı? Editör PNG'ye bakar.

## G · Künye ve platform (son kontrol)

35. Künyenin üç satırı tam mı: Claude'un hesabı, insanın rolü ve "insan onayından geçmedi", kaynak adları, soru kimliği, "Kimseden fon almıyoruz"?
36. "Yatırım veya politika tavsiyesi değildir" satırı var mı?
37. Instagram'da yapay zekâ etiketi açık, Facebook paylaşımı kapalı mı (yayın adımında doğrulanır)?
38. Doğru hesap mı (@planck.news), doğru saat mi, önceki gönderiden en az 2 saat sonra mı?

---

## Editör kaydı (yayin-log.json → `editor`)

```json
{
  "hukum": "YAYINLA | DÜZELT | BEKLET | REDDET | YUSUF'A SOR",
  "onem": {"S": 0.69, "K": 3, "puan": 2.07},
  "kapilar": [true, true, true],
  "bahis_testi": true,
  "kaynaklar_yeniden": ["<bağlantı 1>", "<bağlantı 2>"],
  "duzeltmeler": ["..."],
  "gerekce": "tek cümle"
}
```

Haftalık: REDDET ve DÜZELT gerekçeleri cuma günü sayılır. Aynı gerekçe üç kez tekrarlanıyorsa üretim kuralı (TARAMA.md) düzeltilir; editör listesine yeni madde eklenmesi gerekiyorsa Yusuf'a önerilir.
