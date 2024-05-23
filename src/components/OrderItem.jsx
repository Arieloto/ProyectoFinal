import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { colors } from "../constants/colors";
import OrderDetailsModal from "../components/OrderModal"
import { useState } from "react";
import PrecioChileno from "../constants/PrecioChileno";

const OrderItem = ({ order }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const createdAt = order.dateTime

    const total = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
    );

    return (
     <View style={styles.card} onPress={() => {}}>
                <View style={styles.textContainer}>
                <Text style={styles.text}>Orden confirmada:</Text>
                     <Text style={styles.text}>
                    {createdAt}
                    </Text>
                <Text style={styles.text2}>Total Valor  $ <PrecioChileno style={styles.text2} valor={total} /></Text>
                </View>
            <Pressable style={styles.press} onPress={() => setModalVisible(true)}>
        <Text style={styles.text2}>Ver detalles</Text>
        <MaterialCommunityIcons name="package-variant" size={40} color="black" />
        </Pressable>
        <OrderDetailsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                order={order}
            />
    </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.platinum,
        paddingTop: 10,
        marginTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        paddingLeft:10,
        paddingRight:10,
        width: "100%",        
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width:"60%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontFamily: "Saira",
        fontSize: 15,
        color: colors.teal400,
    },
    text2: {
        fontFamily: "Saira",
        fontSize: 14,
        color: colors.teal600
    },
    press: {
    alignItems:"center",
    },
});
