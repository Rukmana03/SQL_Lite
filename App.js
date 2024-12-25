import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemList from './Barang/ItemList';  // Ensure this path is correct
import Detail from './Barang/ItemDetail';  // Ensure this path is correct
import AddPost from './Post/AddPostScreen';  // Ensure this path is correct
import EditPost from './Post/EditPostScreen';  // Ensure this path is correct
import { PostProvider } from './context/PostContext';  // Ensure this path is correct

const Stack = createStackNavigator();

export default function App() {
  return (
    <PostProvider> {/* Wrap your app with PostProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={ItemList} 
            options={{ title: 'Item List' }} 
          />
          <Stack.Screen 
            name="Detail" 
            component={Detail} 
            options={{ title: 'Item Detail' }} 
          />
          <Stack.Screen 
            name="AddPost" 
            component={AddPost} 
            options={{ title: 'Add Post' }} 
          />
          <Stack.Screen 
            name="EditPost" 
            component={EditPost} 
            options={{ title: 'Edit Post' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PostProvider>
  );
}
