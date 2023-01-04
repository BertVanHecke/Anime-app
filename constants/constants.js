import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const BASE_URL = "";
export const WIDTH = width;
export const HEIGHT = height;

export const THEME = {
  light: {
    primary: "#2EAEBE",
    secondary: "#2D3240",
    background: "#1A1D25",
  },
  dark: {
    primary: "#2EAEBE",
    secondary: "#2D3240",
    background: "#1A1D25",
    text: "#FEFEFE"
  },
};
