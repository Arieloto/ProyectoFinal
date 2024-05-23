import { FlatList, StyleSheet, View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderItem from '../components/OrderItem'
import { useGetOrdersQuery } from '../services/shopService'
import { useSelector } from 'react-redux'
import { colors } from '../constants/colors'
const OrderScreen = () => {
  const { localId } = useSelector(state => state.auth.value)
  const { data: orders, isSuccess } = useGetOrdersQuery(localId)
  const [ordersFiltered, setOrdersFiltered] = useState([]) // Initialize with an empty array

  useEffect(() => {
    if (isSuccess && orders) {
      const responseTransformed = Object.values(orders)
      console.log({ localId })
      const filteredOrders = responseTransformed.filter(order => order.user === localId)
      setOrdersFiltered(filteredOrders)
    }
  }, [orders, isSuccess, localId])

  console.log({ ordersFiltered })

  return (
    <View style={styles.container}>
      {ordersFiltered && ordersFiltered.length > 0 ? (
        <FlatList
          data={ordersFiltered}
          keyExtractor={(item) => String(item.id)} // Ensure each item has a unique key
          renderItem={({ item }) => {
            return (
              <OrderItem
                order={item}
              />
            )
          }}
        />
      ) : (
        <View style={styles.emptyOrderContainer}>
        <Image  style={styles.emptyOrderImage} source={{ uri: "https://cdn-icons-png.flaticon.com/128/11333/11333742.png" }}  />
        <Text style={styles.emptyOrderText}>No se encontraron ordenes</Text>
      </View>
      )}
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",  
    backgroundColor: colors.teal200,
    height:"100%",
  },

emptyOrderContainer: {
  justifyContent: "center",
  alignItems: "center",
},
emptyOrderImage: {
  width: 150,
  height: 150,
  marginBottom: 20,
},
emptyOrderText: {
  fontSize: 16,
  fontFamily: "Saira",
  textAlign: "center",
},})