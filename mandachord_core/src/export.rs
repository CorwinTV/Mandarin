use crate::grid::{Grid, COLS, ROWS};
use base64::{engine::general_purpose::STANDARD, Engine};

fn set_bit(bytes: &mut Vec<u8>, row: usize, col: usize, value: bool, offset: usize) {
    let bit = row * COLS + col;
    let byte_index = offset + (bit >> 3);
    let bit_index = 7 - (bit & 7) as u8;
    while bytes.len() <= byte_index {
        bytes.push(0);
    }
    if value {
        bytes[byte_index] |= 1 << bit_index;
    } else {
        bytes[byte_index] &= !(1 << bit_index);
    }
}

pub fn export_song(
    grid: &Grid,
    title: &str,
    perc_pack: &str,
    bass_pack: &str,
    mel_pack: &str,
) -> String {
    let mut bytes = vec![0u8; 6];
    for row in 0..ROWS {
        for col in 0..COLS {
            set_bit(&mut bytes, row, col, grid.get(row, col), 6);
        }
    }
    while bytes.len() > 6 && bytes.last() == Some(&0) {
        bytes.pop();
    }
    let b64 = STANDARD.encode(&bytes);
    format!("[SONG-{}:{}:{}:{}:{}]", title, b64, perc_pack, bass_pack, mel_pack)
}