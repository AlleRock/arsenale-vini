# 🍷 L'Arsenale — Database Vini

PWA per consultare da smartphone i 101 vini dell'"Arsenale del Bandito", filtrabili per **tipologia** (bianco, rosato, rosso, bollicina, dolce) e **regione** italiana, con cantina, prezzo indicativo e descrizione per ciascuna etichetta.

## Demo

```
https://allerock.github.io/arsenale-vini/
```

## Installazione su iPhone

1. Apri il link sopra in Safari
2. Tocca l'icona di condivisione
3. "Aggiungi alla schermata Home"

## Aggiungere un vino

Non serve toccare `index.html`: basta modificare **`vini-custom.txt`** direttamente su GitHub (anche da telefono, con l'editor web — nessun token necessario, solo il login GitHub):

1. Apri `vini-custom.txt` nella repo
2. Tocca la matita (Edit)
3. Aggiungi una riga in fondo seguendo il formato spiegato nelle istruzioni del file stesso:
   `Nome | Cantina | Tipo | Regione | Prezzo | Descrizione`
4. Commit diretto su `main`

L'app li legge al volo ad ogni apertura (fetch di `vini-custom.txt`), niente da ricompilare o ripubblicare.

## Struttura

| File | Contenuto |
|---|---|
| `index.html` | App (markup, stile, catalogo dei 101 vini e logica) |
| `vini-custom.txt` | Vini aggiunti a mano, letti a runtime dall'app |
| `manifest.json` | Manifest PWA (nome, icone, tema) |
| `sw.js` | Service worker per l'uso offline (cache versionata) |
| `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Icone dell'app (sfondo pieno, senza trasparenze) |

## Sviluppo

Nessuna build necessaria: sono file statici serviti direttamente da GitHub Pages.

Ad ogni modifica di `index.html`, `manifest.json` o delle icone ricordarsi di aggiornare `CACHE_NAME` in `sw.js`, altrimenti chi ha già installato l'app potrebbe continuare a vedere la versione in cache. Modificare solo `vini-custom.txt` non richiede il bump: l'app lo scarica sempre a parte.
