import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import DrawerHeader from "./components/Common/DrawerHeader";
import Header from "./components/Common/Header";
import Tabs from "./components/Common/Tabs";
import {
  CredentialContext,
  CredentialType,
} from "./contexts/CredentialContext";
import CategoriesScreen from "./screens/CategoriesScreen";
import ProductDetailScreen from "./screens/ProductDetail/ProductDetailScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductSearchScreen from "./screens/ProductSearchScreen";
import SearchScreen from "./screens/SearchScreen";
import AdminStackScreen from "./screens/stacks/AdminStackScreen";
import { store } from "./store";
import { RootStackParamList } from "./utils/types";
import { getExpiredCredentialTime } from "./utils/functions";
import LoadingModal from "./components/Common/LoadingModal";
import AccoutScreenAfterLogin from "./screens/Account/AccountScreenAfterLogin";
import { Text, View } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const [appIsReady, setAppIsReady] = useState(false);
  const [credential, setCredential] = useState<CredentialType | null>(null);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  //Kiểm tra credential có tồn tại trong AsyncStorage để persist login
  useEffect(() => {
    const checkCredential = async () => {
      try {
        const value = (await AsyncStorage.getItem("credential").then((data) => {
          if (data !== null) return JSON.parse(data);
          return null;
        })) as CredentialType;
        if (value && value.expiredTime > new Date().getTime())
          setCredential(value);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    };
    checkCredential();
    // console.log(">>> check credential run", { credential });
  }, []);

  //Thiết lập kết nối đến firebase auth
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    // console.log(">>> USER STATE CHANGE: ", user);
    // if (credential?.provider === "firebase") {
    //   user
    //     ? setCredential({
    //         provider: "firebase",
    //         user: user,
    //         expiredTime: getExpiredCredentialTime(new Date().getTime()),
    //       })
    //     : setCredential(null);
    //   // user ? setCredential({provider: "firebase", user: })
    // }

    if (initializing) setInitializing(false);
    // console.log(">>> onAuthStateChanged run", { credential });
  }

  //Lưu credential vào AsyncStorage mỗi khi credential được cập nhật
  useEffect(() => {
    try {
      AsyncStorage.setItem("credential", JSON.stringify(credential));
    } catch (e) {
      console.error("Persist login failed: ", e);
    }
  }, [credential]);

  //Cấu hình GoogleSignin
  GoogleSignin.configure({
    webClientId:
      "950590133752-jg5susmqc6nef5le6q1jikl5uvg2ctov.apps.googleusercontent.com",
  });

  if (!appIsReady || initializing) {
    return null;
  }

  return (
    <Provider store={store}>
      <CredentialContext.Provider value={{ credential, setCredential }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <RootSiblingParent>
              <ToastProvider>
                <MenuProvider>
                  <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="Welcome" component={WelcomeScreen} />
                      <Stack.Screen name="Tabs" component={Tabs} />
                      <Stack.Screen
                        name="SearchScreen"
                        component={SearchScreen}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="CategoriesScreen"
                        component={CategoriesScreen}
                        options={{
                          headerShown: true,
                          header: (props) => <DrawerHeader />,
                        }}
                      />
                      <Stack.Screen
                        name="ProductListScreen"
                        component={ProductListScreen}
                        options={{
                          headerShown: true,
                          header: (props) => <Header />,
                        }}
                      />
                      <Stack.Screen
                        name="ProductSearchScreen"
                        component={ProductSearchScreen}
                        options={{
                          headerShown: true,
                          header: (props) => <Header />,
                        }}
                      />
                      <Stack.Screen
                        name="ProductDetailScreen"
                        component={ProductDetailScreen}
                        options={{
                          headerShown: true,
                          header: (props) => <Header />,
                        }}
                      />
                      {/* Admin */}
                      <Stack.Screen
                        name="AdminStackScreen"
                        component={AdminStackScreen}
                        options={{
                          headerShown: false,
                          header: (props) => <Header />,
                        }}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </MenuProvider>
              </ToastProvider>
            </RootSiblingParent>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </CredentialContext.Provider>
    </Provider>
  );
}
