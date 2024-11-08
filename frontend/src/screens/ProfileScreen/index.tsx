import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
  TouchableOpacity,
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
import { UserContext } from "../../context/userContext";
import Icon from "react-native-vector-icons/FontAwesome";

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
  const [showPassword, setShowPassword] = useState(false);
  const [modalType, setModalType] = useState<
    "passwordReset" | "logoutConfirmation"
  >("passwordReset");
  const [user, setUser] = useState<IuserLogin>();
  const [userLogin, setUserLogin] = useState<IuserLogin>();
  const [userData, setUserData] = useState<IuserLogin>();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const userContexto = useContext(UserContext);
  const userContextoProfile = userContexto?.user
  const setUserContexto = userContexto?.setUser
  useEffect(() => {
    loadUserFromStorage(); // Carrega os dados do AsyncStorage, inclusive o nome do usuário
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserLogin(parsedUser);
        //console.log("Usuário do AsyncStorage:", parsedUser);

        // Chamar loadUser diretamente após carregar o usuário do AsyncStorage
        if (parsedUser?.id) {
          loadUser(parsedUser.id); // Chamar a função loadUser com o ID correto
        }
      }
    } catch (error) {
      console.log("Erro ao obter dados do AsyncStorage:", error);
    }
  };

  // Função para carregar os dados do usuário
  const loadUser = async (id: number) => {
    try {
      //console.log("Iniciando a função loadUser com ID:", id);
      const response = await axios.get(`${BACKEND_API_URL}/users/${id}`);
      const userData = response.data[0];

      if (userData) {
        setUserData(userData.nomeUsuario);
        setPassword(userData.password);
        setUser(userData); // Definir o usuário carregado
        //console.log("Dados do usuário carregados:", userData);
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
      //console.log("Dados do usuário atualizados no AsyncStorage:", myUser);
    } catch (error) {
      console.log("Erro ao atualizar AsyncStorage:", error);
    }
  };
  // Fim da função para carregar os dados do usuário

  const passwordReset = () => {
    setPassword(''); // Limpar o campo de senha antes de abrir o modal
    setModalType("passwordReset");
    setModalVisible(true);
  };

  const handlePasswordChange = async () => {
    try {
      //console.log("Iniciando a função handlePasswordChange");

      const userId = user?.id || userLogin?.id; // Usa o ID de userLogin se user.id estiver indefinido

      if (!userId) {
        console.log("ID do usuário não está definido");
        Alert.alert("Erro", "ID do usuário não está definido");
        return;
      }

      //console.log("ID Veio?", userId);
      const url = `${BACKEND_API_URL}/edit-profile-password/${userId}`;
      const body = JSON.stringify({
        password: Password,
      });

      // console.log("URL:", url);
      // console.log("Body:", body);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      //console.log("Resposta recebida:", response);

      const data = await response.json();
      updateStorage();

      //console.log("Dados recebidos:", data);

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
    try {
      console.log("Saindo da conta...");
  
      // Limpar AsyncStorage
      await AsyncStorage.clear();
      if (setUserContexto) {
        setUserContexto(null);
      }
      
      setModalVisible(false); // Fechar modal após logout
    } catch (error) {
      console.log("Erro ao fazer logout:", error);
    }
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
        <ProfilePicture name={userContexto?.user?.nomeUsuario || "User"} localImage={localImage} />
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
          label="Termos de Uso & Privacidade"
          icon="file-text"
          onPress={() => navigation.navigate("termsOfUse")}
        />
        <SettingsOption
          label="Sair da Conta"
          icon="sign-out"
          onPress={logoutConfirmation} // Abre o modal de confirmação
        />
      </ScrollView>
  
      {/* Modal para Redefinir Senha ou Logout */}
      <CustomModal
        visible={modalVisible}
        title={
          modalType === "passwordReset" ? "Redefinir Senha" : "Sair da Conta"
        }
        content={
          modalType === "passwordReset" ? (
            <>
              <Text style={styles.modalText}>Digite a Nova senha:</Text>
              <View style={styles.passwordContainer}>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                  <Icon name={showPassword ? "eye" : "eye-slash"} size={18}/>
                </TouchableOpacity>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder=""
                  secureTextEntry={!showPassword}
                  value={Password}
                  onChangeText={setPassword}
                />
              </View>
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
