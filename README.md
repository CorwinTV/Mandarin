# Mandarin

Unofficial browser tool: **audio / MIDI → Warframe Mandachord grid**.

Upload a short melody (or MIDI), get notes, map them onto a 13×64 Mandachord-style grid, preview with instrument packs, export MIDI or PNG.

**Live:**   https://corwintv.github.io/Mandarin/  
**Repo:**   https://github.com/CorwinTV/Mandarin  

> **Fan project.** Not affiliated with, endorsed by, or associated with Digital Extremes Ltd.  
> Warframe® and Mandachord are trademarks / IP of Digital Extremes.  
> Non-commercial use only. See [License & credits](##license--credits).

## Features

- **Audio → notes** via Spotify Basic Pitch (runs fully in the browser)
- **MIDI upload** and **Save MIDI** from detected notes
- Piano-roll preview with loop playback
- Editable **Mandachord grid** (13 rows × 64 steps)
- Modes: Lead · Bass riff · Lead + Bass · Full (beat)
- Instrument packs: Adau, Alpha, Beta, Bombast, Delta, Druk, Epsilon, Gamma, Horos, Plogg
- **Play Grid** with pack samples
- **Save PNG** (grid + pack names + bar markers)

Everything runs client-side. No backend, no upload of your files to a server.

## Usage

1. Open the [site](https://corwintv.github.io/Mandarin/).
2. Upload **MP3 / WAV / OGG / M4A** or **MID / MIDI**.
3. Wait for analysis (audio) or parse (MIDI).
4. In the editor:
   - Check the piano roll → **Play** / **Save MIDI**
   - Pick packs and mode → grid updates
   - Click cells to edit
   - **Play Grid** / **Save PNG** / **New Song**

**Tips:** best results with ~8s isolated melody or stem. Dense full mixes will be noisier.

## Stack

| Piece                                                                   | Role                                  |
|--------                                                                 |------                                 |
| Static HTML / JS | UI |
| [Tone.js](https://tonejs.github.io/)                                    | Playback, transport                   |
| [@tonejs/midi](https://github.com/Tonejs/Midi)                          | MIDI read/write                       |
| [@spotify/basic-pitch](https://github.com/spotify/basic-pitch-ts)       | Audio → notes (TF.js model)           |
| Rust → WASM (`mandachord_core`)                                         | Grid placement (`place_notes_direct`) |

Vendored under `docs/vendor/` (no runtime CDN). GitHub Pages serves `docs/`.

## Project layout
```
mandarin/
├── docs/                 # GitHub Pages root
│   ├── index.html        # Upload
│   ├── editor.html       # Piano roll + grid
│   ├── vendor/
│   │   ├── Tone.js
│   │   ├── midi.js
│   │   ├── basic-pitch.js
│   │   └── basic-pitch/model/
│   ├── pkg/              # WASM (mandachord_core)
│   ├── mp3-hifi/         # Pack samples (game-derived)
│   └── img/
└── mandachord_core/      # Rust sources (optional rebuild)
```

# Local preview

Serve the docs folder over HTTP (modules / WASM need a server):
```
npx serve docs
# or: python -m http.server -d docs
```
Open the printed URL. Hard-refresh after changes: Ctrl+Shift+R.

## License & credits

This project’s codeSource under docs/*.html, mandachord_core/, 
and project scripts: MIT (see LICENSE), unless noted otherwise.

| Library                                  | License |
|---------                                 |---------|
| Tone.js                                  | MIT © Yotam Mann |
| @tonejs/midi                             | MIT |
| @spotify/basic-pitch (incl. model)       | Apache-2.0 © Spotify AB |
| TensorFlow.js (bundled with Basic Pitch) | Apache-2.0 © Google |

Copies of notices may live under NOTICE / docs/licenses/.


Warframe assets

Instrument samples, pack names, and Mandachord layout are © Digital Extremes Ltd.
They are not covered by this repo’s MIT license and must not be reused commercially.
This tool is an unofficial fan utility for personal / non-commercial use under DE’s community guidelines.


Disclaimer

Provided as-is, without warranty. Use at your own risk.
Digital Extremes may request changes or removal of fan content that uses their IP.

