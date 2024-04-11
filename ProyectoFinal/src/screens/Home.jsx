import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
import categories from "../data/categories.json"
import { FlatGrid } from "react-native-super-grid"

const Home = ({ route, navigation}) => {
  return (
    <View style={styles.flatListContainer}>
      <FlatGrid
      itemDimension={130}
      style={styles.gridView}
        showsVerticalScrollIndicator={false}
        keyExtractor={(elemntoDeMiArray) => elemntoDeMiArray}
        data={categories.sort()}       
        renderItem={({ item }) => (
          <CategoryItem 
            navigation={navigation} 
            category={item} 
          />
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",    
    color: colors.platinum

  },gridView: {
    marginTop: 10,
    flex: 1,
  },
})
