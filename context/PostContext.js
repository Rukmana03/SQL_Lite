import React, { createContext, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { Alert } from 'react-native';

// Membuka atau membuat database SQLite
const db = SQLite.openDatabase(
  { name: 'posts.db', location: 'default' },
  () => console.log('Database opened successfully'),
  (error) => console.log('Error opening database: ', error)
);

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Membuat tabel jika belum ada dan memuat data dari database
  useEffect(() => {
    // Membuat tabel jika belum ada
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          description TEXT,
          price TEXT,
          image TEXT
        );`,
        [],
        () => console.log('Table created successfully'),
        (error) => console.log('Error creating table: ', error)
      );
    });

    // Memuat data posts dari database
    fetchPosts();
  }, []);  // Efek ini hanya dijalankan sekali ketika komponen pertama kali dipasang

  // Mengambil data postingan dari database
  const fetchPosts = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM posts;`,
        [],
        (tx, result) => {
          const fetchedPosts = result.rows.raw();  // Mengambil data dalam bentuk array
          setPosts(fetchedPosts);  // Memperbarui state dengan data dari database
        },
        (tx, error) => {
          console.log('Error fetching posts: ', error);
          Alert.alert('Error', 'Failed to load posts.');
        }
      );
    });
  };

  // Menambahkan post baru
  const addPost = (title, description, price, image) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO posts (title, description, price, image) VALUES (?, ?, ?, ?);`,
        [title, description, price, image],
        () => {
          console.log('Post added');
          fetchPosts();  // Refresh daftar postingan setelah penambahan
          Alert.alert('Success', 'Post added successfully!');
        },
        (tx, error) => {
          console.log('Error adding post: ', error);
          Alert.alert('Error', 'Failed to add post.');
        }
      );
    });
  };

  // Memperbarui post
  const updatePost = (id, title, description, price, image) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE posts SET title = ?, description = ?, price = ?, image = ? WHERE id = ?;`,
        [title, description, price, image, id],
        () => {
          console.log('Post updated');
          fetchPosts();  // Refresh daftar postingan setelah pembaruan
          Alert.alert('Success', 'Post updated successfully!');
        },
        (tx, error) => {
          console.log('Error updating post: ', error);
          Alert.alert('Error', 'Failed to update post.');
        }
      );
    });
  };

  // Menghapus post
  const deletePost = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM posts WHERE id = ?;`,
        [id],
        () => {
          console.log('Post deleted');
          fetchPosts();  // Refresh daftar postingan setelah penghapusan
          Alert.alert('Success', 'Post deleted successfully!');
        },
        (tx, error) => {
          console.log('Error deleting post: ', error);
          Alert.alert('Error', 'Failed to delete post.');
        }
      );
    });
  };

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
