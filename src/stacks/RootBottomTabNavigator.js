import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnimeStackNavigator from "./AnimeStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../../constants/constants";

const RootBottomTab = createBottomTabNavigator();

const RootBottomTabNavigator = () => {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color }) => {
      let iconName = "ios-home";
      let size = 24;

      switch (route.name) {
        case "AnimeStack":
          iconName = "ios-tv";
          size = 24;
          break;

        case "Filter":
          iconName = "ios-filter";
          size = 24;
          break;

        case "Search":
          iconName = "ios-search";
          size = 23;
          break;

        default:
          iconName = "ios-home";
          size = 24;
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarShowLabel: false,
    tabBarStyle: {
      borderTopWidth: 1,
      borderTopColor: THEME.dark.background,
      backgroundColor: THEME.dark.background,
    },
    headerStyle: {
      backgroundColor: THEME.dark.background,
      elevation: 0, // for Android
      shadowOffset: {
        width: 0,
        height: 0, // for iOS
      },
    },
  });

  return (
    <RootBottomTab.Navigator
      screenOptions={screenOptions}
      initialRouteName="AnimeStack"
    >
      <RootBottomTab.Screen
        name="AnimeStack"
        options={{ headerShown: false }}
        children={(navigation) => <AnimeStackNavigator {...navigation} />}
      />
    </RootBottomTab.Navigator>
  );
};

export default RootBottomTabNavigator;
