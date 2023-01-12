import { Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { usePerceptronStore } from "../store";

export default function Stats() {
  const { timeTraining, errors, iterations } = usePerceptronStore();

  return (
    <Flex direction="row" justifyContent="center" gap={20}>
      <Stat flex="unset" minW="70px">
        <StatLabel>Training for</StatLabel>
        <StatNumber>{timeTraining.toFixed(1)}s</StatNumber>
      </Stat>
      <Stat flex="unset" minW="70px">
        <StatLabel>Iterations</StatLabel>
        <StatNumber>{iterations}</StatNumber>
      </Stat>
      <Stat flex="unset" minW="70px">
        <StatLabel>Error</StatLabel>
        <StatNumber>
          {((errors * 100) / iterations || 0).toFixed(1)}%
        </StatNumber>
      </Stat>
    </Flex>
  );
}
