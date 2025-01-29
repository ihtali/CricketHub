import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Component/Home';
import HomePage from './Component/HomePage';
import RegistrationPage from './Component/RegistrationPage';
import MoreScreen from './Component/MoreScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutPage from './Component/AboutPage';
import ScorePage from './Component/ScorePage';
import PlayerSection from './Component/PlayerSection';
import MatchSetup from './Component/MatchSetup';
import Mscoring from './Component/Mscoring';
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
        <Stack.Screen name="ScorePage" component={ScorePage} options={{ title: 'Enter Team Names' }} />
        <Stack.Screen name="PlayerSection" component={PlayerSection} options={{ title: 'Team Selection', headerTitleAlign: 'center' }}/>
        <Stack.Screen name="MatchSetup" component={MatchSetup} options={{ title: 'Match Setup' }} />
        <Stack.Screen
          name="Mscoring"
          component={Mscoring}
          options={{
            title: 'Scoring',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#e3f2fd' },
            headerTintColor: '#0D47A1',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


