"""Football.TXT (openfootball) ayrıştırıcı — Planck T+ motor eğitimi için geçmiş maç verisi.

Veri kaynağı: https://github.com/openfootball (açık lisans, CC0 / public domain).
  europe/turkey/*_tr1.txt  -> Süper Lig        europe/france/*_fr1.txt -> Ligue 1
  england/<sezon>/1-premierleague.txt           deutschland/<sezon>/1-bundesliga.txt
  espana/<sezon>/1-liga.txt                     italy/<sezon>/1-seriea.txt

Desteklenen satır biçimleri:
  ▪ Matchday 3 | ▪ 3. Round | ▪ Regular Season - 3 | ▪ Round 3   (hafta başlığı)
  Fri Aug 9 2024 | Sat Aug 10 | [Sat Aug 10]                   (tarih; yıl bir önceki satırdan devralınır)
  21:00  Ev Takımı  v  Deplasman  2-1 (0-0)                     (yeni biçim)
  21:00  Ev Takımı  2-1 (0-0)  Deplasman                        (eski biçim)
  "[awarded]" (hükmen) maçlar ve oynanmamış maçlar atlanır.

Kullanım:
  from data_loader import load_league, load_all
  matches = load_league("superlig", "<openfootball kök klasörü>")
  # her maç: dict(league, season, round, date, home, away, hg, ag)
  python3 sports/data_loader.py <openfootball kök klasörü> [çıktı.json]
"""
import glob, json, os, re, sys
from datetime import date

MONTHS = {m: i + 1 for i, m in enumerate(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])}

# lig kodu -> (depo, dosya deseni). {s} = sezon klasörü (ör. 2024-25)
LEAGUES = {
    "superlig":    ("europe",      "turkey/{s}_tr1.txt"),
    "ligue1":      ("europe",      "france/{s}_fr1.txt"),
    "premierleague": ("england",   "{s}/1-premierleague.txt"),
    "bundesliga":  ("deutschland", "{s}/1-bundesliga.txt"),
    "laliga":      ("espana",      "{s}/1-liga.txt"),
    "seriea":      ("italy",       "{s}/1-seriea.txt"),
}
LEAGUE_NAMES = {"superlig": "Süper Lig", "ligue1": "Ligue 1", "premierleague": "Premier League",
                "bundesliga": "Bundesliga", "laliga": "La Liga", "seriea": "Serie A"}

# Aynı kulübün farklı yazımları (sponsor adı, imla) -> motorun kullandığı tek ad
ALIASES = {
    "Atiker Konyaspor": "Konyaspor", "Aytemiz Alanyaspor": "Alanyaspor", "Amed": "Amedspor",
    "BB Erzurumspor": "Erzurumspor", "Gazişehir Gaziantep FK": "Gaziantep FK",
    "Gençlerbirligi": "Gençlerbirliği", "Kasimpasa": "Kasımpaşa", "Kasımpaşa SK": "Kasımpaşa",
    "Çaykur Rizespor": "Rizespor", "Çorum": "Çorum FK", "İstanbul Başakşehir": "Başakşehir",
    "MKE Ankaragücü": "Ankaragücü", "İstanbulspor AŞ": "İstanbulspor",
}

RE_ROUND = re.compile(r"^[▪»]\s*(?:Matchday|Round|Week|Spieltag|Regular Season\s*-)?\s*(\d+)\.?(?:\s*Round)?\s*$")
RE_DATE = re.compile(r"^\[?\s*(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+([A-Z][a-z]{2})(?:/|\s+)(\d{1,2})(?:\s+(\d{4}))?\s*\]?$")
RE_TIME = re.compile(r"^\d{1,2}[:.]\d{2}\s+")
RE_SCORE = re.compile(r"\s(\d{1,2})-(\d{1,2})(?:\s*\(\d{1,2}-\d{1,2}\))?(?:\s|$)")
RE_NEW = re.compile(r"^(.+?)\s+v\s+(.+?)\s+(\d{1,2})-(\d{1,2})(?:\s*\(\d{1,2}-\d{1,2}\))?\s*(\[.*\])?\s*$")
RE_OLD = re.compile(r"^(.+?)\s+(\d{1,2})-(\d{1,2})(?:\s*\(\d{1,2}-\d{1,2}\))?\s+(.+?)\s*(\[.*\])?\s*$")


def season_from_filename(path):
    m = re.search(r"(\d{4})-(\d{2})", path)
    return f"{m.group(1)}-{m.group(2)}" if m else os.path.basename(path)


def parse_file(path, league="", season=None):
    """Bir Football.TXT dosyasını maç listesine çevirir."""
    season = season or season_from_filename(path)
    start_year = int(season[:4])
    out, rnd, cur = [], 0, None
    year, last_month = start_year, None
    for raw in open(path, encoding="utf-8"):
        line = raw.strip()
        if not line or line.startswith("#") or line.startswith("=") or line.startswith("("):
            continue
        m = RE_ROUND.match(line)
        if m:
            rnd = int(m.group(1)); continue
        if line.startswith("▪") or line.startswith("»"):
            continue
        m = RE_DATE.match(line)
        if m:
            mon = MONTHS.get(m.group(1))
            if mon is None: continue
            if m.group(3): year = int(m.group(3))
            elif last_month and mon < last_month: year += 1   # Aralık -> Ocak geçişi
            last_month = mon
            try: cur = date(year, mon, int(m.group(2)))
            except ValueError: cur = None
            continue
        body = RE_TIME.sub("", line)
        m = RE_NEW.match(body) or RE_OLD.match(body)
        if not m:
            continue
        tag = m.groups()[-1] or ""
        if "awarded" in tag.lower():
            continue
        if m.re is RE_NEW:
            home, away, hg, ag = m.group(1), m.group(2), int(m.group(3)), int(m.group(4))
        else:
            home, hg, ag, away = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4)
        out.append({"league": league, "season": season, "round": rnd,
                    "date": cur.isoformat() if cur else None,
                    "home": ALIASES.get(home.strip(), home.strip()),
                    "away": ALIASES.get(away.strip(), away.strip()), "hg": hg, "ag": ag})
    return out


def load_league(code, root):
    repo, pattern = LEAGUES[code]
    files = sorted(glob.glob(os.path.join(root, repo, pattern.format(s="*"))))
    matches = []
    for f in files:
        matches.extend(parse_file(f, league=code))
    return matches


def load_all(root, leagues=None):
    return {code: load_league(code, root) for code in (leagues or LEAGUES)}


if __name__ == "__main__":
    root = sys.argv[1] if len(sys.argv) > 1 else "."
    data = load_all(root)
    for code, ms in data.items():
        seasons = sorted({m["season"] for m in ms})
        print(f"{LEAGUE_NAMES[code]:>15}: {len(ms):5d} maç, {len(seasons)} sezon ({seasons[0]} .. {seasons[-1]})")
    if len(sys.argv) > 2:
        json.dump(data, open(sys.argv[2], "w"), ensure_ascii=False)
