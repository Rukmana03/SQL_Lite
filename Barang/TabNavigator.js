import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, View, Text } from 'react-native'; // Untuk animasi dan indikator loading
import ItemDescription from '../Barang/ItemDesciption';
import ItemReviews from '../Barang/ItemReviews';
import Colors from '../costants/color';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }) {
  const { item } = route.params; // Data item yang diterima dari navigasi
  const [loading, setLoading] = useState(false); // Menyimpan status loading

  // Mengatur state loading saat berpindah tab
  const handleTabChange = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Simulasi loading selama 1 detik
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.GRAY,
        headerShown: false,
      }}
      // Menangani perubahan tab
      tabBarOptions={{
        tabBarButton: (props) => (
          <View {...props} onPress={() => { handleTabChange(); props.onPress(); }} />
        ),
      }}
    >
      <Tab.Screen
        name="Description"
        component={ItemDescription}
        initialParams={{ item }} // Pastikan 'item' diteruskan dengan benar
      />
      <Tab.Screen
        name="Reviews"
        component={ItemReviews}
        initialParams={{ item }} // Pastikan 'item' diteruskan dengan benar
      />
      
      {/* Menampilkan animasi loading ketika berpindah tab */}
      {loading && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <Text>Loading...</Text>
        </Animated.View>
      )}
    </Tab.Navigator>
  );
}
