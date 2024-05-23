import React from 'react';
import { Text } from 'react-native';

const PrecioChileno = ({ valor }) => {
  // Función para formatear el número a formato de moneda chilena
  const formatoChileno = (valor) => {
    // Separador de miles con puntos y coma
    const separadorMiles = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$${separadorMiles}`;
  };

  return <Text>{formatoChileno(valor)}</Text>;
};

export default PrecioChileno;