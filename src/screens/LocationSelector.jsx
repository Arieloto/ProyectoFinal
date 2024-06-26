import { StyleSheet, Text, View,Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import * as Location from "expo-location"
import AddButton from "../components/AddButton"
import MapPreview from "../components/MapPreview"
import { googleMapsApiKey } from "../databases/googleMaps"
import { colors } from "../constants/colors"
import { useGetLocationQuery, usePostLocationMutation } from "../services/shopService"
import { useSelector } from "react-redux"
import {MaterialCommunityIcons} from '@expo/vector-icons'

const LocationSelector = ({ navigation }) => {
    const [location, setLocation] = useState({ latitude: "", longitude: "" })
    const [address, setAddress] = useState("")
    const [error, setError] = useState("")
    const [triggerPostUserLocation, result] = usePostLocationMutation()
    const {localId} = useSelector(state => state.auth.value)
    
    const onConfirmAddress = () => {

        const date = new Date()

        triggerPostUserLocation({
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: address,
                updatedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            },
            localId: localId
        })
       
    }

  
    useEffect(() => {
       
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync()
    
                if (status === "granted") {
                    let location = await Location.getCurrentPositionAsync({})
                   
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    })
                }
            } catch (error) {
                
            }
        })()

       
    }, [])

  
    useEffect(() => {
        (async () => {
            try {
                if (location.latitude) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json();
                    console.dir(data);
                    setAddress(data.results[0].formatted_address);
                }
            } catch (error) {
                setError(error.message);
            }
        })();
    }, [location])

    return (
        <View style={styles.container}>
             <View style={styles.press}>        
      <Pressable  onPress={() => navigation.goBack()} title="Go back" >       
      <MaterialCommunityIcons  name="backburger" size={32} color={"black"} />
      </Pressable>
      </View>
            <Text style={styles.text}>Mi ubicación</Text>
           
            {location ? (
                <>
                    <Text style={styles.text}>
                        Lat: {location.latitude}, long: {location.longitude}.
                    </Text>
                    <MapPreview location={location} />
                    <Text style={styles.address}>
                        Dirección: {address}
                    </Text>
                    <AddButton
                        onPress={onConfirmAddress}
                        title="Confirmar dirección"
                    />
                </>
            ) : (
                <>
                    <View style={styles.noLocationContainer}>
                        <Text>{error}</Text>
                    </View>
                </>
            )}
        </View>
    )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.teal200,
    },
    text: {
        paddingTop: 20,
        fontFamily: "Saira",
        fontSize: 14,
    },
    noLocationContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.teal400,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    address: {
        fontFamily: "Saira",
        padding: 10,
        fontSize: 16,
    },
    press: {
        alignSelf:"flex-end",
        borderWidth:4,
        borderColor:colors.teal900,
        margin:3,
        },
})
