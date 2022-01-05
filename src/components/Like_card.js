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

          <TouchableOpacity onPress={() => remove(content.idx)} style={{flex : 1}}>
            <View style={{  flex : 1, alignItems :'center', justifyContent :'center'}}>
              <Feather name="trash-2" color="black" style={styles.trash_icon} />
            </View>
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
