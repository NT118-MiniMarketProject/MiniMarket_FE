import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./components/Common/Tabs";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import CategoriesScreen from "./screens/CategoriesScreen";
import DrawerHeader from "./components/Common/DrawerHeader";
import { RootSiblingParent } from "react-native-root-siblings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  CredentialContext,
  CredentialType,
} from "./contexts/CredentialContext";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import DealProduct from "./components/Common/DealProduct";
import { View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Product from "./components/Common/Product";
import { Colors } from "react-native/Libraries/NewAppScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import HomeProductBlock from "./components/Home/HomeProductBlock";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [credential, setCredential] = useState<CredentialType | null>(null);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  //Kiểm tra credential có tồn tại trong AsyncStorage để persist login
  useEffect(() => {
    const checkCredential = async () => {
      try {
        const value = await AsyncStorage.getItem("credential");
        if (value) setCredential(JSON.parse(value));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    };
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
    user
      ? setCredential({ provider: "firebase", user: user })
      : setCredential(null);
    if (initializing) setInitializing(false);
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

  // const dummyProduct = {
  //   id: 520, //id san pham
  //   name: "Dầu hướng dương hữu cơ Sloboda 1.8 lít",
  //   thumbnail:
  //     "https://cdn.tgdd.vn/Products/Images/2286/311051/bhx/dau-huong-duong-huu-co-sloboda-nhan-xanh-can-2-lit-202307201600375678.jpg",
  //   reg_price: 142000,
  //   discount_price: 126380,
  //   discount_percent: 11,
  //   rating: 4,
  //   numOfRatings: 10,
  //   category_name: "Dầu ăn",
  //   canonical: "1.8l",
  // };

  // const products = [];
  // for (let i = 0; i < 6; i++) {
  //   products.push(dummyProduct);
  // }
  // return (
  //   <GestureHandlerRootView className="pt-28 h-full bg-black">
  //     <View className={"w-full bg-white flex-row flex-wrap justify-between"}>
  //       {products.map((product) => (
  //         <View
  //           style={{
  //             flexGrow: 0,
  //             flexShrink: 0,
  //             maxHeight: "50%",
  //             flexBasis: "33%",
  //             borderStyle: "solid",
  //             borderColor: Colors.black,
  //             borderWidth: 1,
  //           }}
  //         >
  //           <Product {...product} />
  //         </View>
  //       ))}
  //     </View>
  //   </GestureHandlerRootView>
  // );

  return (
    <CredentialContext.Provider value={{ credential, setCredential }}>
      <RootSiblingParent>
        <NavigationContainer>
          <Provider store={store}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen
                name="CategoriesScreen"
                component={CategoriesScreen}
                options={{
                  headerShown: true,
                  header: (props) => <DrawerHeader />,
                }}
              />
              {/* <Stack.Screen name="Tabs" component={Tabs} /> */}
            </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      </RootSiblingParent>
    </CredentialContext.Provider>
  );
}
