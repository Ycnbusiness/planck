#!/usr/bin/env python3
"""Hikâye klasörleri (Yusuf kararı 23.11.2026: "Bütün haberlerin kendine ait klasörleri olsun").
Kullanım:
  python3 scripts/hikaye.py yeni <slug> "Başlık" [alan]      # klasör + HIKAYE.md
  python3 scripts/hikaye.py ruzgar <slug> "tarih | kim | ne | yön | bedel | ağırlık | kaynak"
  python3 scripts/hikaye.py soru <slug> <soru-id> [...]       # hikâyeye soru bağla
  python3 scripts/hikaye.py yayin <slug> <posts/klasör> [...] # hikâyeye gönderi bağla
  python3 scripts/hikaye.py index                             # hikayeler/INDEX.md üret
"""
import json, os, sys, datetime
K = os.path.join(os.path.dirname(__file__), '..', 'hikayeler')
SOR = os.path.join(os.path.dirname(__file__), '..', 'data', 'sorular.json')
TODAY = datetime.date.today().isoformat()
SABLON = """# {baslik}

Alan: {alan} · Açılış: {tarih} · Durum: süren

## Özet (her güncellemede yeniden yazılır, 3–5 cümle)
_Doldurulacak._

## Aktörler (ekip/GUC-OKUMA.md §1)
| Aktör | Rolü (karar verir / engeller / etkiler) | Ne kazanır, ne kaybeder | Yön | Güç (1–3) |
|---|---|---|---|---|

## Rüzgâr kaydı (her yeni haber bir satır; bedelli sinyal ağır)
| Tarih | Kim | Ne (kendi cümlemizle) | Yön | Bedel | Ağırlık | Kaynak |
|---|---|---|---|---|---|---|

## Denge
_Olumlu / olumsuz hangisi ağır basıyor ve neden._

## Yarışan açıklamalar (2–3 hipotez; hangisi güçleniyor)

## Bağlar (kanıtlı / çelişkili / yapısal)

## Analist notu (en son akşam turu)
"""
def meta_p(slug): return os.path.join(K, slug, 'meta.json')
def meta(slug):
    p = meta_p(slug)
    return json.load(open(p)) if os.path.exists(p) else {'slug': slug, 'sorular': [], 'yayinlar': []}
def kaydet(slug, m): json.dump(m, open(meta_p(slug), 'w'), ensure_ascii=False, indent=1)
def yeni(slug, baslik, alan='—'):
    d = os.path.join(K, slug); os.makedirs(d, exist_ok=True)
    h = os.path.join(d, 'HIKAYE.md')
    if not os.path.exists(h): open(h, 'w').write(SABLON.format(baslik=baslik, alan=alan, tarih=TODAY))
    m = meta(slug); m.update({'baslik': baslik, 'alan': alan}); m.setdefault('acilis', TODAY); m['guncel'] = TODAY; kaydet(slug, m); print('hikaye', slug)
def ruzgar(slug, satir):
    h = os.path.join(K, slug, 'HIKAYE.md'); t = open(h).read()
    hd = '|---|---|---|---|---|---|---|\n'; i = t.index(hd, t.index('## Rüzgâr kaydı')) + len(hd)
    j = t.index('\n## Denge'); blok = t[i:j].rstrip('\n'); yeni = (blok + '\n' if blok else '') + '| ' + satir.strip(' |') + ' |\n'
    open(h, 'w').write(t[:i] + yeni + t[j:]); m = meta(slug); m['guncel'] = TODAY; kaydet(slug, m)
def bagla(slug, alan, ids):
    m = meta(slug); [m[alan].append(x) for x in ids if x not in m[alan]]; m['guncel'] = TODAY; kaydet(slug, m)
def index():
    s = json.load(open(SOR)); S = {q['id']: q for q in (s['sorular'] if isinstance(s, dict) else s)}
    rows = []
    for slug in sorted(os.listdir(K)):
        if not os.path.isdir(os.path.join(K, slug)): continue
        m = meta(slug); acik = [S[i] for i in m['sorular'] if i in S and S[i].get('durum') == 'acik']
        rows.append(f"| [{m.get('baslik', slug)}]({slug}/HIKAYE.md) | {m.get('alan','—')} | {len(acik)} açık / {len(m['sorular'])} | {len(m['yayinlar'])} | {m.get('guncel','')} |")
    open(os.path.join(K, 'INDEX.md'), 'w').write("# Hikâyeler\n\nHer haber bir hikâyeye bağlanır; yoksa yeni hikâye açılır (TARAMA §0a). Sorular ve gönderiler `meta.json`'da.\n\n| Hikâye | Alan | Sorular | Gönderiler | Son güncelleme |\n|---|---|---|---|---|\n" + '\n'.join(rows) + '\n')
    print('index', len(rows))
if __name__ == '__main__':
    a = sys.argv[1:]; c = a[0] if a else ''
    if c == 'yeni': yeni(*a[1:4])
    elif c == 'ruzgar': ruzgar(a[1], a[2])
    elif c == 'soru': bagla(a[1], 'sorular', a[2:])
    elif c == 'yayin': bagla(a[1], 'yayinlar', a[2:])
    elif c == 'index': index()
    else: print(__doc__)
