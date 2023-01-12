import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import Output from "./output";
import Stats from "./stats";
import TrainingSet from "./trainingSet";
import Weights from "./weights";
import { choose, getPixels, randomCircle, randomRect } from "../helpers";
import usePerceptron from "../hooks/usePerceptron";
import { isCircle, Shape } from "../types";
import { usePerceptronStore } from "../store";

export const MAX_IMAGE_SIZE = 50;
const MIN_IMAGE_SIZE = 10;
const NUM_IMAGES = 9;

const NUM_WEIGHTS = MAX_IMAGE_SIZE * MAX_IMAGE_SIZE;

const rects = Array(NUM_IMAGES)
  .fill(0)
  .map(() => randomRect(MIN_IMAGE_SIZE, MAX_IMAGE_SIZE));

const circles = Array(NUM_IMAGES)
  .fill(0)
  .map(() => randomCircle(MIN_IMAGE_SIZE, MAX_IMAGE_SIZE));

const trainingSet = [...rects, ...circles].map((image) => ({
  image,
  label: isCircle(image) ? 1 : 0,
  pixels: getPixels(image, MIN_IMAGE_SIZE, MAX_IMAGE_SIZE),
}));

function App() {
  const { updateTraining, predict, timemout, setSpeed, training, speed } =
    usePerceptronStore();

  const { weights, train, guess } = usePerceptron(NUM_WEIGHTS);

  const trainPerceptron = () => {
    const { image, label, pixels } = choose(trainingSet) || {};
    const output = train(pixels, label);

    updateTraining(image, output, label);
  };

  const testPerceptron = (shape: Shape) => {
    predict(shape, guess(getPixels(shape, MIN_IMAGE_SIZE, MAX_IMAGE_SIZE)));
  };

  const loop = () => {
    if (training) {
      clearTimeout(training);
      timemout(undefined);
      return;
    }
    trainPerceptron();
    timemout(setTimeout(loop, speed));
  };

  return (
    <Container height="100vh" centerContent>
      <Box m="auto">
        <Flex direction="row" gap="2em">
          <Flex direction="column" gap="1em">
            <Flex gap={6}>
              <TrainingSet set={rects} onClick={testPerceptron} />
              <TrainingSet set={circles} onClick={testPerceptron} />
            </Flex>
            <Center mt="2em">
              <Output />
            </Center>
          </Flex>
          <Weights weights={weights.current} />
        </Flex>
        <Divider mb={5} />
        <Flex direction="row" justifyContent="center" mb={10} gap={10}>
          <Button onClick={loop} colorScheme={training ? "red" : "teal"}>
            {training ? "Stop" : "Train"}
          </Button>
          <Box w="xs">
            <Slider
              aria-label="speed"
              defaultValue={100}
              min={10}
              step={10}
              max={1000}
              onChangeEnd={(val) => setSpeed(val)}
              isDisabled={!!training}
              title="Speed"
            >
              <SliderMark value={10} mt={2} ml={-2.5}>
                0.01s
              </SliderMark>
              <SliderMark value={250} mt={2} ml={-2.5}>
                0.25s
              </SliderMark>
              <SliderMark value={500} mt={2} ml={-2.5}>
                0.5s
              </SliderMark>
              <SliderMark value={750} mt={2} ml={-2.5}>
                0.75s
              </SliderMark>
              <SliderMark value={1000} mt={2} ml={-2.5}>
                1s
              </SliderMark>

              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Flex>
        <Stats />
      </Box>
    </Container>
  );
}

export default App;
