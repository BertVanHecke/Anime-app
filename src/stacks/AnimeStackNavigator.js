import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimeScreen from "../screens/AnimeScreen";
import AnimeDetailsScreen from "../screens/AnimeDetailsScreen";
import { THEME } from "../../constants/constants";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AnimeStack = createNativeStackNavigator();

const AnimeStackNavigator = () => {
  const navigation = useNavigation();
  const { headerTitleContainer, headerText } = styles;
  return (
    <AnimeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.dark.background,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        headerTintColor: THEME.dark.text,
      }}
    >
      <AnimeStack.Screen
        name="AnimeScreen"
        component={AnimeScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Entypo name="grid" size={30} color={THEME.dark.primary} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <TouchableOpacity style={headerTitleContainer}>
              <Ionicons name="ios-tv" size={25} color={THEME.dark.primary} />
              <Text bold numberOfLines={1} style={headerText}>
                Anime
              </Text>
            </TouchableOpacity>
          ),
          headerRight: null,
        }}
      />
      <AnimeStack.Screen
        name="AnimeDetailsScreen"
        component={AnimeDetailsScreen}
      />
    </AnimeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: THEME.dark.text,
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
  headerTitleContainer: {
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimeStackNavigator;
