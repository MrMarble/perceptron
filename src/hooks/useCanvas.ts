import { useEffect, useMemo, useRef } from "react";

export default function useCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  let canvas: HTMLCanvasElement, context: CanvasRenderingContext2D;

  const drawRect = useMemo(
    () =>
      (x: number, y: number, w: number, h: number, color = "white") => {
        context.fillStyle = color;
        context.fillRect(x, y, w, h);
      },
    [],
  );

  const drawCircle = (x: number, y: number, r: number, color = "white") => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fill();
  };

  const clear = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (ref.current) {
      canvas = ref.current;
      context = canvas.getContext("2d") as CanvasRenderingContext2D;
    }
  }, []);

  return { ref, drawCircle, drawRect, clear };
}
