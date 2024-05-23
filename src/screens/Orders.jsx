import { FlatList, StyleSheet, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderItem from '../components/OrderItem'
import { useGetOrdersQuery } from '../services/shopService'
import { useSelector } from 'react-redux'

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
    <View>
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
        <View><Text>No orders available</Text></View> // Placeholder when there are no orders
      )}
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})
