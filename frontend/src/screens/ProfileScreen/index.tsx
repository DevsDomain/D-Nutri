import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StatusBar, Modal, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./styles";
import ProfilePicture from "../../components/ProfilePicture";
import SettingsOption from "../../components/SettingsOption";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import CustomModal from "../../components/Modal";


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {
  const localImage = require('../../../assets/profile-icon.png');
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [modalType, setModalType] = useState<'passwordReset' | 'logoutConfirmation'>('passwordReset');


  const passwordReset = () => {
    setModalType('passwordReset');
    setModalVisible(true);
  };

  const handlePasswordChange = () => {
    console.log('Nova senha:', newPassword);
    setModalVisible(false); // Fechar o modal após a redefinição de senha
  };

  const logoutConfirmation = () => {
    setModalType('logoutConfirmation');
    setModalVisible(true);
  };

  const handleLogout = () => {
    console.log('Saindo da conta...');
    setModalVisible(false); // Fechar o modal após a confirmação de logout
    navigation.navigate("Onboarding");
  };

  const handleCancel = () => {
    setModalVisible(false);
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
          onPress={() => navigation.navigate("EditProfile")} />
        <SettingsOption
          label="Redefinir Senha"
          icon="lock"
          onPress={passwordReset} />
        <SettingsOption
          label="Terms & Privacy Policy"
          icon="file-text"
          onPress={() => navigation.navigate("termsOfUse")} />
        <SettingsOption
          label="Sair da Conta"
          icon="sign-out"
          onPress={() => navigation.navigate("Onboarding")} /> 
      </ScrollView>


      {/* Modal para Redefinir Senha */}
      <CustomModal
        visible={modalVisible}
        title={modalType === 'passwordReset' ? 'Redefinir Senha' : 'Sair da Conta'}
        content={
          modalType === 'passwordReset' ? (
            <>
              <Text style={styles.modalText}>Digite a Nova senha:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </>
          ) : (
            <Text style={styles.modalText}>Tem certeza que deseja sair da conta?</Text>
          )
        }
        onCancel={handleCancel}
        onConfirm={modalType === 'passwordReset' ? handlePasswordChange : handleLogout}
        cancelText="Cancelar"
        confirmText={modalType === 'passwordReset' ? 'OK' : 'Sair'}
      />
    </SafeAreaView>
  );
};
