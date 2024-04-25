import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native"
import React, { useEffect, useState } from "react"
// import allProducts from "../data/products.json"
import { useGetProductByIdQuery } from "../services/shopService"
import { useDispatch } from "react-redux"
import { addCartItem } from "../features/Cart/cartSlice"
import { colors } from "../constants/colors"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import Counter from "../components/Counter"
import { useSelector } from "react-redux";

const ItemDetail = ({ route, navigation }) => {

  const dispatch = useDispatch()
  // const [product, setProduct] = useState(null)
  const [orientation, setOrientation] = useState("portrait")
  const { width, height } = useWindowDimensions()

  const {productId: idSelected} = route.params

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected)
  
  const countValue = useSelector(state => state.counter.value);

console.log(countValue)
  //Landscape = horizontal
  //Portrait = vertical

  useEffect(() => {
    if (width > height) setOrientation("landscape")
    else setOrientation("portrait")
  }, [width, height])

  /* useEffect(() => {
    //Encontrar el producto por su id
    const productSelected = allProducts.find(
      (product) => product.id === idSelected
    )
    setProduct(productSelected)
  }, [idSelected]) */

  const handleAddCart = () => {
    dispatch(addCartItem({...product, quantity: countValue}))
  }

  return (
    <View style={styles.container}>
      <View style={styles.press}>
        
      <Pressable  onPress={() => navigation.goBack()} title="Go back" > 
      <Text style={styles.press}>ATRAS</Text>
      <MaterialCommunityIcons  name="backburger" size={24} color={colors.teal900} />
      </Pressable>
      </View>

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
            <Text style={styles.text}>{product.title}</Text>
            <Text style={styles.text}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>

            <View>
            <Counter/>
            </View>

            <View>            
            <Pressable title="Add cart" onPress={handleAddCart}>
            <Text>Agregar al carrito</Text>
            <MaterialIcons  name="add-shopping-cart" size={24} color={colors.teal900} />
            </Pressable>
            </View>
          
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
  press: {
backgroundColor: colors.teal200,
borderColor:"black",
flexDirection:"row",

fontFamily: 'Saira',


  },
  text:{fontFamily: 'Saira',

  }
})
