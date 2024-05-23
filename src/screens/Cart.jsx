import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { usePostOrderMutation } from "../services/shopService";
import { removeCartItem } from "../features/Cart/cartSlice";
import CartItem from "../components/CartItem";
import { colors } from '../constants/colors';
import PrecioChileno from "../constants/PrecioChileno";
const Cart = () => {
  const { localId } = useSelector((state) => state.auth.value);
  const { items: CartData, total } = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const [triggerPostOrder, result] = usePostOrderMutation();

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem({ id: productId }));
  };
const onConfirmOrder = () => {
  
  const idVenta = Math.random().toString(36).substr(2, 9);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year}`;

  const orderData = {
    idVenta,
    items: CartData,
    user: localId,
    total,
    dateTime: formattedDateTime 
  };

  triggerPostOrder(orderData);
};

  return (
    <View style={styles.container}>
      {CartData.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Image  source={{ uri:"https://cdn-icons-png.flaticon.com/128/4175/4175027.png" }} style={styles.emptyCartImage} />
          <Text style={styles.emptyCartText}>Por favor ingrese productos al carrito</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={CartData}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CartItem key={item.id} cartItem={item} onDelete={() => handleRemoveItem(item.id)} />
            )}
          />
          <View style={styles.totalContainer}>
            <Pressable style={styles.confirmButton} onPress={onConfirmOrder}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
            <Text style={styles.totalText}>Total: <PrecioChileno style={styles.totalText} valor={total} /></Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",  
    backgroundColor: colors.teal200,
    height:"100%",
  },
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 16,
    fontFamily: "Saira",
    textAlign: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom:40,
  },
  confirmButton: {
    backgroundColor:colors.teal600,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
    fontFamily: "Saira",
  },
  buttonText: {
    color: "white",   
    fontSize: 16,
    fontFamily: "Saira",
  },
  totalText: {
    fontSize: 16,
    fontFamily: "Saira",
  },
});
