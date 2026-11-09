#!/usr/bin/env python3
"""Planck soru sicili (ANAYASA.md §2, §3, §5).

  python3 scripts/sicil.py gocur                 # tek seferlik: eski dosyalardan sicili kur
  python3 scripts/sicil.py dogrula               # eksik alanları listele
  python3 scripts/sicil.py ekle soru.json        # yeni soru (tek nesne ya da liste)
  python3 scripts/sicil.py guncelle <id> <p> "<neden>" [motor]
  python3 scripts/sicil.py lr <p> <LR>           # log-odds güncelleme hesabı
  python3 scripts/sicil.py vadesi [gun]          # vadesi gelen / yaklaşan sorular
  python3 scripts/sicil.py kapat <id> evet|hayir|iptal <kaynak-url> ["not"]
  python3 scripts/sicil.py karne                 # data/karne.json + özet
"""
import json, math, sys, os, datetime as dt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SICIL = os.path.join(ROOT, 'data', 'sorular.json')
KARNE = os.path.join(ROOT, 'data', 'karne.json')
LO, HI = 3, 97
ZORUNLU = ['id', 'kanal', 'q', 'deadline', 'kriter', 'kaynak_cozum', 'taban', 'on_otopsi', 'p']
TODAY = dt.date.today().isoformat()


def yukle():
    if not os.path.exists(SICIL):
        return {'surum': 1, 'updated': TODAY, 'sorular': []}
    return json.load(open(SICIL, encoding='utf-8'))


