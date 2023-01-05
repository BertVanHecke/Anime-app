import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { memo } from "react";
import { BlurView } from "expo-blur";
import { useNavigation, useTheme } from "@react-navigation/native";
import { THEME, WIDTH } from "../../constants/constants";

const DataItem = ({ data, type }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { blurviewTitle, blurviewScore, image, title, subTitle, score } =
    styles(colors);

  return (
    <View style={{ width: "48%", borderRadius: 25, overflow: "hidden" }}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate(
            `${type.charAt(0).toUpperCase() + type.slice(1)}DetailsScreen`,
            { data, type }
          )
        }
      >
        <View>
          <BlurView intensity={100} tint={"dark"} style={blurviewScore}>
            <Text numberOfLines={1} style={score}>
              {data.score ? data.score.toFixed(1) : "/"}
            </Text>
          </BlurView>
          <BlurView intensity={100} tint={"dark"} style={blurviewTitle}>
            <Text numberOfLines={1} style={title}>
              {data.title}
            </Text>
            <Text numberOfLines={1} style={subTitle}>
              {data.title_japanese}
            </Text>
          </BlurView>
          <Image source={{ uri: data.images.jpg.image_url }} style={image} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    input: {
      marginBottom: 20,
      borderRadius: 50,
      padding: 20,
      backgroundColor: colors.secondary,
      color: colors.text,
      fontSize: 16,
    },
    blurviewTitle: {
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      position: "absolute",
      bottom: 5,
      right: 5,
      left: 5,
      alignSelf: "center",
      zIndex: 1,
      padding: 15,
    },
    blurviewScore: {
      width: 50,
      height: 50,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      position: "absolute",
      top: 5,
      right: 5,
      alignSelf: "center",
      zIndex: 1,
    },
    image: {
      width: WIDTH / 2,
      height: WIDTH / 1.5,
    },
    title: {
      color: "#FEFEFE",
      fontWeight: "bold",
      fontSize: 18,
    },
    subTitle: {
      color: "#8C8585",
    },
    score: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 18,
    },
  });

export default memo(DataItem);
