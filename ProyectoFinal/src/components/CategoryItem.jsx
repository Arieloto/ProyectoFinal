import {  Pressable, StyleSheet, Text, Image } from "react-native"
import React from "react"
import { colors } from "../constants/colors"
import Card from "./Card"


const CategoryItem = ({ image, category, navigation }) => {
 console.log(image)
  
  return (
    <Card style={{ marginVertical: 10, marginHorizontal: 10 }}>
      <Pressable onPress={()=>navigation.navigate('ItemListCategory', {category})}>      
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{category}</Text>
    
        
        
      </Pressable>
    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  text: {
    color: colors.platinum,
    textAlign: "center",
    fontSize: 20,
  },
  image: {
    width: 65,
    height: 65,
    margin:10,
    alignSelf:"center",   
    
   
  }
  
})
