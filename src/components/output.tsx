import { Circle, Text } from "@chakra-ui/react";
import { usePerceptronStore } from "../store";
import { isCircle } from "../types";

export default function Output() {
  const { activeShape, output } = usePerceptronStore();
  let color;

  if (activeShape) {
    if (isCircle(activeShape) && output === 1) {
      color = "green";
    } else if (!isCircle(activeShape) && output === 0) {
      color = "green";
    } else {
      color = "red";
    }
  }

  return (
    <Circle
      size="150px"
      bgColor="gray.200"
      color="black"
      border="2px solid black"
      borderColor={color}
      boxShadow={`0 0 15px 4px ${color}`}
      title="Output"
    >
      <Text fontSize="6xl" fontWeight="bold">
        {output}
      </Text>
    </Circle>
  );
}
