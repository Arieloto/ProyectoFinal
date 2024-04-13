import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import SvgLogo from '../../assets/SvgLogo'

const Header = ({title}) => {
  const {height, width} = useWindowDimensions()

const widthlogo = useWindowDimensions().width <= 320 ? 20 : 40;
const heightlogo = useWindowDimensions().width <= 320 ? "75%" : "85%";
const marginToplogo = useWindowDimensions().width <= 320 ? 4 : 5;
const filllogo = useWindowDimensions().width <= 320 ? colors.teal200 : colors.teal200;


  return (
    
    <View style = {styles.container}>
     
    <SvgLogo width={widthlogo} height={heightlogo} marginTop={marginToplogo} fill={filllogo}/>

      <Text style = {width > 360 ? styles.text: styles.textSm}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {   
    width: '100%',
    height: 70,
    backgroundColor: colors.teal900,
    justifyContent: 'center',
    flexDirection:"row",   
    
  },
  text: {
    marginTop:20,
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
  }
})