import { StyleSheet, Text, View, TouchableOpacity,Pressable } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { Entypo,MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { decrementCartItem, incrementCartItem } from "../features/Cart/cartSlice";

const CartItem = ({ cartItem, onDelete}) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.card} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{cartItem.title} </Text>                
                <Text style={styles.text2}>{cartItem.brand}</Text>
                <Text style={styles.text2}>${cartItem.price}</Text>
            </View>
            <TouchableOpacity onPress={() => dispatch(decrementCartItem({ id: cartItem.id }))}>
                    <Entypo name="minus" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.text2}>{cartItem.quantity}</Text>
                <TouchableOpacity onPress={() => dispatch(incrementCartItem({ id: cartItem.id }))}>
                    <Entypo name="plus" size={20} color="black" />
                </TouchableOpacity>

          
            <Pressable onPress={onDelete}>
            <MaterialCommunityIcons name="cart-remove" size={20} color="black" />
            </Pressable>
            
           
   
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.platinum,
        paddingTop: 10,
        marginTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        paddingLeft:10,
        paddingRight:10,
        width: "100%",        
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width:"60%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontFamily: "Saira",
        fontSize: 15,
        color: colors.teal400,
    },
    text2: {
        fontFamily: "Saira",
        fontSize: 14,
        color: colors.teal600,
    },
});
