mod export;
mod grid;
mod motif;
mod scale;

use export::export_song;
use grid::Grid;
use motif::{place_direct, NoteEvent};
use wasm_bindgen::prelude::*;

#[cfg(feature = "console_error_panic_hook")]
#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn create_empty_grid() -> Grid {
    Grid::new()
}

#[wasm_bindgen]
pub fn quantize_and_set(grid: &mut Grid, time_sec: f64, midi: u8) {
    let slot = ((time_sec / 0.125).round() as usize) % 64;
    let row = scale::choose_row(midi, None);
    grid.set(row, slot, true);
}

#[wasm_bindgen]
pub fn place_notes_direct(
    grid: &mut Grid,
    times: &[f64],
    midis: &[u8],
    durs: &[f64],
    mode: &str,
) {
    let len = times.len().min(midis.len()).min(durs.len());
    let mut notes = Vec::with_capacity(len);
    for i in 0..len {
        notes.push(NoteEvent {
            start: times[i],
            midi: midis[i],
            dur: if durs[i] > 0.0 { durs[i] } else { 0.15 },
        });
    }
    place_direct(grid, &notes, mode);
}

/// совместимость со старым именем
#[wasm_bindgen]
pub fn place_notes_sparse(
    grid: &mut Grid,
    times: &[f64],
    midis: &[u8],
    durs: &[f64],
    mode: &str,
) {
    place_notes_direct(grid, times, midis, durs, mode);
}

#[wasm_bindgen]
pub fn export_to_song_code(
    grid: &Grid,
    title: &str,
    perc_pack: &str,
    bass_pack: &str,
    mel_pack: &str,
) -> String {
    export_song(grid, title, perc_pack, bass_pack, mel_pack)
}