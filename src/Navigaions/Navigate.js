import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Pressable,
  LogBox,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Details, Like, AllMenu } from "../Screens";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { SongMyung_400Regular } from "@expo-google-fonts/song-myung";
import { PlayfairDisplay_400Regular_Italic } from "@expo-google-fonts/playfair-display";
import { Jua_400Regular } from "@expo-google-fonts/jua";
const Stack = createStackNavigator();
// navigation.navigate('Like')
const Navigate = () => {
  // LogBox.ignoreLogs(["Warning: ..."]);
  // LogBox.ignoreLogs(["Setting a timer"]);
  // LogBox.ignoreLogs(["source.uri"]);
  // LogBox.ignoreLogs(["[Unhandled promise"]);
  LogBox.ignoreAllLogs();

  const [fontsLoaded, error] = useFonts({
    PlayfairDisplay_400Regular_Italic,
    SongMyung_400Regular,
    Jua_400Regular
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          headerBackTitleVisible: false,

          headerStyle: {
            // backgroundColor:"transparent",
            backgroundColor: "rgb(224,212,191)",
            // borderBottomColor: "white",
            shadowColor: "rgb(224,212,191)", //ios적용됨
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontFamily: "PlayfairDisplay_400Regular_Italic",
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "──⋅( Menu )⋅──",
            
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Like")}
                // style={{ paddingHorizontal: '5%', backgroundColor:'blue' , marginRight :'50%' }}
                style={{paddingLeft : '10%' , paddingRight :'15%'}}
              >
                <AntDesign name="hearto" size={30} color="rgb(169,63,54)" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Like"
          component={Like}
          options={({ navigation }) => ({
            title : "──⋅( Like )⋅──",
            headerRight: () => (
              <TouchableOpacity
              style={{paddingLeft : '10%' , paddingRight :'15%'}}
                onPress={() => navigation.goBack()}
              >
                <AntDesign name="heart" size={30} color="rgb(169,63,54)" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            title: "──⋅( Recipe )⋅──",

            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Like")}
                style={{paddingLeft : '10%' , paddingRight :'15%'}}
              >
                <AntDesign name="hearto" size={30} color="rgb(169,63,54)" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AllMenu"
          component={AllMenu}
          options={({ navigation }) => ({
            title: "──⋅( All Menu )⋅──",

            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Like")}
                style={{paddingLeft : '10%' , paddingRight :'15%'}}
              >
                <AntDesign name="hearto" size={30} color="rgb(169,63,54)" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default Navigate;
