import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { Image } from 'react-native';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { CreateEventScreen } from '../screens/CreateEventScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { EventDetailScreen } from '../screens/EventDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{
          title: 'Evento',
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size * 1.1} color={color} />;
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
              return <Ionicons name={iconName} size={size * 1.1} color={color} />;
            } else if (route.name === 'Create') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              return <Ionicons name={iconName} size={size * 1.1} color={color} />;
            } else if (route.name === 'Profile') {
              return (
                <Image
                  source={require('../../assets/profile.jpg')}
                  style={{
                    width: size * 1.1,
                    height: size * 1.1,
                    borderRadius: (size * 1.1) / 2,
                    borderWidth: focused ? 2 : 0,
                    borderColor: color,
                  }}
                />
              );
            }

            return <Ionicons name={iconName} size={size * 1.1} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textLight,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            paddingTop: 0,
            paddingBottom: 20,
            height: 70,
          },
          tabBarShowLabel: false,
          tabBarIconStyle: { marginTop: 0 },
          headerShown: false,
          contentStyle: {
            flex: 1,
            backgroundColor: theme.colors.background,
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Search' }}
        />
        <Tab.Screen
          name="Create"
          component={CreateEventScreen}
          options={{ title: 'Create' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}; 