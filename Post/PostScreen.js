import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PostContext } from '../context/PostContext';
import { useNavigation } from '@react-navigation/native';

export default function PostScreen() {
  const { posts } = useContext(PostContext);
  const navigation = useNavigation();

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
      <Text style={styles.postPrice}>{item.price}</Text>
      {/* Tambahkan gambar jika tersedia */}
      {item.image ? <Image source={{ uri: item.image }} style={styles.postImage} /> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()} // Pastikan keyExtractor menggunakan string
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPost')}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContainer: {
    padding: 16,
  },
  postCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 14,
    color: 'gray',
  },
  postPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  postImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
