import { Image, StyleSheet, View,Text, Pressable } from "react-native"
import React from "react"
import AddButton from "../components/AddButton"
import { useDispatch, useSelector } from "react-redux"
import { useGetProfileImageQuery } from "../services/shopService"
import { clearUser } from "../features/User/userSlice"
import { truncateSessionsTable } from "../persistence"
import { colors } from "../constants/colors"

const MyProfile = ({ navigation }) => {


    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth.value)
    const { imageCamera, localId } = useSelector((state) => state.auth.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    const launchCamera = async () => {
        navigation.navigate("Image selector")
    }

    const launchLocation = async () => {
        navigation.navigate('List Address')
    }

    const signOut = async () => {
        try {
            const response = await truncateSessionsTable()
           
            dispatch(clearUser())
        } catch (error) {
            
        }
    }

    const defaultImageRoute = "../../assets/images/defaultProfile.png"

    return (
        <View style={styles.container}>
            {imageFromBase || imageCamera ? (
                <Image
                    source={{ uri: imageFromBase?.image || imageCamera }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <Image
                    source={require(defaultImageRoute)}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <Pressable style={styles.buttonplus}
                onPress={launchCamera}
                title={
                    imageFromBase || imageCamera
                        ? "+"
                        : "+"
                }
            ><Text style={styles.plus}>+</Text></Pressable>
            <Text style={styles.user}>Hola {user}</Text>
            <AddButton onPress={launchLocation} title="Mi direccion" />
            <AddButton onPress={signOut} title="Desconectar" />
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.teal200,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    buttonplus: {
        width: 25,
        height: 25,
        borderRadius:50,
        backgroundColor: colors.teal900,
        position:"absolute",
        top:86,
        right:160,
    },
    plus: {
       fontFamily:"Saira",
       fontSize:30,
       color:colors.platinum,
       position:"absolute",
       bottom:-7,
       right:4,
    },
    user: {
        fontFamily:"Saira",
        fontSize:20,
        color:colors.teal900,
   
 
         
     },
})
