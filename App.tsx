import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from './components/Common/Tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeStackScreen from './screens/stacks/HomeStackScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        {/* <Stack.Screen name="Tabs" component={Tabs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

