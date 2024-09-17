import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types"; // Defina seus tipos de navegação em um arquivo separado

const logo = require("../../../assets/logo.png");

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Título da tela */}
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
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
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
    flexDirection: "row", // Alinha o texto e a imagem horizontalmente
    alignItems: "center", // Alinha o texto e a imagem verticalmente
    marginBottom: -10,
    marginTop: 40,
  },
  tituloText: {
    fontSize: 30,
    fontFamily: "Roboto_700Bold",
    fontWeight: "bold",
    color: "#91C788",
    marginRight: 10, // Espaço entre o texto e a imagem
  },
  logo: {
    width: 60, // Largura da imagem
    height: 60, // Altura da imagem
    resizeMode: "contain", // Mantém a proporção da imagem
  },
  formContainer: {
    width: "85%",
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#BBDEB5", // Borda verde
    backgroundColor: "#BBDEB5", // Fundo verde claro
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
  button: {
    width: "100%", // Largura total do botão
    paddingVertical: 15, // Altura do botão
    backgroundColor: "#91C788", // Cor de fundo
    borderRadius: 5, // Bordas arredondadas
    alignItems: "center", // Alinha o texto ao centro
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  backButtonText: {
    color: "#5e9256",
    fontSize: 20,
    fontWeight: "bold",
  },
  login: {
    color: "#91C788",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 3,
    marginTop: 40,
  },
  login2: {
    color: "#797878",
    fontSize: 17,
    marginRight: 5,
    marginTop: 40,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
