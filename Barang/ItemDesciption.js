import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ItemDescription({ route }) {
  const { item } = route.params; 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      
      {/* Menampilkan gambar dari URL */}
      <Image 
        source={item.image} 
        style={styles.image}
      />
      
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200, // Menyesuaikan tinggi gambar
    resizeMode: 'contain', // Atur mode gambar (contain, cover, stretch, dll)
    marginBottom: 10, // Memberi jarak antara gambar dan teks
  },
});
