import React, {useEffect, useState } from "react";
import { LIGHTTHEME, DARKTHEME } from "./constants/constants";

import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./src/stacks/RootStackNavigator";
import { EventRegister } from "react-native-event-listeners";
import { StatusBar } from "react-native";

export default function App() {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setTheme(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  return (
    <NavigationContainer theme={theme ? LIGHTTHEME : DARKTHEME}>
      <StatusBar barStyle={theme? "dark-content" : "light-content"}/>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
