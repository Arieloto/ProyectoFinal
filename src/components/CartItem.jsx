import { StyleSheet, Text, View, TouchableOpacity,Pressable } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { Entypo } from "@expo/vector-icons";


const CartItem = ({ cartItem, onDelete}) => {
    return (
        <View style={styles.card} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{cartItem.title} ({cartItem.quantity})</Text>
                <Text style={styles.text2}>{cartItem.brand}</Text>
                <Text style={styles.text2}>${cartItem.price}</Text>
            </View>
            
   
            <Pressable onPress={onDelete}>
            <Entypo name="trash" size={30} color="black" />
            </Pressable>
            
           
   
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.platinum,
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontFamily: "Saira",
        fontSize: 19,
        color: colors.teal400,
    },
    text2: {
        fontFamily: "Saira",
        fontSize: 14,
        color: colors.teal600,
    },
});
