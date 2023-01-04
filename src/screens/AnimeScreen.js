import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { THEME, WIDTH } from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";

const AnimeScreen = () => {
  const [animes, setAnimes] = useState([]);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  const { container } = styles;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://api.jikan.moe/v4/anime?limit=${limit}&q=${searchQuery}`, {
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setAnimes(data.data);
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
  }, [toggleSearch]);

  const handleSearch = (text) => {
    setLoading(true);
    setTimeout(() => setToggleSearch(!toggleSearch), 300);
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={container}>
      <View style={{ padding: 10 }}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleSearch(text)}
          value={searchQuery}
          placeholder="Search"
          placeholderTextColor={THEME.dark.text}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={animes}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => <Anime anime={item} />}
            keyExtractor={(item) => item.mal_id}
            ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
            ListEmptyComponent={<Text>No results found.</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const Anime = ({ anime }) => {
  const navigation = useNavigation();

  const { blurviewTitle, blurviewScore, image, title, subTitle, score } =
    styles;

  return (
    <View style={{ width: "48%", borderRadius: 25, overflow: "hidden" }}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("AnimeDetailsScreen", { anime })}
      >
        <View>
          <BlurView intensity={80} tint={"dark"} style={blurviewScore}>
            <Text numberOfLines={1} style={score}>
              {anime.score ? anime.score.toFixed(1) : "/"}
            </Text>
          </BlurView>
          <BlurView intensity={50} tint={"dark"} style={blurviewTitle}>
            <Text numberOfLines={1} style={title}>
              {anime.title}
            </Text>
            <Text numberOfLines={1} style={subTitle}>
              {anime.title_japanese}
            </Text>
          </BlurView>
          <Image source={{ uri: anime.images.jpg.image_url }} style={image} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.dark.background,
  },
  input: {
    marginBottom: 20,
    borderRadius: "50%",
    padding: 20,
    backgroundColor: THEME.dark.secondary,
    color: THEME.dark.text,
    fontSize: 16,
  },
  blurviewTitle: {
    borderRadius: "50%",
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
    borderRadius: "50%",
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
    color: THEME.dark.text,
    fontWeight: "bold",
    fontSize: 18,
  },
  subTitle: {
    color: THEME.dark.text,
  },
  score: {
    color: THEME.dark.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AnimeScreen;
