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

import Data from "../../data.json";
import Card from "../components/Card";

export default function AllMenu({navigation, route}) {

  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreLogs(["Setting a timer"]);  

  const [state, setState] = useState([]); //전체 데이터 복사용
  const [category, setCategory] = useState([]);

  

  const [ready, setReady] = useState(true)



  useEffect(() => {
    setState(Data.tip);
    setCategory(Data.tip);


    
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
    // setCategory(
    //   state.filter((d) => {
    //     return d.category == cate;
    //   })
    // );
  };
 
  return (
    <SafeAreaView>
      <ScrollView>
      <StatusBar />

      <ScrollView
        style={styles.middleContainer}
        horizontal
        indicatorStyle={"white"}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.middleButton01}
          onPress={() => {
            con_category("전체보기");
          }}
        >
          <Text style={styles.middleButtonText}>전체보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.middleButton01}
          onPress={() => {
            con_category("생활");
          }}
        >
          <Text style={styles.middleButtonText}>생활</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton01}
          onPress={() => {
            con_category("생활");
          }}
        >
          <Text style={styles.middleButtonText}>생활</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.middleButton02}
          onPress={() => {
            con_category("재테크");
          }}
        >
          <Text style={styles.middleButtonText}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton03}
          onPress={() => {
            con_category("반려견");
          }}
        >
          <Text style={styles.middleButtonText}>반려견</Text>
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
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  middleContainer: {
    marginTop: 20,
    marginLeft: 10,
    height: 60,
  },
  middleButton01: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fdc453",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  middleButton02: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fe8d6f",
    borderRadius: 15,
    margin: 7,
  },
  middleButton03: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderRadius: 15,
    margin: 7,
  },
  middleButton04: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#f886a8",
    borderRadius: 15,
    margin: 7,
  },

  middleButtonText: {
    color: "#fff",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
    textAlign: "center",
  },
});
