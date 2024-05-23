import { StyleSheet, Text, View, TouchableOpacity,Pressable, Image } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { Entypo,MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { decrementCartItem, incrementCartItem } from "../features/Cart/cartSlice";
import PrecioChileno from "../constants/PrecioChileno";

const CartItem = ({ cartItem, onDelete}) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.card} onPress={() => {}}>
            <Image
        resizeMode="cover"
        style={styles.image } 
        source={{ uri: cartItem.images[0] }}
      />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{cartItem.title} </Text>                
                <Text style={styles.text2}>{cartItem.brand}</Text>
                <PrecioChileno style={styles.text2} valor={cartItem.price} />
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
        fontSize: 14,
        color: colors.teal600,
    },
    text2: {
        fontFamily: "Saira",
        fontSize: 12,
        color: colors.teal400,
    },
    image: {
        height: 80,
        width: 60,
       
    },
});
