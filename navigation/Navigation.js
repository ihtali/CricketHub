import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
// Import other pages as needed

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="About" component={AboutPage} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
