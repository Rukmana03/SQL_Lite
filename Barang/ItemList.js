import React, { useContext } from 'react';
import { View, Text, Animated, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PostContext } from '../context/PostContext';

const { width } = Dimensions.get('window');

// Definisikan gambar yang tersedia secara statis
const imageMap = {
  'Futo.jpg': require('../assets/Futo.jpg'),
  'R32Jun.jpg': require('../assets/R32Jun.jpg'),
  // Tambahkan gambar lain yang Anda miliki di folder assets
};

export default function ItemList() {
  const navigation = useNavigation();
  const { posts, deletePost } = useContext(PostContext);

  // Fungsi untuk mendapatkan sumber gambar berdasarkan nama file
  const getImageSource = (image) => {
    // Pastikan image tidak kosong dan cocok dengan yang ada di imageMap
    if (image && imageMap[image]) {
      return imageMap[image];  // Mengembalikan gambar yang sesuai dengan nama file
    }
    return require('../assets/image.png');  // Gambar default jika tidak ada
  };

  // Mapping data posts ke format yang diinginkan
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Menampilkan gambar post, jika tidak ada gambar maka menggunakan gambar default */}
      <Image source={getImageSource(item.image)} style={styles.image} />
      
      {/* Menampilkan nama post (title) */}
      <Text style={styles.itemName}>{item.title}</Text>

      {/* Menampilkan deskripsi post */}
      <Text style={styles.itemDescription}>{item.description}</Text>

      {/* Menampilkan harga post */}
      <Text style={styles.itemPrice}>{item.price || 'New'}</Text>

      {/* Tombol Edit */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditPost', { postId: item.id })}
      >
        <Icon name="edit" size={20} color="blue" />
      </TouchableOpacity>

      {/* Tombol Delete */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.id)}
      >
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  // Konfirmasi sebelum menghapus post
  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deletePost(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={posts}  // Menggunakan data posts langsung dari context
        keyExtractor={(item) => item.id.toString()}  // Gunakan item.id sebagai key
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#555" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Favorite')}>
          <Icon name="favorite" size={24} color="#555" />
          <Text style={styles.footerText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Profile')}>
          <Icon name="person" size={24} color="#555" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('AddPost')}>
          <Icon name="add" size={24} color="#555" />
          <Text style={styles.footerText}>Add Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
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
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  editButton: {
    position: 'absolute',
    right: 40,
    top: 16,
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 16,
  },
});
