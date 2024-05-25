import { Image, StyleSheet, View } from "react-native"
import React from "react"
import AddButton from "../components/AddButton"
import { useDispatch, useSelector } from "react-redux"
import { useGetProfileImageQuery } from "../services/shopService"
import { clearUser } from "../features/User/userSlice"
import { truncateSessionsTable } from "../persistence"
import { colors } from "../constants/colors"

const MyProfile = ({ navigation }) => {


    const dispatch = useDispatch()

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
            console.log(response);
            dispatch(clearUser())
        } catch (error) {
            console.log({errorSignOutDB: error});
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
            <AddButton
                onPress={launchCamera}
                title={
                    imageFromBase || imageCamera
                        ? "Modificar foto de perfil"
                        : "Agregar foto de perfil"
                }
            />
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
})
