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
import { WIDTH, HEIGHT } from "../../constants/constants";

const AnimeDetailsScreen = ({ route }) => {
  const id = route.params.anime.mal_id;

  const [anime, setAnime] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://api.jikan.moe/v4/anime/${id}/full`, {
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
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
      ) : (
        <ScrollView>
          <View>
            <Text>{anime.title}</Text>
            <Text>{anime.title_japanese}</Text>
            <Text>{anime.rating}</Text>
            <Text>{anime.score}</Text>
            <Text>{anime.episodes}</Text>
            <Text>{anime.duration}</Text>
            <Text>{anime.aired.string}</Text>
            <Text>{anime.synopsis}</Text>
            <Text>{anime.background}</Text>
            <Image
              source={{ uri: anime.images.jpg.image_url }}
              style={{ width: WIDTH - 40, height: WIDTH - 40 }}
            />
            {anime.trailer.youtube_id ? (
              <YoutubeIframe
                height={(WIDTH / 16) * 9}
                width={WIDTH}
                play={playing}
                videoId={anime.trailer.youtube_id}
                onChangeState={handleOnStateChanged}
              />
            ) : (
              <Text>No trailer available.</Text>
            )}
          </View>
          <ScrollView horizontal={true}>
            {anime.producers.map((prod) => {
              return (
                <View key={prod.mal_id}>
                  <Text>{prod.name}</Text>
                </View>
              );
            })}
          </ScrollView>
          <ScrollView horizontal={true}>
            {anime.licensors.map((prod) => {
              return (
                <View key={prod.mal_id}>
                  <Text>{prod.name}</Text>
                </View>
              );
            })}
          </ScrollView>
          <ScrollView horizontal={true}>
            {anime.studios.map((prod) => {
              return (
                <View key={prod.mal_id}>
                  <Text>{prod.name}</Text>
                </View>
              );
            })}
          </ScrollView>
          <ScrollView horizontal={true}>
            {anime.genres.map((prod) => {
              return (
                <View key={prod.mal_id}>
                  <Text>{prod.name}</Text>
                </View>
              );
            })}
          </ScrollView>
          
          <ScrollView horizontal={true}>
            {anime.themes.map((prod) => {
              return (
                <View key={prod.mal_id}>
                  <Text>{prod.name}</Text>
                </View>
              );
            })}
          </ScrollView>
          
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AnimeDetailsScreen;
