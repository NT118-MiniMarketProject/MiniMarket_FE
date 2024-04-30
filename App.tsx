import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from './components/Common/Tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import CategoriesScreen from './screens/CategoriesScreen';
import DrawerHeader from './components/Common/DrawerHeader';
import { RootSiblingParent } from 'react-native-root-siblings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { CredentialContext } from './contexts/CredentialContext';


const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [credential, setCredential] = useState(null);

  useEffect(() => {
    const checkCredential  = async () => {
      try {
        const value = await AsyncStorage.getItem('credential');
        if(value)
          setCredential(JSON.parse(value));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    checkCredential();
  }, []);

  if (!appIsReady) {
    return null;
  }
  return (
    <CredentialContext.Provider value={{credential, setCredential}}>
    <RootSiblingParent>
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
    </RootSiblingParent>
    </CredentialContext.Provider>
  );
}

