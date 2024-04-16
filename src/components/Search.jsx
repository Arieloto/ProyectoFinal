import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../constants/colors"
import { Ionicons } from '@expo/vector-icons';

const Search = ({ onSearch = () => {}, error = "", goBack = () => {} }) => {
  const [keyword, setKeyword] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..." 
          placeholderTextColor={colors.teal900}         
          value={keyword}
          onChangeText={setKeyword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

      </View>
      <Pressable onPress={() => onSearch(keyword)}>
        <Ionicons name="search" size={24} color= {colors.teal900} />
      </Pressable>
      <Pressable onPress={() => setKeyword("")}>
        <Entypo name="erase" size={24} color={colors.teal900} />
      </Pressable>
      <Pressable onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color={colors.teal900} />
      </Pressable>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'start',
    gap: 4,
    width: '62%',
  },
  input: {
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.teal200,
    color: colors.platinum,
    borderRadius: 10,
  },
  errorText: {
    color: 'tomato',
    fontSize: 14,
    fontFamily: 'Saira'
  }
})
