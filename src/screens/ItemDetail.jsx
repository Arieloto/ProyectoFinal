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
import { useGetProductByIdQuery } from "../services/shopService"
import { useDispatch } from "react-redux"
import { addCartItem } from "../features/Cart/cartSlice"
import { colors } from "../constants/colors"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import Counter from "../components/Counter"
import { useSelector } from "react-redux";
import { FlatList, ScrollView } from "react-native-web"

const ItemDetail = ({ route, navigation }) => {

  const dispatch = useDispatch()

  const {productId: idSelected} = route.params

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected)
  
  /*const countValue = useSelector(state => state.counter.value);*/



  const handleAddCart = () => {
    dispatch(addCartItem({...product, quantity: 1}))
  }

  return (
    <View style={styles.container}>
      <View style={styles.press}>
        
      <Pressable  onPress={() => navigation.goBack()} title="Go back" >       
      <MaterialCommunityIcons  name="backburger" size={32} color={"black"} />
      </Pressable>
      </View>
      {product ? (
        <View style={styles.mainContainer}>
          <Image
            source={{ uri: product.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer }>
            <Text style={styles.text}>{product.title}</Text>
            <Text style={styles.text2}>{product.description}</Text>
            <View style={styles.pricecont}>
            <Text style={styles.price}>${product.price}</Text>
            </View>

           {/*<View>
            <Counter/>
        </View>*/}
            
            <View style={styles.addToCartButton}>            
            <Pressable style={styles.addToCartButton} title="Add cart" onPress={handleAddCart}>
            <Text style={styles.addToCartText}>AGREGAR</Text>
            <View>
            <MaterialIcons  name="add-shopping-cart" size={24} color={"white"} />
            </View>      
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
    flex: 1,
    backgroundColor:colors.teal200,
  },
  press: {
    position:"absolute",
    margin: 20, // Add some spacing after the back button
    backgroundColor:colors.teal200,
    zIndex:2,
  },
  pressButton: {
    flexDirection: 'row', // Arrange icon and text horizontally
    alignItems: 'center', // Align vertically
  },
  pressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10, // Add spacing between text and icon
  },
  mainContainer: {
    // Styles for portrait layout
  },
  mainContainerLandscape: {
    // Styles for landscape layout (optional)
  },
  image: {
    width: '100%', // Make the image fill the container width
    aspectRatio: 1, // Maintain aspect ratio (optional)
  },
  textContainer: {
    marginTop: 10,
    marginLeft:"2%",
    marginRight:"2%", // Add spacing above the text section
  },
  textContainerLandscape: {
    // Styles for landscape text layout (optional)
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Saira',
    marginLeft:10,
    marginRight:10,
  },
  text2: {
    fontSize: 12,
    marginBottom: 25,
    margin:10,
    fontFamily: 'Saira',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Saira',
    color: "white",
    transform: [{ rotate: '-30deg' }],
    position: 'absolute', 
    top: 0, 
    left: "6%",
    marginBottom: "2%",
    backgroundColor:colors.teal900,
    padding:5,
  },pricecont: {
    width:200,
    height:50,
  },
  addToCartButton: {
    backgroundColor:colors.teal600,
   
    borderRadius: 5,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent:"center",
    alignSelf:"center",
    width: 200,
    height: 40,
   
 

  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    fontFamily: 'Saira',
  },
});