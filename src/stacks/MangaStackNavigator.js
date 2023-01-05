import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MangaScreen from "../screens/MangaScreen";
import MangaDetailsScreen from "../screens/MangaDetailsScreen";
import ProducerScreen from "../screens/ProducerScreen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";

const MangaStack = createNativeStackNavigator();

const MangaStackNavigator = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { headerTitleContainer, headerText } = styles(colors);
  return (
    <MangaStack.Navigator
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
      <MangaStack.Screen
        name="MangaScreen"
        component={MangaScreen}
        options={{
          headerTitle: () => (
            <TouchableOpacity style={headerTitleContainer}>
              <Ionicons name="ios-tv" size={25} color={colors.primary} />
              <Text bold numberOfLines={1} style={headerText}>
                Manga
              </Text>
            </TouchableOpacity>
          ),
          headerRight: null,
        }}
      />
      <MangaStack.Screen
        name="MangaDetailsScreen"
        component={MangaDetailsScreen}
      />
    </MangaStack.Navigator>
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

export default MangaStackNavigator;
