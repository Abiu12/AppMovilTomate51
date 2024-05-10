import { useEffect, useState } from "react";
import {useRoute} from "@react-navigation/native"
import { Text, View,SafeAreaView, Pressable} from "react-native";

export default function Screen(){
    // const{
    //     params: {idGreenhouse}
    // } = useRoute()

    const [greenhouses,setGreenhouses] = useState([]);
    
    // useEffect(()=>{
    //     console.log("Id del invernadero: ",idGreenhouse)
    //     // fetchGreenhouses();    
    // },[]);

    // async function fetchGreenhouses(){
    //     const response = await fetch("http://192.168.1.67:3000/greenhouse/farmer/8");
    //     const data = await response.json()
    //     setGreenhouses(data);
    // }

    return(
        <SafeAreaView>
            
            <Text>Stack de notificaciones</Text>
            
        </SafeAreaView>
    )
}