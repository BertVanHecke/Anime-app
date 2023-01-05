import {
  View,
  Text,
  SafeAreaView,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import { useTheme } from "@react-navigation/native";

const SettingsScreen = () => {
  const [theme, setTheme] = useState(false);
  const { colors } = useTheme();

  const handleOnSwitchChange = () => {
    setTheme((prev) => !prev);
  };

  useEffect(() => {
    EventRegister.emit("changeTheme", theme);
  }, [theme]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ color: colors.text }}>
          {theme ? "Light" : "Dark"} mode
        </Text>
        <Switch value={theme} onValueChange={handleOnSwitchChange} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
