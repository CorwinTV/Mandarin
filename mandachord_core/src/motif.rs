use crate::grid::{Grid, COLS};
use crate::scale::{choose_row, nearest_scale_note};

const STEP: f64 = 0.125;

#[derive(Clone)]
pub struct NoteEvent {
    pub start: f64,
    pub midi: u8,
    pub dur: f64,
}

/// Прямая укладка: время → слот, высота → гамма → bass/mel.
pub fn place_direct(grid: &mut Grid, notes: &[NoteEvent], mode: &str) {
    grid.clear();

    for n in notes {
        if n.start >= 8.0 {
            continue;
        }
        if !(36..=96).contains(&n.midi) {
            continue;
        }

        let midi = nearest_scale_note(n.midi);
        let col = ((n.start / STEP).round() as usize) % COLS;

        match mode {
            "bass_riff" => {
                if midi <= 64 {
                    let row = choose_row(midi, Some("bass"));
                    grid.set(row, col, true);
                }
            }
            "lead" => {
                let row = choose_row(midi.max(60), Some("mel"));
                grid.set(row, col, true);
            }
            "lead_bass" => {
                if midi < 60 {
                    grid.set(choose_row(midi, Some("bass")), col, true);
                } else {
                    grid.set(choose_row(midi, Some("mel")), col, true);
                }
            }
            "full" => {
                if midi < 60 {
                    grid.set(choose_row(midi, Some("bass")), col, true);
                } else {
                    grid.set(choose_row(midi, Some("mel")), col, true);
                }
            }
            _ => {
                let row = choose_row(midi, None);
                grid.set(row, col, true);
            }
        }
    }

    if mode == "full" {
        add_simple_beat(grid);
    } else {
        // ударные пустые — пользователь ставит сам
        for r in 0..3 {
            for c in 0..COLS {
                grid.set(r, c, false);
            }
        }
    }
}

fn add_simple_beat(grid: &mut Grid) {
    for col in 0..COLS {
        if col % 16 == 0 || col % 16 == 8 {
            grid.set(0, col, true);
        }
        if col % 16 == 4 || col % 16 == 12 {
            grid.set(1, col, true);
        }
        if col % 4 == 2 {
            grid.set(2, col, true);
        }
    }
}