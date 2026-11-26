# ASTRAL Hybrid Engine

The legacy game stays as the live fallback while new modules are developed.

## Proposed stack
- HTML/CSS: interface and menus
- TypeScript: simulation, stages, input and entity systems
- PixiJS: GPU rendering and effects
- C + WebAssembly: hot math/collision routines after profiling
- Web Audio: sound system
- JSON: stage/enemy/pattern data

## Modules started
- `GameClock`: bounded fixed-step simulation clock
- `BulletPool`: reusable bullet objects
- `collision.ts`: JS fallback matching C API
- `PixiRenderer`: renderer foundation, not connected to live game yet
- `src/wasm/core.c`: C math, not yet compiled or loaded as WASM


## Migration safety
1. Keep the current playable build as a fallback.
2. Port one subsystem at a time and smoke-test it.
3. Profile before moving logic into WASM.
4. Do not switch the live renderer or WASM path until mobile and desktop tests pass.
