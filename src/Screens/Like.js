import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Platform,
  LogBox,
  RefreshControl,
} from "react-native";
import Like_card from "../components/Like_card";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

const isIOS = Platform.OS === "ios";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export default function Like({ navigation, content }) {
  // LogBox.ignoreLogs(["Warning: ..."]);
  // LogBox.ignoreLogs(["Setting a timer"]);
  LogBox.ignoreAllLogs();
  const [tip, setTip] = useState([]);
  const [ready, setReady] = useState(true);
  const [refreshing, setRefreshing] = useState(false); //새로고침용

  useEffect(() => {
    getLike();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() =>     getLike(), setRefreshing(false));
  }, []);

  const getLike = async () => {
    let userUniqueId;
    if (isIOS) {
      let iosId = await Application.getIosIdForVendorAsync();
      userUniqueId = iosId;
    } else {
      userUniqueId = await Application.androidId;
    }

    console.log(`${userUniqueId} 데이터 가져 오는 중`);
    firebase_db
      .ref("/like/" + userUniqueId)
      .once("value")
      .then((snapshot) => {
        let tip = snapshot.val();
        
        // if (tip && tip.length > 0) {
        //   setTip(tip);
        //   setReady(false);
        // }
        let tip_list = Object.values(tip)
        if(tip_list && tip_list.length > 0){
            setTip(tip_list)
            setReady(false)
        }
      });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {tip.map((content, i) => {
        return (
          <Like_card
            key={i}
            content={content}
            navigation={navigation}
            tip={tip}
            setTip={setTip}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(224,212,191)",
  },
});
