import {
  ChakraBaseProvider,
  ColorModeScript,
  extendBaseTheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

const { Button, Divider, Stat, Slider, FormLabel } = chakraTheme.components;

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendBaseTheme({
  components: {
    Button,
    Divider,
    Stat,
    FormLabel,
    Slider,
  },
  config,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <ColorModeScript
        initialColorMode={theme.config.initialColorMode}
        type="localStorage"
      />
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>,
);
