import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { PostContext } from '../context/PostContext';

// Daftar gambar yang ada di folder assets
const imageOptions = [
  { id: 'image1', uri: require('../assets/Goodwood.jpg') },
  { id: 'image2', uri: require('../assets/Falken.jpg') },
  { id: 'image3', uri: require('../assets/R32Jun.jpg') },
  // Tambahkan gambar lainnya sesuai kebutuhan
];

export default function AddPost({ navigation }) {
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');  // Menyimpan ID gambar, bukan objek gambar langsung

  const handleSubmit = () => {
    if (title && description) {
      // Validasi price hanya jika diisi
      if (price && isNaN(price)) {
        Alert.alert('Invalid Price', 'Price must be a number');
        return;
      }

      const newPost = { title, description, price, image };
      addPost(newPost);

      Alert.alert('Success', 'Post added successfully!');
      navigation.goBack(); // Navigate back after adding the post
    } else {
      Alert.alert('Validation Error', 'Please fill in Title and Description');
    }
  };

  // Fungsi untuk mendapatkan URI gambar berdasarkan ID
  const getImageSource = (imageId) => {
    const selectedImage = imageOptions.find(img => img.id === imageId);
    return selectedImage ? selectedImage.uri : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (optional)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Menampilkan gambar yang dipilih */}
      {image && <Image source={getImageSource(image)} style={styles.selectedImage} />}

      {/* Pilih Gambar */}
      <View style={styles.imagePicker}>
        {imageOptions.map((img) => (
          <TouchableOpacity key={img.id} onPress={() => setImage(img.id)} style={styles.imageOption}>
            <Image source={img.uri} style={styles.imageOptionThumbnail} />
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Add Post" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  imagePicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  imageOption: {
    margin: 5,
    width: 50,
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
  },
  imageOptionThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
