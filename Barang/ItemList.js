import React, { useState } from 'react';
import { View, Text, Animated, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Data barang
const items = [
  {
    id: '1',
    name: 'Hot Wheels Car 1',
    description: 'High-speed miniature car.',
    price: '$10',
    image: require('../assets/Goodwood.jpg'),
  },
  {
    id: '2',
    name: 'Hot Wheels Car 2',
    description: 'Racing champion miniature car.',
    price: '$15',
    image: require('../assets/Futo.jpg'),
  },
  {
    id: '3',
    name: 'Hot Wheels Car 3',
    description: 'Limited edition collector car.',
    price: '$20',
    image: require('../assets/Falken.jpg'),
  },
  {
    id: '4',
    name: 'Hot Wheels Car 4',
    description: 'High-speed miniature car.',
    price: '$10',
    image: require('../assets/R32Jun.jpg'),
  },
];

export default function ItemList() {
  const navigation = useNavigation();
  const [scrollY] = useState(new Animated.Value(0));

  const renderItem = ({ item, index }) => {
    // Mengatur interpolasi untuk fade-in item saat scroll
    const fadeIn = scrollY.interpolate({
      inputRange: [
        (index - 2) * 150,    // Posisi scroll sebelumnya
        index * 150,          // Posisi scroll saat item muncul
        (index + 2) * 150     // Posisi scroll setelah item muncul
      ],
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { item })}
      >
        <Animated.Image source={item.image} style={[styles.image, { opacity: fadeIn }]} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
