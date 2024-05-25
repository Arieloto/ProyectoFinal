import React from 'react';
import { Text } from 'react-native';

const PrecioChileno = ({ valor }) => {
 
  const formatoChileno = (valor) => {
  
    const separadorMiles = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$${separadorMiles}`;
  };

  return <Text>{formatoChileno(valor)}</Text>;
};

export default PrecioChileno;