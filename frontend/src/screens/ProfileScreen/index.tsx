import React from "react";
import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./styles";
import ProfilePicture from "../../components/ProfilePicture";
import SettingsOption from "../../components/SettingsOption";



export default function ProfileScreen() {
  const navigation = useNavigation();
  const localImage = require('../../../assets/profile-icon.png');

  const editProfile = () => {
    console.log("Editar perfil acionado");
    navigation.navigate('EditProfile');  // Navegar para a tela de edição de perfil
  };

  const passwordReset = () => {
    console.log("Redefinir senha acionado");
  };
  const handleTerms = () => {
    console.log("Termos e Política de Privacidade acionado");
  };
  const handleLogout = () => {
    console.log("Sair da conta acionado");
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView>
        <ProfilePicture name="User" localImage={localImage} />
        <SettingsOption
          label="Editar Perfil"
          icon="user"
          onPress={editProfile} />
        <SettingsOption
          label="Redefinir Senha"
          icon="lock"
          onPress={passwordReset} />
        <SettingsOption
          label="Terms & Privacy Policy"
          icon="file-text"
          onPress={handleTerms} />
        <SettingsOption
          label="Sair da Conta"
          icon="sign-out"
          onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};