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
import { useDispatch,useSelector } from "react-redux"
import { addCartItem } from "../features/Cart/cartSlice"
import { colors } from "../constants/colors"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import { ScrollView} from 'react-native';
import Counter from "../components/Counter"

const ItemDetail = ({ route, navigation }) => {

  const dispatch = useDispatch()
  const count = useSelector(state => state.counter.value);
  const {productId: idSelected} = route.params

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected)
  

  const handleAddCart = () => {
    dispatch(addCartItem({...product, quantity: count}))
  }

  return (
    <>
    <ScrollView style={styles.container}>
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
            <Counter/>
            </View>
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
     </ScrollView>
     </>
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
    margin: 20,
    backgroundColor:colors.teal200,
    zIndex:2,
  },
  pressButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  pressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10, 
  },
  image: {
    width: '100%', 
    aspectRatio: 1, 
  },
  textContainer: {
    marginTop: 10,
    marginLeft:"2%",
    marginRight:"2%", 
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
    alignItems:"center",
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
  },
  pricecont: {
    justifyContent:"space-between",
    width:200,
    height:50,
  },
  addToCartButton: {
    marginTop:10,
    marginBottom: 20,
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