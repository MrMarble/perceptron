import { SimpleGrid, Square } from "@chakra-ui/react";
import { useEffect } from "react";
import { isEqual } from "../helpers";
import useCanvas from "../hooks/useCanvas";
import { usePerceptronStore } from "../store";
import { isCircle, Shape } from "../types";

const Canvas = ({
  shape,
  onClick,
  active,
}: {
  shape: Shape;
  onClick: (shape: Shape) => void;
  active?: boolean;
}) => {
  const { ref, drawRect, drawCircle } = useCanvas();

  useEffect(() => {
    if (isCircle(shape)) {
      drawCircle(shape.x, shape.y, shape.r);
    } else {
      drawRect(shape.x, shape.y, shape.w, shape.h);
    }
  }, []);

  return (
    <Square
      bgColor="black"
      border={"1px solid black"}
      _hover={{ borderColor: "white", cursor: "pointer" }}
      onClick={() => onClick(shape)}
      borderColor={active ? "white" : undefined}
    >
      <canvas width={50} height={50} ref={ref} />
    </Square>
  );
};

export default function TrainingSet({
  set,
  onClick,
}: {
  set: Shape[];
  onClick: (shape: Shape) => void;
}) {
  const { activeShape } = usePerceptronStore();
  return (
    <SimpleGrid columns={3} spacing={3}>
      {set.map((shape, i) => (
        <Canvas
          key={i}
          shape={shape}
          onClick={onClick}
          active={isEqual(shape, activeShape)}
        />
      ))}
    </SimpleGrid>
  );
}
