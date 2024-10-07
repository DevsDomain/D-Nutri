import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import ProfilePicture from '../../components/ProfilePicture';
import SettingsOption from '../../components/SettingsOption';
import { styles } from './styles';
import { BACKEND_API_URL } from "@env";
import axios from 'axios';
import { IUserData } from '../../types/userDiary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IuserLogin } from '../../types/user';

const EditProfile: React.FC = () => {
    const localImage = require('../../../assets/profile-icon.png');

    const [userData, setUserData] = useState<IUserData>();
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [altura, setAltura] = useState('');
    const [genero, setgenero] = useState('');
    const [peso, setPeso] = useState('');
    const [meta, setMeta] = useState('');
    const [userLogin, setUserLogin] = useState<IuserLogin>();

    const loadUserFromStorage = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUserLogin(JSON.parse(storedUser));
                console.log("Usuário do AsyncStorage:", storedUser);
            }
        } catch (error) {
            console.error("Erro ao obter dados do AsyncStorage:", error);
        }
    };

    const loadUser = async (id: number) => {
        try {
            const response = await axios.get(`${BACKEND_API_URL}/users/${id}`);
            const userData = response.data[0];
            setUserData(userData);
            setAltura(userData.altura.toString());
            setMeta(userData.meta.toString());
            setNomeUsuario(userData.nomeUsuario.toString());
            setPeso(userData.peso.toString());
            setgenero(userData.genero.toString());
        } catch (error) {
            console.log("ERRO ao buscar dados do usuário", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await loadUserFromStorage();
        };

        fetchData();
    }, []);

    // Chama o loadUser quando userLogin estiver carregado
    useEffect(() => {
        if (userLogin) {
            loadUser(parseInt(userLogin.id));
        }
    }, [userLogin]);

    const updateStorage = async () => {
        const myUser = { id: userLogin?.id, nomeUsuario: nomeUsuario, email: userLogin?.email }
        try {
            await AsyncStorage.setItem("user", JSON.stringify(myUser));
            console.log("Dados do usuário atualizados no AsyncStorage:", myUser);
        } catch (error) {
            console.error("Erro ao atualizar AsyncStorage:", error);
        }
    }
    const handleSaveChanges = async () => {
        try {
            const url = `${BACKEND_API_URL}/users/${userLogin?.id}`;
            const body = JSON.stringify({
                nomeUsuario,
                altura,
                genero,
                peso,
                meta,
            });

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            const data = await response.json();
            updateStorage()

            if (response.ok) {
                Alert.alert('Sucesso', data.message);

            } else {
                Alert.alert('Erro', data.message);
            }
        } catch (error) {
            console.log('Erro na função handleSaveChanges:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o perfil');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Editar Perfil</Text>
            </View>

            <ScrollView>
                <ProfilePicture name={nomeUsuario || 'User'} localImage={localImage} />

                <SettingsOption
                    label="Nome"
                    icon="user"
                    onPress={() => { }}
                    editable={true}
                    value={nomeUsuario}
                    onChangeText={setNomeUsuario}
                />
                <SettingsOption
                    label="Altura em cm"
                    icon="expand"
                    onPress={() => { }}
                    editable={true}
                    value={altura}
                    onChangeText={setAltura}
                />
                <SettingsOption
                    label="Sexo"
                    icon="venus-mars"
                    onPress={() => { }}
                    editable={true}
                    value={genero}
                    onChangeText={setgenero}
                />
                <SettingsOption
                    label="Peso em Kg"
                    icon="clipboard"
                    onPress={() => { }}
                    editable={true}
                    value={peso}
                    onChangeText={setPeso}
                />
                <SettingsOption
                    label="Meta de Peso em Kg"
                    icon="clipboard"
                    onPress={() => { }}
                    editable={true}
                    value={meta}
                    onChangeText={setMeta}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>Salvar alterações</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
