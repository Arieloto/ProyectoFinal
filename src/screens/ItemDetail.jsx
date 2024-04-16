import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native"
import React, { useEffect, useState } from "react"
import allProducts from "../data/products.json"
import { colors } from "../constants/colors";

const ItemDetail = ({ route, navigation }) => {

  const [product, setProduct] = useState(null)
  const [orientation, setOrientation] = useState("portrait")
  const { width, height } = useWindowDimensions()

  const {productId: idSelected} = route.params

  //Landscape = horizontal
  //Portrait = vertical

  useEffect(() => {
    if (width > height) setOrientation("landscape")
    else setOrientation("portrait")
  }, [width, height])

  useEffect(() => {
    //Encontrar el producto por su id
    const productSelected = allProducts.find(
      (product) => product.id === idSelected
    )
    setProduct(productSelected)
  }, [idSelected])

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Volver atrás" />
      {product ? (
        <View
          style={
            orientation === "portrait"?
            styles.mainContainer
            : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: product.images[0] }}
            style={orientation === "portrait" ? styles.image : styles.imageLandscape}
            resizeMode="cover"
          />
          <View style={orientation === "portrait" ? styles.textContainer : styles.textContainerLandscape}>
            <Text style={styles.text} >{product.title}</Text>
            <Text style={styles.text} >{product.description}</Text>
            
            <Text style={styles.price}>${product.price}</Text>
            <Button title="Agregar al carrito"></Button>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  container: {
  flex:1,
    backgroundColor:colors.teal200,
    
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor:colors.teal200,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
 
  },
  image: {
    width: '100%',
    height: 250,
  },
  imageLandscape: {
    width: '45%',
    height: 200
  },
  textContainer: {
    flexDirection: "column",   
  },

  textContainerLandscape: {
   
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    gap: 10,

  },
  price: {
    fontFamily: 'Saira',
    marginTop:20,
    marginBottom:20,
    textAlign: 'right',
    width: '100%',
  },
  text:{fontFamily: 'Saira',

  }
})
