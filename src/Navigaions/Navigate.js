import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Pressable,
  LogBox
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Details, Like, AllMenu } from "../Screens";
import {useFonts} from 'expo-font'
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {  SongMyung_400Regular } from '@expo-google-fonts/song-myung'
import { PlayfairDisplay_400Regular_Italic,} from '@expo-google-fonts/playfair-display'

const Stack = createStackNavigator();
// navigation.navigate('Like')
const Navigate = () => {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreLogs(["Setting a timer"]);  

  const [fontsLoaded,error] = useFonts({
    PlayfairDisplay_400Regular_Italic,
    SongMyung_400Regular
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return   (
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
            title: "MENU",

            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Like")}
                style={{ paddingHorizontal: 20 }}
              >
                <AntDesign name="hearto" size={30} color="rgb(169,63,54)" />
              </TouchableOpacity>
            ),
          })}
        />


        <Stack.Screen name="Like" component={Like}   options={({ navigation }) => ({
           headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 20 }}
              onPress={()=>navigation.goBack()}
            >
              <AntDesign name="heart" size={30} color="rgb(169,63,54)" />
            </TouchableOpacity>
          ), 
           
          })}/>
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Recipe",
          }}
        />
        <Stack.Screen
          name="AllMenu"
          component={AllMenu}
          options={({ navigation }) => ({
            title: "All Menu",

            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Like")}
                style={{ paddingHorizontal: 20 }}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Navigate;
