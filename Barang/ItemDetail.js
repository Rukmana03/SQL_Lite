import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItemDescription from './ItemDescription';
import ItemReviews from './ItemReviews';
import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function ItemDetail({ route }) {
  const { item } = route.params; // Data item yang dikirim melalui navigasi

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.GRAY,
        headerShown: false,
      }}
    >
      <Tab.Screen name="Description">
        {(props) => <ItemDescription {...props} item={item} />}
      </Tab.Screen>
      <Tab.Screen name="Reviews">
        {(props) => <ItemReviews {...props} item={item} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
