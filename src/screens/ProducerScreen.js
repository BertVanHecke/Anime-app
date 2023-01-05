import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { BASE_URL, WIDTH } from "../../constants/constants";
import { BlurView } from "expo-blur";
import { useTheme } from "@react-navigation/native";

const ProducerScreen = ({ route }) => {
  const id = route.params.item.mal_id;
  const { colors } = useTheme();

  const {
    container,
    image,
    blurviewImage,
    title,
    subTitle,
  } = styles(colors);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${BASE_URL}producers/${id}`, {
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        err.name === "AbortError"
          ? console.log("Request cancelled.")
          : setError(err);
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={{ color: colors.text, alignSelf: "center" }}>{error}</Text>
      ) : (
        <ScrollView
          style={container}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View>
            <View>
              <Image
                source={{ uri: data.images.jpg.image_url }}
                style={image}
              />
              <BlurView intensity={100} tint={"dark"} style={blurviewImage}>
                <Text numberOfLines={1} style={subTitle}>
                  {data.titles[1].title}
                </Text>
                <Text numberOfLines={1} style={title}>
                  {data.titles[0].title}
                </Text>
              </BlurView>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: 10,
    },
    image: {
      width: WIDTH - 20,
      height: WIDTH - 20,
      borderRadius: WIDTH / 11,
    },
    blurviewImage: {
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      position: "absolute",
      bottom: 10,
      right: 10,
      left: 10,
      alignSelf: "center",
      zIndex: 1,
      padding: 15,
    },
    title: {
      color: "#FEFEFE",
      fontWeight: "bold",
      fontSize: 16,
      paddingTop: 5
    },
    subTitle: { color: colors.secondaryText },
  });

export default ProducerScreen;
