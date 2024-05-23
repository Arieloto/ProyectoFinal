import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import SvgLogo from '../../assets/SvgLogo'
import { useSelector } from 'react-redux'
import {useEffect,useState} from "react"


const Header = ({route}) => {

  const [subtittle, setSubtittle] = useState('');

  const {width} = useWindowDimensions()
  const categorySelected = useSelector(state => state.shop.value.categorySelected)
  const titulo = (route.name === 'Shop') ? "A OTRA DIMENSION" :
  (route.name === 'Carrito' || route.name === 'Pedidos'|| route.name === 'Mi Perfil') ? route.name :
  categorySelected; 


const widthlogo = useWindowDimensions().width <= 320 ? 20 : 40;
const heightlogo = useWindowDimensions().width <= 320 ? "75%" : "100%";
const filllogo = useWindowDimensions().width <= 320 ? colors.teal200 : colors.teal200;

const subtitulo = useSelector((state) => state.subtitulo.value);

useEffect(() => {
  if (titulo === 'A OTRA DIMENSION') {
    if (subtitulo) {
      setSubtittle('Categorias');
    } else {
      setSubtittle(categorySelected);
    }
  } else {
    setSubtittle('');
  }
}, [titulo, subtitulo, categorySelected]);

  return (
    <>
    <View style = {styles.container}>
    <View style = {styles.logo}>
    <SvgLogo width={widthlogo} height={heightlogo}  fill={filllogo}/>
    </View>
      <Text style = {width > 360 ? styles.text: styles.textSm}>{titulo}</Text>

    </View>
    <View style = {styles.catcon}>
      <Text style = {styles.cat}>{subtittle}</Text>
      </View>


    </>

  )
}

export default Header

const styles = StyleSheet.create({
  container: {   
    width: '100%',
    height: 45,
    backgroundColor: colors.teal900,
    justifyContent: 'center', 
    flexDirection:"row", 
  },
  logo: {  
paddingTop:5,
  },
  text: {
    marginTop:10,
    color: colors.platinum,
    fontSize:24,
    marginLeft:15,
    fontFamily: 'Saira'
    
  },
  textSm: {
    marginTop:20,
    marginLeft:15,
    color: colors.teal900,
    fontFamily: 'Saira',
    fontSize: 20
  },
 catcon: {   
 
  width: '100%',
  height: 30,
  backgroundColor: colors.teal900,
  justifyContent: 'center', 
  flexDirection:"row", 
    
  },
  cat: {  
    color: colors.platinum,
    fontFamily: 'Saira',
    fontSize: 16
  },
})