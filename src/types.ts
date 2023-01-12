export interface Circle {
  x: number;
  y: number;
  r: number;
}

export function isCircle(s: Shape): s is Circle {
  return "r" in s;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Shape = Circle | Rect;
