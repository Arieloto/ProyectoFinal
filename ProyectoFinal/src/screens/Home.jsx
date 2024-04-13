import {StyleSheet, Text, View , useWindowDimensions,  } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
import categories from "../data/categories.json"
import { FlatGrid } from "react-native-super-grid"

const Home = ({ route, navigation}) => {
  const widthhome = useWindowDimensions().width

  return (
    <>
    
    <View style={styles.flatListContainer}>      
      <FlatGrid
      itemDimension= {(widthhome * 0.45)}
      
      style={styles.gridView}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={categories}       
        renderItem={({ item }) => (
          
           <CategoryItem navigation={navigation} category={item.nombre} image ={item.img} />
           
        )}
      />
    </View>
    <Text style={styles.categorias}>CATEGORÍAS</Text>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",   
    backgroundColor: colors.teal200, 
    flex:1, 
  },gridView: {    
    flex: 1,
    
  },
  categorias:{
    
    color: colors.platinum,
    fontSize:24,
    textAlign: "center",
    fontFamily: 'Saira',
    backgroundColor:colors.teal900
  }
})
