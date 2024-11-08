import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import styles from "./styles";
import { BACKEND_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";


const logo = require("../../../assets/logo.png");

type CadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Cadastro"
>;

type Props = {
  navigation: CadastroScreenNavigationProp;
};

export default function CadastroScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user")
      if (storedUser) {
        navigation.navigate("Main", { user: JSON.parse(storedUser) });
      }
    } catch (error) {
      console.log("Erro ao obter dados do AsyncStorage:", error);
    }
  };
  useEffect(() => {
    loadUserFromStorage()
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_API_URL}/cadastros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeUsuario: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json(); // Captura a resposta em JSON

      if (response.ok) {
        Alert.alert("Success", "Cadastro Realizado com suceeso.");
        navigation.navigate("Login");
      } else {
        // Caso a resposta não seja ok, exibe a mensagem de erro vinda do backend
        Alert.alert("Erro", data.message || "Erro ao cadastrar usuário. Tente novamente.");
      }
    } catch (error: any) {
      console.log("Erro ao cadastrar usuário:", error.message);
      Alert.alert("Erro", "Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>D-Nutri</Text>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" // Melhora a experiência no mobile
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Confirmar cadastro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.login2}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//