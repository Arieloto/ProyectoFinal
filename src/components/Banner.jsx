import React from 'react';
import { View, StyleSheet,Dimensions, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import { useGetProductsQuery } from "../services/shopService";
import BannerCard from "./BannerCard";
import { colors } from '../constants/colors';

const Banner = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <Text>Cargando...</Text>
  }

  if (isError || !products) {
    return <Text>Error producto no encontrado</Text>
  }

  const sortedProducts = products.slice().sort((a, b) => b.discountPercentage - a.discountPercentage);
  const topFiveProducts = sortedProducts.slice(0, 5);

  return (
    <View style={styles.container}>
      <Swiper
      showsPagination={false}
      autoplay={true}
      showsButtons={false}
      autoplayTimeout={5}
        style={styles.swiper}
      >
        {topFiveProducts.map((product) => (
          <BannerCard key={product.id} product={product} />
        ))}
      </Swiper>
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
  swiper: {

  },
});

export default Banner;