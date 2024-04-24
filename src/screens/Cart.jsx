import { FlatList, Pressable, StyleSheet, Text, View, useState } from "react-native"
import React from "react"
// import CartData from "../data/cart.json"
import CartItem from "../components/CartItem"
import { useSelector, useDispatch } from "react-redux"
import { removeCartItem } from "../features/Cart/cartSlice"
// import { useSelector } from "react-redux"
// import { usePostOrderMutation } from "../services/shopService"

const Cart = () => {
  
    const {items: CartData, total} = useSelector(state => state.cart.value)
   
    const dispatch = useDispatch();

    const handleRemoveItem = (productId) => {
        dispatch(removeCartItem({ id: productId }));
    };


    return (
       <><View style={styles.container}>
             {CartData.length === 0 ? (
        <Text>Por favor ingrese productos al carrito</Text>
    ) : ( <FlatList
                data={CartData}
                keyExtractor={(pepe) => pepe.id}
                renderItem={({ item }) => {
                return <CartItem cartItem={item} onDelete={() => handleRemoveItem(item.id)} /> // Pasa la función onDelete
                }}
            />
            
            
            )}
            <View style={styles.totalContainer}>
                <Pressable onPress={() => {}}>
                    <Text>Confirm</Text>
                </Pressable>
                <Text>Total: ${total}</Text>
            </View>
       </View>
       </> 
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flex: 1,
        marginBottom: 120,
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
})