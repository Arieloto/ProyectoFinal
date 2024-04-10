import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import SvgLogo from '../../assets/SvgLogo'




const Header = ({title}) => {
  return (
  
    <View style = {styles.container}>
     
<SvgLogo width={40} height={"85%"} marginTop={5} fill={colors.teal200}/>   


      <Text style = {styles.text}>{title}</Text>


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
  
})