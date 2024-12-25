// ItemDescription.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItemDescription = ({ description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ItemDescription;
