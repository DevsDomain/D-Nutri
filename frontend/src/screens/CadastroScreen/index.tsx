import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types"; 
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
        navigation.navigate("Main");
      }
    } catch (error) {
      console.error("Erro ao obter dados do AsyncStorage:", error);
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

        const data = await response.json();

        if (response.ok) {
            Alert.alert("Conta criada com sucesso!");
            navigation.navigate("Login");
        } 
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 0,
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
    marginTop: 0,
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
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  login: {
    color: "#91C788",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 3,
    marginTop: 0,
  },
  login2: {
    color: "#797878",
    fontSize: 17,
    marginRight: 5,
    marginTop: 0,
  },
});