# 6 · Finans Medyası, Veri Gazeteciliği ve Arşiv

*Hazırlayan: Finans medyası ve ürün/arşiv masası (Claude) · 17.11.2026 · Okunanlar: BRIEF.md, ANAYASA.md v2, QUANT.md, STRATEJI.md, ekip/KARAR.md, ekip/4-medya-urun.md, ekip/PILOT.md, data/quant.json, data/quant/tcmb-tahmin-hata.json, posts/2026-11-16-quant-haftalik.* `4-medya-urun.md`'de anlatılanları (538, OWID, Vox, Instagram sinyalleri) tekrar etmiyorum. Bu rapor finansa özgü olanı ele alıyor.

**Teşhis.** Finans medyasında arşiv değeri tahminin kendisinden gelmiyor. Değeri üç şey üretiyor:

- **Mekanizmayı anlatmak:** "bu nasıl çalışır?"
- **Kendi defterini tutmak:** "kim ne demişti, ne oldu?"
- **Kalıcı bir adreste durmak:** atıf yapılabilir, sürümü belli bir sayfa.

Quant'ın bugünkü çıktısı (haftalık 8 eşik sorusu ve Δ) bunların hiçbirini tam yapmıyor. 16 Kasım raporunun açılış satırı da sorunu gösteriyor: "Fed 12 ayda faiz artırır mı? %81 → %97". Piyasanın tamamen fiyatladığı bir soru okura yeni bilgi vermez. Anayasa §2'ye göre bu soru sessiz izlemede olmalıydı. Sorun sıkıcılık değil, **bilgisizlik**.

---

## 1. Arşiv değeri taşıyan finans yayınları: her birinden çalınacak tek fikir

