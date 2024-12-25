import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import ItemList from './Barang/ItemList';
import AddPost from './Post/AddPostScreen';
import EditPost from './Post/EditPostScreen';
import { createStackNavigator } from '@react-navigation/stack';

// Stack Navigator untuk setiap screen
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ItemList} />
      <Stack.Screen name="EditPost" component={EditPost} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'AddPost') {
              iconName = 'add-circle';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',  // Warna aktif
          tabBarInactiveTintColor: 'gray',  // Warna tidak aktif
        })}
      >
        {/* Tab untuk ItemList (Home) */}
        <Tab.Screen
          name="Home"
          component={HomeStack} // Menggunakan Stack untuk navigasi dalam Home
          options={{ title: 'Home' }}
        />

        {/* Tab untuk AddPost */}
        <Tab.Screen
          name="AddPost"
          component={AddPost}
          options={{ title: 'Add Post' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
