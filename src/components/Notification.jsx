import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const Notification = ({ message, visible, onDismiss }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            onDismiss();
          });
        }, 2000);
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.notification, { opacity: fadeAnim }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    zIndex: 1000,
  },
  message: {
    color: 'white',
    textAlign: 'center',
    fontFamily: "Saira",
    fontSize: 16,
  },
});

export default Notification;
