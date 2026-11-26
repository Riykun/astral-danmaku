# Optional C / WebAssembly core

The web game continues to run in its current JavaScript/Canvas 2D runtime.
This directory starts a separate C core for CPU-heavy math that can be compiled
to WebAssembly later (circle collision and clamping).

## Current status
- `core.c`: C source added; not yet compiled or loaded by the live game.
- JavaScript remains the fallback and the actual game runtime.
- Vercel's static deployment does not compile C automatically.

## Next integration step
Build with Emscripten (`emcc`) in a dedicated build workflow, expose the C
functions with a stable WASM interface, then load the artifact asynchronously
with a fallback to JavaScript. Only switch live gameplay to WASM after testing
both paths on desktop and mobile browsers.
