import { View, Text } from "react-native";
import React from "react";

const ProducerScreen = ({ route }) => {
  const id = route.params.item.mal_id;
  console.log(id);
  return (
    <View>
      <Text>ProducerScreen</Text>
    </View>
  );
};

export default ProducerScreen;
