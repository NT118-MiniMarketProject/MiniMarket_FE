import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { CredentialContext } from "../../contexts/CredentialContext";
import auth from "@react-native-firebase/auth";

const AccountInfoScreen = () => {
  const { credential } = useContext(CredentialContext);
  const {
    name = "",
    userId = "",
    uid = "",
    role = "",
    displayName = "",
    email = "",
    phoneNumber = "",
  } = credential?.user ?? {};
  const {
    photoURL = `https://eu.ui-avatars.com/api/?name=${
      name || displayName
    }&size=250`,
  } = credential?.user ?? {};
  // auth().currentUser?.displayName
  // auth().currentUser?.email
  // auth().currentUser?.phoneNumber
  // auth().currentUser?.photoURL
  // auth().currentUser?.uid
  // auth().currentUser?.toJSON()
  return (
    <SafeAreaView>
      <View className="p-2">
        <Image
          source={{ uri: photoURL }}
          resizeMode="cover"
          resizeMethod="scale"
          className="w-24 h-24 rounded-full self-center m-4"
        />
        <Text>Tên người dùng: {name || displayName}</Text>
        <Text>Id người dùng: {userId || uid}</Text>
        {role && <Text>Role: {role}</Text>}
        {email && <Text>Email: {email}</Text>}
        {phoneNumber && <Text>Phone: ${phoneNumber}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default AccountInfoScreen;

const styles = StyleSheet.create({});
