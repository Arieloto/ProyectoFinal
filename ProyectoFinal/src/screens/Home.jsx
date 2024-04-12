import {StyleSheet, Text, View , useWindowDimensions,  } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
import categories from "../data/categories.json"
import { FlatGrid } from "react-native-super-grid"

const Home = ({ route, navigation}) => {
  const widthhome = useWindowDimensions().width

  return (
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
  )
}

export default Home

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",    
    color: colors.platinum,  

  },gridView: {    
    flex: 1,
  },
  imgback:{
    textAlign:"center",
     zIndex:-1,
     backgroundColor:"red"
  },
})
