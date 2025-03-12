import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationPage from './controller/RegistrationPage';
import MoreScreen from './controller/MoreScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutPage from './controller/AboutPage';
import PlayerSection from './controller/PlayerSection';
import MatchSetup from './controller/MatchSetup';
import WelcomePage from './controller/WelcomePage';
import HomePage from './controller/HomePage';
import TeamManagement from './controller/TeamManagement';
import LoginPage from './controller/LoginPage';
import ScoringPage from './controller/ScoringPage';
import YouthEngagement from './controller/YouthEngagement';
import TeamName from './controller/TeamName';
import TrainingPage from './controller/TrainingPage';
import TossPage from './controller/TossPage';
import PrivacyPolicy from './controller/PrivacyPolicy';
import TermsAndConditions from './controller/TermsAndCondition';
import PerformanceTracking from './controller/ PerformanceTracking';
import Feedback from './controller/FeedbackPage';
import ScheduleManagement from './controller/ScheduleManagement';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'CricketHub', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e3f2fd' }, headerTintColor: '#0D47A1' }} />
        <Stack.Screen name="Registration" component={RegistrationPage} options={{ title: 'Register', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e3f2fd' }, headerTintColor: '#0D47A1' }} />
        <Stack.Screen name="MoreScreen" component={MoreScreen} options={{ title: 'More', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e3f2fd' }, headerTintColor: '#0D47A1' }} />
        <Stack.Screen name="About" component={AboutPage} options={{ title: 'AboutPage', headerTitleAlign: 'center', headerStyle: { backgroundColor: '#e3f2fd' }, headerTintColor: '#0D47A1' }} />
        <Stack.Screen name="TeamName" component={TeamName} options={{ title: 'Enter Team Names' }} />
        <Stack.Screen name="PlayerSection" component={PlayerSection} options={{ title: 'Team Selection', headerTitleAlign: 'center' }}/>
        <Stack.Screen name="MatchSetup" component={MatchSetup} options={{ title: 'Match Setup' }} />
        <Stack.Screen name="TeamManagement" component={TeamManagement} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="YouthEngagement" component={YouthEngagement} />
        <Stack.Screen name="PerformanceTracking" component={PerformanceTracking} options={{ title: 'Match Setup' }} />
        <Stack.Screen name="TrainingPage" component={TrainingPage} options={{ title: 'Match Setup' }} />
        <Stack.Screen name="TossPage" component={TossPage} options={{ title: 'TossPage' }} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ title: 'TermsAndConditions' }} />
        <Stack.Screen name="Feedback" component={Feedback} options={{ title: 'TermsAndConditions' }} />

        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: 'PrivacyPolicy' }} />
        <Stack.Screen name="ScheduleManagement" component={ScheduleManagement} options={{ title: 'ScheduleManagement' }} />




        

        <Stack.Screen
          name="ScoringPage"
          component={ScoringPage}
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
