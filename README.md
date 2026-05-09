# TaskWise

## Teammitglieder
- Melissa Bastas

## Uebungsgruppe / Dozent
- 2. Zug, 2. Gruppe
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