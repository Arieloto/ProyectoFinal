import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import ProductItem from "../components/ProductItem"
import Search from "../components/Search"
import { useState, useEffect,useFocusEffect } from "react"
import { useGetProductsByCategoryQuery } from "../services/shopService"
import Header from "../components/Header"


import { cambiarSubtitulo} from "../services/subtituloSlice";
import { useDispatch, useSelector } from "react-redux";


const ItemListCategory = ({ 
  navigation,
  route
}) => {
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  const {category: categorySelected} = route.params

  const {data: productsFetched, error: errorFromFetch, isLoading} = useGetProductsByCategoryQuery(categorySelected)
  const dispatch = useDispatch();




  useEffect(() => {
    const regexDigits = /\d/
    const hasDigits = regexDigits.test(keyWord)
    if (hasDigits) {
      setError("Don't use digits")
      return
    }
    //3 or more characters
    const regexThreeOrMore = /[a-zA-Z]{3,}/
    const hasThreeOrMoreChars = regexThreeOrMore.test(keyWord)

    if (!hasThreeOrMoreChars && keyWord.length) {
      setError("Type 3 or more characters")
      return
    }

    if (!isLoading) {
      const productsFilter = productsFetched.filter((product) =>
        product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
      )
      setProductsFiltered(productsFilter)
      setError("")
    }
  }, [keyWord, categorySelected, productsFetched, isLoading])

  return (
    <>
    <View style={styles.flatListContainer}>  

      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
      />

      <FlatList
      style={styles.gridView}
      numColumns={2}
        data={productsFiltered}
        renderItem={({ item }) => (
          <ProductItem product={item} navigation={navigation} />
        )}
        keyExtractor={(producto) => producto.id}
      />
 
    </View>
    </>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "column",   
    backgroundColor: colors.teal200, 
    flex: 1,    

  },
  gridView: { flex: 1,
    
    
  },
})
