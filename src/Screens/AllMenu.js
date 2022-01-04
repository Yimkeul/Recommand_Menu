import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  LogBox,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { color } from "react-native-reanimated";

import Data from "../../data.json";
import Card from "../components/Card";

export default function AllMenu({ navigation, route }) {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreLogs(["Setting a timer"]);
  LogBox.ignoreAllLogs();

  const [state, setState] = useState([]); //전체 데이터 복사용
  const [category, setCategory] = useState([]);

  const [ready, setReady] = useState(true);

  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [click4, setClick4] = useState(false);
  const [click5, setClick5] = useState(false);
  const [click6, setClick6] = useState(false);
  const [click7, setClick7] = useState(false);

  useEffect(() => {
    setState(Data.tip);
    setCategory(Data.tip);
    setClick1(true)
  }, []);

 

  const con_category = (cate) => {
    if (cate == "전체보기") {
      //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
      setCategory(state);
    } else {
      setCategory(
        state.filter((d) => {
          return d.category == cate;
        })
      );
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "rgb(224,212,191)", flex: 1 }}>
      {/* 전체 스크롤 */}
      <ScrollView style={{}}>
        {/* 안드로이드용 */}
        <StatusBar barStyle="dark-content" backgroundColor={"white"} />

        {/* 메뉴 스크롤 */}
        <ScrollView
          style={styles.middleContainer}
          horizontal
          indicatorStyle={"white"}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={{ ...styles.middleButton }}
            onPress={() => {
              con_category("전체보기");
              setClick1(true);
              setClick2(false);
              setClick3(false);
              setClick4(false);
              setClick5(false);
              setClick6(false);
              setClick7(false);
            }}
          >
            <Text
              style={{
                ...styles.middleButtonText,
                color: click1 ? "black" : "gray",
              }}
            >
              전체
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.middleButton }}
            onPress={() => {
              con_category("생활");
              setClick1(false);
              setClick2(true);
              setClick3(false);
              setClick4(false);
              setClick5(false);
              setClick6(false);
              setClick7(false);
            }}
          >
            <Text
              style={{
                ...styles.middleButtonText,
                color: click2 ? "black" : "gray",
              }}
            >
              한식
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.middleButton }}
            onPress={() => {
              con_category("재테크");
              setClick1(false);
              setClick2(false);
              setClick3(true);
              setClick4(false);
              setClick5(false);
              setClick6(false);
              setClick7(false);
            }}
          >
            <Text
              style={{
                ...styles.middleButtonText,
                color: click3 ? "black" : "gray",
              }}
            >
              중식
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.middleButton }}
            onPress={() => {
              con_category("반려견");
              setClick1(false);
              setClick2(false);
              setClick3(false);
              setClick4(true);
              setClick5(false);
              setClick6(false);
              setClick7(false);
            }}
          >
            <Text
              style={{
                ...styles.middleButtonText,
                color: click4 ? "black" : "gray",
              }}
            >
              일식
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.middleButton }}
            onPress={() => {
              con_category("반려견");
              setClick1(false);
              setClick2(false);
              setClick3(false);
              setClick4(false);
              setClick5(true);
              setClick6(false);
              setClick7(false);
            }}
          >
            <Text
              style={{
                ...styles.middleButtonText,
                color: click5 ? "black" : "gray",
              }}
            >
              양식
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.middleButton }}
            onPress={() => {
              con_category("반려견");
              setClick1(false);
              setClick2(false);
              setClick3(false);
              setClick4(false);
              setClick5(false);
              setClick6(true);
              setClick7(false);
            }}
          >
            <Text
              style={{
                ...styles.middleButtonText,
                color: click6 ? "black" : "gray",
              }}
            >
              분식
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.middleButton }}
            onPress={() => {
              con_category("반려견");
              setClick1(false);
              setClick2(false);
              setClick3(false);
              setClick4(false);
              setClick5(false);
              setClick6(false);
              setClick7(true);
            }}
          >
            <Text
              style={{
                ...styles.middleButtonText,
                color: click7 ? "black" : "gray",
              }}
            >
              디저트
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.cardContainer}>
          {/* 하나의 카드 영역을 나타내는 View */}
          {category.map((content, i) => {
            return <Card content={content} key={i} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //메뉴들꺼
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },

  //위에 카테고리
  middleContainer: {
    marginTop: 5,
    marginLeft: 10,
    borderBottomWidth : 1,
    borderBottomColor : 'gray'
  },
  middleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    margin: 7,
  },
  middleButtonText: {
    color: "gray",

    fontWeight: "700",
    textAlign: "center",
  },
});
