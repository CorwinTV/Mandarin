/* tslint:disable */
/* eslint-disable */

export class Grid {
    free(): void;
    [Symbol.dispose](): void;
    clear(): void;
    get(row: number, col: number): boolean;
    constructor();
    set(row: number, col: number, value: boolean): void;
    toggle(row: number, col: number): void;
}

export function create_empty_grid(): Grid;

export function export_to_song_code(grid: Grid, title: string, perc_pack: string, bass_pack: string, mel_pack: string): string;

export function place_notes_direct(grid: Grid, times: Float64Array, midis: Uint8Array, durs: Float64Array, mode: string): void;

/**
 * совместимость со старым именем
 */
export function place_notes_sparse(grid: Grid, times: Float64Array, midis: Uint8Array, durs: Float64Array, mode: string): void;

export function quantize_and_set(grid: Grid, time_sec: number, midi: number): void;

export function start(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly create_empty_grid: () => number;
    readonly export_to_song_code: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number];
    readonly place_notes_direct: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
    readonly place_notes_sparse: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
    readonly quantize_and_set: (a: number, b: number, c: number) => void;
    readonly start: () => void;
    readonly __wbg_grid_free: (a: number, b: number) => void;
    readonly grid_clear: (a: number) => void;
    readonly grid_get: (a: number, b: number, c: number) => number;
    readonly grid_new: () => number;
    readonly grid_set: (a: number, b: number, c: number, d: number) => void;
    readonly grid_toggle: (a: number, b: number, c: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
