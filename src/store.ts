import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Shape } from "./types";

interface PerceptronState {
  output: number;
  activeShape: Shape | null;
  training: number | undefined;
  timeTraining: number;
  iterations: number;
  errors: number;
  speed: number;
  updateTraining: (shape: Shape, output: number, expected: number) => void;
  predict: (shape: Shape, output: number) => void;
  timemout: (time: number | undefined) => void;
  setSpeed: (speed: number) => void;
}

export const usePerceptronStore = create<PerceptronState>()(
  devtools(
    (set) => ({
      output: 0,
      activeShape: null,
      training: undefined,
      timeTraining: 0,
      iterations: 0,
      errors: 0,
      speed: 100,
      updateTraining(shape, output, expected) {
        set((state) => ({
          ...state,
          activeShape: shape,
          output,
          iterations: state.iterations + 1,
          errors: state.errors + (output === expected ? 0 : 1),
        }));
      },
      predict(shape, output) {
        set((state) => ({
          ...state,
          output,
          activeShape: shape,
        }));
      },
      timemout(time) {
        set((state) => ({
          ...state,
          training: time,
          timeTraining: time
            ? state.timeTraining + state.speed / 1000
            : state.timeTraining,
        }));
      },
      setSpeed(speed) {
        set((state) => ({
          ...state,
          speed,
        }));
      },
    }),
    {
      name: "perceptron-storage",
    },
  ),
);
