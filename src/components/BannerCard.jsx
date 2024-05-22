import React from 'react';
import { colors } from '../constants/colors';
import { Image, StyleSheet, Text, View, Pressable, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native";
import { setIdSelected } from "../features/Shop/shopSlice"

const BannerCard = ({ product }) => {
  const navigation = useNavigation();

 const widthbanner = useWindowDimensions().width

 const dispatch = useDispatch()
 const handleNavigate = () => {
   dispatch(setIdSelected(product.title))
   navigation.navigate('ItemDetail', {productId: product.id})
 }
  
  return (
    <View style={styles.slide}>
    <Text style={styles.discount}>-%{product.discountPercentage}</Text>
    <Text style={styles.price}>Oferta:${product.price}</Text>
    <Pressable
      
      onPress={handleNavigate}
    >             
      <Image
        resizeMode="cover"
        style={styles.image } 
        source={{ uri: product.images[0] }}
      />
      
      <Text style={styles.textCategory}>{product.title}</Text>
    </Pressable>
    
  </View>
  );
};



const styles = StyleSheet.create({
  container: {
    
    backgroundColor:colors.teal400,    
    paddingTop: 5,
    paddingBottom: 5,
    height:250,  
    
      },
  wrapper: {  
    
  },
  slide: { 
    
    justifyContent: "center",
     
  },
  image: {   
    height: 240,
          
  },
  textCategory: {
    color: colors.teal900,
    paddingTop: 5, 
    position: 'absolute',
    bottom: 10,
    fontFamily: 'Saira',    
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: colors.platinum,   
   
  },

  discount:{
    zIndex:1,
    position: 'absolute',
    top: "2%", 
    right: "5%", 
    backgroundColor:colors.teal200, 
    borderRadius: 20, 
    paddingVertical: 1,
    paddingHorizontal: 1,
    fontFamily: 'Saira',
  
    
  },
  price:{
    zIndex:1,
    position: 'absolute',
    top: "12%", 
    right: "5%", 
    backgroundColor:colors.teal200, 
    borderRadius: 20, 
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Saira',
  
    
  },
});
export default BannerCard;