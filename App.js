import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Component/Home';
import HomePage from './Component/HomePage';
import RegistrationPage from './Component/RegistrationPage';
import MoreScreen from './Component/MoreScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutPage from './Component/AboutPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'CricketHub', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e3f2fd' }, headerTintColor: '#0D47A1' }} />
        <Stack.Screen name="Registration" component={RegistrationPage} options={{ title: 'Register', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e3f2fd' }, headerTintColor: '#0D47A1' }} />
        <Stack.Screen name="More" component={MoreScreen} options={{ title: 'More', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e3f2fd' }, headerTintColor: '#0D47A1' }} />
        <Stack.Screen name="About" component={AboutPage} options={{ title: 'AboutPage', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e3f2fd' }, headerTintColor: '#0D47A1' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

