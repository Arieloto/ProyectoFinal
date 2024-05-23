import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { usePostOrderMutation } from "../services/shopService";
import { removeCartItem } from "../features/Cart/cartSlice";
import CartItem from "../components/CartItem";
import { colors } from '../constants/colors';
const Cart = () => {
  const { localId } = useSelector((state) => state.auth.value);
  const { items: CartData, total } = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const [triggerPostOrder, result] = usePostOrderMutation();

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem({ id: productId }));
  };
const onConfirmOrder = () => {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes ya que los meses se indexan desde 0
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;

  const orderData = {
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
          <Image  source={{ uri: "https://www.pngkey.com/png/detail/411-4119504_el-carrito-de-la-compra-est-vaco-shopping.png" }} style={styles.emptyCartImage} />
          <Text style={styles.emptyCartText}>Por favor ingrese productos al carrito</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={CartData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CartItem cartItem={item} onDelete={() => handleRemoveItem(item.id)} />
            )}
          />
          <View style={styles.totalContainer}>
            <Pressable style={styles.confirmButton} onPress={onConfirmOrder}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
            <Text style={styles.totalText}>Total: ${total}</Text>
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
