# Planck T+ motor eğitimi — 8 Kasım 2026

Amaç: `sports/motor.py`'deki elle verilmiş parametreleri (ev avantajı, Dixon-Coles düzeltmesi, büzülme) geçmiş maç sonuçlarından ölçmek; işe yarayan yeni parçaları (zaman ağırlığı, önceki sezon) motora eklemek; yeni ayarları eski ayarlarla aynı maçlarda yarıştırıp daha iyi olmayanı almamak.

Kod: veri ayrıştırıcı `sports/data_loader.py`, eğitim `sports/egitim.py`, sonuç `sports/params.json`, ham rapor `sports/egitim_rapor.json`. Bahis verisi ya da bahis oranı kullanılmadı.

## 1. Veri

Kaynak: openfootball (github.com/openfootball; açık lisans, Football.TXT biçimi). Depolar: `europe` (turkey/ Süper Lig, france/ Ligue 1), `england`, `deutschland`, `espana`, `italy`. Hükmen ("awarded") maçlar ve oynanmamış maçlar atıldı. Takım adlarının sezondan sezona değişen yazımları (sponsor adı, imla) tek ada indirildi.

| Lig | Toplam maç | Eğitim sezonları | Eğitim maç | Test sezonları | Test maç | Kullanılmayan |
|---|---|---|---|---|---|---|
| Süper Lig | 1 884 | 2018-19, 2019-20, 2020-21 | 1 032 | 2023-24, 2024-25 | 717 | 2025-26 (sadece 99 maç kayıtlı, eksik), 2026-27 (36 maç, devam ediyor) |
| Ligue 1 | 4 280 | 2016-17 … 2023-24 (8 sezon) | 2 864 | 2024-25, 2025-26 | 611 | 2026-27 (devam ediyor) |
| Premier League | 9 930 | 2016-17 … 2023-24 | 3 040 | 2024-25, 2025-26 | 760 | 2026-27 |
| Bundesliga | 4 931 | 2016-17 … 2023-24 | 2 448 | 2024-25, 2025-26 | 611 | 2026-27 |
| La Liga | 5 389 | 2016-17 … 2023-24 | 3 040 | 2024-25, 2025-26 | 760 | 2026-27 |
| Serie A | 4 988 | 2016-17 … 2023-24 | 3 038 | 2024-25, 2025-26 | 760 | 2026-27 |
| **Toplam eğitim** | | | **15 462** | | **4 219** | |

Süper Lig notu: openfootball'da 2021-22 ve 2022-23 sezonları yok, 2025-26 eksik. Bu yüzden Süper Lig'in eğitim verisi sadece 3 sezon (1 032 maç) ve bunun biri (2020-21) ile 2019-20'nin ikinci yarısı seyircisiz oynandı; o dönemde ev avantajı her ligde belirgin düştü. Süper Lig'e özel ölçümler bu yüzden diğer liglerden daha gürültülü.

Büyük 5 lig için son 10 sezon alındı (8 eğitim + 2 test). Test sezonları hiçbir ölçüme girmedi; parametreler yalnız eğitim sezonlarından ölçüldü.

## 2. Yöntem (gündelik dille)

