import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ColorProvider, useColor } from './ColorContext';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { getColor } = useColor();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Statistics') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: getColor(), // Dynamic color for active icon
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#F5F5F5' },
          headerShown: false, // Disable header for all screens
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Statistics" component={StatsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ColorProvider>
      <AppNavigator />
    </ColorProvider>
  );
}
