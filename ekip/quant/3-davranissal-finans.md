# Davranışsal Finans ve Finansal Karar Psikolojisi Raporu

Ekip: Quant v2 yöntem ekibi · Davranışsal finans · Tarih: 17 Kasım 2026
Girdi: `BRIEF.md`, `ANAYASA.md` v2, `QUANT.md`, `ekip/KARAR.md`, `ekip/2-risk-iletisimi-psikoloji.md` (News raporu; burada tekrar edilmedi, finansa uyarlandı), `data/quant.json`, `quant/motor.py`, `posts/2026-11-16-quant-haftalik/`.

**Tek cümlelik hüküm:** Davranışsal finans Quant'a iki kapıdan girer. Analizde, piyasa fiyatından türetilen sayıyı **insan davranışının çarpıttığı yerlerde düzeltmek** için girer; fiyat yönünü tahmin etmek için değil. Okurda ise sayının **bir alım-satım tetiği gibi okunmasını engellemek** için girer.

---

## 1. Davranışsal finans analize nasıl girer

### 1.1 Temel bulgu: davranış göstergeleri yönü değil, oynaklığı ve aşırı uçları öngörür

Literatürün ortak sonucu Quant için kritik. Duyarlılık ölçüleri piyasa yönünü güvenilir biçimde öngörmüyor. Öngördükleri şeyler oynaklık, işlem hacmi ve aşırı uçlarda kısmi geri dönüş.

