import { useState } from "react";

export default function useLinearInterpolation(colors: number[][]) {
  const [min, setMin] = useState(-1);
  const [max, setMax] = useState(1);

  const interpolate = (value: number) => {
    let _max = max;
    let _min = min;
    if (value > max) {
      _max = Math.ceil(value);
      setMax(_max);
    }
    if (value < min) {
      _min = Math.floor(value);
      setMin(_min);
    }
    const i_f = ((value - _min) / (_max - _min)) * (colors.length - 1);
    const i = Math.abs(Math.floor(i_f));
    const f = i_f % 1;
    if (f === 0) return [...colors[i], 255];

    return [
      Math.floor(colors[i][0] * (1 - f) + colors[i + 1][0] * f),
      Math.floor(colors[i][1] * (1 - f) + colors[i + 1][1] * f),
      Math.floor(colors[i][2] * (1 - f) + colors[i + 1][2] * f),
      255,
    ];
  };

  return { interpolate, min, max };
}
