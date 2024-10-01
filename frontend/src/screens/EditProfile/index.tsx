import React, { useState } from 'react';
import { StatusBar, ScrollView, View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import ProfilePicture from '../../components/ProfilePicture';
import SettingsOption from '../../components/SettingsOption';
import { styles } from './styles';

const EditProfile: React.FC = () => {
    const localImage = require('../../../assets/profile-icon.png');

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [altura, setAltura] = useState('');
    const [genero, setgenero] = useState('');
    const [peso, setPeso] = useState('');
    const [meta, setMeta] = useState('');

    const handleSaveChanges = async () => {
        try {
            console.log('Iniciando a função handleSaveChanges');

            const url = 'http://93.127.211.47:3010/users/7';
            const body = JSON.stringify({
                nomeUsuario,
                altura,
                genero,
                peso,
                meta,
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
