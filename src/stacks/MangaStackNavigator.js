import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MangaScreen from "../screens/MangaScreen";
import MangaDetailsScreen from "../screens/MangaDetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const MangaStack = createNativeStackNavigator();

const MangaStackNavigator = () => {
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
            <View style={headerTitleContainer}>
              <Ionicons name="ios-tv" size={25} color={colors.primary} />
              <Text bold numberOfLines={1} style={headerText}>
                Manga
              </Text>
            </View>
          ),
        }}
      />
      <MangaStack.Screen
        name="MangaDetailsScreen"
        component={MangaDetailsScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <Text bold numberOfLines={1} style={headerText}>
              {route.params.data.title}
            </Text>
          ),
        })}
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
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default MangaStackNavigator;
