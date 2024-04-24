import {StyleSheet, Text, View , Dimensions,FlatList } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
//import categories from "../data/categories.json"
import { FlatGrid } from "react-native-super-grid"
import Banner from "../components/Banner"
import { useGetCategoriesQuery } from "../services/shopService"



const Home = ({ route, navigation}) => {
const {data:categories, error, isLoading} = useGetCategoriesQuery()



  return (
    
    
    <View style={styles.container}>  
    
    <Banner/>

      <FlatList 
      itemDimension= {Dimensions.get('window').width /3}
      
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
