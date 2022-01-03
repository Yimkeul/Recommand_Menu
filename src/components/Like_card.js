import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  LogBox,
} from "react-native";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
import { Feather } from "@expo/vector-icons";
const isIOS = Platform.OS === "ios";

const _WEIGHT = Dimensions.get("window").width;
const _HEIGHT = Dimensions.get("window").height;

export default function Like_card({ content, navigation, tip, setTip }) {
  const remove = async (cidx) => {
    let userUniqueId;
    if (isIOS) {
      let iosId = await Application.getIosIdForVendorAsync();
      userUniqueId = iosId;
    } else {
      userUniqueId = await Application.androidId;
    }

    console.log(userUniqueId);
    firebase_db
      .ref("/like/" + userUniqueId + "/" + cidx)
      .remove()
      .then(function () {
        let result = [];

        result = tip.filter((data, i) => {
          return data.idx !== cidx;
        });

        setTip(result);
      });
  };

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
          <TouchableOpacity onPress={() => remove(content.idx)}>
              <Feather name="trash-2" color="black" style={styles.trash_icon} />
            </TouchableOpacity>
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
