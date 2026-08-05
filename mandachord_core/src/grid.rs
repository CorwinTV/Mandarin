use wasm_bindgen::prelude::*;

pub const ROWS: usize = 13;
pub const COLS: usize = 64;

#[wasm_bindgen]
#[derive(Clone)]
pub struct Grid {
    notes: Vec<Vec<bool>>,
}

#[wasm_bindgen]
impl Grid {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Grid {
        Grid {
            notes: vec![vec![false; COLS]; ROWS],
        }
    }

    pub fn toggle(&mut self, row: usize, col: usize) {
        if row < ROWS && col < COLS {
            self.notes[row][col] = !self.notes[row][col];
        }
    }

    pub fn set(&mut self, row: usize, col: usize, value: bool) {
        if row < ROWS && col < COLS {
            self.notes[row][col] = value;
        }
    }

    pub fn get(&self, row: usize, col: usize) -> bool {
        if row < ROWS && col < COLS {
            self.notes[row][col]
        } else {
            false
        }
    }

    pub fn clear(&mut self) {
        for row in &mut self.notes {
            for c in row.iter_mut() {
                *c = false;
            }
        }
    }
}

pub fn create_empty_grid() -> Grid {
    Grid::new()
}