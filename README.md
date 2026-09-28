# 🍷 L'Arsenale — Database Vini

PWA per consultare da smartphone i vini dell'"Arsenale del Bandito", filtrabili per **tipologia** (bianco, rosato, rosso, bollicina, dolce) e **regione** italiana, con cantina, prezzo indicativo e descrizione per ciascuna etichetta.

## Demo

```
https://allerock.github.io/arsenale-vini/
```

## Installazione su iPhone

1. Apri il link sopra in Safari
2. Tocca l'icona di condivisione
3. "Aggiungi alla schermata Home"

## Come funzionano i dati

**`vini.txt` è l'unica fonte di dati.** L'app non ha nessun vino scritto nel codice: ad ogni avvio scarica quel file, lo legge riga per riga e mostra quello che trova. Se il file è vuoto, l'app è vuota.

## Aggiungere (o modificare) un vino

Basta modificare **`vini.txt`** direttamente su GitHub (anche da telefono, con l'editor web — nessun token necessario, solo il login GitHub):

1. Apri `vini.txt` nella repo
2. Tocca la matita (Edit)
3. Aggiungi/modifica una riga seguendo il formato spiegato nelle istruzioni in cima al file stesso:
   `Nome | Cantina | Tipo | Regione | Prezzo | Descrizione`
4. Commit diretto su `main`

L'app lo rilegge tutto alla prossima apertura, niente da ricompilare o ripubblicare.

## Struttura

| File | Contenuto |
|---|---|
| `index.html` | App (markup, stile, logica) — nessun dato vino incorporato |
| `vini.txt` | **Database completo**, letto a runtime dall'app |
| `manifest.json` | Manifest PWA (nome, icone, tema) |
| `sw.js` | Service worker per l'uso offline (cache versionata) |
| `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Icone dell'app (sfondo pieno, senza trasparenze) |

## Sviluppo

Nessuna build necessaria: sono file statici serviti direttamente da GitHub Pages.

Ad ogni modifica di `index.html`, `manifest.json` o delle icone ricordarsi di aggiornare `CACHE_NAME` in `sw.js`, altrimenti chi ha già installato l'app potrebbe continuare a vedere la versione in cache. Modificare solo `vini.txt` non richiede il bump: l'app lo scarica sempre a parte, senza passare dalla cache del service worker in modo persistente.
