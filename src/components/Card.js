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
    flex : 1,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 17,
    height: _HEIGHT * 0.25,
  },

  cardImage: {
    flex: 4,
    // width: "100%",
    // height: "80%",
    borderRadius: 10,
  },

  cardText: {
    flex : 1,
    flexDirection: "row",
    marginLeft: 10,
    borderRadius: 17,
    alignItems :"center"

    // justifyContent: "space-between",
  },

  cardTitle: {
    flex : 5,
    fontSize: 16,
    fontWeight: "700",
    textAlignVertical :'bottom'
    // paddingTop: "2%",
  },
  trash_icon: {
    fontSize: 24,
    // marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical :'bottom'
  },
});
