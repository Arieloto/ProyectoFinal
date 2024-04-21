import {  Pressable, StyleSheet, Text, Image, View,useWindowDimensions } from "react-native"
import React from "react"
import { colors } from "../constants/colors"
import Card from "./Card"

import {useDispatch, useSelector} from 'react-redux'
import { setCategorySelected } from "../features/Shop/shopSlice"



const CategoryItem = ({ image, category, navigation }) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected(category))
    navigation.navigate('ItemListCategory', {category})
  }
 const widthhome = useWindowDimensions().width

  return (
    <View style={styles.container}>
      
    <Card style = {widthhome >320 ? styles.card : styles.cardSm}>
    <Pressable onPress={handleNavigate}>     
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{category}</Text> 
        
      </Pressable>

    </Card>
    </View>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  container:{
    flex:1,      
  },
 cardSm: {
    height: 145,
    padding: "2%",
    marginTop: "2%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom :"2%",  
     },
  card: {
    height: 145,
    padding: 10,
    marginTop: "2%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom :"2%",   
     },
  text: {
    color: colors.platinum,
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'Saira',
  },
  image: {
    
    width: 65,
    height: 65,
    margin:10,
    alignSelf:"center",   
    }
  
})
