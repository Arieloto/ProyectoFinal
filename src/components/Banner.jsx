import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable, useWindowDimensions } from "react-native";
import Swiper from "react-native-swiper";
import producto from "../data/products.json";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Banner = () => {
  const navigation = useNavigation();
  const [topDiscountProducts, setTopDiscountProducts] = useState([]);
  const widthbanner = useWindowDimensions().width
  useEffect(() => {
    const getTopDiscountProducts = () => {
      // Ordenar los productos por su propiedad descuento en orden descendente
      const sortedProducts = producto.sort((a, b) => b.discountPercentage - a.discountPercentage);
      // Seleccionar los primeros 5 productos en oferta
      const selectedProducts = sortedProducts.slice(0, 5);
    
      return selectedProducts;
    };

    setTopDiscountProducts(getTopDiscountProducts());
  }, []);
    
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper}
       showsPagination={false}
       autoplay={true}
       showsButtons={false}
       autoplayTimeout={4}
      
       >
        {topDiscountProducts.map((product, index) => (
          <View style={styles.slide} key={index}>
            <Text style={styles.discount}>-%{product.discountPercentage}</Text>
            <Text style={styles.price}>Oferta:${product.price}</Text>
            <Pressable
              
              onPress={() =>
                navigation.navigate("ItemDetail", { productId: product.id })
              }
            >             
              <Image
                resizeMode="cover"
                style={styles.image } width={widthbanner}
                source={{ uri: product.images[0] }}
              />
              
              <Text style={styles.textCategory}>{product.title}</Text>
            </Pressable>
            
          </View>
        ))}
        
      </Swiper>
    </View>
  );
};

export default Banner;

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
    alignItems: "center",    
  },
  image: {   
    height: "100%",       
  },
  textCategory: {
    color: colors.teal900,
    paddingTop: 5, 
    position: 'absolute',
    bottom: 0,
    fontFamily: 'Saira',    
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: colors.platinum,   
   
  },

  discount:{
    zIndex:1,
    position: 'absolute',
    top: 10, 
    right: 10, 
    backgroundColor:colors.teal200, 
    borderRadius: 20, 
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Saira',
  
    
  },
  price:{
    zIndex:1,
    position: 'absolute',
    top: 40, 
    right: 10, 
    backgroundColor:colors.teal200, 
    borderRadius: 20, 
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Saira',
  
    
  },
});