import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import { BACKEND_API_URL } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";

const logo = require("../../../assets/logo.png");

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        navigation.navigate("Main"); // Navega para HomeScreen se o usuário estiver no AsyncStorage
      }
    } catch (error: any) {
      console.log("Necessário logar");
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_API_URL}/login`, {
        email,
        password,
      });
      const { message, user } = response.data;
      if (message === "Login realizado com sucesso!") {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        navigation.navigate("Main"); // Navega diretamente para a HomeScreen
      } else {
        Alert.alert("Erro", "Credenciais inválidas.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar o login.");
      console.error("Erro de login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>D-Nutri</Text>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Icon name={showPassword ? "eye" : "eye-slash"} size={24} color="#13440c" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.login2}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.login}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -10,
    marginTop: 40,
  },
  tituloText: {
    fontSize: 30,
    fontFamily: "Roboto_700Bold",
    fontWeight: "bold",
    color: "#91C788",
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  formContainer: {
    width: "85%",
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#BBDEB5",
    backgroundColor: "#BBDEB5",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#64A759",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#64A759",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "white",
  },
  passwordInput: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "white",
  },
  eyeButton: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#91C788",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  login: {
    color: "#91C788",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 3,
    marginTop: 10,
  },
  login2: {
    color: "#797878",
    fontSize: 17,
    marginRight: 5,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});


