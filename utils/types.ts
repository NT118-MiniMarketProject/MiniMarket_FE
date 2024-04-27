import { StackNavigationProp } from "@react-navigation/stack";

// Define the types for your navigation stack
type RootStackParamList = {
  Home: undefined; // Home screen with no parameters
  DetailScreen: { itemId: number}; // Details screen with a parameter named 'itemId' of type number
  Tabs: undefined; // Tabs screen with no parameters
  AccountInfo: undefined,
  HomeStackScreen: undefined,
  AccountLoginScreen: undefined,
};

// Optionally, you can define the types for route props (e.g., navigation props) using StackNavigationProp
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

export { RootStackParamList, RootStackNavigationProp };