def yaz(s):
    s['updated'] = TODAY
    json.dump(s, open(SICIL, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


def kirp(p):
    return max(LO, min(HI, round(float(p))))


def lr(p, r):
    p = min(max(float(p), 0.5), 99.5) / 100
    x = math.log(p / (1 - p)) + math.log(float(r))
    return 100 / (1 + math.exp(-x))


def bul(s, i):
    for q in s['sorular']:
        if q['id'] == i:
            return q
    sys.exit(f'bulunamadı: {i}')


def yeni(d):
    q = {'id': d['id'], 'kanal': d['kanal'], 'tur': d.get('tur', 'olay'), 'q': d['q'],
         'acilis': d.get('acilis', TODAY), 'deadline': d['deadline'],
         'kriter': d.get('kriter'), 'kaynak_cozum': d.get('kaynak_cozum'),
         'taban': d.get('taban'), 'mercekler': d.get('mercekler', []),
         'on_otopsi': d.get('on_otopsi'), 'motor': d.get('motor'),
         'p': kirp(d['p']), 'ilk_p': kirp(d['p']), 'durum': 'acik', 'sonuc': None, 'kapanis': None,
         'gecmis': [{'t': d.get('acilis', TODAY), 'p': kirp(d['p']), 'motor': d.get('motor'),
                     'neden': d.get('neden', 'açılış')}]}
    if d.get('bagli'):
        q['bagli'] = d['bagli']
    return q


def gocur():
    s = yukle()
    var = {q['id'] for q in s['sorular']}
    def ekle(d):
        if d['id'] not in var:
            s['sorular'].append(yeni(d)); var.add(d['id'])
    J = lambda f: json.load(open(os.path.join(ROOT, 'data', f), encoding='utf-8'))
    r = J('risks.json')
    for x in r['risks']:
        ekle({'id': 'risk-' + x['id'], 'kanal': 'news', 'tur': 'endeks', 'q': x['name'] + ' (2031 ufku)',
              'deadline': '2031-12-31', 'p': x['p'], 'acilis': r.get('updated', TODAY)[:10], 'neden': 'göç: risks.json'})
    q = J('quant.json')
    for x in q['forecasts']:
        ekle({'id': 'q-' + x['id'], 'kanal': 'quant', 'q': x['q'], 'deadline': x['deadline'], 'p': x['p'],
              'motor': x.get('motor'), 'neden': 'göç: quant.json'})
    for ev in q.get('neolur', []):
        for x in ev['items']:
            ekle({'id': x['id'], 'kanal': 'quant', 'tur': 'neolur', 'q': x['q'], 'deadline': x['deadline'],
                  'p': x['p'], 'taban': x.get('lab'), 'acilis': ev['date'], 'neden': 'göç: ' + ev['id']})
    for w in J('pekibiz.json')['weeks']:
        for i, x in enumerate(w['items']):
            ekle({'id': f"pb-{w['week']}-{i}", 'kanal': 'news', 'tur': 'pekibiz', 'q': x['q'],
                  'deadline': x['deadline'], 'p': x['p'], 'taban': x.get('lab'),
                  'mercekler': [x['alan']] if x.get('alan') else [], 'acilis': w['date'], 'neden': 'göç: ' + w['week']})
    yaz(s); print(len(s['sorular']), 'soru sicilde')


def dogrula():
    s = yukle(); eksik = 0
    for q in s['sorular']:
        if q['durum'] != 'acik':
            continue
        e = [k for k in ZORUNLU if q.get(k) in (None, '', [])]
        if not (LO <= q['p'] <= HI):
            e.append('p sınır dışı')
        if e:
            eksik += 1; print(f"{q['id']:28s} eksik: {', '.join(e)}")
    acik = [q for q in s['sorular'] if q['durum'] == 'acik' and q.get('tur') != 'endeks']
    kisa = [q for q in acik if (dt.date.fromisoformat(q['deadline']) - dt.date.fromisoformat(q['acilis'])).days <= 90]
    print(f"\naçık {len(acik)} soru (endeks hariç); ≤90 gün: {len(kisa)} (%{round(100*len(kisa)/max(1,len(acik)))}; hedef ≥%60); eksikli kayıt: {eksik}")


def ekle(f):
    s = yukle(); d = json.load(open(f, encoding='utf-8'))
    for x in (d if isinstance(d, list) else [d]):
        if any(q['id'] == x['id'] for q in s['sorular']):
            sys.exit('id zaten var: ' + x['id'])
        e = [k for k in ZORUNLU if x.get(k) in (None, '')]
        if e:
            sys.exit(f"{x['id']}: zorunlu alan eksik: {', '.join(e)}")
        s['sorular'].append(yeni(x)); print('eklendi', x['id'], kirp(x['p']))
    yaz(s)


def guncelle(i, p, neden, motor=None):
    s = yukle(); q = bul(s, i)
    if q['durum'] != 'acik':
        sys.exit('kapanmış soru güncellenmez')
    q['p'] = kirp(p)
    if motor is not None:
        q['motor'] = float(motor)
    q['gecmis'].append({'t': TODAY, 'p': q['p'], 'motor': q.get('motor'), 'neden': neden})
    yaz(s); print(i, '→', q['p'])


def vadesi(gun=0):
    s = yukle(); sinir = (dt.date.today() + dt.timedelta(days=int(gun))).isoformat()
    for q in sorted(s['sorular'], key=lambda q: q['deadline']):
        if q['durum'] == 'acik' and q['deadline'] <= sinir:
            print(q['deadline'], q['id'], f"%{q['p']}", '|', q['q'], '| kriter:', q.get('kriter') or 'YOK')


def kapat(i, sonuc, kaynak, nt=''):
    s = yukle(); q = bul(s, i)
    if q['durum'] != 'acik':
        sys.exit('zaten kapalı')
    if sonuc not in ('evet', 'hayir', 'iptal'):
        sys.exit('sonuç: evet|hayir|iptal')
    if not kaynak.startswith('http'):
        sys.exit('kapanış kaynağı bağlantı olmalı')
    q['durum'] = 'iptal' if sonuc == 'iptal' else 'kapandi'
    q['sonuc'] = None if sonuc == 'iptal' else int(sonuc == 'evet')
    q['kapanis'] = {'t': TODAY, 'kaynak': kaynak, 'not': nt}
    if q['sonuc'] is not None and ((q['p'] >= 80 and q['sonuc'] == 0) or (q['p'] <= 20 and q['sonuc'] == 1)):
        q['otopsi_gerekli'] = True; print('ISKA: "Neden yanıldık" yazılmalı (ANAYASA §5)')
    yaz(s); print(i, 'kapandı:', sonuc)


def olc(qs, alan):
    v = [(q[alan] / 100, q['sonuc']) for q in qs if q.get(alan) is not None]
    if not v:
        return None
    b = sum((p - o) ** 2 for p, o in v) / len(v)
    l = sum(-math.log(max(1e-6, p if o else 1 - p)) for p, o in v) / len(v)
    return {'n': len(v), 'brier': round(b, 4), 'log': round(l, 4), 'beceri_50': round(1 - b / 0.25, 3)}


def karne():
    s = yukle(); kap = [q for q in s['sorular'] if q['durum'] == 'kapandi']
    out = {'updated': TODAY, 'kapanan': len(kap), 'acik': sum(q['durum'] == 'acik' for q in s['sorular']),
           'iptal': sum(q['durum'] == 'iptal' for q in s['sorular']), 'kanallar': {}, 'kalibrasyon': [],
           'otopsi_bekleyen': [q['id'] for q in kap if q.get('otopsi_gerekli') and not q.get('otopsi')]}
    for k in ['toplam'] + sorted({q['kanal'] for q in kap}):
        qs = kap if k == 'toplam' else [q for q in kap if q['kanal'] == k]
        out['kanallar'][k] = {'planck': olc(qs, 'p'), 'motor': olc(qs, 'motor'), 'ilk': olc(qs, 'ilk_p'),
                              'tuttu': sum((q['p'] >= 50) == bool(q['sonuc']) for q in qs), 'n': len(qs)}
        # aynı sorularda Planck ve Motor
        ort = [q for q in qs if q.get('motor') is not None]
        if ort:
            out['kanallar'][k]['planck_motorlu_sorularda'] = olc(ort, 'p')
    for lo in range(0, 100, 10):
        d = [q for q in kap if lo <= q['p'] < lo + 10]
        if d:
            out['kalibrasyon'].append({'dilim': f'{lo}-{lo+9}', 'n': len(d), 'ort_tahmin': round(sum(q['p'] for q in d) / len(d), 1),
                                       'gerceklesen': round(100 * sum(q['sonuc'] for q in d) / len(d), 1)})
    out['iddia_serbest'] = len(kap) >= 30
    out['kalibrasyon_duzeltmesi_serbest'] = len(kap) >= 50
    json.dump(out, open(KARNE, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(json.dumps(out, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    c = a[0]
    if c == 'gocur': gocur()
    elif c == 'dogrula': dogrula()
    elif c == 'ekle': ekle(a[1])
    elif c == 'guncelle': guncelle(*a[1:5])
    elif c == 'lr': print(f"%{float(a[1]):g} × LR {a[2]} → %{lr(a[1], a[2]):.0f}")
    elif c == 'vadesi': vadesi(a[1] if len(a) > 1 else 0)
    elif c == 'kapat': kapat(*a[1:5])
    elif c == 'karne': karne()
    else: sys.exit(__doc__)
