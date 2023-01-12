import { useRef } from "react";

const learningRate = 0.5;

export default function usePerceptron(numWeights: number) {
  const weights = useRef(Array(numWeights).fill(0));

  const guess = (inputs: number[]) => {
    const sum = inputs.reduce((acc, input, i) => {
      return acc + input * weights.current[i];
    }, 0);

    return sum > 0 ? 1 : 0;
  };

  const train = (inputs: number[], target: number) => {
    const guessValue = guess(inputs);
    if (guessValue !== target && target === 1) {
      weights.current = weights.current.map(
        (weight, i) => weight + inputs[i] * learningRate,
      );
    } else if (guessValue !== target && target === 0) {
      weights.current = weights.current.map(
        (weight, i) => weight - inputs[i] * learningRate,
      );
    }
    return guessValue;
  };

  return { weights, guess, train };
}
