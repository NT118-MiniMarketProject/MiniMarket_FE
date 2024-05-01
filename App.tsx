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
import React, { useEffect, useState } from 'react';
import { CredentialContext, CredentialType } from './contexts/CredentialContext';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [credential, setCredential] = useState<CredentialType | null>(null);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

//Kiểm tra credential có tồn tại trong AsyncStorage để persist login
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

//Thiết lập kết nối đến firebase auth 
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  // Handle user state changes
  function onAuthStateChanged(user: any) {
    // console.log(">>> USER STATE CHANGE: ", user);
    user ? setCredential({provider: "firebase", user: user}) : setCredential(null);
    if(initializing) setInitializing(false);
  }

//Lưu credential vào AsyncStorage mỗi khi credential được cập nhật
  useEffect(() => {
    try {
      AsyncStorage.setItem('credential', JSON.stringify(credential))
    }catch(e) {
      console.error('Persist login failed: ', e);
    }
  }, [credential]);

//Cấu hình GoogleSignin 
  GoogleSignin.configure({
    webClientId: "950590133752-jg5susmqc6nef5le6q1jikl5uvg2ctov.apps.googleusercontent.com",
  }); 

  if (!appIsReady || initializing) {
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

