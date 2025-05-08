import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import RegistrationPage from './controller/RegistrationPage';
import MoreScreen from './controller/MoreScreen';
import AboutPage from './controller/AboutPage';
import PlayerSection from './controller/PlayerSection';
import WelcomePage from './controller/WelcomePage';
import HomePage from './controller/HomePage';
import TeamManagement from './controller/TeamManagement';
import LoginPage from './controller/LoginPage';
import YouthEngagement from './controller/YouthEngagement';
import TeamName from './controller/TeamName';
import TrainingPage from './controller/TrainingPage';
import TossPage from './controller/TossPage';
import PrivacyPolicy from './controller/PrivacyPolicy';
import TermsAndConditions from './controller/TermsAndConditions';
import PerformanceTracking from './controller/PerformanceTracking';
import Feedback from './controller/FeedbackPage';
import ScheduleManagement from './controller/ScheduleManagement';
import MatchResultPage from './controller/MatchResultPage';
import OpeningSelection from './controller/OpeningSelection';
import ScoringScreen from './controller/ScoringScreen';
import ModernDropdown from './controller/ModernDropdown';
import MatchSummary from './controller/MatchSummary';
import SecondInningsSetup from './controller/SecondInningsSetup';

const Stack = createNativeStackNavigator();

// Common navigation options
const commonHeaderOptions = {
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: '#e3f2fd' },
  headerTintColor: '#0D47A1',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        {/* Welcome Page */}
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MatchSummary"
          component={MatchSummary}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="SecondInningsSetup"
          component={SecondInningsSetup}
          options={{ headerShown: false }}
        />
        {/* Home Page */}
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: 'CricketHub', ...commonHeaderOptions }}
        />

<Stack.Screen
          name="ModernDropdown"
          component={ModernDropdown}
          options={{ title: 'ModernDropdown', ...commonHeaderOptions }}
        />

        {/* Registration Page */}
        <Stack.Screen
          name="Registration"
          component={RegistrationPage}
          options={{ title: 'Register', ...commonHeaderOptions }}
        />

        {/* More Screen */}
        <Stack.Screen
          name="MoreScreen"
          component={MoreScreen}
          options={{ title: 'More', ...commonHeaderOptions }}
        />

        {/* About Page */}
        <Stack.Screen
          name="About"
          component={AboutPage}
          options={{ title: 'About', ...commonHeaderOptions }}
        />

        {/* Team Name */}
        <Stack.Screen
          name="TeamName"
          component={TeamName}
          options={{ title: 'Enter Team Names', ...commonHeaderOptions }}
        />

        {/* Player Section */}
        <Stack.Screen
          name="PlayerSection"
          component={PlayerSection}
          options={{ title: 'Team Selection', ...commonHeaderOptions }}
        />

        

<Stack.Screen
          name="ScoringScreen"
          component={ScoringScreen}
          options={{ title: 'ScoringScreen', ...commonHeaderOptions }}
        />

        {/* Team Management */}
        <Stack.Screen
          name="TeamManagement"
          component={TeamManagement}
          options={{ title: 'Team Management', ...commonHeaderOptions }}
        />

<Stack.Screen
          name="OpeningSelection"
          component={OpeningSelection}
          options={{ title: 'OpeningSelection', ...commonHeaderOptions }}
        />
        {/* Login Page */}
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: 'Login', ...commonHeaderOptions }}
        />

        {/* Youth Engagement */}
        <Stack.Screen
          name="YouthEngagement"
          component={YouthEngagement}
          options={{ title: 'Youth Engagement', ...commonHeaderOptions }}
        />

        {/* Performance Tracking */}
        <Stack.Screen
          name="PerformanceTracking"
          component={PerformanceTracking}
          options={{ title: 'Performance Tracking', ...commonHeaderOptions }}
        />

        {/* Training Page */}
        <Stack.Screen
          name="TrainingPage"
          component={TrainingPage}
          options={{ title: 'Training', ...commonHeaderOptions }}
        />

        {/* Toss Page */}
        <Stack.Screen
          name="TossPage"
          component={TossPage}
          options={{ title: 'Toss', ...commonHeaderOptions }}
        />

        {/* Terms and Conditions */}
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{ title: 'Terms and Conditions', ...commonHeaderOptions }}
        />

        {/* Feedback */}
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ title: 'Feedback', ...commonHeaderOptions }}
        />

        {/* Privacy Policy */}
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ title: 'Privacy Policy', ...commonHeaderOptions }}
        />

        {/* Schedule Management */}
        <Stack.Screen
          name="ScheduleManagement"
          component={ScheduleManagement}
          options={{ title: 'Schedule Management', ...commonHeaderOptions }}
        />
        
        <Stack.Screen
          name="MatchResultPage"
          component={MatchResultPage}
          options={{ title: 'MatchResultPage ', ...commonHeaderOptions }}
        />


  
      </Stack.Navigator>
    </NavigationContainer>
  );
}