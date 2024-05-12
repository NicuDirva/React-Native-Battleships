import 'react-native-gesture-handler';
import Home from './screens/Home';
import Auth from './screens/Auth';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const Option = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={Auth}
      />
      <Stack.Screen
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Option/>
    </NavigationContainer>
  );
}
