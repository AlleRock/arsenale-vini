# 🍷 L'Arsenale — Database Vini

PWA per consultare da smartphone i 101 vini dell'"Arsenale del Bandito", filtrabili per **tipologia** (bianco, rosato, rosso, bollicina, dolce) e **regione** italiana, con cantina, prezzo indicativo e descrizione per ciascuna etichetta.

Nessun salvataggio dati: è un database statico di sola consultazione.

## Demo

Una volta attivato GitHub Pages su questa repo, l'app sarà raggiungibile su:

```
https://<utente>.github.io/<repo>/
```

## Installazione su iPhone

1. Apri il link sopra in Safari
2. Tocca l'icona di condivisione
3. "Aggiungi alla schermata Home"

## Struttura

| File | Contenuto |
|---|---|
| `index.html` | App (markup, stile, dati e logica) |
| `manifest.json` | Manifest PWA (nome, icone, tema) |
| `sw.js` | Service worker per l'uso offline (cache versionata) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Icone dell'app |

## Sviluppo

Nessuna build necessaria: sono file statici serviti direttamente da GitHub Pages.

Ad ogni modifica di `index.html` ricordarsi di aggiornare `CACHE_NAME` in `sw.js`, altrimenti gli utenti che hanno già installato l'app potrebbero continuare a vedere la versione cache fino alla scadenza naturale della cache del browser.
