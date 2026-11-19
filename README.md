# osgroup.dk

Statisk hjemmeside for OS Group ApS (hostes på GitHub Pages). Sider ligger som `<mappe>/index.html`, fælles styling i `styles.css`, lille script i `site.js`.
Åbne stillinger: se `aabne-stillinger/index.html`.

## Åbne stillinger (jobopslag)
Jobopslagene ligger i `jobs.json`. Siden bygges med `python3 tools/build_jobs.py`, som skriver kortene ind i `aabne-stillinger/index.html`.
- Nyt opslag: tilføj et objekt i `jobs.json` (kopieres fra udbudsportalen: knappen "Jobopslag" → "Kopiér til hjemmesiden").
- Fjern opslag: sæt `"status": "lukket"`. Kør derefter scriptet og commit.