- **Ev avantajı (HOME):** Ev sahibinin attığı ortalama gol / deplasmanın attığı ortalama gol oranının karekökü. Motor ev beklentisini HOME ile çarpıp deplasman beklentisini HOME'a böldüğü için oran HOME² olur; 1.15 "ev takımı %15 daha fazla gol bekler, deplasman %13 daha az" demektir.
- **Dixon-Coles RHO:** Bağımsız Poisson düşük skorlu beraberlikleri (0-0, 1-1) azımsar, 1-0 / 0-1'i fazla sayar. RHO bu dört skoru düzelten tek sayıdır. Eğitim maçlarında gerçekleşen skorların olasılığını en yüksek yapan RHO seçildi (−0.30 … +0.10 arası 0.01 adımla tarandı).
- **Büzülme K:** Takımın tablosuna K maçlık "lig ortalaması" eklenir; sezon başında az maçla aşırı güveni önler. 1–20 arası değerler denendi; ölçüt, sezonu hafta hafta yürütüp (2. haftadan itibaren, her maçı yalnız o güne kadar oynanmış maçlarla tahmin ederek) ortalama Brier. Ayrıca istenen "ilk 10 haftanın tablosuyla kalan haftaları tahmin et" varyantı da hesaplandı (K_10hafta).
- **Zaman ağırlığı XI:** Her maça `exp(−XI × gün)` ağırlığı; XI=0.001 "yaklaşık 2 yıl yarı ömür" (1 yıl önceki maç 0.69 ağırlık), XI=0.01 "70 gün yarı ömür". İki biçimde denendi: yalnız bu sezonun maçlarıyla, ve önceki sezonun maçları da azaltılmış ağırlıkla katılarak.
- **Elo:** Her lig için kronolojik Elo yürütüldü (başlangıç 1500, K=20, gol farkı çarpanı; ilk sezon ısınma). ClubElo'daki gibi ev avantajı puanı (`home`) ve beraberlik payı (`draw_base`) 30–120 puan / 0.18–0.36 ızgarasında Brier'e göre arandı, sonra ince ayar yapıldı.
- **Brier:** Üç sonuçlu, kare hata toplamı. 0 kusursuz; her sonuca %33 vermek 0.667; sadece lig genel oranlarını (ör. %43 ev, %28 beraberlik, %29 deplasman) her maça yazmak test sezonlarında 0.639–0.660 ("sabit oran" satırı). 0.01'lik fark bu ölçekte anlamlı bir fark; 0.002'lik fark gürültü sınırında (test başına ~700 maçla standart hata ≈ 0.01).
- **Kalibrasyon:** Üç sonucun tüm olasılıkları %10'luk kovalara atılıp "biz ortalama % kaç dedik, gerçekte % kaç oldu" karşılaştırıldı.

Motorun eski hali tabloyu ortalamak için yalnız o sezonun gollerini kullanır; 1. haftada bölme sıfıra düşer. Eğitimde ve yeni motorda lig ortalamasına 18 takım-maçlık bir öncül (`LIG_ORT`) eklendi; 12. haftada etkisi binde birkaç, 1. haftada motoru çalışır kılar.

## 3. Ölçülen parametreler (eğitim sezonları)

| Lig | Ev gol / dep gol | HOME (eski 1.15) | RHO (eski −0.12) | K hafta-hafta (eski 8) | K 10. hafta dondurma | XI sezon içi | XI önceki sezonla | Elo home (eski 65) | Elo draw_base (eski 0.27) |
|---|---|---|---|---|---|---|---|---|---|
| Süper Lig | 1.55 / 1.20 | 1.136 | −0.09 | 14 | 16 | 0.001 | 0.000 | 46 | 0.330 |
| Ligue 1 | 1.50 / 1.20 | 1.119 | −0.04 | 9 | 6 | 0 | 0.001 | 48 | 0.315 |
| Premier League | 1.56 / 1.27 | 1.110 | −0.03 | 7 | 8 | 0 | 0.002 | 50 | 0.285 |
| Bundesliga | 1.73 / 1.35 | 1.132 | −0.13 | 9 | 14 | 0 | 0.001 | 52 | 0.305 |
| La Liga | 1.48 / 1.13 | 1.144 | −0.04 | 8 | 8 | 0 | 0.000 | 68 | 0.335 |
| Serie A | 1.53 / 1.28 | 1.092 | −0.06 | 4 | 6 | 0.001 | 0.001 | 38 | 0.325 |
| **Genel (6 lig, 15 462 maç)** | 1.55 / 1.24 | **1.120** | **−0.06** | **7** | 8 | 0.001 | 0.001 | 50 (lig ort.) | 0.316 (lig ort.) |

Okuma: Ev avantajı elle verilen %15'ten biraz düşük, liglerin genelinde %12 (ev takımı ~%12 fazla, deplasman ~%11 az gol bekler); Serie A'da %9, La Liga'da %14. Düşük skor düzeltmesi −0.12 fazla güçlüymüş; veride −0.03 … −0.09 arası, Bundesliga hariç (−0.13). Büzülme 7–9 maç civarı; Süper Lig'in 3 sezonu 14 diyor ama bu, test sezonlarında eski 8'den kötü çıktı (aşağıda). Sezon içi zaman ağırlığı tek başına neredeyse hiçbir şey kazandırmıyor (K zaten aynı işi görüyor); asıl kazanç önceki sezonu yavaş azalan ağırlıkla hesaba katmaktan geliyor. Elo'da ev avantajı 65 puandan 40–50 puana inmiş, beraberlik payı 0.27'den ~0.31'e çıkmış: eski Elo ev takımına fazla, beraberliğe az pay veriyordu.

