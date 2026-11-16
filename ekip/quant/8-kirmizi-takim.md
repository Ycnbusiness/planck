# 8 · Kırmızı Takım: Quant v2'ye En Güçlü İtirazlar

*Rol: şüpheci denetçi · 17.11.2026 · Girdi: `ekip/quant/BRIEF.md`, `ekip/KARAR.md`, `ANAYASA.md` v2, `QUANT.md`, `data/quant.json`, `data/sorular.json`, `quant/motor.py`, web taraması. Hiçbir kural dosyasına dokunulmadı. Güç hesapları Monte Carlo simülasyonuyla yapıldı (400 bin soru; gerçek olasılık logit-normal, piyasa ve Planck logit gürültüsüyle; eşleştirilmiş Brier farkı, tek yönlü %5, %80 güç); yöntem metinde yazılı, yeniden üretilebilir.*

## Hüküm özeti

Quant'ın üç iddiası zayıf: piyasayı yenmek, "tavsiye değildir" satırının koruma sağlaması, kısa sürede beceri kanıtlamak. İkisi güçlü: hesap verme (sicil) ve "Ne olur?" mekanizma analizi. Kırmızı takımın önerisi Quant'ı kapatmak değil. Yükü değiştirmek gerekiyor: **ana ürün mekanizma analizi ve piyasanın fiyatladığı olasılığın çevirisi olsun; Planck'in kendi sayısı yalnız kısa vadeli, kapanabilir ve piyasa fiyatıyla karşılaştırılabilir sorularda çıksın.**

## 0. Depodan kendi bulgularım

1. **Quant 30 kapanışa bugünkü havuzla 2027 sonundan önce ulaşamaz.** Sicilde 14 Quant sorusu var, 2'si kapandı. 15 Şubat 2027'ye kadar kapanacak yalnız 4 soru var (`nv-0`, `nv-4`, `tcmb-aralik`, `tr-tufe-30`) ve son ikisi 16.11 kararıyla News'e geçti. Altı varlık eşiği sorusunun beşi 8 Kasım 2027'de kapanıyor.
2. **Brier 0,51'in kaynağı tek soru.** `nv-1`'e %7 verildi, olay gerçekleşti, Brier 0,865 oldu. Bu soru adı geçen bir kişinin görevine dair; bugün Anayasa §9(3) bu soru tipini yasaklıyor. Öteki kapanış 0,16 (Motor 0,185). İki kapanışla ±0,24 genişliğinde bir güven aralığı çıkar, bu da hiçbir şey söylemez.
3. **Claude ayarı tek yöne eğilimli.** Açık 8 Quant sorusunun 7'sinde ayar eksi yönde, ortalaması −6,6 puan. Sorular çoğunlukla "eşik aşılır mı?" diye kurulduğu için bu, "model olayı abartıyor" yönünde sistematik bir yargı demek. Örneklem küçük, ama karnede "ayar yönü" satırı olarak izlenmeli.
4. **Kolay soru Brier'i ucuza iyileştirir.** `fed-artirim` %97'de duruyor ve piyasa Aralık artırımını %100 fiyatlıyor. Bu soru tutarsa Brier'e 0,0009 ekler ama hiçbir beceri göstermez. KARAR'daki %15–85 açılış bandı News'te uygulanıyor, Quant'ta uygulanmıyor.
5. **Uyarı satırı mevzuattaki metin değil.** Bugünkü "Yatırım tavsiyesi değildir" satırı, III-37.1 Tebliği Ek/3'teki standart uyarı notunun yerini tutmuyor (bkz. İtiraz 2).
6. **Veri bayatlığı kayıt altında.** Snapshot notlarına göre OVX ve GVZ 5 Kasım değerinde kaldı, Nasdaq zirvesi doğrulanamadı, `brent_fwd_6ay` boş. Bayat girdi Motor'u besliyor (bkz. İtiraz 6).

---

## İtiraz 1 · "Bir yapay zekâ finansal olayları piyasadan iyi tahmin edebilir"

**İtirazın en güçlü hali.** Likit bir varlığın eşik sorusunda piyasa fiyatı, binlerce parayı ortaya koymuş katılımcının bilgisini toplar. Kamuya açık haberi okuyan bir dil modelinin bunu düzenli olarak yenmesi için ya özel bilgisi ya da piyasanın sistematik bir hatası olması gerekir. Claude'un ikisi de yok.

