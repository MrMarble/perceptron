import { Circle, isCircle, Rect, Shape } from "./types";

export const rand = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

export const choose = <T>(array: T[]): T => {
  return array[rand(0, array.length - 1)];
};

export const isEqual = (a: unknown, b: unknown): boolean => {
  const srt = (obj: unknown) => JSON.stringify(obj)?.split("").sort().join("");
  return srt(a) === srt(b);
};

export const randomRect = (min: number, max: number): Rect => {
  const w = rand(min, max);
  const h = rand(min, max);
  const x = rand(0, max - w);
  const y = rand(0, max - h);
  return {
    x,
    y,
    w,
    h,
  };
};

export const randomCircle = (min: number, max: number): Circle => {
  const r = rand(min / 2, max / 2);
  const x = rand(r, max - r);
  const y = rand(r, max - r);
  return {
    x,
    y,
    r,
  };
};

export const getPixels = (shape: Shape, min: number, max: number): number[] => {
  const pixels = Array(max * max).fill(0);
  if (isCircle(shape)) {
    for (let x = 0; x < max; x++) {
      for (let y = 0; y < max; y++) {
        const d = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
        if (d < shape.r) {
          pixels[x + y * max] = 1;
        }
      }
    }
  } else {
    for (let x = 0; x < max; x++) {
      for (let y = 0; y < max; y++) {
        if (
          x > shape.x &&
          x < shape.x + shape.w &&
          y > shape.y &&
          y < shape.y + shape.h
        ) {
          pixels[x + y * max] = 1;
        }
      }
    }
  }

  return pixels;
};
