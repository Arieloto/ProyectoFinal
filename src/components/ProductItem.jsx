import { Image, StyleSheet, Text, Pressable } from "react-native"
import React from "react"
import Card from "./Card"
import { colors } from "../constants/colors"
import { useDispatch } from "react-redux"
import { setIdSelected } from "../features/Shop/shopSlice"

const ProductItem = ({
  product,
  navigation,
}) => {

  const dispatch = useDispatch()
  const handleNavigate = () => {
    dispatch(setIdSelected(product.title))
    navigation.navigate('ItemDetail', {productId: product.id})
  }
  return (
    <Card style={styles.additionalStylesCard}>
      <Pressable
        style={styles.pressable}
        onPress={handleNavigate}
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
    width:"46%",
    
    margin: "2%",
    paddingTop:5,
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