| Yayın | Neyi farklı yapıyor | Çalınacak tek fikir |
|---|---|---|
| **Matt Levine, Money Stuff** (Bloomberg) | Günlük, "beş kadar" konu. Hayalî diyaloglarla bir finansal düzenlemenin **nasıl işlediğini** anlatıyor. Aynı temalara (kripto, SVB, özel kredi) yıllarca dönerek birikimli bir bilgi kuruyor. Yaklaşık 500 bin okuru var ([Harvard Magazine 2025](https://www.harvardmagazine.com/2025/07/harvard-bloomberg-column-matt-levine)). | **Mekanizma diyaloğu.** Sayı "ne" sorusunu cevaplar, diyalog "nasıl" sorusunu. Okurun kaydettiği şey ikincisidir. |
| **FT Alphaville** | 2006'da ücretsiz, gayriresmî bir "FT'nin alter egosu" olarak doğdu. Okur yanlışı düzeltiyor, büyüme ağızdan ağıza oluyor. Podcast ve etkinliklerle bir topluluğa dönüştü ([journalism.co.uk](https://www.journalism.co.uk/a-look-at-the-financial-times-alphaville-blog-a-decade-after-its-launch/)). | **Kurumsal ciddiyet, gayriresmî ses.** Kuralları sert, cümleleri insan. |
| **Martin Wolf** (FT) | Haftalık uzun köşe; her yazı veriyle kurulan tek bir tez taşıyor. Etkisi on yıllarca aynı çerçeveyle (küresel dengesizlikler, borç) yazmasından geliyor ([RealClearMarkets](https://www.realclearmarkets.com/2009/09/16/ft039s_martin_wolf_has_the_financial_world039s_ear_93374.html)). | **Tek tez, tek grafik, haftada bir.** Hacim değil süreklilik. |
| **Bloomberg Odd Lots** | Ekonominin "tesisatını" anlatıyor: tedarik zinciri, repo piyasası, sigorta. Sahadaki uygulayıcılarla konuşuyor ([örnek bölüm](https://www.bloomberg.com/news/articles/2021-07-29/the-bathtub-episode-how-the-pandemic-disrupted-plumbing)). | **Tesisat konusu.** Haber olmayan haftada da yazılabilen, yıllarca okunan içerik. |
| **The Economist veri ekibi** | Seçim ve aşırı ölüm modellerinin **kodunu ve verisini** GitHub'da açtı ([GitHub](https://github.com/TheEconomist/covid-19-the-economist-global-excess-deaths-model)). Sarah Leo'nun "Mistakes, we've drawn a few" yazısında kendi kötü grafiklerini yayınlayıp yeniden çizdi ([Leo](https://dotat.at/:/C33FG)). | **Hatalı grafiği yeniden çizip yayınlamak.** "Yanıldık" kültürünün görsel hali. |
| **Our World in Data** | Her grafiğin artık **zaman damgalı, donmuş bir arşiv sürümü** var. Atıf yönergesi bu sürümü gösteriyor ki alıntılanan sayı sonradan değişmesin ([OWID](https://ourworldindata.org/new-feature-embed-archived-charts)). | **Sürümlü kalıcı adres.** Arşiv değerinin teknik tanımı bu. |
| **Silver Bulletin** | Modeli tek bir sonuçla değil kalibrasyon, ayırt etme gücü (Brier), kanıta orantılı tepki ve şans/beceri ayrımıyla değerlendirmeyi öğretiyor ([Silver, 3.11.2026](https://www.natesilver.net/p/how-to-judge-an-election-model)). | **"Bizi nasıl yargılamalısınız" sayfası.** Okura karneyi okumayı öğretmek. |
| **Noahpinion** | Ücretsiz listeyi ücretliden önemli sayıyor, çünkü yayılmayı ücretsiz okur taşıyor. Yazıların yaklaşık %40'ı ücretli, her yazının başında görsel var ([Smith](https://www.noahpinion.blog/p/how-to-write-a-successful-substack)). | **Önce ücretsiz e-posta listesi.** |
| **Adam Tooze, Chartbook** | Grafik koleksiyonu olarak başladı; deneme, tarih ve grafik bir arada. "Yüz binlerce" abonesi var ve okuması ücretsiz ([Chartbook](https://adamtooze.substack.com/about)). | **Grafik + tarih bağlamı.** Bugünkü sayıyı 30 yıllık seri içine koymak. |
| **Kalshi / Polymarket bültenleri** | Tahmin piyasaları ayrı bir habercilik alanına dönüştü. Bağımsız bülten Event Horizon sektörü eleştirerek yazıyor. Wired muhabiri piyasa–medya ortaklıklarını editoryal bağımsızlık tehdidi sayıyor; ProPublica çalışanlarına bu piyasalarda işlem yapmayı yasakladı ([Nieman Lab, Nis. 2026](https://niemanlab.org/2026/04/prediction-markets-are-breaking-the-news-and-becoming-their-own-beat)). | **Piyasa fiyatını haber gibi değil, girdi gibi raporlamak** ve bir **çıkar çatışması beyanı** yazmak. |
| **Türkiye** | Mahfi Eğilmez'in blogu yıllardır aynı adreste mekanizma anlatıyor ve yazıları ana akım medyada tekrar yayınlanıyor ([Medyascope örneği](https://medyascope.tv/2024/12/04/guncel-ekonomik-sorunlar-hakkinda-sorular-mahfi-egilmez-yazdi/)). Ana akımdan YouTube'a geçen gazeteciler daha geniş kitleye ulaşıyor ama algoritma ve öz-sansür baskısı altında çalışıyor ([Ertuna ve Aşık 2025](https://ijoc.org/index.php/ijoc/article/view/25116)). Bloomberg HT ve Ekonomim veri takvimi ve anlık akış veriyor. Planck'in açtığı TCMB tahmin hatası veri setinde bile çapraz kontrol için Bloomberg HT tablosu kullanıldı. | **Tek adreste birikmiş anlatım (Eğilmez)** + **takvim (BloombergHT)**. Türkiye'de ikisini olasılık defteriyle birleştiren bir yayın bulamadım. Bu bir boşluk; ama arama sınırlı kaldı, kesin "yok" diyemem. |

**Ortak payda.** Fortune'da Ekim 2026'da yayınlanan bir karne, 15 kurumun on yılda yaptığı 135 tahmini açık bir ölçütle ve iki bağımsız puanlayıcıyla puanladı. Sonuçlar:

- Tahminlerin yalnız %16'sı piyasayı gerçekten oynatan olayı adlandırmış.
- Yalnız 3'ü olayın portföye nasıl geçeceğini açıklamış.
- Yazarın teşhisi şu: yıllık görünümler olasılık ve son tarih içermeyen "tema"lardan ibaret ([Fortune, 30.10.2026](https://fortune.com/2026/10/30/wall-street-forecasts-scorecard-being-wrong/)).

Quant'ın konumu tam bu boşluk. Değeri piyasayı yenmek değil; **temaları tarihli soruya çevirmek, mekanizmayı anlatmak ve defter tutmak.**

---

## 2. Sayıdan yazıya: yedi format

Sınırlar: SPK çizgisi (yön, al-sat, hedef fiyat yok), Anayasa §2.1 sunum standardı, QUANT §2b. Takvimli makro veri soruları artık News'te. Quant'ın elinde varlık fiyatı eşikleri, piyasa fiyatlaması ve "Ne Olur?" var. Bu formatlar bunlarla çalışıyor.

| # | Format | Sıklık · platform | Örnek başlık | Ölçü |
|---|---|---|---|---|
| 1 | **Piyasa Ne Fiyatlıyor?** (hızlı) | Olay olunca; X'te metin + tek grafik, Story | "Altın 31 Mart'a Kadar 4.500 Doları Aşar Mı? Opsiyonlar 100'de 22 Diyor; Geçen Hafta 31'di" | X yer işareti/gösterim; alıntılanma; Story yanıtı |
| 2 | **Ne Olur? Karar Ağacı** (olay) | Olayda en fazla 1; carousel + web sayfası | "Brent 110 Doları Görürse: Üç Halka, Altı Soru" | Kaydetme/erişim; web'de 30 gün sonraki ziyaret |
| 3 | **Tesisat** (evergreen) | Haftada 1; carousel + web + bülten | "Faiz Kararı Kura Hangi Borudan Geçer?" | Kaydetme/erişim; web'de arama trafiği; 90 günlük okunma |
| 4 | **Beklenti Defteri** (arşiv) | Ayda 1; web + bülten, özet carousel | "TCMB'nin Yıl Sonu Enflasyon Tahmini 14 Yılda Ne Kadar Saptı?" | Dış atıf; web geri dönüş; gönderim/erişim |
| 5 | **Türkiye Ekonomi Haritası** (arşiv) | Ayda 1, ayın ikinci haftası; web (sürümlü), bülten, carousel | "Kasım 2026 Haritası: 12 Gösterge, 3 Açık Soru, 1 Değişen Şey" | Aylık geri dönen okur; arşiv sayfası ziyareti |
| 6 | **Neden Yanıldık + Çeyrek Karnesi** | Iskada ve çeyrek sonunda; carousel + web + bülten | "Altına %61 Dedik, Olmadı: Hata Motor'da Mı, Bizde Mi?" | Gönderim/erişim; karne sayfası tıklaması |
| 7 | **2027'nin Soruları: Kurumların Görünümleri Sorulara Çevrildi** (yıllık) | Ocak'ın ilk haftası, 31 Aralık'ta puanlama; web + bülten + Reel | "Bankalar 2027 İçin 'Dolar Güçlenir' Dedi. Tarihli Soruya Çevirdik: Altı Soru" | Yıl boyu geri dönüş; dış atıf; Aralık'ta puanlama içeriğinin erişimi |

**Notlar:**

- **(1) Bağlamlı bot.** "Piyasa Ne Fiyatlıyor?", X'teki ham veri botlarının bağlamlı hali. Her gönderi aynı beş parçayı taşır: sicildeki soru kimliği, piyasa olasılığı (Motor), 7 günlük değişim, değişimin tek cümlelik nedeni (iki kaynak) ve "100'de X". Gönderi, Motor'a göre Δlogit eşiği aşılırsa otomatik taslak olarak hazırlanır; Yusuf onaylar (Anayasa §7). Bağlamı olmayan sayı çıkmaz (ilke 1). Fiyat yerine eşik geçme olasılığı verildiği için yön söylenmez.
- **(2) Karar ağacı.** Ağacın her dalı ayrı bir evet/hayır sorusudur ("Brent 110'u görürse, TCMB Mart'ta indirim yapar mı?"). Böylece KARAR'da ertelenen "toplamı %100 senaryo" yükü doğmaz; koşullu sorular sicile ayrı ayrı girer. Mevcut `quant/zincir.js` bunun temelini zaten taşıyor.
- **(3) Tesisat.** Levine ve Odd Lots'tan alınan format. Tek mekanizma, bir diyalog ("Bir ihracatçı ile bankacı konuşuyor…"), tek grafik ve sonunda o mekanizmaya bağlı açık bir Quant sorusu. Olay gerektirmediği için "sessiz gün" ilkesini çiğnemez. Türk okurun gündelik sorularına yaslanır: kur, altın, mevduat, kredi kartı faizi. TCMB Hanehalkı Beklenti Anketi'nde (Mayıs 2026) "elinizde para olsa" sorusuna verilen cevaplar: altın %48,3, gayrimenkul %33,2, döviz %2,2 ([CNBC-e](https://www.cnbce.com/veriler/vatandasin-dolar-beklentisi-yukseldi-guvenli-limanda-ilk-tercih-yine-altin-oldu-h30476)). Tesisat'ın ilk konuları altından seçilmeli.
- **(4) Beklenti Defteri.** Arşiv varlığımız zaten var: `data/quant/tcmb-tahmin-hata.json` (2012–2026 TCMB yıl sonu enflasyon tahmini ve gerçekleşen). Bu, Fortune karnesinin Türkiye karşılığı ve aynı zamanda Motor için taban oranı. Kural: övgü-yergi yok (QUANT §6). Yalnız hata dağılımı verilir: "14 yılda ortalama sapma X puan; 10 yılın Y'sinde gerçekleşen tahminin üstünde kaldı." Resmî istatistik sorgulanmaz, yalnız tahminle karşılaştırılır (Anayasa §9). Piyasa Katılımcıları Anketi medyanı da her ay aynı deftere girer.
- **(5) Türkiye Ekonomi Haritası.** Her ay aynı 12 gösterge aynı yerde durur: TÜFE, politika faizi, reel faiz, USD/TRY, sepet, gram altın, BIST, CDS, rezerv, cari denge, işsizlik, anket beklentisi. Kaynak EVDS ve TÜİK. Haritanın tek yorumu "bu ay en çok ne değişti"dir ve buna bağlı açık sorular eklenir. OWID gibi her ayın sürümü donmuş URL'de kalır: `planck.news/quant/harita/2026-11`. Değeri 12. sayıda başlar. Bu yüzden ilk sayıdan itibaren arşiv düzeni kurulmalı.
- **(6) Neden Yanıldık.** Finansa özgü ayrıştırma: hata (a) Motor'da mı (piyasa da yanıldı), (b) Claude ayarında mı (piyasadan uzaklaştık ve kaybettik), (c) kriterde mi? Economist'in "yeniden çizdik" yaklaşımıyla, eski kart ve yeni kart yan yana konur.
- **(7) 2027'nin Soruları.** Kurumların yıllık görünümleri soruya çevrilir: tema → tarihli eşik sorusu. Kurum adı yalnız kaynak olarak geçer; puanlanan, **bizim çevirimiz ve bizim sayımızdır**, kurum değil. News'in "2027'nin 27 Sorusu" ile birleştirilebilir (bkz. b).

---

## 3. Platform: her birinin rolü

| Platform | Rol | Gerekçe |
|---|---|---|
| **Instagram @planck.quant** | Keşif ve güven ritüeli: Tesisat, karar ağacı, Dedik/Oldu, Neden Yanıldık | Türkiye'de haber kaynağı olarak Instagram %48, YouTube %38, X %16 (bir yılda −7 puan) ([DNR 2026, bianet özeti](https://bianet.org/haber/habere-guven-10-yilin-en-dusuk-seviyesinde-kitleler-haber-sitelerinden-platformlara-kayiyor-320672)). Kitle burada. |
| **X** | Hız ve profesyonel kitle: "Piyasa Ne Fiyatlıyor?" ve harita bağlantıları | Kullanıcı az ama ekonomist, gazeteci ve yatırımcı orada; alıntı ve atıf X'te üretiliyor. Metin olduğu için üretim maliyeti düşük. Riski düşen erişim; bu yüzden ana yatırım burası olmamalı. |
| **Bülten (haftalık e-posta)** | Sahip olunan ilişki: haftanın soruları, kapananlar, bir Tesisat, harita bağlantısı | FT'de kayıtlı okur, anonim okura göre 3–40 kat daha sık aboneye dönüşüyor. FT kayıt sırasında yalnız e-posta istiyor ([FT Strategies](https://www.ftstrategies.com/en-gb/insights/how-the-financial-times-registration-strategy-transformed-anonymous-reach-into-recurring-revenue)). Smith de ücretsiz listeyi öncelikli görüyor. Algoritma değişince kaybolmayan tek kanal bu. |
| **Web arşivi (planck.news/quant)** | Kalıcı adres: sicil, karne, harita sürümleri, Tesisat kütüphanesi, Beklenti Defteri, yöntem | Arşiv değerinin teknik ön koşulu bu. |

**"Medya arşivinde değer" için web ve bülten neden şart?**

1. **Atıf yapılabilirlik.** Bir gazeteci ya da akademisyen bir Instagram carousel'inin 4. sayfasına güvenilir biçimde atıf yapamaz. Arşiv, başkalarının bize atıf yapabildiği yerdir. OWID'in donmuş sürümleri tam bu sorunu çözüyor.
2. **Sicilin kanıtı.** Anayasa §1/5 "kayıt geri alınmaz" diyor. KARAR §1.2/5 ise git geçmişinin halka açık değilse denetlenemeyeceğini tespit etti. Finans okuru "sonradan düzelttiniz" şüphesine en duyarlı okurdur. Tarihli, sürümlü bir web sayfası bu şüpheye verilen cevaptır.
3. **Aranabilirlik.** "TCMB tahmini kaç kez tuttu" gibi soruları arayan kişi Instagram'a değil web'e gelir. Tesisat ve Beklenti Defteri arama trafiği üretir.
4. **Platform riski.** Türkiye'de erişim engelleri ve algoritma değişiklikleri gerçek bir risk. Gazeteci YouTuber'lar üzerine yapılan çalışma, platform kurallarının içeriği nasıl biçimlendirdiğini gösteriyor (Ertuna ve Aşık 2025). E-posta listesi taşınabilir.

---

## 4. Sıkıcı olmamak: görselleştirme ve anlatım ilkeleri

"Sıkıcı hoca"yı yaratan şey grafik değil, **grafiğin soru taşımaması**. İlkeler:

1. **Başlık grafiğin cümlesidir.** "USD/TRY Grafiği" değil, "Kur Bir Yılda Anketin Beklediğinden Yavaş Arttı". Economist'in kendi hata listesinin üçüncü sınıfı tam bu: "noktasını gizleyen grafik", yani fazla kategori ve fazla veri ([Leo](https://dotat.at/:/C33FG)).
2. **Tek fikir, tek grafik, tek soru.** Her grafiğin altında sicil kimliği olan bir soru durur. Soruya bağlanmayan grafik Harita'ya gider, akışa çıkmaz.
3. **Üç sayı, bir gerilim.** Finansın dramı ayrışmadadır: "Piyasa %22 · Ekonomistler (anket) şunu bekliyor · Planck %28. Fark neden?" Bu, Motor ile Claude'un ayrı yazılması kuralının (ilke 3) anlatıya dönüşmüş hali. Merak kuran şey sayı değil fark.
4. **"100'de X" finansta iki biçimde.**
   - **Olay olasılığı için** sabit 10×10 kare dizisi (Anayasa §2.1).
   - **Dağılım için** (eşik merdiveni: altın 3.500 / 4.000 / 4.500 dolar) **nicelik nokta grafiği**: 20 nokta, her biri "100 senaryonun 5'i". Bu grafik ve CDF, karar kalitesinde metinle verilen belirsizlikten belirgin biçimde daha iyi sonuç verdi ([Fernandes ve ark., CHI 2018](https://idl.uw.edu/papers/uncertainty-bus)).
   - Kaynak hep **piyasa fiyatlaması** olarak yazılır; nokta bizim fiyat tahminimiz değildir.
5. **Yelpaze grafiği karneyi korur.** İngiltere Merkez Bankası'nın Temmuz 2026 çalışmasına göre yelpaze grafikleri beklenti ile belirsizliği birlikte en iyi aktaran biçim. Daha önemlisi, tahmin hatası sonrası güven kaybını belirgin biçimde azaltıyor ve yazarlar bunu itibar için "sigorta" olarak niteliyor. Halk belirsizliği sistematik olarak küçümsüyor ([BoE SWP 1.196](https://www.bankofengland.co.uk/working-paper/2026/anchors-aweigh-the-effect-of-communicating-forecast-uncertainty)). Quant'ın ilk ıskaları kaçınılmaz olduğuna göre bu en güçlü bulgu: belirsizliği baştan gösteren yayın, ıskada daha az güven kaybeder.
6. **Reel göster, nominal değil.** Enflasyonun %30 olduğu bir ülkede nominal grafik yanıltır. Faiz, kur ve endeks grafiklerinde reel seri ya da "enflasyondan arındırılmış" ikinci çizgi varsayılandır.
7. **Diyalog ve insan karşılığı.** Tesisat'ta mekanizma iki kişinin konuşmasıyla anlatılır (Levine). Her karar ağacı bir meslek ya da durumla biter: ihracatçı, kirada oturan, altın biriktiren. Bu bir gönderme cümlesidir (STRATEJI §4.2), ama **eylem önerisi değil, izlenecek göstergedir.** SPK çizgisi gereği "altın alın" yazılmaz; "altın biriktiren için izlenecek gösterge: ons altın ve Fed kararı, 10 Aralık" yazılır.
8. **Renk.** Yeşil-kırmızı yok (QUANT §7). Piyasa, anket ve Planck üç sabit tonla gösterilir; her kartta aynı sırayla.

---

## 5. Güven ve marka

**Karne finans okuruna nasıl gösterilir?** Finans okurunun ilk sorusu "piyasayı yeniyor musunuz?" olur. Dürüst cevap: muhtemelen hayır, çünkü likit piyasa fiyatı güçlü bir rakip. Karne bu yüzden dört rakibe karşı ayrı satır gösterir: %50, Motor/piyasa, **anket konsensüsü** ve Planck. Anket satırı finansa özgü ve kritik. Kurumların yıl sonu tahminlerini yenmek, piyasayı yenmekten daha gerçekçi bir hedef ve okur için daha anlamlı bir karşılaştırma.

Karne sayfasının başına Silver'ın "bizi nasıl yargılamalısınız" mantığıyla kısa bir kutu konur: "Tek ıska bir şey kanıtlamaz; %70 dediklerimizin 100'de 70'i olmalı. Bunu 30 kapanıştan sonra ölçebiliriz."

**"Yanıldık" kültürü neden finansta daha değerli?** Finansal sosyal medya tersine seçilmiş bir ortam. StockTwits'te 29 bin finfluencer üzerinde yapılan çalışmada:

- Finfluencer'ların %28'i becerili, %56'sı "ters becerili" çıktı.
- Daha az takipçisi olanlar daha becerili çıktı ([Kakhbod ve ark., Sherwood özeti](https://sherwood.news/markets/your-favorite-social-media-guru-is-probably-a-bad-stock-picker-study-shows/)).

SPK da "Finfluencer mi Fraudencer mi?" projesi yürütüyor ve sosyal medya kaynaklı dolandırıcılığı büyük risk sayıyor ([SPK, 12.3.2026](https://spk.gov.tr/duyurular/baskanin-konusmalari/2026/paradan-degere-finansal-okuryazarligin-donusturucu-gucu-etkinligi)). Bu ortamda açık karne bir pazarlama malzemesi değil, kategori ayrımıdır. Quant'ın mevcut Brier'i 0,51 (n = 2) ve olduğu gibi gösterilir: "2 kapanış; hüküm için erken."

**AI künyesinin finansta algısı.** İki yöne çeken veri var:

- FCA'nın Ağustos 2026 araştırmasında 18–40 yaş yatırımcıların %56'sı yapay zekâ araçlarına güveniyor. Basına güvenenler %46, influencer'lara güvenenler %29. Ama aynı kitlenin %44'ü yapay zekâ çıktısının düzenlemeye tabi olduğunu yanlışlıkla sanıyor ([Professional Adviser](https://www.professionaladviser.com/news/4534867/investors-trust-ai-tv-social-media)).
- Haberde ise yapay zekâ beyanı güveni düşürüyor: %42'si "daha az güvenirim", %30'u "daha çok güvenirim" diyor. Ayrıntılı beyan (nasıl kullanıldı, insan denetimi, neden) bu düşüşü azaltıyor ([Trusting News](https://trustingnews.org/new-research-how-ai-disclosures-in-news-help-and-also-hurt-trust-with-audiences/)).

Çıkarım: finansta asıl risk güvensizlik değil, **aşırı güven**. Künye bu yüzden "yapay zekâ yaptı" demekle yetinmemeli; neyin olmadığını da söylemeli. Öneri (Quant'a özgü ek satırlar):

> **Hesap:** Motor (kurallı; yöntem açık) · **Ayar:** Claude (Anthropic'in yapay zekâ modeli) · **İnsan:** Yayın öncesi onaydan geçti.
> **Bu bir yatırım danışmanlığı değildir; SPK lisanslı bir hizmet değildir.** · **Çıkar beyanı:** Planck bu içerikteki varlıklar ve sorular üzerinde işlem ya da bahis yapmaz.

Çıkar beyanı finans gazeteciliğinin yerleşik normudur. ProPublica'nın tahmin piyasası yasağı bunun güncel örneği. Ama cümle yalnız Yusuf doğrularsa yazılabilir (bkz. c).

---

## 6. 90 günlük büyüme ve ölçüm

Quant yayını durmuş durumda. 90 gün yeniden açılış gününden sayılır (STRATEJI H6: 14–20 Aralık). Arşiv değeri dört katmanda ölçülür; takipçi ikincildir.

| Katman | Metrik | Neden "arşiv" ölçer |
|---|---|---|
| **Geri dönüş** | Web Quant sayfalarında 30 gün içinde ≥2 kez gelen ziyaretçi payı; ≥30 günlük içeriğin trafik payı ("uzun kuyruk payı") | Eski içerik okunmaya devam ediyorsa arşivdir. FT'nin RFV skoru (yenilik × sıklık × hacim) abonelik iptalini öngörüyor ([IntoTheMinds](https://www.intotheminds.com/blog/en/the-financial-times-found-the-most-perfect-kpis-to-measure-success/)). Biz bunun sadeleştirilmiş halini kullanırız. |
| **İlişki** | Bülten abonesi; 4 haftalık tutma (4 sayının ≥2'sini açan pay); yanıt e-postası | Sahip olunan kitle |
| **Atıf** | Dış bağlantı sayısı; X'te alıntılanma; başka yayınlarda "Planck'e göre" anılması (elle kayıt) | Medya arşivinde değer = başkasının bize dayanması |
| **Kaydetme** | IG kaydetme/erişim (Tesisat, Harita); X yer işareti/gösterim | Okurun "sonra döneceğim" demesi |
| **Hesap** | Kapanan Quant sorusu; Motor ve anket konsensüsüne göre beceri (n ile birlikte); Neden Yanıldık sayısı/ıska sayısı = 1; SPK dil ihlali = 0 | Arşivin içeriği güvenilir mi |

Instagram metrikleri için STRATEJI §6 eşikleri geçerli. Arşive özgü hedefleri ilk dört haftanın verisiyle yeniden yazmak gerekiyor. Aşağıdakiler yargıya dayalı başlangıç noktaları: web'de uzun kuyruk payı 90. günde ≥%30, bülten 4 haftalık tutma ≥%50, harita 3 sayı, Tesisat 10 sayı, en az 5 dış atıf.

---

## (a) En önemli 5 önerim

1. **Önce web arşivi, sonra yayın.** Quant'ı yeniden açmadan önce `planck.news/quant` şu sayfalarla hazır olmalı: sicil, karne, sürümlü harita ve Tesisat kütüphanesi. Arşivsiz finans içeriği Instagram akışında kaybolur ve sicilin değiştirilmediği kanıtlanamaz.
2. **Haftalık 8 eşik raporunu bırakın, yerine Tesisat + Piyasa Ne Fiyatlıyor? koyun.** %90 üstüne çıkmış ya da piyasanın tamamen fiyatladığı sorular sessiz izlemeye gider. Akışa yalnız piyasa, anket ve Planck'in **ayrıştığı** sorular çıkar.
3. **Beklenti Defteri'ni ilk arşiv varlığı yapın.** TCMB tahmin hatası veri seti hazır. Bu set hem Motor için taban oranı hem de Türkiye'de eşi olmayan, atıf alabilecek bir referans.
4. **Haftalık e-posta bülteni Hafta 11'i beklemesin; Quant'la birlikte açılsın.** Yalnız e-posta adresi istenir. İçerik: haftanın soruları, kapananlar, bir Tesisat, harita bağlantısı.
5. **Belirsizliği baştan gösterin, künyeyi finansa göre genişletin.** Dağılım için nicelik nokta grafiği ya da yelpaze, olay için 10×10 kare dizisi. Künyeye "SPK lisanslı danışmanlık değildir" ve (teyitle) çıkar beyanı eklenir.

## (b) Diğer uzmanlarla çatışabilecek noktalar

- **Ufuk karması:** Format 7 (yıllık sorular) ve Harita'nın uzun soruları, Anayasa'nın "%80'i ≤90 gün" kuralına baskı yapar. Önerim, kuyruk payı gibi ayrı bir "yıllık" satırı açıp ana karnenin dışında tutmak. Tahmin bilimi masası buna itiraz edebilir.
- **Dağılım grafiği ile SPK:** Eşik merdiveni, fiyat aralığı tahmini gibi okunabilir. Hukuk/uyum masası "hedef fiyat" algısı nedeniyle reddedebilir. Benim önerim yalnız piyasa fiyatlamasından türetmek ve Claude ayarı eklememek.
- **Bülten zamanlaması:** STRATEJI bülteni Hafta 11'e koyuyor; ben öne çekiyorum. Ayrıca tek Planck bülteni mi, ayrı Quant bülteni mi? Ürün yükü açısından tek bülten ve Quant bölümü daha ucuz.
- **X otomasyonu ile üç geçiş kuralı:** Hızlı format tek geçişle çıkar; ana akış değil, Story düzeyi sayılması gerekir. Tahmin masası bunu gevşeklik olarak görebilir.
- **Anket konsensüsünü rakip yapmak:** Kurumların tahminlerini puanlamak, "kurum hakkında yorum yok" kuralıyla gerilim yaratabilir. Puanlanan kurum değil, bizim çevirimiz ve sayımızdır. Hata dağılımı istatistiği nötr dille verilir.
- **4-medya-urun.md:** News raporu Instagram'ı merkeze koyuyor. Quant için ben web ve bülteni merkeze koyuyorum; Instagram kanal değil vitrin.

## (c) Karar vericiye sorular

1. Quant yeniden açılmadan önce web arşivinin (sicil, karne, harita) hazır olması **ön koşul** mu?
2. Haftalık e-posta bülteni Quant'la birlikte açılsın mı? Tek Planck bülteni mi, ayrı Quant bülteni mi?
3. **Çıkar beyanı:** Sen ya da Planck, Quant sorularındaki varlıklarda (altın, döviz, endeks) pozisyon taşıyor ya da tahmin piyasasında işlem yapıyor musun? Künyeye "işlem yapmaz" yazabilmemiz için kalıcı bir kural ister misin?
4. X hesabı (@planckquant) Quant'la birlikte mi açılsın, yoksa STRATEJI'deki Hafta 10'u mu beklesin? Otomatik taslak + onay modeli kabul mü?
5. Dağılım grafiği (eşik merdiveni) SPK açısından kabul edilebilir mi, yoksa yalnız tekil eşik soruları mı kalsın?
6. Beklenti Defteri'nde kurum adları (TCMB, bankalar) geçsin mi, yoksa yalnız "anket medyanı" gibi toplu düzeyde mi kalınsın?

## (d) Quant'ın başarısını 90 günde nasıl ölçeriz (benim alanım)

Kuzey yıldızı: **arşiv geri dönüşü.** Web'de 30 gün içinde ikinci kez gelen ziyaretçi sayısı ile bülten 4 haftalık tutmanın birlikte izlenmesi. Bunlar yükseliyorsa içerik "arşiv", düşüyorsa "akış" oluyor demektir.

Destek ölçüleri:

- Uzun kuyruk payı (≥30 günlük içeriğin trafiği)
- Dış atıf sayısı
- Tesisat ve Harita'nın kaydetme/erişim oranı
- Neden Yanıldık'ın hesap medyanına göre gönderim oranı

Kalite kapısı (pazarlıksız):

- SPK dil ihlali 0
- Her ıskaya 1 otopsi
- Karnede n ve şans payı cümlesi

90. günde "başarı" şu dört koşulun birlikte sağlanması:

- 3 harita
- 10 Tesisat
- 1 Beklenti Defteri dosyası yayında
- Uzun kuyruk payı %30'a yaklaşmış

Takipçi sayısı rapora girer ama hüküm vermez.
