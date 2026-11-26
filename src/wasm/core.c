#include <math.h>
#include <stdbool.h>

/* Small, portable game-core routines intended for optional WebAssembly use.
   Keep a JavaScript fallback until a WASM build is configured. */

int astral_circle_hit(float ax, float ay, float ar, float bx, float by, float br) {
  float dx = ax - bx;
  float dy = ay - by;
  float sum = ar + br;
  return (dx * dx + dy * dy) <= (sum * sum);
}

float astral_clamp(float value, float low, float high) {
  return value < low ? low : (value > high ? high : value);
}
