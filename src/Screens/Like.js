import React,{useState,useEffect} from 'react';
import { View, Text ,Button, ScrollView , StyleSheet,Platform,LogBox} from 'react-native';
import Like_card from '../components/Like_card';
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

const isIOS = Platform.OS === "ios";

export default function Like({navigation,route}) {

  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreLogs(["Setting a timer"]);  
  const [tip, setTip] = useState([])
  const [ready,setReady] = useState(true)

    useEffect(()=>{
        getLike()
    },[])

    const getLike = async () => {
        let userUniqueId;
        if(isIOS){
        let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        }else{
            userUniqueId = await Application.androidId
        }

        console.log(userUniqueId)
        firebase_db.ref('/like/'+userUniqueId).once('value').then((snapshot) => {
            // console.log("파이어베이스에서 데이터 가져왔습니다!!")
            let tip = snapshot.val();
            // let tip_list = Object.values(tip)
            // if(tip_list && tip_list.length > 0){
            //     setTip(tip_list)
            //     setReady(false)
            // }
            if(tip && tip.length > 0){
              setTip(tip)
              setReady(false)
          }
            
        })
    }

    return (
        <ScrollView style={styles.container}>
           {
               tip.map((content,i)=>{
                   return(<Like_card key={i} content={content} navigation={navigation} tip={tip} setTip={setTip}/>)
               })
           }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff"
    }
})