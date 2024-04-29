import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from './components/Common/Tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeStackScreen from './screens/stacks/HomeStackScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import CategoriesScreen from './screens/CategoriesScreen';
import DrawerHeader from './components/Common/DrawerHeader';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen
            name="CategoriesScreen"
            component={CategoriesScreen}
            options={{headerShown: true, header: (props) => <DrawerHeader />}}
            
          />
          {/* <Stack.Screen name="Tabs" component={Tabs} /> */}
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

