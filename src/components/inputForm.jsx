import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors';

const InputForm = ({
    label, 
    onChange, 
    error = "HOLA",
    isSecure = false
}) => {
    const [input, setInput] = useState("");
    const onChangeText = (text) => {
        setInput(text)
        onChange(text)
    }
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.subtitle}>{label}</Text>
      <TextInput
        style ={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ? 
        <Text style = {styles.error}>
            {error}
        </Text>
        :
        null
    }
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        
    },
    subtitle: {
        width: '90%',
        fontSize: 16,
        fontFamily: 'Saira',
        color: colors.platinum,
    },
    error: {
        paddintTop: 2,
        fontSize: 16,
        color: 'red',
        fontFamily: 'Saira',
        fontStyle: 'italic',
    },
    input: {
        width: '90%',
        borderWidth: 1,
        color: colors.platinum,
        borderColor: colors.teal400,
        padding: 2,
        fontFamily: 'Saira',
        fontSize: 14,
    }
})