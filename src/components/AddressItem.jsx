import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { colors } from "../constants/colors";
import {MaterialCommunityIcons} from '@expo/vector-icons'

const AddressItem = ({ location, navigation }) => {

    const onChangeLocation = () => {
        navigation.navigate('Location Selector')
    }

    return (
        <View style={styles.container}>
             <Text style={styles.text1}>
                    UBICACIÓN
                </Text>
             <View style={styles.press}>        
      <Pressable  onPress={() => navigation.goBack()} title="Go back" >       
      <MaterialCommunityIcons  name="backburger" size={32} color={"black"} />
      </Pressable>
      </View>
    

        <View style={styles.card} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {location.address}
                </Text>
            </View>
            <Pressable onPress={onChangeLocation}>
                <Entypo name="location" size={30} color="black">
                    <Text style={styles.text2}>Cambiar ubicación</Text>
                </Entypo>
            </Pressable>
        </View>
        </View>
    );
};

export default AddressItem;

const styles = StyleSheet.create({
    container: {
        flex:1,
       backgroundColor: colors.teal200,
    },
    card: {      
        height: 100,
        backgroundColor: colors.platinum,
        paddingTop: 10,
        marginTop: 3,
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
    text1: {
        fontFamily: "Saira",
        fontSize: 20,
        color: colors.teal600,
        marginTop:5,
        marginBottom:8,
        alignSelf:"center"
    },
    text2: {
        fontFamily: "Saira",
        fontSize: 12,
        color: colors.teal400,
    },
    press: {
        alignSelf:"flex-end",
        borderWidth:4,
        borderColor:colors.teal900,
        margin:3,
        position:"absolute",

        },
});