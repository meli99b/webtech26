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
- Vue-Frontend im Ordner `frontend/`
- Eigene Komponente `TaskList`
- Listen-Rendering mit `v-for` (Aufgaben + Teilaufgaben)
- Nutzer kann eine Aufgabe eingeben, die automatisch in kleine Schritte zerlegt wird
- Teilaufgaben koennen einzeln abgehakt werden (Fortschritt pro Aufgabe sichtbar)
- Meme-Popup bei zu vielen offenen Aufgaben (inkl. Bild aus `frontend/assets/itsfine.png`)

### Frontend testen
1. `frontend/index.html` im Browser oeffnen
2. Aufgabe eingeben und `Enter` druecken
3. Automatisch erzeugte Teilaufgaben pruefen
4. Teilaufgaben abhaken und Fortschritt kontrollieren

## Abgabe Meilenstein 2
- Link zum Frontend-Repository auf GitHub

## Meilenstein 3 (Deploy auf Render)

Frontend und Backend laufen online; das Frontend holt die Aufgaben per `GET /tasks`.

### Vor dem Deploy
1. In `frontend/config.js` bei `RENDER_BACKEND_URL` die Render-URL deines Backends eintragen (ohne `/tasks` am Ende).

### Backend auf Render (Web Service)
1. Auf [render.com](https://render.com) einloggen, neues **Web Service** aus dem GitHub-Repo.
2. **Build Command:** `./gradlew build -x test`
3. **Start Command:** `java -jar build/libs/webtech26-0.0.1-SNAPSHOT.jar`
4. Nach dem Deploy testen: `https://taskwise-app.onrender.com/tasks` im Browser – JSON muss erscheinen.

### Frontend auf Render (Static Site)
1. Neues **Static Site** aus demselben Repo.
2. **Publish directory:** `frontend`
3. Nach dem Deploy die Frontend-URL im Browser öffnen – Aufgaben vom Backend sollten erscheinen.

### Lokal testen (vor Render)
1. Spring Boot starten (`Webtech26Application`).
2. `frontend/index.html` im Browser öffnen.
3. Oben sollte stehen: „X Aufgaben vom Backend geladen“ (Daten von `http://localhost:8080/tasks`).

### Abgabe Meilenstein 3
- Link zur deployten Backend-API: `https://taskwise-app.onrender.com/tasks`