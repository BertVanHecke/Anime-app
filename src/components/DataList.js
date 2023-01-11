import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import DataItem from "./DataItem";
import { BASE_URL } from "../../constants/constants";

const DataList = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  const { colors } = useTheme();
  const { container, input } = styles(colors);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${BASE_URL}${type}?q=${searchQuery}`, {
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
  }, [toggleSearch]);

  const handleSearch = (text) => {
    setLoading(true);
    setTimeout(() => setToggleSearch(!toggleSearch), 300);
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={container}>
      <View style={{ padding: 10, flex: 1 }}>
        <TextInput
          style={input}
          onChangeText={(text) => handleSearch(text)}
          value={searchQuery}
          placeholder="Search"
          placeholderTextColor={colors.text}
        />
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : error ? (
          <Text style={{ color: colors.text, alignSelf: "center" }}>
            {error}
          </Text>
        ) : (
          <FlatList
            data={data}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 180 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => <DataItem data={item} type={type} />}
            keyExtractor={(item) => item.mal_id}
            ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
            ListEmptyComponent={
              <Text style={{ color: colors.text, alignSelf: "center" }}>
                No results found.
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
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
      paddingHorizontal: 30,
      backgroundColor: colors.secondaryBackground,
      color: colors.text,
      fontSize: 14,
    },
  });

export default DataList;
