import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  LogBox,
  Dimensions
} from "react-native";

const _WEIGHT = Dimensions.get("window").width;
const _HEIGHT = Dimensions.get("window").height;

//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함1
export default function Card({ content, navigation }) {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("Details", { idx: content.idx })}
  >
    <View id="image_title_card" style={styles.image_title_card}>
      <Image style={styles.cardImage} source={{ uri: content.image }} />

      <View style={styles.cardText}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {content.title}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
card: {
  flex: 1,
  flexDirection: "row",
  marginHorizontal: 10,
  marginTop: 10,
  borderRadius: 17,
},

image_title_card: {
  backgroundColor: "white",
  width: "100%",
  borderRadius: 17,
  height: _HEIGHT * 0.25,
},

cardImage: {
  // flex: 1,
  width: "100%",
  height: "80%",
  borderRadius: 10,
},

cardText: {
  flexDirection: "row",
  marginLeft: 10,
  justifyContent:'space-between'
},

cardTitle: {
  fontSize: 20,
  fontWeight: "700",
  paddingTop: 3,
},
trash_icon: {
  fontSize: 24,
  paddingHorizontal : '1%', 
  paddingVertical : '2%',  
  // backgroundColor: "red",
  marginRight : 10

},
});
