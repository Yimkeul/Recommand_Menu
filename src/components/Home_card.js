import React, {useEffect, useState} from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity,Dimensions,LogBox} from "react-native";
import {firebase_db} from "../firebaseConfig"
import { 
  PlayfairDisplay_400Regular_Italic,
} from '@expo-google-fonts/playfair-display'
import {useFonts} from 'expo-font'
import AppLoading from "expo-app-loading";
const _WEIGHT = Dimensions.get("window").width;
const _HEIGHT = Dimensions.get("window").height;

export default function Home_card({content, navigation, }){
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreLogs(["Setting a timer"]);  

  const [fontsLoaded,error] = useFonts({
    PlayfairDisplay_400Regular_Italic
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }
  return(
    <TouchableOpacity
    style={{borderWidth : 1}}
    onPress={() => navigation.navigate("Details",{idx:content.idx})}>
    <View id="more_dishes_card" style={styles.more_dishes_card}>
      <Image
        id="more_dishes_img"
        style={styles.more_dishes_img}
        source={{ uri: content.image }}
      />
      <Text
        id="more_dishes_title"
        style={styles.more_dishes_title}
      >
        {content.title}
        
      </Text>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  more_dishes_card: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  more_dishes_img: {

    height: _WEIGHT / 4,
    width: _WEIGHT / 4,
    borderRadius: _WEIGHT / 8,
    // borderWidth: 2,
    // borderColor: "blue",
    alignSelf: "center",
  },
  more_dishes_title: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
  }
})