K arama tablosu (hafta-hafta Brier, eğitim): Süper Lig K=8 → 0.6309, K=14 → 0.6295; genel K=7 → 0.5988, K=8 → 0.5988, K=14 → 0.6009. Eğri 6–10 arasında neredeyse düz; K'nın 1'e inmesi her ligde ~0.01 bozuyor.

## 4. Doğrulama (test sezonları; hiç eğitimde kullanılmadı)

Motorun iki çalışma yolu var: **tablo yolu** (yalnız puan tablosuyla, bugünkü `superlig.json` girdisi) ve yeni eklenen **maç yolu** (maç listesi verilirse zaman ağırlığı + önceki sezon). Her lig için eski parametreler, o ligin kendi ölçümü ve genel ölçüm yarıştırıldı; eskiyi geçemeyen yerde eski korundu.

| Lig | Sabit oran | Tablo: eski | Tablo: lig ölçümü | Tablo: genel ölçüm | **Tablo: seçilen** | Maç yolu: lig | Maç yolu: genel | **Maç yolu: seçilen** | Elo eski | Elo yeni | **Elo seçilen** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Süper Lig | 0.640 | 0.5816 | 0.5859 | 0.5822 | **eski 0.5816** | 0.5795 | 0.5773 | **genel 0.5773** | 0.5749 | 0.5771 | **eski** |
| Ligue 1 | 0.639 | 0.5960 | 0.5953 | 0.5959 | **lig 0.5953** | 0.5924 | 0.5926 | **lig 0.5924** | 0.5889 | 0.5904 | **eski** |
| Premier League | 0.657 | 0.6168 | 0.6148 | 0.6149 | **lig 0.6148** | 0.6094 | 0.6098 | **lig 0.6094** | 0.6184 | 0.6156 | **yeni** |
| Bundesliga | 0.656 | 0.6119 | 0.6104 | 0.6099 | **genel 0.6099** | 0.6031 | 0.6029 | **genel 0.6029** | 0.5920 | 0.5886 | **yeni** |
| La Liga | 0.639 | 0.5932 | 0.5925 | 0.5939 | **lig 0.5925** | 0.5876 | 0.5881 | **lig 0.5876** | 0.5944 | 0.5936 | **yeni** |
| Serie A | 0.660 | 0.6060 | 0.6017 | 0.6027 | **lig 0.6017** | 0.5925 | 0.5943 | **lig 0.5925** | 0.6058 | 0.5955 | **yeni** |
| **Tüm ligler (4 104 puanlanan maç)** | 0.649 | **0.6009** | | 0.5999 | **0.5992** | | | **0.5935** | 0.5963 | 0.5941 (genel 50 / 0.316) | **genel yeni** |

