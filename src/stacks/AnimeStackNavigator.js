import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimeScreen from "../screens/AnimeScreen";
import AnimeDetailsScreen from "../screens/AnimeDetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import ProducerScreen from "../screens/ProducerScreen";

const AnimeStack = createNativeStackNavigator();

const AnimeStackNavigator = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { headerTitleContainer, headerText } = styles(colors);
  return (
    <AnimeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        headerTintColor: colors.text,
      }}
    >
      <AnimeStack.Screen
        name="AnimeScreen"
        component={AnimeScreen}
        options={{
          headerTitle: () => (
            <TouchableOpacity style={headerTitleContainer}>
              <Ionicons name="ios-tv" size={25} color={colors.primary} />
              <Text bold numberOfLines={1} style={headerText}>
                Anime
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <AnimeStack.Screen
        name="AnimeDetailsScreen"
        component={AnimeDetailsScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <Text bold numberOfLines={1} style={headerText}>
              {route.params.data.title}
            </Text>
          ),
        })}
      />
      <AnimeStack.Screen
        name="ProducerScreen"
        component={ProducerScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <Text bold numberOfLines={1} style={headerText}>
              {route.params.item.name}
            </Text>
          ),
        })}
      />
    </AnimeStack.Navigator>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    headerText: {
      color: colors.text,
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
