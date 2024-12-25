import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItemDescription from '../Barang/ItemDesciption';  // Fixed the import typo here
import ItemReviews from '../Barang/ItemReviews';
import Colors from '../costants/color';  // Fixed the typo in the import path for Colors

const Tab = createBottomTabNavigator();

export default function ItemDetail({ route }) {
  const { item } = route.params; // Access 'item' from route.params

  if (!item) {
    // Handle the case when 'item' is not available
    return <Text>No item data available</Text>;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Description">
        {(props) => <ItemDescription {...props} item={item} />}
      </Tab.Screen>
      <Tab.Screen name="Reviews">
        {(props) => <ItemReviews {...props} item={item} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

