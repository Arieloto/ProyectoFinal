import { Image, StyleSheet, Text, Pressable } from "react-native"
import React from "react"
import Card from "./Card"
import { colors } from "../constants/colors"

const ProductItem = ({
  product,
  setProductSelected = () => {},
  navigation,
}) => {
  return (
    <Card style={styles.additionalStylesCard}>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate('ItemDetail', {productId: product.id})}
      >
        <Text style={styles.textCategory}>{product.title}</Text>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: product.images[0] }}
        />
      </Pressable>
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: "100%",
    overflow:"hidden",
   
    
    
  },
  additionalStylesCard: {
    height: 200, 
    overflow:"hidden",
    margin: 2,
  },
  textCategory: {
    width: "100%",
    height: 60,
    color: colors.platinum,
    padding:5,
    textAlign:"center"
  },
  pressable: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
  },
})
