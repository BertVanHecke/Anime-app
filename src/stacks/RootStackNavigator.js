import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootBottomTabNavigator from "./RootBottomTabNavigator";
const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="RootBottom" component={RootBottomTabNavigator} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
