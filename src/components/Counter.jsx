import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount, reset } from "../features/Counter/counterSlice";

const Counter = () => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()


    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Pressable 
                    style={styles.button}
                    onPress={()=> dispatch(decrement())}
                >
                    <Text style={styles.buttonText}>-</Text>
                </Pressable>
                <Text style={styles.span}>{count}</Text>
                <Pressable 
                    style={styles.button}
                    onPress={()=> dispatch(increment())}
                >
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
           
            <Pressable style={styles.button} onPress={()=>dispatch(reset())}>
                <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
        </View>
    );
};

export default Counter;

const styles = StyleSheet.create({
    container: {
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems:"center",
        width: 70,
        backgroundColor: colors.teal200,
        padding: 2,
        position: "absolute",
        right:-10,
    },
    buttonsContainer: {
        flexDirection: "row",   
       
    },
    button: {
        padding:5,        
        backgroundColor: colors.platinum,
        borderColor:"black",
        borderWidth: 1,
    },
    span: {
        backgroundColor: colors.teal900,
        width: "60%",
        paddingTop:4,
        textAlign: "center",
        fontSize: 16,
        color: colors.platinum,
        fontSize: 16,
        fontFamily: "Saira",
    },    
    buttonText: {
        paddingBottom:2,       
        fontSize: 12,
        fontFamily: "Saira",
    },
});
