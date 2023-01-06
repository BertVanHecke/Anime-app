import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";

const InformationList = ({ header, data }) => {
  const { colors } = useTheme();
  const { title, text } = styles(colors);
  const navigation = useNavigation();
  return (
    <>
      <Text style={title}>{header}</Text>

      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          header === "Producers:" ? (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("ProducerScreen", { item })}
            >
              <Text style={[text, { textDecorationLine: true }]}>
                {item.name}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <View>
              <Text style={text}>{item.name}</Text>
            </View>
          )
        }
        keyExtractor={(item) => item.mal_id}
        ItemSeparatorComponent={() => (
          <View
            style={{ width: 1, margin: 9, backgroundColor: colors.text }}
          ></View>
        )}
        ListEmptyComponent={<Text>No results found.</Text>}
      />
    </>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 16,
      paddingBottom: 15,
      marginTop: 30,
    },
    text: { color: colors.text, lineHeight: 30 },
  });

export default InformationList;
