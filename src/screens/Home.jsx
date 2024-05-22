import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
import { useGetCategoriesQuery } from "../services/shopService"
import { useGetProductsQuery } from "../services/shopService"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header"
import { cambiarSubtitulo} from "../services/subtituloSlice";
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Banner from "../components/Banner"

const Home = ({ route, navigation}) => {
  
  const {data: categories, error, isLoading} = useGetCategoriesQuery()

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(cambiarSubtitulo(true));    
    }, [])
  );

  return (
    <>
    <Banner/>
    <View style={styles.container}>
    
      <FlatList       
      
      style={styles.gridView}
      numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={categories}       
        renderItem={({ item }) => (
          
           <CategoryItem navigation={navigation} category={item.nombre} image ={item.img} />
           
        )}
      />

    </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {   
    flexDirection: "column",   
    backgroundColor: colors.teal200, 
    flex: 1,     
  },
  gridView: { flex: 1,
    
  },
  categorias:{
    
    color: colors.platinum,
    fontSize:24,
    textAlign: "center",
    fontFamily: 'Saira',
    backgroundColor:colors.teal900
  }
})