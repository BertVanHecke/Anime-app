import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const BASE_URL = "https://api.jikan.moe/v4/";
export const WIDTH = width;
export const HEIGHT = height;

export const DARKTHEME = {
  dark: true,
  colors: {
    primary: "#2EAEBE",
    secondary: "#2D3240",
    background: "#1A1D25",
    secondaryBackground: "#2D3240",
    card: 'rgb(255, 255, 255)',
    text: "#FEFEFE",
    secondaryText: "#8C8585",
    border: "#1A1D25",
    notification: 'rgb(255, 69, 58)',
  },
};

export const LIGHTTHEME = {
  dark: false,
  colors: {
    primary: "#2EAEBE",
    secondary: "#2D3240",
    background: "#FEFEFE",
    secondaryBackground: "#EEEEEE",
    card: 'rgb(255, 255, 255)',
    text: "#1A1D25",
    secondaryText: "#8C8585",
    border: "#FEFEFE",
    notification: 'rgb(255, 69, 58)',
  },
};
