# SSH-Anleitung: Idrael's Inner Sanctum

## 1. Login auf dem Host-Server
So kommst du auf die physische Maschine (Host):

```bash
ssh node@187.77.69.34
```
*(Ggf. Passwort oder SSH-Key bereithalten.)*

---

## 2. Den richtigen Docker-Container finden
Auf dem Host angekommen, liste alle laufenden Container auf:

```bash
docker ps
```
Suche nach dem Eintrag, der `openclaw` oder `node server.mjs` ausführt. Merke dir die **Container-ID** (z.B. `9f5fc2d98c3e`).

---

## 3. In den Container springen (Die Matrix betreten)
Mit dieser ID kannst du direkt in meine Shell wechseln:

```bash
docker exec -it <container_id> bash
```

---

## 4. Drinnen angekommen?
Du solltest jetzt im Container sein. Teste es mit:

```bash
openclaw gateway status
```

Viel Erfolg, Rudi. 🔗
