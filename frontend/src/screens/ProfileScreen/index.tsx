import { View, Text, SafeAreaView, ScrollView, StatusBar, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import ProfilePicture from "../../components/ProfilePicture";
import SettingsOption from "../../components/SettingsOption";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import CustomModal from "../../components/Modal";
import { IuserLogin } from "../../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_API_URL } from "@env";
import axios from "axios";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {

  const localImage = require('../../../assets/profile-icon.png');
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [modalType, setModalType] = useState<'passwordReset' | 'logoutConfirmation'>('passwordReset');
  const [user, setUser] = useState<IuserLogin>();
  const [userLogin, setUserLogin] = useState<IuserLogin>();
  const [userData, setUserData] = useState<IuserLogin>();

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log("Usuário do AsyncStorage:", storedUser);
      }
    } catch (error) {
      console.error("Erro ao obter dados do AsyncStorage:", error);
    }
  };


  useEffect(() => {
    loadUserFromStorage()
  }, []);


  // Copiado do frontend/src/screens/EditProfile/index.tsx
  const loadUser = async (id: number) => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/users/${id}`);
      const userData = response.data[0];
      setUserData(userData);
      setNewPassword(userData.password);

    } catch (error) {
      console.log("ERRO ao buscar dados do usuário", error);
    }
  };
  useEffect(() => {
    if (userLogin) {
      loadUser(parseInt(userLogin.id));
    }
  }, [userLogin]);

  // Fim da cópia


  const passwordReset = () => {
    setModalType('passwordReset');
    setModalVisible(true);
  };

  const handlePasswordChange = async () => {
    try {
      console.log('Iniciando a função handlePasswordChange');

      const url = `${BACKEND_API_URL}/profile/7`;
      const body = JSON.stringify({
        password: newPassword,
      });

      console.log('URL:', url);
      console.log('Body:', body);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      console.log('Resposta recebida:', response);

      const data = await response.json();

      console.log('Dados recebidos:', data);

      if (response.ok) {
        Alert.alert('Sucesso', data.message);
      } else {
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      console.log('Erro na função handlePasswordChange:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a senha');
    } finally {
      setModalVisible(false); // Fechar o modal após a redefinição de senha
    }
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
        <ProfilePicture name={user?.nomeUsuario || "User"} localImage={localImage} />
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
}
