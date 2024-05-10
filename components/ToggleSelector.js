
import { View, StyleSheet } from "react-native";
import Toggle from "react-native-toggle-element";
import { FontAwesome5 } from '@expo/vector-icons';
import NormalText from "./NormalText";

export function ToggleSelector({ onPress }) {

    return (
        <Toggle
            animationDuration={80}
            value={false}
            onPress={onPress}
            leftComponent={<FontAwesome5 name={'tasks'} size={13} color="white" />}
            rightComponent={<FontAwesome5 name={'check-circle'} size={13} color="white" />}
            trackBar={{
                activeBackgroundColor: "white",
                inActiveBackgroundColor: "white",
                borderActiveColor: "#C62426",
                borderInActiveColor: "#C62426",
                borderWidth: 2,
                width: 60,
                height: 25,
            }}
            thumbButton={{
                activeBackgroundColor: '#C62426',
                inActiveBackgroundColor: '#C62426',
                width: 35,
                height: 25,
            }}
        />
    );
}
const styles = StyleSheet.create({
    // container: {
    //     padding: 10,
    // },
});