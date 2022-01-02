import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
  LogBox,
} from "react-native";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

export default function Details({ navigation, route }) {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreLogs(["Setting a timer"]);

  const [tip, setTip] = useState({});

  useEffect(() => {
    //   console.log(route)
    //   setTip(route.params)
    const { idx } = route.params;
    firebase_db
      .ref("/tip/" + idx)
      .once("value")
      .then((snapshot) => {
        let tip = snapshot.val();
        setTip(tip);
      });
  }, []);

  //좋아요 구현
  const like = async () => {
    // like 방 안에
    // 특정 사용자 방안에
    // 특정 찜 데이터 아이디 방안에
    // 특정 찜 데이터 몽땅 저장!
    // 찜 데이터 방 > 사용자 방 > 어떤 찜인지 아이디
    let userUniqueId;
    if (isIOS) {
      let iosId = await Application.getIosIdForVendorAsync();
      userUniqueId = iosId;
    } else {
      userUniqueId = await Application.androidId;
    }

    // console.log(userUniqueId)
    firebase_db
      .ref("/like/" + userUniqueId + "/" + tip.idx)
      .set(tip, function (error) {
        //  console.log(error)
        Alert.alert("찜 완료!");
      });
  };

  return (
    // ScrollView에서의 flex 숫자는 의미가 없습니다. 정확히 보여지는 화면을 몇등분 하지 않고
    // 화면에 넣은 컨텐츠를 모두 보여주려 스크롤 기능이 존재하기 때문입니다.
    // 여기선 내부의 컨텐츠들 영역을 결정짓기 위해서 height 값과 margin,padding 값을 적절히 잘 이용해야 합니다.
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: tip.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.desc}>{tip.desc}</Text>
        <TouchableOpacity style={styles.button} onPress={() => like()}>
          <Text style={styles.buttonText}>팁 찜하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  image: {
    height: 400,
    margin: 10,
    marginTop: 40,
    borderRadius: 20,
  },
  textContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#eee",
  },
  desc: {
    marginTop: 10,
    color: "#eee",
  },
  button: {
    width: 100,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "deeppink",
    borderRadius: 7,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
