import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useSelector } from "react-redux"
import AddButton from "../components/AddButton"
import { useGetLocationQuery } from "../services/shopService"
import AddressItem from "../components/AddressItem"
import { colors } from "../constants/colors"


const ListAddress = ({ navigation }) => {
    const { localId } = useSelector((state) => state.auth.value)

    const { data: location, isLoading, error } = useGetLocationQuery(localId)

    

    return location ? (
        <AddressItem 
            location={location}
            navigation={navigation}
        />
    ) : (
        <View style={styles.container}>
            <Text style={styles.text}>No ha ingresado ubicación</Text>
            <AddButton
                title="Agregar ubicación"
                onPress={() => navigation.navigate("Location Selector")}
            />
        </View>
    )
}

export default ListAddress

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex:1,
        backgroundColor:colors.teal200,
    },
    text: {
        paddingVertical: 20,
        fontFamily: "Saira",
        fontSize: 18,
    },
})
