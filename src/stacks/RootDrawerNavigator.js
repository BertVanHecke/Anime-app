import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RootBottomTabNavigator from "./RootBottomTabNavigator";

const RootDrawer = createDrawerNavigator();

const RootDrawerNavigator = () => {
  return (
    <RootDrawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootDrawer.Screen name="RootBottom" component={RootBottomTabNavigator} />
    </RootDrawer.Navigator>
  );
};

export default RootDrawerNavigator;
