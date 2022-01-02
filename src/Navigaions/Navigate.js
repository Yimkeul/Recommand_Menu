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
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();
// navigation.navigate('Like')
const Navigate = () => {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreLogs(["Setting a timer"]);  

  const [font_setting, setFont_setting] = useState(false);
  const getFont = async () => {
    await Font.loadAsync({
      SongMyung: require("../assets/fonts/SongMyung-Regular.ttf"),
      PlayfairDisplay: require("../assets/fonts/PlayfairDisplay-Italic.ttf"),
    });
    setFont_setting(true);
  };

  useEffect(() => {
    getFont();
  }, []);

  return !font_setting ? (
    <View style={styles.container}>
      <Text>{font_setting}</Text>
    </View>
  ) : (
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
            fontFamily: "PlayfairDisplay",
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
