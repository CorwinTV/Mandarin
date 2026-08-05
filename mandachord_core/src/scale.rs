/// D minor pentatonic: D F G A C
const SCALE: [u8; 5] = [62, 65, 67, 69, 72];
const SCALE_PC: [u8; 5] = [2, 5, 7, 9, 0];

pub fn nearest_scale_note(midi: u8) -> u8 {
    let mut best = SCALE[0];
    let mut min_dist = i16::MAX;

    for oct in 0..=5i16 {
        for &base in &SCALE {
            let candidate = base as i16 + 12 * (oct - 2);
            if !(24..=96).contains(&candidate) {
                continue;
            }
            let dist = (candidate - midi as i16).abs();
            if dist < min_dist {
                min_dist = dist;
                best = candidate as u8;
            }
        }
    }
    best
}

fn scale_index(midi: u8) -> usize {
    let pc = nearest_scale_note(midi) % 12;
    SCALE_PC.iter().position(|&p| p == pc).unwrap_or(0)
}

/// force: "bass" | "mel" | None
pub fn choose_row(midi: u8, force: Option<&str>) -> usize {
    let note = nearest_scale_note(midi);
    let idx = scale_index(note);
    match force {
        Some("bass") => 3 + idx,
        Some("mel") => 8 + idx,
        _ => {
            if note < 60 {
                3 + idx
            } else {
                8 + idx
            }
        }
    }
}