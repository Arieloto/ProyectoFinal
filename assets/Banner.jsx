import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import Swiper from "react-native-swiper";
import producto from "../src/data/products.json";
import { colors } from "../src/constants/colors";
import { useNavigation } from "@react-navigation/native";

const Banner = () => {
  const navigation = useNavigation();
  const [topDiscountProducts, setTopDiscountProducts] = useState([]);
  
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
      <Swiper style={styles.wrapper} showsButtons={false}>
        {topDiscountProducts.map((product, index) => (
          <View style={styles.slide} key={index}>
            <Pressable
              style={styles.pressable}
              onPress={() =>
                navigation.navigate("ItemDetail", { productId: product.id })
              }
            >
              <Text style={styles.textCategory}>{product.title}</Text>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: product.images[0] }}
              />
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
    height: 200,
    width: "100%",
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: "100%",
    borderRadius: 8,
  },
  textCategory: {
    color: colors.teal200,
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
});