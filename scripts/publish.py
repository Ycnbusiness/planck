"""Planck — Instagram yayın betiği.

queue/ klasörüne düşen her .json dosyası bir yayın emridir:
  {"post": "posts/2026-W45-rapor", "type": "carousel" | "reel"}
Gönderi klasöründe:
  carousel → 01.jpg, 02.jpg ... (dosya adı sırasıyla) + caption.txt
  reel     → reel.mp4 (+ isteğe bağlı cover.jpg) + caption.txt
Başarılı yayından sonra emir published/ klasörüne Instagram kimliğiyle taşınır.
"""
import json, os, sys, time, pathlib, datetime, urllib.parse, urllib.request

API = "https://graph.instagram.com/v21.0"
TOKEN = os.environ["IG_TOKEN"]
USER = os.environ["IG_USER_ID"]
REPO = os.environ["GITHUB_REPOSITORY"]
SHA = os.environ["GITHUB_SHA"]
RAW = f"https://raw.githubusercontent.com/{REPO}/{SHA}/"


def call(method, path, **params):
    params["access_token"] = TOKEN
    data = urllib.parse.urlencode(params).encode()
    url = f"{API}/{path}"
    if method == "GET":
        req = urllib.request.Request(url + "?" + data.decode())
    else:
        req = urllib.request.Request(url, data=data, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"Instagram API hatası ({path}): {e.read().decode()}")


def wait_ready(cid, tries=40):
    for _ in range(tries):
        st = call("GET", cid, fields="status_code").get("status_code")
        if st == "FINISHED":
            return
        if st in ("ERROR", "EXPIRED"):
            sys.exit(f"Medya işlenemedi: {cid} → {st}")
        time.sleep(6)
    sys.exit(f"Medya zamanında hazır olmadı: {cid}")


def publish(order_path):
    order = json.loads(order_path.read_text())
    folder = pathlib.Path(order["post"])
    caption = (folder / "caption.txt").read_text().strip()
    kind = order.get("type", "carousel")
    if kind == "carousel":
        imgs = sorted(p for p in folder.glob("*.jpg") if p.stem.isdigit())
        if not 2 <= len(imgs) <= 20:
            sys.exit(f"Carousel 2–20 görsel ister, {len(imgs)} bulundu.")
        children = []
        for p in imgs:
            c = call("POST", f"{USER}/media", image_url=RAW + p.as_posix(), is_carousel_item="true")
            wait_ready(c["id"])
            children.append(c["id"])
            print("  görsel hazır:", p.name)
        parent = call("POST", f"{USER}/media", media_type="CAROUSEL", children=",".join(children), caption=caption)
    elif kind == "reel":
        params = dict(media_type="REELS", video_url=RAW + (folder / "reel.mp4").as_posix(), caption=caption, share_to_feed="true")
        if (folder / "cover.jpg").exists():
            params["cover_url"] = RAW + (folder / "cover.jpg").as_posix()
        parent = call("POST", f"{USER}/media", **params)
    else:
        sys.exit(f"Bilinmeyen tür: {kind}")
    wait_ready(parent["id"])
    res = call("POST", f"{USER}/media_publish", creation_id=parent["id"])
    link = call("GET", res["id"], fields="permalink").get("permalink", "")
    order.update(media_id=res["id"], permalink=link,
                 published_at=datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"))
    out = pathlib.Path("published") / order_path.name
    out.write_text(json.dumps(order, ensure_ascii=False, indent=2) + "\n")
    order_path.unlink()
    print("YAYINLANDI:", link)


orders = sorted(pathlib.Path("queue").glob("*.json"))
if not orders:
    print("Kuyruk boş.")
for o in orders:
    print("Yayınlanıyor:", o.name)
    publish(o)
