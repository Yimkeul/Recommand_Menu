import React, {useEffect, useState} from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity,Dimensions,Alert,Platform,LogBox} from "react-native";
import { firebase_db } from '../firebaseConfig';
import * as Application from 'expo-application'
const isIOS = Platform.OS ==='ios'

const _WEIGHT = Dimensions.get("window").width;
const _HEIGHT = Dimensions.get("window").height;

export default function Like_card({content,navigation,tip, setTip}){
 
  const remove = async (cidx) => {
    let userUniqueId;
    if(isIOS){
    let iosId = await Application.getIosIdForVendorAsync();
        userUniqueId = iosId
    }else{
        userUniqueId = await Application.androidId
    }

    console.log(userUniqueId)
    firebase_db.ref('/like/'+userUniqueId+'/'+cidx).remove().then(function(){
   
      // Alert.alert("삭제 완료");
      //내가 찝 해제 버튼을 누른 카드 idx를 가지고
      //찝페이지의 찜데이터를 조회해서
      //찜해제를 원하는 카드를 제외한 새로운 찜 데이터(리스트 형태!)를 만든다
      let result =[]
 
       result = tip.filter((data,i)=>{
        return data.idx !== cidx
      })
      //이렇게 만들었으면!
      //LikePage로 부터 넘겨 받은 tip(찜 상태 데이터)를
      //filter 함수로 새롭게 만든 찜 데이터를 구성한다!
     
      setTip(result)

    })
    
  }


  return(
<TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Details' , {idx:content.idx})}>
    <Image style={styles.cardImage} source={{uri:content.image}}/>
    <View style={styles.cardText}>
      <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
      <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
      <Text style={styles.cardDate}>{content.date}</Text>
    </View>
    <TouchableOpacity style={{backgroundColor:'red'}} onPress={()=>remove(content.idx)}>
      <Text>삭제버튼</Text>
    </TouchableOpacity>
  </TouchableOpacity>)
}

const styles = StyleSheet.create({

card:{
flex:1,
//컨텐츠들을 가로로 나열
//세로로 나열은 column <- 디폴트 값임 
flexDirection:"row",
margin:10,
borderBottomWidth:0.5,
borderBottomColor:"#eee",
paddingBottom:10

},
cardImage: {
flex:1,
width:100,
height:100,
borderRadius:10,
},
cardText: {
flex:2,
flexDirection:"column",
marginLeft:10,
},
cardTitle: {
fontSize:20,
fontWeight:"700"
},
cardDesc: {
fontSize:15
},
cardDate: {
fontSize:10,
color:"#A6A6A6",
}
})

















    //     <TouchableOpacity
//     onPress={() => navigation.navigate("Details",{idx:content.idx})}

//   >
//     <View id="more_dishes_card" style={styles.more_dishes_card}>
//       <Image
//         id="more_dishes_img"
//         style={styles.more_dishes_img}
//         source={{ uri: content.image }}
//       />
//       <Text
//         id="more_dishes_title"
//         style={styles.more_dishes_title}
//       >
//         {content.title}
//       </Text>
//     </View>
//   </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   more_dishes_card: {
//     marginBottom: 10,
//     marginHorizontal: 20,
//   },
//   more_dishes_img: {
//     height: _WEIGHT / 4,
//     width: _WEIGHT / 4,
//     borderRadius: _WEIGHT / 8,
//     borderWidth: 2,
//     borderColor: "blue",
//     alignSelf: "center",
//   },
//   more_dishes_title: {
//     fontSize: 10,
//     textAlign: "center",
//     backgroundColor: "gray",
//     marginTop: 20,
//   }
// })