import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Footer = ({ onAddPostPress, onSavePostPress }) => {
  return (
    <View style={styles.footerContainer}>
      {/* Tombol Footer untuk AddPost */}
      {onAddPostPress ? (
        <TouchableOpacity style={styles.footerButton} onPress={onAddPostPress}>
          <Icon name="add-circle" size={30} color="white" />
          <Text style={styles.footerText}>Add Post</Text>
        </TouchableOpacity>
      ) : null}

      {/* Tombol Footer untuk Save Post (AddPost) */}
      {onSavePostPress ? (
        <TouchableOpacity style={styles.footerButton} onPress={onSavePostPress}>
          <Icon name="save" size={30} color="white" />
          <Text style={styles.footerText}>Save Post</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#388E3C',
    padding: 10,
    borderRadius: 50,
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