Özet:
- Tablo yolunda yeni parametreler 5 ligde eskiyi geçti ama fark küçük (0.001–0.004); tümünde 0.6009 → 0.5992. Süper Lig'de geçemedi, eski kaldı.
- Maç yolu (önceki sezon + zaman ağırlığı) 6 ligin 6'sında da tablo yolundan iyi: tümünde 0.6009 → 0.5935. Bu, parametre ince ayarının birkaç katı kazanç. Süper Lig'de 0.5816 → 0.5773 (yalnız 2024-25 sezonu önceki sezonundan yararlanabildi; 2023-24'ün önceki sezonu veride yok).
- Elo'da yeni ev/beraberlik ayarı 4 ligde daha iyi, Süper Lig ve Ligue 1'de değil; tüm liglerde genel ayar (home 50, draw_base 0.316) eskiyi geçiyor (0.5963 → 0.5941). Elo, motorda ligler arası (Avrupa kupası) maçlarda kullanıldığı için genel ayar alındı.

Yorum: Puan tablosundan hesaplanan modelde K/RHO/HOME'u "doğru" değerlerine çekmek az şey kazandırıyor; model zaten o parametrelere pek duyarlı değil. Asıl eksik, sezon başında geçen sezonu hiç bilmemesi. Bu yüzden haftalık veri çekiminde yalnız tablo değil maç listesi (tarih, ev, deplasman, skor) de alınırsa motor maç yoluna geçer.

### Kalibrasyon — tüm liglerin test maçları ("% kaç dedik / gerçekte % kaç oldu")

| Söylenen olasılık | n (eski) | Eski: dedik → oldu | n (yeni tablo) | Yeni tablo: dedik → oldu | n (maç yolu) | Maç yolu: dedik → oldu |
|---|---|---|---|---|---|---|
| %0–10 | 253 | %7 → %8 | 230 | %7 → %7 | 255 | %8 → %5 |
| %10–20 | 1 339 | %16 → %17 | 1 368 | %16 → %16 | 1 400 | %16 → %15 |
| %20–30 | 4 798 | %26 → %25 | 4 976 | %25 → %25 | 5 003 | %25 → %25 |
| %30–40 | 2 667 | %34 → %33 | 2 378 | %34 → %34 | 2 239 | %34 → %34 |
| %40–50 | 1 556 | %45 → %47 | 1 590 | %45 → %46 | 1 593 | %45 → %46 |
| %50–60 | 959 | %55 → %56 | 988 | %55 → %56 | 1 009 | %55 → %54 |
| %60–70 | 472 | %64 → %64 | 498 | %64 → %65 | 516 | %65 → %68 |
| %70–80 | 216 | %74 → %75 | 228 | %74 → %75 | 235 | %75 → %77 |
| %80–90 | 46 | %84 → %89 | 50 | %84 → %90 | 61 | %84 → %87 |
| %90–100 | 6 | %91 → %50 | 6 | %91 → %33 | 1 | %93 → %0 |

Motor genel olarak iyi kalibre: söylediği olasılıklar gerçekleşme sıklığıyla ±2 puan içinde örtüşüyor. %90 üstü kovada 6 maç var; bu kadar az örnekle söylenecek şey yok, ama motorun %90'ı aşan tahminlerini kartta %90 olarak kapatmak makul bir ihtiyat.

### Kalibrasyon — Süper Lig test maçları (2023-24, 2024-25; eski = seçilen tablo parametreleri)

| Söylenen | n | Dedik → oldu (tablo, eski) | n | Dedik → oldu (maç yolu) |
|---|---|---|---|---|
| %0–10 | 44 | %8 → %2 | 50 | %8 → %0 |
| %10–20 | 207 | %16 → %15 | 206 | %16 → %11 |
| %20–30 | 826 | %26 → %23 | 848 | %26 → %25 |
| %30–40 | 479 | %34 → %35 | 425 | %34 → %35 |
| %40–50 | 264 | %45 → %51 | 306 | %45 → %47 |
| %50–60 | 155 | %54 → %54 | 135 | %54 → %54 |
| %60–70 | 71 | %65 → %72 | 68 | %65 → %78 |
| %70–80 | 43 | %75 → %86 | 49 | %75 → %88 |
| %80–90 | 5 | %83 → %100 | 7 | %83 → %86 |

Süper Lig'de motor favorilere biraz az güveniyor: %60–80 dediği maçların %72–88'i gerçekleşmiş. Yani Süper Lig'de favoriler diğer liglerden daha sık kazanıyor ve motor bunu tam yansıtmıyor; Claude ayarının ±10 puan sınırı içinde favoriyi yukarı çekmesi veriyle uyumlu.

## 5. Seçilen parametreler (`sports/params.json`)

| Lig | Tablo yolu K / RHO / HOME | Maç yolu K / RHO / HOME / XI / önceki sezon | LIG_ORT | Elo home / draw_base |
|---|---|---|---|---|
| Süper Lig | 8 / −0.12 / 1.15 (eski korundu) | 7 / −0.06 / 1.120 / 0.001 / evet (genel) | 1.372 | 65 / 0.27 (eski korundu) |
| Ligue 1 | 9 / −0.04 / 1.119 | 9 / −0.04 / 1.119 / 0.001 / evet | 1.346 | 65 / 0.27 (eski korundu) |
| Premier League | 7 / −0.03 / 1.110 | 7 / −0.03 / 1.110 / 0.002 / evet | 1.417 | 50 / 0.285 |
| Bundesliga | 7 / −0.06 / 1.120 (genel) | 7 / −0.06 / 1.120 / 0.001 / evet (genel) | 1.537 | 52 / 0.305 |
| La Liga | 8 / −0.04 / 1.144 | 8 / −0.04 / 1.144 / 0 / evet | 1.304 | 68 / 0.335 |
| Serie A | 4 / −0.06 / 1.092 | 4 / −0.06 / 1.092 / 0.001 / evet | 1.403 | 38 / 0.325 |
| Genel (listede olmayan lig, Avrupa kupaları Elo) | 7 / −0.06 / 1.120 | 7 / −0.06 / 1.120 / 0.001 / evet | 1.395 | 50 / 0.316 |

`motor.py` artık bu dosyayı okur; girdideki `"league"` alanına göre lig seçer (yoksa Süper Lig; listede olmayan lig için `genel`). `params.json` yoksa ya da `--eski` verilirse v0'ın elle verilmiş değerleriyle çalışır. Girdide `"matches"` (ve isteğe bağlı `"prev_matches"`) varsa maç yoluna geçer; yoksa tablo yolu. `elo_match()` varsayılan olarak genel Elo ayarını kullanır (65/0.27 → 50/0.316).

## 6. 12. hafta — eski ve yeni motor

`python3 sports/motor.py data/sports/superlig.json data/sports/week12-motor.json` çalışıyor. Süper Lig'in tablo yolunda eski parametreler korunduğu için 12. hafta olasılıkları değişmedi (tek fark lig ortalaması öncülü; yuvarlamada görünmüyor):

| Maç | Eski (ev / ber / dep) | Yeni, seçilen (ev / ber / dep) | Bilgi için: genel ölçümle |
|---|---|---|---|
| Amedspor – Rizespor | 68 / 20 / 12 | 68 / 20 / 12 | 68 / 19 / 13 |
| Gençlerbirliği – Gaziantep FK | 50 / 27 / 23 | 50 / 27 / 23 | 49 / 26 / 25 |
| Galatasaray – Samsunspor | 78 / 14 / 8 | 78 / 14 / 8 | 78 / 13 / 8 |
| Kocaelispor – Fenerbahçe | 34 / 30 / 36 | 34 / 30 / 36 | 32 / 29 / 39 |
| Konyaspor – Beşiktaş | 24 / 30 / 46 | 24 / 30 / 46 | 23 / 28 / 49 |
| Trabzonspor – Eyüpspor | 90 / 8 / 2 | 90 / 8 / 2 | 90 / 7 / 2 |
| Erzurumspor – Göztepe | 33 / 27 / 40 | 33 / 27 / 40 | 31 / 25 / 43 |
| Kasımpaşa – Alanyaspor | 60 / 25 / 15 | 60 / 25 / 15 | 60 / 24 / 16 |
| Başakşehir – Çorum FK | 43 / 24 / 33 | 43 / 24 / 33 | 42 / 23 / 35 |

Son sütun yalnız yönü göstermek için: genel ölçüm (ev avantajı %12, daha zayıf düşük skor düzeltmesi) ev takımından 1–3 puan alıp deplasmana verir, beraberliği 1–2 puan düşürür. Test sezonlarında Süper Lig için bu ayar eskiyi geçemediği için kullanılmadı.

Maç yolu (test sezonlarında Süper Lig'de en iyi sonucu veren yol) 12. hafta için çalıştırılamadı: openfootball'da 2026-27 Süper Lig'in yalnız 4 haftası, 2025-26'nın yalnız 99 maçı var. Haftalık akışta TFF'den maç listesi (tarih, ev, deplasman, skor) `"matches"` alanına, geçen sezonun maçları `"prev_matches"` alanına konursa motor kendiliğinden bu yola geçer.

## 7. Sınırlar

- Süper Lig için eğitim verisi 3 sezon ve ikisi pandemi dönemine denk geliyor; Süper Lig'e özgü ölçümler (özellikle K=14) bu yüzden güvenilir değil, test sezonlarında da tutmadı.
- Test sezonlarında birkaç aday arasından seçim yapıldı (eski / lig / genel); bu, test Brier'lerini çok az iyimser yapar. Farklar küçük olduğu için seçimler "anlamlı kazanç" değil "en az eskisi kadar iyi" olarak okunmalı. Maç yolunun kazancı ise 6 ligin 6'sında aynı yönde ve büyük; o güvenilir.
- Elo ölçümü kendi hesapladığımız Elo'yla yapıldı; ClubElo puanlarıyla aynı ölçekte (400'lük logistik) olduğu için `home` puanı aktarılabilir, ama ClubElo'nun kendi yayılımı farklıysa ideal değer bir miktar kayabilir.
- Yeniden üretmek: `git clone --depth 1` ile beş openfootball deposunu bir klasöre alın; `python3 sports/data_loader.py <klasör> matches.json`; `python3 sports/egitim.py matches.json --out sports/params.json --rapor sports/egitim_rapor.json` (~3 dakika).
