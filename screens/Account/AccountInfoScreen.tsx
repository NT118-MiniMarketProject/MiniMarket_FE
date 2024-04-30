import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { CredentialContext } from '../../contexts/CredentialContext';

const AccountInfoScreen = () => {
  const {credential} = useContext(CredentialContext);
  const {name="", userId="", role=""} = credential ?? {};
  return (
    <SafeAreaView>
      <Text>Tên người dùng: {name}</Text>
      <Text>id người dùng: {userId}</Text>
      <Text>role: {role}</Text>
    </SafeAreaView>
  )
}

export default AccountInfoScreen

const styles = StyleSheet.create({})