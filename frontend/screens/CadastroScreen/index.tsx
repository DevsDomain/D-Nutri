import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types"; // Defina seus tipos de navegação em um arquivo separado

const logo = require('../../assets/logo.png');

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, "Cadastro">;

type Props = {
  navigation: CadastroScreenNavigationProp;
};

export default function CadastroScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Aqui você pode adicionar lógica para salvar os dados do cadastro, se necessário

    // Exibir o alerta de sucesso
    Alert.alert("Conta criada com sucesso!");

    // Navegar para a tela de login
    navigation.navigate('Login');
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
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Confirmar cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.login2}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
    marginTop: 20,
  },
  tituloText: {
    fontSize: 30,
    fontFamily: "Roboto_700Bold",
    fontWeight: 'bold',
    color: "#91C788",
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '85%',
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#BBDEB5',
    backgroundColor: '#BBDEB5',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#64A759',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64A759',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#91C788',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#5e9256',
    fontSize: 20,
    fontWeight: 'bold',
  },
  login: {
    color: "#91C788",
    fontSize: 20,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});