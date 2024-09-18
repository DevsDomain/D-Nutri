import React from "react";
import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { styles } from "./styles";



export default function ProfileScreen() {
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
            onPress={handleEditProfile} />
          <SettingsOption
            label="Redefinir Senha"
            icon="lock"
            onPress={handlePasswordReset} />
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