- **Medya kötümserliği.** WSJ köşesindeki olumsuz kelimeler ertesi gün endeks üzerinde baskı öngörüyor. Bu baskı sonraki günlerde büyük ölçüde geri dönüyor. Kötümserliğin mutlak değeri ise yüksek işlem hacmini öngörüyor. Yani haber bilgi değil, gürültü ticareti taşıyor ([Tetlock, J. Finance 2007](https://www.columbia.edu/~pt2238/papers/Tetlock_Media_Sentiment_JF.pdf)).
- **Arama verisi.** Hanehalkının "resesyon", "iflas" gibi aramalarından kurulan FEARS endeksi kısa vadeli geri dönüşleri, geçici oynaklık artışını ve hisse fonlarından tahvil fonlarına akımı öngörüyor ([Da, Engelberg ve Gao, RFS 2015](https://ideas.repec.org/a/oup/rfinst/v28y2015i1p1-32..html)). Buna karşılık Google Trends ile yön tahmini iddiaları anahtar kelime seçimine ve geriye dönük test yanlılığına çok duyarlı çıkıyor ([Challet ve Bel Hadj Ayed 2013](https://www.arxiv.org/abs/1307.4643)).
- **Anket duyarlılığı.** AAII anketi 1987–2013 döneminde piyasa yönünü öngörmedi. Yalnız aşırı düşük iyimserlik okumaları (16 kez) sonrasında güçlü getiri geldi. Ancak S&P 500 zaten altı aylık dönemlerin %71'inde yükseldiği için "sinyallerin" çoğu taban orandan ayırt edilemiyor ([AAII Journal](https://www.aaii.com/journal/article/is-the-aaii-sentiment-survey-a-contrarian-indicator)).
- **Kesitsel duyarlılık.** Baker ve Wurgler'in endeksi, değerlemesi zor ve arbitrajı pahalı varlıklarda (küçük, oynak, kârsız, temettüsüz şirketler) etkili. Etki geniş endeks yönünde değil ([Baker ve Wurgler, NBER w10449](https://nber.org/papers/w10449)).
- **Fon akımları.** Bireysel yatırımcının fonlar arasındaki geçişleri, yüksek giriş alan varlıkların sonraki getirisinin düşük olmasıyla birlikte gidiyor ("dumb money") ([Frazzini ve Lamont, JFE 2008](https://nber.org/papers/w11526)).
- **Put/call.** Opsiyon hacminin hisse getirisini öngördüğü bulgusu, kamuya açık olmayan "yeni açılan alıcı pozisyonu" ayrımlı veriye dayanıyor. Herkesin gördüğü toplam put/call oranı bu ayrımı içermiyor ([Pan ve Poteshman, RFS 2006](https://www.nber.org/papers/w10925)).
- **VIX ve varyans risk primi.** Örtük oynaklık ile gerçekleşen oynaklık arasındaki fark (varyans risk primi) üç aylık hisse getirisinin anlamlı bir kısmını açıklıyor. VIX'in kendi düzeyi tek başına bu kadar bilgi taşımıyor ([Bollerslev, Tauchen ve Zhou, RFS 2009](https://papers.ssrn.com/abstract=948309)).

**Sonuç:** Quant hiçbir duyarlılık göstergesini yön sinyali olarak motora sokmamalı. Bu, hem kanıtla hem de SPK çizgisiyle uyumlu.

### 1.2 Davranışsal finansın motora üç somut girişi

**(a) Risk-nötr olasılığı gerçek olasılığa çevirmek.** Bu, en büyük ve en kolay kazanç. Vadeli faiz ve opsiyon fiyatları olasılık değil, **risk primi içeren** fiyatlardır.

- Fed fonları vadelileri risk primi düşülmeden okunursa politika patikasını sistematik olarak yanlı tahmin eder. Bu prim döngüye karşı hareket eder, yani stres dönemlerinde büyür ([Piazzesi ve Swanson, FRBSF](https://www.frbsf.org/research-and-insights/publications/working-papers/futures-prices-as-risk-adjusted-forecasts-of-monetary-policy)).
- Bugün `fed-artirim` sorusunda motor = %100, çünkü FedWatch'u olduğu gibi alıyor. Ayrıca soru %97'de, yani Anayasa §2'ye göre sessiz izlemede olmalı.
- `quant/motor.py` eşik sorularını lognormal "dokunma" formülüyle ve örtük oynaklıkla hesaplıyor (ör. Nasdaq için VIX × beta). Örtük oynaklık gerçekleşen oynaklıktan ortalamada yüksektir (varyans risk primi). Bu yüzden motor hem yukarı hem aşağı eşiklere dokunma olasılığını **sistematik olarak şişirir**.
- **Öneri:** Her opsiyon ya da vadeli kaynaklı motor girdisine `risk_primi_duzeltmesi` alanı eklenmeli. Oynaklık için tarihsel gerçekleşen/örtük oranı kullanılmalı, faiz vadelileri için ise yayımlanmış prim tahmini. Düzeltme Claude ayarı değil, kurallı motor adımı olmalı. Böylece Motor ile Claude'un ayrı puanlanması (Anayasa ilke 3) bozulmaz.

**(b) Takvim etkileri: "haberi al, satış yap" ölçülebilir bir olgu.** ABD'de S&P 500, 1994 sonrasında planlı FOMC kararlarından önceki 24 saatte ortalama 49 baz puan fazla getiri üretti. Bu, yıllık fazla getirinin yaklaşık %80'i ([Lucca ve Moench, NY Fed SR512](https://www.newyorkfed.org/medialibrary/media/research/staff_reports/sr512.html)). Quant açısından ders şu: bilinen bir olayın öncesi ve sonrası farklı rejimlerdir. **Öneri:** Fed, TCMB ve TÜFE açıklama günleri motor geçmişinde "olay penceresi" olarak işaretlenmeli. Pencere içindeki sayı değişimleri haftalık Δ'da ayrı gösterilmeli; olay geçince geri dönen hareket "bilgi" sayılmamalı.

**(c) Momentum ve aşırı tepki: ayar kovalamasını önlemek.** Varlık fiyatlarında 12 aya kadar zaman serisi momentumu, ardından kısmi geri dönüş görülüyor. Bu, önce eksik tepki, sonra aşırı tepkiyle uyumlu ([Moskowitz, Ooi ve Pedersen, JFE 2012](https://papers.ssrn.com/abstract=2089463)). Motor fiyatı zaten anlık olarak içeriyor. Claude ayarı da son fiyat hareketiyle aynı yöne giderse aynı bilgi iki kez sayılır. **Öneri:** Her ayarın yönü, ilgili varlığın son 5 iş günlük hareketiyle karşılaştırılmalı. "Ayar–momentum uyumu" oranı karnede gösterilmeli. Oran %70'i aşarsa ayar sınırı daraltılmalı.

### 1.3 Türkiye'ye özgü davranış göstergeleri: tahmin değil, bağlam

| Gösterge | Kaynak | Tahmin gücü | Quant'ta kullanımı |
|---|---|---|---|
| Yerleşik gerçek kişi döviz mevduatı (Ekim 2026: ~142,4 milyar $) | [TCMB, haftalık; Foreks](https://www.foreks.com/haber/detay/6ad0bbfa390e6a39236ff446/FRKS/tr/tcmb-yurt-ici-yerlesik-gercek-kisilerin-doviz-mevduati-142-milyar-354-milyon-924-bin-dolar-onceki-142-milyar-679-milyon-629-bin-15-10-26/) | Kur yönü için kanıtlanmış öncü güç bulamadım. Çoğu zaman kura tepki veriyor, onu öncelemiyor. | "Ne Olur?" zincirinin ikinci halkasında davranış verisi olarak kullanılabilir. Motor girdisi olmamalı. |
| Hanehalkı enflasyon beklentisi (Eylül 2026: hanehalkı %45,6; piyasa %23,7; reel sektör %32,5) | [TCMB Sektörel Beklentiler; Capital](https://www.capital.com.tr/haberler/tum-haberler/tcmb-acikladi-piyasanin-ve-vatandasin-enflasyon-ve-doviz-beklentisi-ne-oldu) | Enflasyonu öngörmüyor. Okurun **algısını** ölçüyor. | Okur çerçevesinin ana verisi (bkz. §2). |
| Hanehalkının yatırım tercihi (Eylül 2026: altın %43, gayrimenkul %33,6) | Aynı kaynak | Yok. Talep göstergesi. | Bağlam |
| MKK pay yatırımcı sayısı ve dağılımı | [MKK; hisse.net, 14.10.2026](https://www.hisse.net/haber/amp/borsada-6-7-milyon-yatirimci-var-ama-servet-25-bin-kiside-toplandi-102148) | Bireysel giriş patlamaları, Baker–Wurgler mantığıyla yüksek duyarlılık dönemine işaret edebilir. Türkiye için test edilmeli. | Aday gösterge. 2020–2026 serisiyle geriye dönük test yapılmadan kullanılmamalı. |

**Kural:** Türkiye'ye özgü bir davranış göstergesi, Quant'ın kendi verisiyle geriye dönük test edilip olabilirlik oranı (LR) yazılmadan sayı oynatmaz. O zamana kadar Zayıf Sinyal Defteri'ne gider (Anayasa §3).

---

## 2. Davranışsal finans okura nasıl girer

### 2.1 Türk okurunun finansal davranışı: rakamlarla

- **İki ayrı enflasyon dünyası.** Hanehalkı 12 ay sonrası için %45,6 enflasyon bekliyor, piyasa %23,7. Fark neredeyse iki kat. Hanehalkının yalnız %16'sı enflasyonun düşeceğini bekliyor ([TCMB, Eylül 2026](https://www.capital.com.tr/haberler/tum-haberler/tcmb-acikladi-piyasanin-ve-vatandasin-enflasyon-ve-doviz-beklentisi-ne-oldu)). Bu fark irrasyonellik olarak okunmamalı. Uzun yüksek enflasyon döneminden kalmış bir hafıza ve korunma refleksi. Planck'in "%30 altında kalır mı? %40" gibi bir sayısı bu okurun kendi deneyimiyle çatışabilir. Bu yüzden sayının referansı açıkça yazılmalı: hangi endeks, kimin beklentisi.
- **Küçük portföy, yoğun dikkat.** Pay yatırımcısı 6,69 milyon. Bunların %59'unun portföyü 10 bin TL'nin altında. Toplam değerin %85,8'i yaklaşık 25 bin kişide. Eylül–Ekim arasında yatırımcı sayısı 105 bin azaldı, toplam portföy değeri %22,8 geriledi ([MKK verisi, 13.10.2026](https://www.hisse.net/haber/amp/borsada-6-7-milyon-yatirimci-var-ama-servet-25-bin-kiside-toplandi-102148)). Tipik bireysel yatırımcı küçük tutarla, yüksek dikkatle ve sık işlemle hareket ediyor. Bu profil, Barber ve Odean'ın aşırı işlemden zarar gören grubuyla örtüşüyor (§3).
- **Kripto: geniş katılım, sosyal medya kaynaklı bilgi.** 18–55 yaş arasında kripto işlemi yapanların oranı 2020'de %1'di; 2026'da %37'ye çıktı. Araştırma yapanların %53'ü sosyal medyayı kaynak gösteriyor. Bunların %76'sı Instagram'ı tercih ediyor ([Paribu–FutureBright, Ekim 2026; Foreks](https://www.foreks.com/haber/detay/6adf0fbb58b1b941c2090f73/PICNEWS/tr/turkiye-de-kripto-islemi-yapanlarin-orani-yuzde-37-ye-yukseldi-26-10-26/)). Not: araştırma bir kripto borsası tarafından yaptırılmış. Chainalysis, Türkiye'deki yaklaşık 200 milyar dolarlık hacmin kullanımdan çok spekülasyona dayandığını söylüyor ([Cointelegraph, 23.10.2025](https://cointelegraph.com/news/turkey-s-200b-crypto-boom-is-built-on-speculation-not-adoption-chainalysis)). **@planck.quant tam olarak bu okurun bilgi aldığı mecrada yayın yapıyor.**
- **Finfluencer ortamı.** Telegram ve WhatsApp sinyal grupları SPK ve TSPB uyarılarının konusu ([Diken, TSPB uyarısı](https://www.diken.com.tr/?p=1640587)). Planck'in sayıları ekran görüntüsüyle bu gruplara taşınabilir. Bağlamından koparılmış "%55" bir sinyal gibi dolaşır. Sayının kartın içinde soru, tarih ve "piyasa zaten fiyatlıyor" satırıyla birlikte durması bu yüzden zorunlu.
- **Altın ve döviz kültürü.** Yastık altı altın için kamuoyunda 4–5 bin ton gibi tahminler dolaşıyor. Bu rakamların resmi ölçümü yok ve Planck bunları sayı olarak kullanmamalı ([örnek: Dünya](https://www.dunya.com/foto-galeri/ekonomi/yastik-altinda-ne-kadar-altin-var-dev-servetin-boyutu-ortaya-cikti-galeri-840209)). Asıl önemli olan şu: altın ve döviz bu okur için spekülasyon değil, **tasarruf aracı**. Altın ya da dolar eşiği hakkındaki bir sayı, okurun birikim kararına doğrudan değer. Bu da K=3 karar ilgisi demek (KARAR §2.2) ve en yüksek özen düzeyini gerektiriyor.

### 2.2 Sayı nasıl verilirse zarar vermez: beş ilke

1. **Fiyatlanmış olanı söyle.** Her varlık eşiği sorusunda bir satır zorunlu olmalı: "Bu sayı büyük ölçüde bugünkü fiyat ve piyasanın beklediği oynaklıktan türetildi; piyasanın zaten bildiği bir beklentiyi tarif eder." Bu satır "erken bilgi" yanılsamasını, yani FOMO'nun motorunu kırar.
2. **Olasılık, getiri değildir.** "Altın 4.500'ü aşar mı? %45" cümlesi ne kadar kazanılacağını, ne zaman olacağını ya da aştıktan sonra ne olacağını söylemez. Bu, kartta bir kez ve sabit cümleyle yazılmalı.
3. **Ufku büyüt, frekansı düşür.** Uzun vadeli getiri dağılımını gören katılımcılar, tek yıllık sonuç gösterilenlere göre daha az kayıptan kaçındı ([Benartzi ve Thaler, Management Science 1999](https://pubsonline.informs.org/doi/fpi/10.1287/mnsc.45.3.364)). Sık geri bildirim alan katılımcılar ise daha az risk aldı ve daha az kazandı ([Thaler ve ark., QJE 1997](https://econpapers.repec.org/RePEc:oup:qjecon:v:112:y:1997:i:2:p:647-661.)). Varlık eşiği sayıları haftada bir güncellenmeli. Gün içi ya da günlük olasılık takibi yayınlanmamalı.
4. **Simetrik çerçeve.** Kayıplar kazançlardan yaklaşık iki kat ağır tartılır ([Tversky ve Kahneman 1992](https://psych.fullerton.edu/mbirnbaum/psych466/articles/Tversky_Kahneman_JRU_92.pdf)). "Nasdaq %25 düşer mi" sorusu her zaman "100'de 66 düşmez" satırıyla verilmeli. Bu satır Anayasa'da yalnız %80 üstü ve %20 altı için zorunlu; Quant'ta kayıp içeren her soruda zorunlu olmalı.
5. **Eylem satırı SPK-güvenli olmalı.** Quant'ta eylem satırı yön içeremez. Üç izinli tür önerilmeli:
   - planlama ("12 aylık bütçede kur tek sayı değil, aralık olarak alınabilir"),
   - kendi riskini tanıma ("Döviz cinsinden borcu ve TL geliri olan için bu sayı kur riskinin büyüklüğünü gösterir"),
   - dürüst boşluk ("Bu sayıdan çıkan bireysel bir işlem yok; izlenecek veri: 3 Aralık TÜFE").

---

## 3. Finans haberciliğinin bilinen zararları ve Quant'ın ilkeleri

| Zarar | Kanıt | Quant ilkesi |
|---|---|---|
| **Aşırı işlem** | Barber ve Odean'ın 66 bin hanelik çalışmasında en çok işlem yapan grup piyasanın belirgin biçimde altında kaldı ([Barber ve Odean, J. Finance 2000](https://faculty.haas.berkeley.edu/odean/papers/returns/Returns.html)). | Günlük sayı yok. "Açılış Sinyali" adı ve kavramı kaldırılmalı, çünkü "sinyal" işlem çağrışımı taşır. |
| **Dikkatle tetiklenen sürü** | Robinhood kullanıcıları dikkat çeken hisselerde toplu alım yaptı; bu yoğun alımları negatif getiriler izledi ([Barber, Huang, Odean ve Schwarz, J. Finance 2022](https://www.smallake.kr/wp-content/uploads/2020/12/SSRN-id3715077.pdf)). | "En çok değişen olasılık" listesi ve sıralaması yayınlanmamalı. Haftalık Δ, kapakta değil iç sayfada durmalı. |
| **Medyanın nedensel etkisi** | Aynı haberi yerel gazetede okuyan bölgede işlem hacmi arttı ([Engelberg ve Parsons, J. Finance 2011](https://econpapers.repec.org/RePEc:bla:jfinan:v:66:y:2011:i:1:p:67-97)). | Quant kendi yayın gücünü bir risk olarak kabul etmeli. Türkiye'deki tekil hisse ve küçük piyasa değerli varlıklara hiç girmemeli. |
| **Korku manşeti** | Kötümser medya dili gürültü ticaretini artırıyor, fiyat sonra geri dönüyor ([Tetlock 2007](https://www.columbia.edu/~pt2238/papers/Tetlock_Media_Sentiment_JF.pdf)). | "Çöküş", "sert düşüş", "rekor kayıp" dili yasak. QUANT.md §6 bunu zaten kısmen yasaklıyor; "sert" ve "rekor" listeye eklenmeli. |
| **Oyunlaştırma** | FCA'nın 3 bini aşkın kullanıcıyla yaptığı araştırmada konfeti, rozet, sıralama ve anlık bildirim gibi özellikler yoğun uygulamalarda riskli davranış daha yüksek çıktı. Kullanıcıların %20'si "riskli kumar" ölçütünü karşıladı. Bulgu ilişkisel, nedensel değil ([FCA 2022](https://www.fca.org.uk/publications/research/gaming-trading-how-trading-apps-could-be-engaging-consumers-worse)). | Puan, rozet, sıralama ve FLAŞ bildirimi kullanılmamalı (§6). |
| **Kumarla ikame** | ABD'de online spor bahsinin yasallaşması hanelerin net yatırımını yaklaşık %14 azalttı ([Baker ve ark. 2024; Kellogg](https://insight.kellogg.northwestern.edu/article/online-sports-betting-is-draining-household-savings)). | Olasılık, bahis gibi tüketilebilir bir nesne olarak sunulmamalı. "Oran", "kazandır" ve "tutturdu" dili kullanılmamalı. |

Ek ilke: **FLAŞ formatı varlık fiyatı için kaldırılmalı.** QUANT.md §5'teki "Dolar/TL'de günlük %5+ hareket → anında FLAŞ + bildirim" kuralı, okurun panik anında en riskli kararı vermesine zemin hazırlar. Kırmızı eşik yalnız kurumsal karar ya da yapısal olay için (ara faiz kararı, sermaye kontrolü) kalmalı. Fiyat şoku ertesi gün sakin bir "ne değişti, ne değişmedi" içeriğiyle karşılanmalı.

---

## 4. Sayıdan yazıya: örnekler

**Örnek 1 · Kur (usdtry-60, %55)**

> Kötü: *"Dolar 60'a Koşuyor: Olasılık %55'e Çıktı"*
> Hareket ve aciliyet ima ediyor. "Çıktı" sözcüğü momentum gibi okunuyor. Soru, tarih ve ters taraf yok.

> İyi: *"Dolar/TL 8 Kasım 2027'ye Kadar 60'ı Aşar mı? · %55 · 100'de 55. 100'de 45 aşmaz. Sayının büyük kısmı bugünkü kurdan ve piyasanın beklediği yıllık değer kaybından geliyor; piyasanın zaten fiyatladığı bir beklentiyi tarif ediyor. TL geliri olup döviz cinsinden ödemesi olan için anlamı: 12 aylık planda kuru tek sayı değil, aralık olarak almak. Yatırım tavsiyesi değildir."*

**Örnek 2 · Değişim (abd-resesyon)**

> Kötü: *"ABD'de Resesyon Riski Bir Ayda %50 Arttı"* (göreli risk tek başına)
> İyi: *"ABD 12 Ay İçinde Resesyona Girer mi? 100'de 22'den 100'de 33'e çıktı. Hâlâ 3 durumdan 2'sinde resesyon yok. Değişimin sebebi tahvil getirilerindeki sıçrama; istihdam verisi henüz uyarı vermiyor."*

**Örnek 3 · Kayıp sorusu (nasdaq-25, %34)**

> Kötü: *"Nasdaq'ta Çöküş Riski %34"*
> İyi: *"Nasdaq 12 Ay İçinde Zirvesinden %25 Düşer mi? %34 · 100'de 34; 100'de 66 bu kadar düşmez. Geçmişte [taban: X yılı arası 12 aylık pencerelerin Y'sinde]."* Taban oranı motorun veri setinden gerçek sayıyla doldurulmalı. Bulunamazsa Anayasa §2.1'deki "tabanı yok" cümlesi kullanılmalı. Uydurma referans sınıfı kullanılmamalı.

**Örnek 4 · Haftalık Δ (altin-4500, %61 → %45)**

> Kötü (16 Kasım taslağındaki biçim): *"Ons altın 4.500 doları aşar mı? %61 → %45."* Bir haftada 16 puanlık düşüş, okura "altın çöküyor" diye okunur. Oysa bu düşüşün çoğu fiyatın kendisi.
> İyi: *"Altın 4.500 sorusu bir haftada 100'de 61'den 45'e indi. Sebebin neredeyse tamamı ons fiyatının 3.886 dolara gerilemesi; motor fiyatı izliyor, yeni bir bilgi yok. Soru 12 aylık; bir haftalık hareket bu ufukta olağan."*

Yazım kuralları:
- Yüzde ve "100'de X" aynı satırda.
- Ters taraf her kayıp sorusunda.
- Göreli değişim yalnız mutlak değerle birlikte.
- "Çıktı", "fırladı", "çakıldı" gibi hareket fiilleri yerine "… iken … oldu".
- Hareketin kaynağı (fiyat mı, yeni bilgi mi) tek cümleyle.

---

## 5. Kendi tahminlerimizin önyargıları

| Hata | Kanıt | Quant'taki görünümü | Koruma |
|---|---|---|---|
| **Evet yanlılığı** | 12 modellik LLM topluluğu insan kalabalığına denk çıktı. Ancak sonuçlar yaklaşık yarı yarıya bölünmüşken ortalama tahminler %50'nin anlamlı biçimde üstündeydi ([Schoenegger ve ark., arXiv 2402.19379](https://arxiv.org/abs/2402.19379v6)). | Eşik soruları hep "aşar mı?" diye yazılıyor. | **Ters çift testi:** Her soru bir kez "aşar mı", bir kez "aşmaz mı" diye ayrı geçişlerde sorulmalı. İki sayının toplamı 100'den 5 puandan fazla saparsa uyarı verilmeli. |
| **Yön yanlılığı (iyimser/kötümser)** | 16 modellik bir ön baskıda Claude Opus olumsuz sonuçlara sistematik olarak fazla olasılık verdi (Skew −5,1). Tek bir olumlu ya da olumsuz bağlam cümlesi tahmini +13 ile −10 puan arasında kaydırdı ([Cho ve Koshiyama, 2026, ön baskı](https://huggingface.co/papers/2607.26981.md)). | Resesyon, çöküş, kur gibi kötü sonuç sorularının şişmesi; "Ne Olur?" zincirinde felaket halkasına fazla ağırlık. | Anayasa §5'teki "yön hatası" satırı Quant'ta ayrıca raporlanmalı. Dış görünüm geçişine haber metni değil yalnız sayısal veri verilmeli. |
| **Anlatı ve dikkat dağılması** | GPT ile duyarlılık skorlamasında şirket adı gizlenen başlıklar daha iyi sonuç verdi. Modelin şirket hakkındaki genel bilgisi okumayı bozuyordu ([Glasserman ve Lin 2023](https://arxiv.org/abs/2309.17322)). | "Nvidia", "Fed" gibi büyük adlar anlatıyı çağırıyor. | **Anonim geçiş:** Dış görünüm geçişinde varlık adı ve tarih gizlenmeli ("A varlığı, fiyat S, eşik K, oynaklık σ, ufuk T"). |
| **Güncellik ve momentum kovalama** | Moskowitz ve ark. 2012; Tetlock 2007 | Ayar son haftanın fiyatıyla aynı yöne gidiyor; motorla çift sayım oluşuyor. | §1.2c'deki ayar–momentum uyumu ölçüsü. |
| **Dramatik olaya aşırı ağırlık** | Tversky ve Kahneman 1992: küçük olasılıklar fazla tartılır. | Kuyruk sorularında Claude'un yukarı ayarı. | Kuyruk sorularında yukarı ayar için iki A/B kaynağı ve kayıtlı LR şart olmalı. |

**Ön kayıt:** Her soru açılırken şu alanlar git'e yazılmalı: motor formülü, girdiler, ayar sınırı, ön-otopsi ve "hangi veri gelirse ne kadar oynatırım" (önceden yazılmış LR'ler). Önceden yazılmamış bir gerekçeyle yapılan güncelleme `plansiz` diye etiketlenmeli ve karnede ayrı puanlanmalı.

**Karşı görüş geçişi** finans için özel bir görevle yapılmalı: "Piyasa bu sayıyı neden yanlış fiyatlamış olabilir?" sorusunun **tersini** savunmak, yani "Piyasa haklı, Claude'un ayarı gürültü." Etkin piyasa varsayımı Quant'ın varsayılan karşı görüşü olmalı.

---

## 6. Etkileşim: "Sen yüzde kaç dersin?" finansta tehlikeli mi

Evet, varlık fiyatı için tehlikeli. Üç nedeni var:

1. **Yön sorusu bahistir.** "Dolar 60'ı geçer mi?" anketi, okurdan bir yön seçmesini ister. Bu, SPK çizgisinin okur tarafındaki aynası.
2. **Sosyal etki.** Instagram, oy verildikten sonra sonucu gösteriyor. Görülen kalabalık görüşü çeşitliliği azaltıyor ve güveni şişiriyor (KARAR §1.1, Lorenz ve ark. 2011). Finansta bu, sürü davranışının tohumu.
3. **Oyunlaştırma.** Puan ve sıralama, FCA'nın riskli bulduğu özelliklerin aynısı. KARAR bunları zaten reddetti; Quant'ta da geçerli olmalı.

**Tasarım önerisi:**
- **Varlık fiyatı ve yön anketi yapılmamalı.** Kur, altın, endeks, kripto için anket olmamalı.
- **Kavram anketi yapılabilir:** "%55 ne demek?" (100'de 55 kez olur / kesin olur / 55 gün sonra olur). Bu, okurun okuryazarlığını ölçer ve öğretir.
- **Makro veri anketi koşullu yapılabilir:** "Kasım TÜFE'si sence aylık %2'nin üstünde mi?" Bu bir fiyat değil, tarihli bir veri sorusu. Okurun cevabı hanehalkı beklentisiyle karşılaştırılarak geri bildirilebilir: "Sizin cevabınız X, TCMB hanehalkı anketi Y, piyasa Z, gerçekleşen W." Bu, okurun kendi enflasyon algısını kalibre etmesine yardım eder. Yine de soru Planck'in sayısından **önce** sorulmalı.
- **Kişisel karne, puan, sıralama, ödül olmamalı.**

---

## (a) En önemli 5 öneri

1. **Risk-nötr düzeltmesi motora kurallı adım olarak eklensin.** Opsiyon, vadeli ve FedWatch kaynaklı olasılıklar varyans ve vade primiyle düzeltilmeli. Örtük oynaklık doğrudan dokunma formülüne girmemeli. Gerekçe: Piazzesi ve Swanson; Bollerslev ve ark.
2. **Davranış göstergeleri yön sinyali olarak kullanılmasın.** Ancak geriye dönük test ve kayıtlı LR'den sonra, oynaklık ve rejim bağlamı olarak girebilirler. Türkiye göstergeleri (DTH, hanehalkı beklentisi, MKK) okur bağlamı olarak kullanılmalı.
3. **Her varlık eşiği kartında "piyasa zaten fiyatlıyor" satırı ve kayıp sorusunda ters taraf zorunlu olsun.** Haftalık Δ'da hareketin kaynağı (fiyat mı, bilgi mi) yazılsın.
4. **Varlık fiyatı için FLAŞ, günlük "Açılış Sinyali", yön anketi ve "en çok değişen" listesi kaldırılsın.** Varlık eşiklerinde güncelleme haftalık olsun.
5. **Claude'un önyargılarına karşı dört mekanik koruma kurulsun:** ters çift testi, anonim dış görünüm geçişi, ayar–momentum uyumu ölçüsü ve önceden yazılmış LR'lerle ön kayıt.

## (b) Diğer uzmanlarla olası çatışmalar

- **Medya/ürün uzmanı:** Haftalık Δ ve FLAŞ etkileşim getirir. Benim önerim bunları azaltıyor. Benim ölçütüm etkileşim değil, okurda işlem tetiklememek.
- **Tahmin bilimi ve kantitatif uzman:** "Claude ayarı piyasayı yenebilir" varsayımına karşı, etkin piyasayı varsayılan karşı görüş yapıyorum. Bu, ayar sınırının daraltılmasına yol açabilir.
- **Makro uzmanı:** Hanehalkı beklentisini öncü gösterge olarak kullanmak isteyebilir. Benim önerim, test edilene kadar bunu bağlam olarak tutmak.
- **Hukuk/SPK:** "Planlama" türü eylem satırları bile kişiye özel tavsiye gibi okunabilir mi? Bu konuda hukuki görüş gerekli.

## (c) Karar vericiye sorular

1. Quant'ın birincil okuru tasarruf eden hanehalkı mı, yoksa aktif yatırımcı mı? Ton ve eylem satırı buna göre değişir.
2. Varlık fiyatı eşik soruları Quant'ın merkezinde mi kalmalı? Motor bu sorularda büyük ölçüde fiyatı yeniden söylüyor. Kurumsal karar ve rejim soruları (sermaye kontrolü, KKM benzeri düzenleme, rezerv eşiği) daha fazla değer katabilir.
3. Kripto soruları açılacak mı? Okurun %37'si kripto işlemi yapıyor, ama spekülatif tüketim riski en yüksek alan bu.
4. FLAŞ bildirimi varlık fiyatı için kaldırılabilir mi?

## (d) 90 günde başarı nasıl ölçülür (bu alandan)

| Ölçü | Yöntem | Hedef |
|---|---|---|
| **Anlama** | Story kavram anketi: "%55 ne demek?" sorusuna doğru cevap ("100'de 55") | Başlangıç ölçülsün; 90 günde +15 puan |
| **Tetikleme etmeme** | Yorum ve DM'lerde "alayım mı / satayım mı / ne zaman" mesajlarının toplam etkileşime oranı | Düşen eğilim; ilk ay ölçülür, sonra eşik konur |
| **Yanlış okuma** | Planck kartının bağlamından koparılıp "sinyal" diye paylaşıldığı tespit edilen vaka sayısı (elle örneklem) | Kayıt altında; her vakada kart tasarımı gözden geçirilsin |
| **Önyargı karnesi** | Ters çift tutarsızlığı (ortalama |P(evet)+P(hayır)−100|), ayar–momentum uyumu oranı, yön hatası | Tutarsızlık <5 puan; uyum <%70; yön hatası raporlanmış |
| **Risk primi düzeltmesinin katkısı** | Düzeltilmiş ve düzeltilmemiş motorun Brier'i, aynı kapanan sorularda | Raporlansın (30 kapanış kuralı geçerli; öncesinde ham sonuç) |
| **Dozaj** | Varlık eşiği güncelleme sıklığı | Haftada en fazla 1; FLAŞ = 0 |

**Not:** Bu raporda kullanılan 2026 tarihli Türkiye verileri (TCMB Eylül beklentileri, MKK Ekim dağılımı, Paribu anketi) ikincil haber kaynaklarından alındı. Yayında kullanılmadan önce TCMB EVDS ve MKK'nın birincil kaynağından yeniden doğrulanmalı. Cho ve Koshiyama (2026) ile Schoenegger ve ark. hakem incelemesinden geçmemiş ön baskılar; yön bilgisi için yol gösterici, büyüklük için kesin değil. Pan–Poteshman, Bollerslev ve ark. ve Da ve ark. bulguları özet ya da abstract düzeyinde doğrulandı; tam metin açılamadı.
