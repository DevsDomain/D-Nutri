import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
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

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {
  const localImage = require("../../../assets/profile-icon.png");
  const [modalVisible, setModalVisible] = useState(false);
  const [Password, setPassword] = useState("");
  const [modalType, setModalType] = useState<
    "passwordReset" | "logoutConfirmation"
  >("passwordReset");
  const [user, setUser] = useState<IuserLogin>();
  const [userLogin, setUserLogin] = useState<IuserLogin>();
  const [userData, setUserData] = useState<IuserLogin>();
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    loadUserFromStorage(); // Carrega os dados do AsyncStorage, inclusive o nome do usuário
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserLogin(parsedUser);
        console.log("Usuário do AsyncStorage:", parsedUser);

        // Chamar loadUser diretamente após carregar o usuário do AsyncStorage
        if (parsedUser?.id) {
          loadUser(parsedUser.id); // Chamar a função loadUser com o ID correto
        }
      }
    } catch (error) {
      console.error("Erro ao obter dados do AsyncStorage:", error);
    }
  };

  // Função para carregar os dados do usuário
  const loadUser = async (id: number) => {
    try {
      console.log("Iniciando a função loadUser com ID:", id);
      const response = await axios.get(`${BACKEND_API_URL}/users/${id}`);
      const userData = response.data[0];

      if (userData) {
        setUserData(userData.nomeUsuario);
        setPassword(userData.password);
        setUser(userData); // Definir o usuário carregado
        console.log("Dados do usuário carregados:", userData);
      }
    } catch (error) {
      console.log("Erro ao buscar dados do usuário:", error);
    }
  };

  useEffect(() => {
    if (userLogin) {
      loadUser(parseInt(userLogin.id));
      setUserLogin(userLogin)
    }
  }, []);

  const updateStorage = async () => {
    const myUser = {
      id: userLogin?.id,
      nomeUsuario: nomeUsuario,
      email: userLogin?.email,
    };
    try {
      await AsyncStorage.setItem("user", JSON.stringify(myUser));
      console.log("Dados do usuário atualizados no AsyncStorage:", myUser);
    } catch (error) {
      console.error("Erro ao atualizar AsyncStorage:", error);
    }
  };

  // Fim da função para carregar os dados do usuário
  const passwordReset = () => {
    setModalType("passwordReset");
    setModalVisible(true);
  };

  const handlePasswordChange = async () => {
    try {
      console.log("Iniciando a função handlePasswordChange");

      const userId = user?.id || userLogin?.id; // Usa o ID de userLogin se user.id estiver indefinido

      if (!userId) {
        console.error("ID do usuário não está definido");
        Alert.alert("Erro", "ID do usuário não está definido");
        return;
      }

      console.log("ID Veio?", userId);
      const url = `${BACKEND_API_URL}/edit-profile-password/${userId}`;
      const body = JSON.stringify({
        password: Password,
      });

      console.log("URL:", url);
      console.log("Body:", body);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      console.log("Resposta recebida:", response);

      const data = await response.json();
      updateStorage();

      console.log("Dados recebidos:", data);

      if (response.ok) {
        updateStorage();
        Alert.alert("Sucesso", data.message);
      } else {
        Alert.alert("Erro", data.message);
      }
    } catch (error) {
      console.log("Erro na função handlePasswordChange:", error);
      Alert.alert("Erro", "Não foi possível atualizar a senha");
    } finally {
      setModalVisible(false); // Fechar o modal após a redefinição de senha
    }
  };

  const logoutConfirmation = () => {
    setModalType("logoutConfirmation");
    setModalVisible(true);
  };

  const handleLogout = async () => {
    console.log("Saindo da conta...");
    setModalVisible(false); // Fechar o modal após a confirmação de logout
    await AsyncStorage.clear().then(() => {
      navigation.navigate("Login");
    });
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
        <ProfilePicture name={user?.nomeUsuario || userLogin?.nomeUsuario || "User"} localImage={localImage} />
        <SettingsOption
          label="Editar Perfil"
          icon="user"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <SettingsOption
          label="Redefinir Senha"
          icon="lock"
          onPress={passwordReset}
        />
        <SettingsOption
          label="Terms & Privacy Policy"
          icon="file-text"
          onPress={() => navigation.navigate("termsOfUse")}
        />
        <SettingsOption
          label="Sair da Conta"
          icon="sign-out"
          onPress={() => handleLogout()}
        />
      </ScrollView>

      {/* Modal para Redefinir Senha */}
      <CustomModal
        visible={modalVisible}
        title={
          modalType === "passwordReset" ? "Redefinir Senha" : "Sair da Conta"
        }
        content={
          modalType === "passwordReset" ? (
            <>
              <Text style={styles.modalText}>Digite a Nova senha:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                secureTextEntry
                value={Password}
                onChangeText={setPassword}
              />
            </>
          ) : (
            <Text style={styles.modalText}>
              Tem certeza que deseja sair da conta?
            </Text>
          )
        }
        onCancel={handleCancel}
        onConfirm={
          modalType === "passwordReset" ? handlePasswordChange : handleLogout
        }
        cancelText="Cancelar"
        confirmText={modalType === "passwordReset" ? "OK" : "Sair"}
      />
    </SafeAreaView>
  );
}
//
