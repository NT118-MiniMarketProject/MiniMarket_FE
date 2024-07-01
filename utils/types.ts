import { StackNavigationProp } from "@react-navigation/stack";

// Define the types for your navigation stack
type RootStackParamList = {
  Welcome: undefined;
  Home: undefined; // Home screen with no parameters
  DetailScreen: { itemId: number }; // Details screen with a parameter named 'itemId' of type number
  Tabs: undefined; // Tabs screen with no parameters
  AccountInfo: undefined;
  HomeStackScreen: undefined;
  AccountLoginScreen: undefined;
  AccountSignUpScreen: undefined;
  CategoriesScreen: undefined;
  SearchScreen: undefined;
  ProductListScreen: { 
    categoryId: number, 
    categoryName: string,
    categroup: number, 
  };
  ProductSearchScreen: {
    isSale: boolean,
    search: string,
  };
  TestScreen: undefined;
  ProductDetailScreen: {
    id: number
  };


  // Admin
  AdminStackScreen: undefined;
  AddProductForm: undefined;
  ListProductAdmin: undefined;

  // ProductListScreen: undefined;
};

type TabStackParamList = {
  HomeStackScreen: undefined;
};

// Optionally, you can define the types for route props (e.g., navigation props) using StackNavigationProp
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
type TabStackNavigationProp = StackNavigationProp<TabStackParamList>;

export {
  RootStackParamList,
  RootStackNavigationProp,
  TabStackNavigationProp,
  TabStackParamList,
};

// const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

// <View className="m-2" style={{height: 300}} >
//   <ActivityIndicator size={"large"} color={Colors.primary} />
// </View>