import { StyleSheet, View,Text } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const Card = ({children, style}) => {
  return (
    <View style={{...styles.container, ...style}}>
        
        {children} 
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
      backgroundColor: colors.teal600,
     
    },
    
})
