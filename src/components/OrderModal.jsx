import React from 'react';
import { Modal, StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import PrecioChileno from '../constants/PrecioChileno';
const OrderDetailsModal = ({ visible, onClose, order }) => {
    const total = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
    );
  
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Detalle orden de compra</Text>
                    <FlatList
                        data={order.items}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <>
                            <View style={styles.item}>
                                <Text style={styles.title}>{item.title} x {item.quantity} C/u <PrecioChileno style={styles.title} valor={item.price} /></Text>
                                <Text style={styles.price}> <PrecioChileno style={styles.price} valor={item.price * item.quantity} /></Text>
                            </View>

                            
                            </>
                        )}
                    />   
                    <View style={styles.total}>                               
                    <Text style={styles.totalprice}>ID Orden: {order.idVenta}</Text>
                  </View>
                     
                            <View style={styles.total}>                               
                                <Text style={styles.totalprice}>Total <PrecioChileno style={styles.totalprice} valor={total} /></Text>
                            </View>
                           
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={onClose}>
                        <Text style={styles.textStyle}>Cerrar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',        
        textAlign: 'center',
        fontFamily:"Saira",
       
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize:20,
        fontFamily:"Saira",
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {   
        fontSize:12,    
        fontFamily:"Saira",
        width: '70%',      
        borderRightWidth: 1,    
        borderRightColor: '#ccc',
    },
    price: {
        fontSize:12,
        fontFamily:"Saira",
        width: '25%',        
        alignItems:"baseline",       
        
    },
    totalprice: {
        fontSize:16,
        fontFamily:"Saira",               
        alignItems:"baseline",       
        
    },
    total: {
    margin:10,   
        
    },
});

export default OrderDetailsModal;