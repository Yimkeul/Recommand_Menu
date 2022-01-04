import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  Dimensions,
  Alert,
  Image,
  LogBox,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Home_card from "../components/Home_card";
import axios from "axios";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
import * as Location from "expo-location";

const isIOS = Platform.OS === "ios";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const _WEIGHT = Dimensions.get("window").width;
const _HEIGHT = Dimensions.get("window").height;

const Home = ({ navigation, route }) => {
  //에러 숨기기
  // LogBox.ignoreLogs(["Warning: ..."]);
  // LogBox.ignoreLogs(["Setting a timer"]);
  // LogBox.ignoreLogs(["source.uri"]);
  LogBox.ignoreAllLogs();

  const [refreshing, setRefreshing] = useState(false); //새로고침용

  const [state, setState] = useState([]); //firebase에서 데이터 저장

  const [weather, setWeather] = useState({ temp: 999, condition: "" }); //날씨 처음 저장

  const [ready, setReady] = useState(false); //대기

  const [random, setRandom ] = useState(0) // 랜덤 숫자 저장용


  const [cate,setCate] = useState([
    {
      idx:0,
      category:"",
      title:"",
      image: "null",
      desc:"",
      date:"",
      weather : "",
      season :""
    }
  ]
  ) // 랜덤 데이터 저장용 초기값


  useEffect(() => {
    test();
  }, [weather.condition]);

  
  //랜덤뽑기
  const test = () => {
    firebase_db
      .ref("/tip")
      .once("value")
      .then((snapshot) => {
        console.log("파이어베이스에서 데이터 가져왔습니다!!");
        let tip = snapshot.val();
        getLocation();
        setState(tip);
      });
    

    //조건 셋팅 장소
    if (weather.condition == "구름") {
      setCate(
        state.filter((d) => {
          return d.weather == "구름";
        })
      );
    }else if (weather.condition == "맑음") {
      setCate(
        state.filter((d) => {
          return d.weather == "맑음";
        })
      );
    }
    else if (weather.condition == "비") {
      setCate(
        state.filter((d) => {
          return d.weather == "비";
        })
      );
    }else if (weather.condition == "눈") {
      setCate(
        state.filter((d) => {
          return d.weather == "눈";
        })
      );
    }//여기서는 data.json에 계절 session만들고 그걸로 필터링 해야함
    else if (weather.condition == "알수없음") {
      setCate(
        state.filter((d) => {
          return d.season == "맑음";
        })
      );
    }


    let min = 0
    let max = cate.length
    let rn = Math.floor(Math.random() * (max - min)) + min
    console.log(`랜덤 숫자는 ${rn}`)
    setRandom(rn)
  };


  //날씨 정보 가져오기
  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const locationData = await Location.getCurrentPositionAsync();
      const latitude = locationData.coords.latitude;
      const longitude = locationData.coords.longitude;
      // const API_KEY = "62a3e1c15a974cb7212dd251dddb4fa7";
     
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
      );

      const _weather = result.data.weather[0].main;
      const temp = result.data.main.temp;

      console.log("현 위치 : "+result.data.name)
      if (
        _weather === "Drizzle" ||
        _weather === "Rain" ||
        _weather === "Thunderstorm"
      ) {
        setWeather({ temp, condition: "비" });
      } else if (_weather === "Snow") {
        setWeather({ temp, condition: "눈" });
      } else if (_weather === "Clear") {
        setWeather({ temp, condition: "맑음" });
      } else if (_weather === "Clouds") {
        setWeather({ temp, condition: "구름" });
      } else {
        setWeather({ temp, condition: "알수없음" });
      }

      console.log(weather.condition + " " + weather.temp);
    } catch (error) {
      // Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?")
      console.log(error);
    }
  };

  //새로고침
  //위치정보, 랜덤뽑기
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => getLocation(),test(), setRefreshing(false));
  }, []);

  //좋아요 함수
  const I_LIKE = async () => {
    let userUniqueId;
    if (isIOS) {
      let iosID = await Application.getIosIdForVendorAsync();
      userUniqueId = iosID;
    } else {
      userUniqueId = await Application.androidId;
    }

    console.log(userUniqueId);
    firebase_db
      .ref("/like/" + userUniqueId + "/" + cate[random].idx)
      .set(cate[random], function (error) {
        console.log(error);
        console.log(cate[random]);
        Alert.alert("홈화면에서 저장!");
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#e0d4bf", flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* 안드로이드용 */}
        <StatusBar barStyle="dark-content" backgroundColor={"white"} />

        {/* 상단 제목 */}
        <View id="Title" style={styles.title}>
          <Text style={styles.title_text}>- Daily Specials -</Text>
        </View>

        {/* 추천 메뉴 카드 */}
        <View id="recommand_menu_card" style={styles.recoomand_menu_card}>
          <View id="recommand_menu_card2" style={styles.recoomand_menu_card2}>
            <View id="image_title_space" style={styles.image_title_space}>
              <Text id="image_title" style={styles.image_title}>
                {cate[random].title}
              </Text>
            </View>
            <View
              id="image_space"
              style={
                styles.image_space
              }
            >
              <Image style={{width:'100%', height:'100%'}} source={{uri:cate[random].image}}/>
            </View>
          </View>
        </View>

        {/* 추천 메뉴 버튼 공간 */}
        <View id="more_btn_space" style={styles.more_btn_space}>
          <TouchableOpacity
            id="recipe_btn"
            style={styles.recipe_btn}
            onPress={() =>
              navigation.navigate("Details", { idx: cate[random].idx })
            }
          >
            <AntDesign name="star" size={20} style={styles.icons} />
            <Text style={styles.recipe_text}>{` 레시피`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            id="recipe_btn"
            style={styles.recipe_btn}
            onPress={() => I_LIKE()}
          >
            <AntDesign name="heart" size={20} style={styles.icons} />
            <Text style={styles.recipe_text}>{` 저장하기`}</Text>
          </TouchableOpacity>
        </View>

        {/* 추가 메뉴 추천 제목 */}
        <View id="Title2" style={styles.title2}>
          <Text style={styles.title2_text}>- Dishes -</Text>
        </View>

        {/* 추가 메뉴 카드 */}

        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {cate.map((content, i) => {
              return (
                <Home_card content={content} key={i} navigation={navigation} />
              );
            })}
          </ScrollView>
        </View>

        {/*이중선*/}
        <View
          style={{
            marginTop: 50,
            marginBottom: 25,
            marginLeft: 10,
            width: _WEIGHT - 20,
            height: 10,
            borderWidth: 2,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          }}
        ></View>

        {/*전체 메뉴로 가기*/}

        <TouchableOpacity
          id="all_menu_btn"
          style={styles.all_menu_btn}
          onPress={() => navigation.navigate("AllMenu")}
        >
          <Text id="all_menu_btn_text" style={styles.all_menu_btn_text}>
            {`" Looking for more Dishes  `}
            <Entypo
              name="bowl"
              style={styles.all_menu_btn_icon}
              size={24}
              color="black"
            />
            {` "`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // 기본 국룰 : marginHorizontal : '2.5%'
  container: {
    flex: 1,
    // backgroundColor: "rgb(224,212,191)",
    // backgroundColor: '#FFFAF2'
  },

  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  title_text: {
    color: "rgb(169,63,54)",
    fontSize: 30,
    fontWeight: "700",
  },
  recoomand_menu_card: {
    borderWidth: 3,
    height: _HEIGHT - _HEIGHT * 0.35,
    width: "95%",
    marginTop: "3%",
    alignSelf: "center",
  },
  recoomand_menu_card2: {
    alignSelf: "center",
    marginVertical: "2.5%",
    borderWidth: 1,
    height: "95%",
    width: "95%",
  },
  image_title_space: {
    backgroundColor: "white",
    height: "20%",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  image_title: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Jua_400Regular",
  },
  image_space: {
    height: "80%",
    backgroundColor: "white",
  },

  more_btn_space: {
    marginTop: _HEIGHT * 0.05,
    marginHorizontal: "2.5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  recipe_btn: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "rgb(169,63,54)",
    flexDirection: "row",
  },
  icons: {
    alignSelf: "center",
    paddingLeft: "5%",
    color: "rgb(169,63,54)",
  },
  recipe_text: {
    paddingVertical: "5%",
    paddingRight: "5%",
    color: "rgb(169,63,54)",
    fontWeight: "bold",
  },
  title2: {
    marginVertical: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  title2_text: {
    color: "rgb(169,63,54)",
    fontSize: 30,
    fontWeight: "700",
  },
  more_dishes_card: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  more_dishes_img: {
    height: _WEIGHT / 4,
    width: _WEIGHT / 4,
    borderRadius: _WEIGHT / 8,
    borderWidth: 2,
    borderColor: "blue",
    alignSelf: "center",
  },
  more_dishes_title: {
    fontSize: 10,
    textAlign: "center",
    backgroundColor: "gray",
    marginTop: 20,
  },
  all_menu_btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  all_menu_btn_text: {
    paddingVertical: "5%",
    fontWeight: "bold",
  },
  all_menu_btn_icon: {
    alignSelf: "center",
    paddingBottom: 5,
  },
});
export default Home;
