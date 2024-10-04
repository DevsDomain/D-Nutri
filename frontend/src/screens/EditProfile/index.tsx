import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import ProfilePicture from '../../components/ProfilePicture';
import SettingsOption from '../../components/SettingsOption';
import { styles } from './styles';
import { BACKEND_API_URL } from "@env";
import axios from 'axios';
import { IUserData } from '../../types/userDiary';

const EditProfile: React.FC = () => {
    const localImage = require('../../../assets/profile-icon.png');

    const [userData, setUserData] = useState<IUserData>();
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [altura, setAltura] = useState('');
    const [genero, setgenero] = useState('');
    const [peso, setPeso] = useState('');
    const [meta, setMeta] = useState('');
    const [firstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        loadUser(10)
        if (userData) {
            setUser()
        }
    }, [firstLoad]);

    const setUser = () => {
        setAltura(userData?.altura.toString() || "")
        setMeta(userData?.meta.toString() || "")
        setNomeUsuario(userData?.nomeUsuario.toString() || "")
        setPeso(userData?.peso.toString() || "")
        setgenero(userData?.genero.toString() || "")

    }

    const loadUser = (id: number) => {
        try {
            axios.get(`${BACKEND_API_URL}/users/10`).then(({ data }) => {
                if (data && data.length > 0) {
                    const userData = data[0];
                    setUserData(userData);
                }
            });
        } catch (error) {
            console.log("ERRO ao buscar dados do usuário", error);
        }
    };

    const handleSaveChanges = async () => {
        try {

            const url = `${BACKEND_API_URL}/users/10`;
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


            if (response.ok) {
                Alert.alert('Sucesso', data.message);
                setFirstLoad(false)
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
