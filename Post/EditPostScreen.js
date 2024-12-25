import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { PostContext } from '../context/PostContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditPost() {
  const { updatePost, posts } = useContext(PostContext);
  const navigation = useNavigation();
  const route = useRoute();

  const { postId } = route.params || {}; // Ambil postId dari route params
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!postId) {
      Alert.alert('Error', 'Post ID is required');
      navigation.goBack();
      return;
    }

    const post = posts.find((p) => p.id === postId);
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setPrice(post.price);
      setImage(post.image);
    } else {
      Alert.alert('Error', 'Post not found');
      navigation.goBack();
    }
  }, [postId, posts]);

  const handleSubmit = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Validation Error', 'Title and Description cannot be empty.');
      return;
    }

    updatePost(postId, title, description, price, image);
    Alert.alert('Success', 'Post updated successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Update Post" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
