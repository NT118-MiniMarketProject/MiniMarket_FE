import { RouteProp, getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const getTabBarVisibility = (route: RouteProp<any, any>, name: String) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    if (routeName === name){
        return "flex"
    }
    return "none";
};
