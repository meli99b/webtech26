# TaskWise

## Teammitglieder
- Melissa Bastas

## Uebungsgruppe / Dozent
- 2.Zug, 2. Gruppe
- Nasaltsev

## Projektbeschreibung
TaskWise ist eine Aufgaben-App fuer Menschen mit ADHS.  
Das Ziel ist, grosse Aufgaben in kleine, machbare Schritte zu zerlegen und so den Einstieg zu erleichtern.

## Meilenstein 1 (Backend)
- Spring-Boot-Backend laeuft lokal
- GET-Endpunkt `/tasks` ist implementiert
- Rueckgabe von Beispielaufgaben inklusive Teilaufgaben als JSON

### Endpunkt
- `GET http://localhost:8080/tasks`

### Meilenstein 1 starten
1. Anwendung starten (`Webtech26Application`)
2. Im Browser oeffnen: `http://localhost:8080/tasks`
3. JSON-Antwort mit Aufgaben und Teilaufgaben pruefen

## Meilenstein 2 (Frontend)
- Vue-3-Projekt mit **Vite** im Ordner `frontend/` (wie im Skript Thema 4)
- Struktur: `src/App.vue`, `src/components/TaskList.vue`
- Eigene Komponente `TaskList` mit `v-for` (Aufgaben + Teilaufgaben)
- Nutzer kann eine Aufgabe eingeben, die automatisch in kleine Schritte zerlegt wird
- Teilaufgaben koennen einzeln abgehakt werden (Fortschritt pro Aufgabe sichtbar)
- Meme-Popup bei zu vielen offenen Aufgaben (Bild in `frontend/src/assets/itsfine.png`)

### Frontend lokal starten
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Vite-Dev-Server, z. B. http://localhost:5173)
4. Spring Boot parallel starten fuer Backend-Daten (`http://localhost:8080/tasks`)

## Abgabe Meilenstein 2
- Link zum Frontend-Repository auf GitHub

## Meilenstein 3 (Deploy auf Render)

Frontend und Backend laufen online; das Frontend holt die Aufgaben per `GET /tasks`.

### Vor dem Deploy
1. Backend-URL steht in `frontend/.env.production` (`VITE_API_BASE`, ohne `/tasks`).

### Backend auf Render (Web Service)
1. Auf [render.com](https://render.com) einloggen, neues **Web Service** aus dem GitHub-Repo.
2. **Language:** Docker, **Dockerfile Path:** `./Dockerfile`
3. Nach dem Deploy testen: `https://webtech26.onrender.com/tasks` – JSON muss erscheinen.

### Frontend auf Render (Static Site)
1. **Static Site** aus demselben Repo (z. B. `webtech26-st`).
2. **Root Directory:** `frontend`
3. **Build Command:** `npm install && npm run build`
4. **Publish directory:** `dist`
5. Frontend-URL oeffnen – Aufgaben vom Backend sollten erscheinen.

### Lokal testen (vor Render)
1. Spring Boot starten (`Webtech26Application`).
2. `cd frontend` → `npm install` → `npm run dev`.
3. Oben: „X Aufgaben vom Backend geladen“.

### Abgabe Meilenstein 3
- Link zur deployten Backend-API: `https://webtech26.onrender.com/tasks`