**Kanıt**
- **Makro tahmin sicili.** 1992–2014 arasında 63 ülkede 153 resesyon yaşandı. Bir önceki yılın Nisan ayında bunların yalnız 5'inde küçülme bekleniyordu ([An, Jalles, Loungani, IMF WP/18/39](https://www.imf.org/-/media/files/publications/wp/2018/wp1839.pdf)). Loungani'nin cümlesi: "Resesyonları tahmin edememe sicili neredeyse lekesizdir" ([FT, 18.12.2000, IMF arşivi](https://www.imf.org/external/np/vc/2000/121800.htm)). Resmi ve özel tahminciler aynı biçimde ıskalıyor.
- **Kur ve getiri.** Meese–Rogoff'tan bu yana kur modelleri rastgele yürüyüşü örneklem dışında düzenli olarak yenemiyor ([Rossi 2013, JEL](https://econpapers.repec.org/RePEc:aea:jeclit:v:51:y:2013:i:4:p:1063-1119)). Hisse getirisi öngörücüleri de örneklem dışında çoğunlukla tarihsel ortalamadan kötü çıkıyor (Welch ve Goyal 2008, *Review of Financial Studies*; bu oturumda açılmadı).
- **Beceri var, ama başka alanda.** Tetlock'un süper tahmincileri jeopolitik sorularda gerçek ve kalıcı beceri gösterdi ([Mellers ve ark. 2015](https://www.psychologicalscience.org/journals/perspectives/1745691615577794/)). Bu sorular likit piyasası olmayan sorulardı.
- **LLM'ler insan kalabalığına yaklaşıyor, piyasa fiyatına değil.** ForecastBench'te en iyi modeller süper tahmincilerin yaklaşık 0,017 Brier gerisinde; FRI denkliğin Kasım 2026 civarında olacağını öngörüyor (95% GA Ocak 2026–Kasım 2027) ([FRI, 29.01.2026](https://forecastingresearch.substack.com/p/llms-are-closing-the-gap-on-human)). Ancak piyasa sorularında, katılımcıya gösterilen piyasa fiyatını aynen kopyalamak bir "kopyacı çizgisi" oluşturuyor. 273 liderlik tablosu girdisinin %75'i bu çizginin altında kalıyor; 527 girdinin hiçbiri çoklu karşılaştırma düzeltmesinden sonra piyasayı anlamlı biçimde yenmiyor, süper tahminciler dahil ([EA Forum, "The Copier Line"](https://forum.effectivealtruism.org/posts/8YuG9EuhyYqaNBt7F/the-copier-line-what-forecastbench-s-market-scores-actually)). Halawi ve ark. 2024'ün sistemi 0,179 Brier'de kaldı, insan kalabalığı 0,149 aldı ([arXiv 2402.18563](https://ar5iv.labs.arxiv.org/html/2402.18563)). Schoenegger ve ark.'nın "denklik" bulgusu 31 soruya dayanıyor ve denklik sınırı o kadar geniş ki sabit %50 tahmini de bu sınırı geçerdi ([arXiv 2402.19379](https://arxiv.org/abs/2402.19379v6); eleştiri: [LessWrong derlemesi](https://www.lesswrong.com/posts/a82q6yd8zKpYk56cF/ai-forecasting-in-2026-what-11-analyses-say)).
- **Geriye dönük testlere güvenilmez.** Modelden sonucu "bilmiyormuş gibi" davranması istendiğinde Brier'de %52'lik bir sapma ölçüldü (aynı derleme). Finansta şirket adı bilgisi duygu ölçümünü bozuyor ([Glasserman ve Lin 2023](https://arxiv.org/abs/2309.17322)). Quant'ın kendi geçmiş verisiyle yapacağı her "geriye dönük başarı" iddiası bu nedenle şüphelidir.

**Olasılık ve şiddet.** Quant'ın likit varlık eşiklerinde piyasa fiyatını anlamlı biçimde yenme olasılığı bence %10'un altında. Şiddet yüksek: kanalın sloganı "Yorum değil, hesap" ve bu iddia çökerse slogan da çöker.

**Dürüst cevap: piyasayı yenemezse Quant'a ne kalır?** Üç şey kalır, ve üçü de piyasayı yenmeye bağlı değil:
1. **Çeviri.** "Piyasa Aralık artırımına 100'de 100 diyor" cümlesi, Türk okurun FedWatch, opsiyon ya da OIS verisine erişemediği bir bilgiyi anlaşılır kılar.
2. **Fiyatı olmayan sorular.** TCMB'nin sözel yönlendirmesi, TÜİK verisinin anket medyanını aşması, regülasyon kararları gibi sorularda rakip piyasa değil; anket ya da taban oranıdır. Burada beceri mümkün.
3. **Hesap verme.** Türkiye'de finans tahmini yapanların hemen hiçbiri sicil tutmuyor.

**Önlem**
- Piyasa fiyatı olan her soruda Motor = piyasa olasılığıdır, rakip de piyasadır ("kopyacı çizgisi"). Bu sorularda Claude ayarı en fazla ±5 puan olur ve gerekçesi yazılı verilir.
- Karnede "Claude ayarı piyasaya ne kattı?" satırı, örneklem büyüklüğü ve "bu fark şans olabilir" cümlesiyle birlikte yer alır.
- Kanal dili "piyasayı yeniyoruz" iddiasını hiçbir zaman kurmaz.

**Bırakma ölçütü.** Piyasa fiyatlı 100 kapanıştan sonra Claude ayarlı Brier piyasa Brier'inden kötüyse ayar bu soru sınıfında kaldırılır ve Quant orada yalnız çevirmen olur. Fiyatsız sorularda 108 kapanıştan sonra (hesap: İtiraz 5) Planck %50'den anlamlı biçimde iyi değilse kanal kendi olasılığını yayınlamayı bırakır.

---

## İtiraz 2 · "Olasılık yayınlamak bahis ya da yatırım tavsiyesi değildir"

**İtirazın en güçlü hali.** Hukuken tavsiye sayılmayabilir, ama okurun gözünde öyledir. "Dolar/TL 12 ayda 60'ı aşar mı? %55" kartı, dolarize olmuş bir okur için doğrudan "dolar al" sinyali olarak okunur. Soru bir yatırım getirisinin ta kendisidir. Eşiği seçmek de bir yön ima eder.

**Kanıt**
- Olasılık gören okur sonuçtan daha emin hale geliyor ([Westwood, Messing, Lelkes](https://www.asc.upenn.edu/sites/default/files/2021-03/Projecting%20Confidence-%20How%20the%20Probabilistic%20Horse%20Race%20Confuses%20and%20Demobilizes%20the%20Public.pdf); [Pew 2018](https://www.pewresearch.org/short-reads/2018/02/06/use-of-election-forecasts-in-campaign-coverage-can-confuse-voters-and-may-lower-turnout/)). %70 kolayca "olacak" diye okunur.
- Yatırımcılar düşük kaliteli sosyal medya tavsiyesine, uymamaları gerektiğini bildikleri ve uymadıklarını söyledikleri halde, farkında olmadan dayanıyor. Tavsiyeyi görmeden önce kaynağın güvenilirliğini düşünmeye yönlendirmek bu etkiyi azaltıyor ([Kadous, Mercer, Zhou 2025](https://ouci.dntb.gov.ua/works/42BXM6B4)).
- Finfluencerların %56'sı "ters beceri" gösteriyor ve en çok takipçiyi bunlar topluyor ([Kakhbod ve ark., SFI](https://www.sfi.ch/en/publications/n-23-30-finfluencers)). Okur, kimin isabetli olduğunu ayırt edemiyor.
- **Mevzuat.** Genel yatırım tavsiyesi yatırım danışmanlığı sayılmaz (III-37.1 md. 45/2). Ancak md. 73/3 medya ve elektronik ortamdaki "her türlü" genel tavsiyeyi md. 78–79'a bağlıyor. Md. 78 fiyatların tarih ve saatini, 12 ay içindeki görüş değişikliğinin gerekçesini ve çıkar çatışmasının açıklanmasını istiyor. Md. 79 Ek/3 uyarı notunu zorunlu tutuyor ([Tebliğ metni](https://alomaliye.com/2013/07/11/yatirim-hizmetleri-ve-faaliyetleri-ile-yan-hizmetlere-iliskin-esaslar-hakkinda-teblig-iii-37-1/)). Bu hükmün kurum dışı yayıncıları bağlayıp bağlamadığı tartışmalı ([TBB Dergisi](https://tbbdergisi.barobirlik.org.tr/ViewPDF-genel-yatirim-tavsiyesi-sunabilecek-kisilere-ve-sermaye-piyasasi-kurulunun-iii-371-sayili-teblig-de-belirledigi-esaslari-medya-ve-elektronik-ort-1467)). "YTD" ibaresi tek başına sorumluluğu kaldırmıyor ([GCM](https://www.gcmyatirim.com.tr/egitim/makaleler/ytd-nedir-borsada-yatirim-tavsiyesi-degildir-ibaresinin-anlami)). Bilgi bazlı piyasa dolandırıcılığı (6362 md. 107/2) çıkar sağlama ve kasıt şartı arıyor, bu yüzden Planck için cezai risk düşük ([SPK](https://spk.gov.tr/yatirimcilar/sermaye-piyasasinda-piyasa-dolandiriciligi-manipulasyon/bilgi-bazli-piyasa-dolandiriciligi)). İdari risk ve itibar riski ise düşük değil.

**Bir okur Planck'in %70'ine bakıp para kaybederse?** Bu, %70'in doğal sonucudur: 100'de 30 durumda olmaz. Ahlaki sorun okurun kaybetmesi değil, sayının ona bunu söylememiş olmasıdır. Okur Planck'e kızar, kanıt olarak kartı paylaşır, karşı taraf kartı göremez. Türkiye'de güvenin %28 olduğu bir ortamda tek bir viral şikâyet, 30 kapanışlık karnenin kazandıracağından fazlasını kaybettirir.

**Olasılık ve şiddet.** TL kuru, gram altın ve BIST eşiklerinde okurun soruyu işlem sinyali olarak algılama olasılığı yüksek. Şiddet orta-yüksek. Küresel endeks ve emtia eşiklerinde ikisi de daha düşük.

**Önlem**
1. **TL kuru, gram altın ve BIST eşik soruları pilot boyunca kapalı kalır.** Bunlar Türk bireysel yatırımcının üç ana kararıdır; bu alanlarda K = 3 "karar ilgisi", tavsiyenin kendisine dönüşür. Küresel varlıklar ve makro karar soruları açık kalır.
2. **Ek/3 uyarı notu** her açıklama metnine tam olarak girer. Kartta kısa bir satır ve "uyarı açıklamada" notu yer alır. Ek/3 metnindeki "kişisel görüşlere dayanmaktadır" kalıbı bir yapay zekâ için yanlıştır; künye bunu düzeltir.
3. **Md. 78'e gönüllü uyum.** Her sayının yanında verinin tarihi ve saati ("13 Kasım kapanışı") yer alır. Bir olasılık önceki yayından 15 puandan fazla değişirse gerekçesi yazılır. Çıkar beyanı eklenir: "Planck ve yürütücüsü bu varlıklarda pozisyon bildirmez / tutmaz". Bu cümleyi Yusuf teyit etmeli.
4. **Kaynak güvenilirliği önce gelir.** Kadous ve ark. bulgusuna dayanarak, kartta karne satırı sayıdan önce durur: "Quant'ın 12 kapanışı var; bu sayı henüz kanıtlanmış bir beceri değildir."
5. **Ters taraf her olasılıkta zorunludur.** News'te bu kural yalnız %80 üstünde ve %20 altında geçerli; Quant'ta her sayıya uygulanır.

**Bırakma ölçütü.** SPK'dan herhangi bir yazı ya da uyarı gelirse ilgili soru sınıfı 24 saat içinde durur. Story anketinde (en az 30 yanıt) okurların %25'ten fazlası "Bu kart bir al/sat işaretidir" derse, varlık eşiği soruları tümüyle kalkar.

---

## İtiraz 3 · "Arşiv değeri" iddiası

**İtirazın en güçlü hali.** Instagram bir akıştır, arşiv değildir. Görselin içindeki metin aranamaz, hesap kapatılabilir, eski gönderiye kimse kaydırarak inmez. "Medya arşivinde değer olmak" iddiası, ölçülmeyen bir pazarlama cümlesine dönüşebilir.

**Kanıt.** 10 Temmuz 2025'ten beri 18 yaş üstü profesyonel hesapların herkese açık gönderileri arama motorlarında indekslenebiliyor ([PPC Land](https://ppc.land/instagram-content-becomes-searchable-on-google-starting-july-10/)). Bu, açıklama metni için geçerli; kart görselindeki sayı için değil. Okurun eski karneye bakıp bakmadığına dair elimde Planck'e özgü bir veri yok. Bu bir boşluk, kanıt değil.

**Olasılık ve şiddet.** Okurların çoğunun eski karneye bakmama olasılığı çok yüksek. Şiddet düşük-orta, çünkü arşivin değeri ziyaret sayısında değil, var olmasında ve denetlenebilir olmasında. Bir gazeteci, akademisyen ya da eleştirmen için tek bir doğrulanabilir sicil, bin beğeniden değerlidir.

**Önlem**
- Asıl arşiv `planck.news/quant/sicil` olur. Her gönderide soru kimliği yer alır ve sitedeki sayfaya bağlanır.
- Sicil açık git deposunda tutulur. Ayda bir Wayback Machine anlık görüntüsü alınır ki "kayıt değiştirilemez" cümlesini üçüncü bir taraf doğrulayabilsin.
- Soru metni ve sayı açıklamada düz metin olarak yer alır.
- Arşiv akışa geri getirilir: üç ayda bir "Arşivden" gönderisi ("Ağustos'ta %X demiştik; olan şu").

**Bırakma ölçütü.** Altı ayın sonunda sicil sayfası ayda 100 tekil ziyaretin altındaysa ve karne gönderileri üç ay üst üste hesap medyanının yarısının altında kalıyorsa, "arşiv değeri" tanıtım dilinden çıkar. Arşiv kalır, iddia kalkar.

---

## İtiraz 4 · Sıkıcı olmamak ile kandırmamak arasındaki gerilim

**İtirazın en güçlü hali.** Yusuf "sıkıcı hoca olmasın" diyor. Ama anlatıyı güçlendiren her ayrıntı, olayı daha olası gösterir. "Hürmüz kapanır → petrol sıçrar → Fed sıkılaşır → resesyon" zinciri ne kadar canlı anlatılırsa okur sonuncunun gerçekleşeceğine o kadar inanır. Oysa zincirin her halkası olasılığı düşürür.

**Kanıt.** Bir senaryoyu açıklamak ya da hayal etmek, o senaryonun doğru olduğuna olan güveni artırır ([Koehler 1991, Psychological Bulletin](https://zenodo.org/records/1066960)). Ayrıntı eklemek olasılığı düşürür ama inandırıcılığı artırır (Tversky ve Kahneman 1983, birleşme yanılgısı). Shiller, piyasaların hikâyelerle hareket ettiğini gösterir (Narrative Economics, *AER* 2017); hikâye kuran medya bu döngünün parçası olur. Basit bir hesap: her halkası %70 olan üç halkalı bir zincirin sonu, bağımsızlık varsayımıyla %34'tür. Okurun aklında kalan ise %70'tir.

**Olasılık ve şiddet.** "Ne Olur?" formatında anlatı şişmesi olasılığı yüksek, şiddeti orta. Bu, Planck'in "kandırmama" iddiasının kalbine dokunuyor.

**Önlem**
1. **Zincir matematiği.** Her zincirde son halkanın birleşik olasılığı açıkça yazılır: "Zincirin sonuna kadar gitme olasılığı: 100'de 34 ya da daha az."
2. **Karşı hikâye kutusu.** Ters sonucu doğuran en güçlü hikâye bir paragrafta anlatılır (dış görünüm ve ön-otopsinin okura dönük hali).
3. **Anlatı sayıyı oynatamaz.** Sayı yalnız LR tablosundaki kanıtla değişir. Metin yazıldıktan sonra sayı değişmez.
4. Heyecanı sayıda değil mekanizmada aramak. Davranışsal finans, siyaset ve makro bağlam ilginçliğin kaynağı olur; büyük olasılık iddiası olmaz.

**Ölçüm ve bırakma ölçütü.** Story anketiyle (en az 30 yanıt) zinciri okuyan okura son halkanın olasılığı sorulur. İki ölçümde okur tahmini Planck'in yazdığı sayının 15 puandan fazla üstündeyse zincir formatı yeniden tasarlanır. 30 zincir halkası kapandıktan sonra yön hatası çıkarılır: ikinci ve üçüncü halkalara verilen ortalama olasılık gerçekleşme oranını 10 puandan fazla aşıyorsa, bu halkalara sayı verilmez, yalnız mekanizma anlatılır.

---

## İtiraz 5 · Ölçek: 30–50 kapanış ne söyler?

**İtirazın en güçlü hali.** 30 kapanış beceriyi şanstan ayırmaz. Finans sorularında örnekler birbirinden bağımsız da değildir: Brent, Nasdaq, Fed ve resesyon soruları aynı risk rejimine bağlıdır.

**Hesap** (simülasyon, tek yönlü %5 anlamlılık, %80 güç)

| Soru | Gereken kapanış |
|---|---|
| Kalibre bir tahminci %50'den iyi mi? Olasılıklar %15–85 arası (bant kuralı) | **≈108** |
| Aynı soru, olasılıklar %5–95 arası | ≈52 |
| Planck piyasadan iyi mi? Beceri skoru +%3,5 (iyimser senaryo) | ≈2.100 |
| Planck piyasadan iyi mi? Beceri skoru +%1–2 (gerçekçi senaryo) | 7.500–8.500 |
| %70 diliminin gerçekte %55 tuttuğunu tespit etmek | dilim başına ≈62 |
| 30 kapanışta Brier'in ±95% yarı genişliği | ±0,062 (2 kapanışta ±0,24) |

**İki çarpıcı sonuç**
- Kusursuz kalibre bir tahmincinin 30 kapanışlık Brier'i %10 olasılıkla 0,25'in üstüne çıkar, yani yazı-turadan kötü görünür.
- Piyasa fiyatına yalnız gürültü ekleyen, hiçbir becerisi olmayan bir "Planck", 30 kapanışta piyasayı %37 olasılıkla yener. Bu oran 200 kapanışta bile %20'de kalır.

**Korelasyon.** Sorular 10'arlı rejim kümelerinde 0,2 korelasyonla toplanıyorsa, 30 kapanış etkin olarak yaklaşık 11 bağımsız gözleme denk gelir; 200 kapanış yaklaşık 71'e.

**Ulaşılabilir mi?** Bugünkü havuzla hayır (Bulgu 0.1). Haftada 4 adet ≤90 günlük soru açılırsa 30 kapanış ilk kapanışlardan yaklaşık 10 hafta sonra, 108 kapanış 7–8 ayda gelir. Piyasaya karşı beceri kanıtı ise kanalın ömrü boyunca gelmez: 2.100 kapanış haftada 4 soruyla 10 yıldan uzun sürer.

**Olasılık ve şiddet.** Ölçeğin yetersiz kalması kesin, şiddeti yüksek. Bu, Anayasa'nın "30 kapanış" kuralının yetmediğini gösterir.

**Önlem**
- 30 kapanış "felaket mi değil mi" eşiği olarak kalır, ama karne her farkın yanına güven aralığı yazar.
- Asıl hedef 108 kapanışta %50'ye karşı anlamlılıktır. Piyasaya karşı beceri iddiası hiç kurulmaz.
- Analiz planı önceden kayda geçer: hangi test, hangi rakip, kümelere göre (Dosya ya da rejim) sağlam hata.
- Log skor Brier'in yanında raporlanır, çünkü uç olasılıklardaki ıskayı daha iyi yakalar.
- Quant'ta da News'teki %15–85 açılış bandı uygulanır; `fed-artirim` tipi "bedava Brier" soruları yasaklanır.

**Bırakma ölçütü.** Üçüncü ayın sonunda Quant ayda en az 8 kapanış üretemiyorsa olasılık formatı sürdürülemez demektir; kanal İtiraz 7'deki modele geçer.

---

## İtiraz 6 · Operasyon: tek kişi ve AI ajanları

**İtirazın en güçlü hali.** Bir insan ve otomatik turlar, finansın en hızlı ve en hata affetmez anlarında sayı üretiyor. QUANT.md §5 ise en riskli anı, yani piyasa şokunu, "anında FLAŞ kartı" için tetikleyici yapıyor.

**Kanıt.** Snapshot notlarında bayat veri kaydı var (Bulgu 0.6). Kurumun kendi düzeltmesi doğruluğu artırır, güveni düşürür ([Nieman Lab](https://niemanlab.org/2023/03/the-corrections-dilemma-admitting-your-mistakes-increases-accuracy-but-reduces-audience-trust-a-new-study-finds)). SPK sosyal medya hesapları hakkında düzenli olarak suç duyurusu ve erişim engeli kararı alıyor ([örnek](https://www.borsaningundemi.com/haber/spk-4-kisi-ve-5-internet-sitesi-hakkinda-suc-duyurusu-karari-aldi-1904169)).

| Senaryo | Olasılık | Şiddet | Önlem | Bırakma ölçütü |
|---|---|---|---|---|
| **Yanlış veri** (bayat kapanış, yanlış kur) | Yüksek | Orta | Tazelik kapısı: Motor'a giren her değerin tarihi kontrol edilir; bir işlem gününden eski girdiyle sayı yayınlanmaz. Kritik değerler iki kaynakla doğrulanır (EVDS + borsa ya da ajans). Veri tarihi kartta yazar (md. 78). | Bir ayda yayına çıkan iki veri hatası: Quant kapı düzelene kadar durur. |
| **Piyasa çöküşü sırasında yanlış sayı** | Orta | Çok yüksek | FLAŞ kartında sayı yer almaz. Seans içinde yalnız olgu ve "Sayılar kapanıştan sonra güncellenecek" notu çıkar. Güncelleme ertesi sabah, insan onayıyla yapılır. | Kriz anında yayına çıkan tek bir yanlış sayı: FLAŞ formatı kalıcı olarak kalkar. |
| **SPK yazısı** | Düşük | Yüksek | Hazır prosedür: ilgili format 24 saat içinde durur. Gönderi silinmez, Instagram'da arşivlenir. Sicil kaydı korunur ve "yayından kaldırıldı" notu düşer. Avukat görüşü alınır. Yazının varlığı künyede açıklanır. | Aynı soru sınıfı için ikinci yazı: o sınıf kalıcı olarak kapanır. |
| **Okur şikâyeti** ("Sizin yüzünüzden kaybettim") | Orta | Orta | Standart yanıt: Ek/3 metni ve sicil bağlantısı. Kişisel durum yorumlanmaz. Şikâyet ve yanıt `yayin-log.json`'a işlenir. Hata varsa açık düzeltme yapılır. | Aynı türden üç şikâyet: sunum standardı gözden geçirilir. |
| **Hesap ele geçirilmesi ya da sahte Planck hesabı** | Düşük | Yüksek | İki adımlı doğrulama. Künyede "Planck DM'den tavsiye vermez, para istemez" satırı. | Yok: güvenlik koşuldur. |
| **Tek kişi darboğazı** (Yusuf ulaşılamaz) | Yüksek | Orta | Quant yalnız onaylı yayınlanır (Anayasa §8 bunu zaten öngörüyor). Onay yoksa yayın yoktur. Kapalı kalmak, hatalı açık kalmaktan iyidir. | Yok. |

---

## İtiraz 7 · Alternatif: Quant hiç olasılık yayınlamasa

**Bu seçeneğin savunması (ciddi olarak).** Quant yalnız "Ne olur?" zinciri ve veri bağlamı yapsa:

1. **İstatistik.** Kanıtlanması yıllar sürecek, piyasaya karşı ise hiç kanıtlanamayacak bir beceri iddiası ortadan kalkar (İtiraz 1 ve 5).
2. **Hukuk.** Eşik olasılığı olmadan içerik, "genel tavsiye" çizgisinden en uzak noktadadır (İtiraz 2).
3. **Ayırt edicilik.** Türk finans medyası tahminle dolu ve hiçbirinin sicili yok. "Biz tahmin satmıyoruz, mekanizmayı gösteriyoruz" konumu boştur.
4. **Kurucunun isteğine yakınlık.** Yusuf daha önce "önemli habere fiyat yönü olmadan, tümdengelimli 'Ne olur?' etki analizi" istemişti. "Matematik, davranışsal finans, makro ve siyasetle yorumlayan zihin" tarifi, kehanetten çok mekanizma analizine uyar.
5. **Operasyon.** Kriz anında yanlış sayı riski sıfırlanır.

**Savunmanın zayıf yanı.** Puanlanmayan anlatı, İtiraz 4'ün sınırsız halidir. Hesap verme olmadan "Ne olur?" yazan bir kanal, Yusuf'un "dandik ajans" dediği şeye dönüşür, yalnız daha zeki görünür. Ayrıca Planck'in §0 iddiası ("her sayıyı bir soru, bir son tarih ile verir; sonra hesabını verir") Quant'ta düşmüş olur.

**Kırmızı takımın sentezi: üç katmanlı Quant**
1. **Ana ürün:** "Ne Olur?" mekanizma analizi ve veri bağlamı. Zincir matematiği ve karşı hikâye kutusu zorunlu.
2. **"Piyasa Ne Diyor?":** FedWatch, opsiyon, vadeli ve OIS'ten çıkan olasılığın çevirisi. Planck sayısı değildir, kaynak adıyla verilir, beceri iddiası yoktur. Okura en güvenli ve en yeni değeri bu katman verir.
3. **Planck sayısı:** yalnız ≤90 gün içinde kapanan, %15–85 bandında, piyasa fiyatı ya da anket rakibi tanımlı sorularda. Karne bu katmanı puanlar.

**Test.** Dört hafta boyunca Quant gönderilerinin yarısı yalnız zincirle, yarısı zincir ve olasılıkla çıkar. Kaydetme ve gönderim oranı, anlama anketi ve "al/sat işareti" algısı karşılaştırılır. Olasılıklı sürüm kaydetmede üstün değilse ve algı riskini artırıyorsa, 3. katman daralır.

---

## (a) En önemli 5 öneri

1. **Rakip piyasadır.** Piyasa fiyatlı sorularda Motor = piyasa, Claude ayarı en fazla ±5, karnede "kopyacı çizgisi" yer alır. "Piyasayı yeniyoruz" iddiası hiçbir zaman kurulmaz.
2. **TL kuru, gram altın ve BIST eşik soruları pilotta kapalı.** Ek/3 uyarı notu tam metin olarak girer, md. 78'e gönüllü uyum sağlanır (veri tarihi, değişiklik gerekçesi, çıkar beyanı), karne satırı sayıdan önce durur.
3. **Ölçek gerçeği.** Hedef 108 kapanışta %50'ye karşı anlamlılık. Analiz planı önceden kayda geçer, güven aralığı ve küme düzeltmesi raporlanır, Quant'ta da %15–85 bandı uygulanır.
4. **Kriz anında sayı yok.** FLAŞ kartı yalnız olgu verir. Tazelik kapısı ve iki kaynaklı veri doğrulaması zorunlu olur. Quant yalnız insan onayıyla yayınlanır; onay yoksa yayın da yoktur.
5. **Üç katmanlı Quant** (Ne Olur? + Piyasa Ne Diyor? + dar Planck sayısı) ve bunu sınayan dört haftalık A/B testi.

## (b) Diğer uzmanlarla olası çatışmalar

- **Tahmin bilimi uzmanı** Claude ayarının daha geniş olmasını savunabilir. Ben piyasa fiyatlı sorularda ±5'i savunuyorum.
- **Medya ve ürün uzmanı** kur ve altını erişimin motoru olarak görecektir. Ben bunları pilotta kapatıyorum.
- **Anlatı ve içerik tarafı** zincir matematiğini ve karşı hikâye kutusunu "soğutucu" bulabilir.
- **Yöntem ekibi** 30 kapanış kuralını yeterli sayabilir. Ben bunun yalnız bir felaket eşiği olduğunu söylüyorum.

## (c) Karar vericiye sorular

1. Quant'ın birincil ürünü "Ne Olur?" mu olsun, Planck olasılığı mı?
2. TL kuru, gram altın ve BIST eşikleri pilotta kapalı kalsın mı?
3. "Pozisyon tutmuyoruz / bildirmiyoruz" çıkar beyanını teyit eder misin?
4. Kriz anında Quant susmayı kabul ediyor mu (FLAŞ kartında sayı olmaması)?
5. Mevzuat konusunda bir sermaye piyasası avukatına bir kez danışılsın mı (md. 73/3'ün Planck'e uygulanıp uygulanmadığı)?

## (d) 90 günde başarı ölçütleri (kırmızı takım alanı)

| Ölçüt | Hedef |
|---|---|
| Yayına çıkan veri hatası | Ayda 0–1; iki olursa duruş |
| Kriz anında yayınlanan sayı | 0 |
| "Al/sat işareti" algısı (Story, en az 30 yanıt) | %25'in altında |
| Zincir okuyanın son halka tahmini | Planck sayısının en fazla 15 puan üstünde |
| Quant kapanışı | 3. aydan itibaren ayda en az 8 |
| Karne | Her kapanışta güven aralığı; "becerimizi kanıtladık" cümlesi 0 |
| SPK veya hukuki yazı | 0; gelirse 24 saatte uygulanan prosedür |
