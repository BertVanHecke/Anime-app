import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { WIDTH } from "../../constants/constants";
import { BlurView } from "expo-blur";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import InformationList from "../components/InformationList";
import { useTheme } from "@react-navigation/native";

const Detail = ({ id, type }) => {
  const { colors } = useTheme();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  const {
    container,
    image,
    blurviewImage,
    title,
    subTitle,
    text,
    bannerCointainer,
    ratingContainer,
    scoreCointainer,
    trailerCointainer,
  } = styles(colors);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://api.jikan.moe/v4/${type}/${id}/full`, {
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

  const handleOnStateChanged = useCallback((state) => {
    if (state === "enden") {
      setPlaying(false);
    }
    if (state === "playing") {
      setPlaying(true);
    }
    if (state === "pausen") {
      setPlaying(false);
    }
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
                  {data.title_japanese}
                </Text>
                <Text numberOfLines={1} style={title}>
                  {data.title}
                </Text>
                <View style={bannerCointainer}>
                  <View style={ratingContainer}>
                    <MaterialCommunityIcons
                      name="sign-caution"
                      size={18}
                      color={"#FEFEFE"}
                    />
                    <Text
                      numberOfLines={1}
                      style={[text, { marginLeft: 5, color: "#FEFEFE" }]}
                    >
                      {data.rating}
                    </Text>
                  </View>
                  <View style={scoreCointainer}>
                    <MaterialIcons
                      name="star-rate"
                      size={18}
                      color={"#FEFEFE"}
                    />
                    <Text
                      numberOfLines={1}
                      style={[text, { marginLeft: 5, color: "#FEFEFE" }]}
                    >
                      {data.score}
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>
            {type === "anime" ? (
              <>
                <View style={trailerCointainer}>
                  {data.trailer.youtube_id ? (
                    <YoutubeIframe
                      height={(WIDTH / 16) * 9}
                      width={WIDTH}
                      play={playing}
                      videoId={data.trailer.youtube_id}
                      onChangeState={handleOnStateChanged}
                    />
                  ) : (
                    <Text style={[text, { marginTop: 10 }]}>
                      No trailer available.
                    </Text>
                  )}
                </View>
                <Text style={[title, { color: colors.text }]}>
                  Information:
                </Text>
                <Text style={text}>
                  Episodes: {data.episodes}, {data.duration}
                </Text>
                <Text style={text}>Aired: {data.aired.string}</Text>
              </>
            ) : null}
            <Text style={[title, { marginTop: 30, color: colors.text }]}>
              Synopsis:
            </Text>
            <Text style={text}>{data.synopsis}</Text>
            <Text style={[title, { marginTop: 30, color: colors.text }]}>
              Background:
            </Text>
            <Text style={text}>{data.background}</Text>
          </View>
          {type === "anime" ? (
            <>
              <InformationList header={"Producers:"} data={data.producers} />
              <InformationList header={"Licensors:"} data={data.licensors} />
              <InformationList header={"Studios:"} data={data.studios} />
            </>
          ) : null}
          <InformationList header={"Genres:"} data={data.genres} />
          <InformationList header={"Themes:"} data={data.themes} />
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
      paddingBottom: 15,
    },
    subTitle: { color: colors.secondaryText },
    text: { color: colors.text, lineHeight: 30 },
    bannerCointainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    ratingContainer: {
      padding: 20,
      width: "68%",
      borderRadius: 50,
      backgroundColor: colors.secondaryText,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    scoreCointainer: {
      padding: 20,
      width: "28%",
      borderRadius: 50,
      backgroundColor: colors.primary,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    trailerCointainer: {
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
  });

export default Detail;
