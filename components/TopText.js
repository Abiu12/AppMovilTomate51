import React from "react";
import { Text, StyleSheet } from 'react-native'

export default function TopText({ text, textColor }) {
    return (
        <Text style={[styles.text, { color: textColor }]}>
            {text}
        </Text>
    );
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
    },
});