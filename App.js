import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemList from './Barang/ItemList';
import TabNavigator from './Barang/TabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ItemList} />
        <Stack.Screen name="Detail" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

