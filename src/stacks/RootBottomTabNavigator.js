import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnimeStackNavigator from "./AnimeStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import MangaStackNavigator from "./MangaStackNavigator";
import { useTheme } from "@react-navigation/native";
import SettingsScreen from "../screens/SettingsScreen";

const RootBottomTab = createBottomTabNavigator();

const RootBottomTabNavigator = () => {
  const { colors } = useTheme();
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color }) => {
      let iconName = "ios-home";
      let size = 24;

      switch (route.name) {
        case "AnimeStack":
          iconName = "ios-tv";
          size = 24;
          break;

        case "MangaStack":
          iconName = "ios-book";
          size = 24;
          break;

        case "SettingsScreen":
          iconName = "ios-settings";
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
      position: "absolute",
      overflow: "hidden",
      bottom: 10,
      left: 10,
      right: 10,
      height: 80,
      borderRadius: 40,
      paddingBottom: 0,
      borderTopWidth: 0,
      backgroundColor: colors.secondaryBackground,
    },
    headerStyle: {
      backgroundColor: colors.background,
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
      <RootBottomTab.Screen
        name="MangaStack"
        options={{ headerShown: false }}
        children={(navigation) => <MangaStackNavigator {...navigation} />}
      />
      <RootBottomTab.Screen
        name="SettingsScreen"
        options={{ headerShown: false }}
        children={(navigation) => <SettingsScreen {...navigation} />}
      />
    </RootBottomTab.Navigator>
  );
};

export default RootBottomTabNavigator;
