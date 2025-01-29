import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ScorePage from '../Component/ScorePage';
import MatchSetup from '../Component/MatchSetup';
import ScoringPage from '../Component/ScoringPage';
// Import other pages as needed

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="About" component={AboutPage} />
      <Stack.Screen name="Score" component={ScorePage} />
      <Stack.Screen name="MatchSetup" component={MatchSetup} />

      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
