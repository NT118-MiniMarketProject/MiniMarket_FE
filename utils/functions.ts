import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import axios from "axios";
import { tenmien } from ".";
import { Colors } from "../components/styles";

export const getTabBarVisibility = (
  route: RouteProp<any, any>,
  name: String
) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  if (routeName === name || routeName === "Home") {
    return "flex";
  }
  return "none";
};

//Đăng xuất user
export const logout = async (credential: any, setCredential: any) => {
  if (!credential) {
    //   Toast.show("Not logged in", toastConfig as ToastOptions);
    throw new Error("Not logged in!");
  }
  // url: https://minimarket-be.onrender.com/api/v1/auth/logout
  const url = tenmien + "/auth/logout";
  try {
    const response = await axios.delete(url);
    // console.log(response);
    if (credential.provider === "firebase") {
      const providerId = auth().currentUser?.providerData[0].providerId;
      // console.log(providerId);
      // console.log(">>> Credential user: ", credential.user.providerData);
      // console.log(">>> auth().currentUser: ", auth().currentUser?.providerData);
      if (providerId === "google.com") {
        await GoogleSignin.revokeAccess();
        await auth().signOut();
      } else if (providerId === "facebook.com") {
      }
    }
    setCredential(null);
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const defaultAvt = (name: string) =>
  `https://ui-avatars.com/api/?background=random&name=${name}&rounded=true&bold=true&size=200&background=${Colors.primary.slice(
    1
  )}&color=${Colors.white.slice(1)}`;

export function convertDateTime(datetime: Date): string {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${dateFormatter.format(datetime)} - ${timeFormatter.format(
    datetime
  )}`;
}

export function getExpiredCredentialTime(createdTime: number): number {
  const expiredTime = createdTime + 24 * 60 * 60 * 1000;
  return expiredTime;
}
