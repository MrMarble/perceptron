import { Box, Flex, Heading, Square, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { MAX_IMAGE_SIZE } from "./App";
import useCanvas from "../hooks/useCanvas";
import useLinearInterpolation from "../hooks/useLinearInterpolation";

const COLORS = [
  [88, 28, 135], // purple
  [20, 184, 166], // teal
  [250, 204, 21], // yellow
];

export default function Weights({ weights }: { weights: number[] }) {
  const { drawRect, ref } = useCanvas();
  const { interpolate, max } = useLinearInterpolation(COLORS);

  const SCALE = 300 / MAX_IMAGE_SIZE;
  const scales = [1, 0.75, 0.5, 0.25, 0, -0.25, -0.5, -0.75, -1];

  useEffect(() => {
    for (let x = 0; x < MAX_IMAGE_SIZE; x++) {
      for (let y = 0; y < MAX_IMAGE_SIZE; y++) {
        const i = y * MAX_IMAGE_SIZE + x;
        const weight = weights[i];
        const color = `rgba(${interpolate(weight).join(",")})`;

        drawRect(x * SCALE, y * SCALE, SCALE, SCALE, color);
      }
    }
  }, [weights]);

  return (
    <Flex direction="row" gap={4} alignItems="center">
      <Flex direction="column" pb="12">
        <Heading fontSize="5xl" textAlign="center" fontWeight="bold">
          WEIGHTS
        </Heading>
        <Square size="300px" bgColor="gray.200" color="black">
          <canvas width={300} height={300} ref={ref} />
        </Square>
      </Flex>
      <Flex>
        <Box
          border="2px solid white"
          w="24px"
          bgGradient="linear(to-t,purple.900,teal.500,yellow.400)"
        />
        <Flex
          direction="column"
          justifyContent="space-between"
          gap={3}
          minW="55px"
        >
          {scales.map((scale, i) => (
            <Text
              key={`${scale}-${i}`}
              fontSize="xl"
              _before={{
                content: `"-"`,
                ml: -1,
                mr: 1,
                fontWeight: "bold",
                fontSize: "xl",
              }}
            >
              {scale * max}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
