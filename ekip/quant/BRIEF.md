# Quant v2 · Ekip Brifingi (17.11.2026)

## Kurucunun hedefi (Yusuf, kelimesi kelimesine)

> "Finans işi devasa iştir; bunu baştan matematiksel kurmak ve sayıdan yazıya veri üretebilecek beceri ister. Analitik bir tahmin yapmak zorundasındır. 'Şu olursa şu olur'u matematik ile, davranışsal finans gibi olaylar ile, makroekonomi ve siyaset-politika ile yorumlayabilecek bir zihin ister. Aksi takdirde grafikler gösteren sıkıcı üniversite hocalarına dönüşür sistem."
>
> "Biz bu işin CERN kafası işe yaklaşan ucuyuz. Dandik bir gazete ajansı değiliz. Tek derdimiz clickbait yakalamak değil, medya arşivinde değer olmak. Bu nedenle ne kadar sorgulama, denetim gerekirse yapalım; işin başındayız."

Planck'in genel hedefi (News için de geçerli): insanları kandırmayan, bilimsel olasılık ölçümüyle doğru bir düşünme yapısı kuran, güven veren, insanın hayatını şekillendirmek için aklında anlamlı veri oluşturan bir medya. "Benzin kadranı" değil. Antropoloji, psikoloji, sosyoloji matematik kadar belirleyicidir.

## Planck nedir

- Yapay zekâ (Claude) tarafından yürütülen, olasılık temelli bir Türkçe haber markası. Instagram: @planck.news (ana), @planck.quant (finans/ekonomi), @planck.sports (Planck T+). İnsan (Yusuf) kuralları yazar, itirazları karara bağlar.
- Anayasa v2 (`ANAYASA.md`) bütün kanalları bağlar. Oku. Önemli: §0 iddia; sorusuz sayı yok; Motor (kurallı hesap) ile Claude ayarı ayrı; üç bağımsız geçiş ve medyan; log-odds/LR güncelleme; %3–97 sınırı; sicil (`data/sorular.json`) ve git kaydı; karne (Brier, beceri skoru, kalibrasyon, 30 kapanış kuralı); SPK çizgisi (al/sat/hedef fiyat/yön tavsiyesi yok); bahis dili yok.
- News için 16.11.2026'da bir yöntem kararı verildi: `ekip/KARAR.md` (+ `ekip/1-…4-*.md` uzman raporları, `ekip/EDITOR.md`, `ekip/AB-TEST-1.md`). Quant aynı derinlikte, ama finansa özgü yeniden tasarlanacak.

## Quant'ın bugünkü durumu

- Kurallar: `QUANT.md`. Veri: `data/quant.json`, `data/quant-history.json`, `data/quant-signals/`, `data/quant/` (ör. TCMB 2012–2026 yıl sonu tahmin hatası veri seti). Motor: `quant/motor.py`. Kart betikleri: `quant/*.js`. Örnek çıktı: `posts/2026-11-16-quant-haftalik/`.
- **Yayın Kasım başından beri durdurulmuş** (Yusuf kararı: "beklemenin bedelini ödeyebiliriz"); yalnız veri toplanıyor. Açık 8 soru çoğunlukla fiyat eşiği (altın 4.500$, USD/TRY 60, Nasdaq 25 bin, Brent 110$, Fed artırımı, ABD resesyonu, TCMB Aralık, TÜFE %30). Kapanan 2 sorunun ikisi de Quant; Brier ~0,51 (kötü).
- 16.11 kararıyla takvimli makro **veri ve karar soruları** (enflasyon, faiz kararı, akaryakıt) News'e geçti; **varlık fiyatı eşikleri** Quant'ta kaldı.
- Yusuf'un önceki istekleri: önemli habere "Ne olur?" etki analiziyle cevap (fiyat yönü olmadan, tümdengelimli olası etkiler); Claude deterministik hesabın üstüne kendi yargısını eklesin, hesap makinesi olmasın; Quant'ı olasılık verisinin nasıl üretildiğinden başlayarak sıfırdan düşünmek.
- Kanal X'e de açılabilir (örnek: otomatik veri botları). Platform kararı açık.

## Ekibin ortak kuralları

1. Türkçe yaz. Kısa paragraflar, somut öneriler, her öneri için gerekçe ve **kaynak** (akademik çalışma, kurum belgesi, mevzuat, iyi örnek yayın; bağlantıyla). Uydurma kaynak yok; emin olmadığını söyle.
2. Web araştırması yap (WebSearch/WebFetch). Kendi alanında güncel literatürü ve iyi uygulamayı tara; Türkiye'ye özgü koşulları (TCMB, SPK, TÜİK, EVDS, Türk okurun finansal davranışı, enflasyon deneyimi, dolarizasyon) ayrıca ele al.
3. Depoyu oku: en az `ANAYASA.md`, `QUANT.md`, `ekip/KARAR.md`, `data/quant.json`. Gerekirse diğerlerini.
4. Kuralları değiştirme; hiçbir dosyaya kendi raporun dışında yazma; yayın yapma; commit/push yapma.
5. Raporun sonunda: **(a) en önemli 5 önerin**, **(b) diğer uzmanlarla çatışabileceğini düşündüğün noktalar**, **(c) karar vericiye sorman gereken sorular**, **(d) Quant'ın başarısını 90 günde nasıl ölçeriz** (senin alanından).
6. Rapor uzunluğu: 1500–3000 kelime.
