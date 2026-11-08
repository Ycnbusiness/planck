"""StatsBomb şut olayından Pozisyon videosu için spec üretir.
Kullanım: python3 sports/pozisyon_spec.py <events.json> <lineups.json> <dakika> <oyuncu_kısmi_adı> <çıktı.json>"""
import json, sys
sys.path.insert(0, 'sports'); import xg
evf, luf, minute, who, out = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4], sys.argv[5]
ev = json.load(open(evf)); byid = {e['id']: e for e in ev}; m = json.load(open('sports/xg_model.json'))
nick = {}
for t in json.load(open(luf)):
    for p in t['lineup']: nick[p['player_id']] = p.get('player_nickname') or p['player_name']
def short(pid, name):
    n = nick.get(pid, name); parts = n.split()
    return parts[-1] if len(parts) > 1 else n
shot = next(e for e in ev if e['type']['name'] == 'Shot' and e['minute'] == minute and who.lower() in e['player']['name'].lower())
f = xg.feats(shot); pxg = xg.predict(m, f)
kp = byid.get(shot['shot'].get('key_pass_id'))
players = [{'name': short(p['player']['id'], p['player']['name']), 'x': p['location'][0], 'y': p['location'][1],
            'team': 'att' if p['teammate'] else 'def', 'gk': p.get('position', {}).get('name') == 'Goalkeeper'} for p in shot['shot']['freeze_frame']]
players.append({'name': short(shot['player']['id'], shot['player']['name']), 'x': shot['location'][0], 'y': shot['location'][1], 'team': 'att', 'shooter': True})
spec = {'minute': shot['minute'], 'team': shot['team']['name'], 'shooter': players[-1]['name'],
        'shot': shot['location'][:2], 'end': shot['shot']['end_location'][:2], 'outcome': shot['shot']['outcome']['name'],
        'pass': {'from': kp['location'], 'to': kp['pass']['end_location'], 'by': short(kp['player']['id'], kp['player']['name'])} if kp else None,
        'players': players, 'xg': round(pxg, 4), 'sb_xg': round(shot['shot']['statsbomb_xg'], 4),
        'dist_m': round(f[1] * 0.9144, 1), 'defenders_in_cone': int(f[4]), 'header': bool(f[3]), 'body': {'Left Foot': 'Sol ayak', 'Right Foot': 'Sağ ayak', 'Head': 'Kafa'}.get(shot['shot'].get('body_part', {}).get('name'), 'Diğer')}
json.dump(spec, open(out, 'w'), ensure_ascii=False, indent=1); print(json.dumps({k: spec[k] for k in ('minute','shooter','xg','sb_xg','dist_m','defenders_in_cone','outcome')}, ensure_ascii=False)); print([p['name'] for p in players])
