import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Menu, Button, Provider } from 'react-native-paper';
import ProfilePicture from '../../components/ProfilePicture';
import SettingsOption from '../../components/SettingsOption';
import { styles } from './styles';
import { BACKEND_API_URL } from "@env";
import axios from 'axios';
import { IUserData } from '../../types/userDiary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IuserLogin } from '../../types/user';
import { RootStackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

const EditProfile: React.FC = () => {
    const localImage = require('../../../assets/profile-icon.png');
    const navigation = useNavigation<EditProfileScreenNavigationProp>();

    const [userData, setUserData] = useState<IUserData>();
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [userLogin, setUserLogin] = useState<IuserLogin>();

    const [altura, setAltura] = useState('');
    const [genero, setGenero] = useState(''); // Mantém o estado do gênero
    const [peso, setPeso] = useState('');
    const [meta, setMeta] = useState('Selecione a meta');
    const [generoMenuVisible, setGeneroMenuVisible] = useState(false);
    const [metaMenuVisible, setMetaMenuVisible] = useState(false);

    const openMenu = () => setGeneroMenuVisible(true);
    const closeMenu = () => setGeneroMenuVisible(false);
    const openMetaMenu = () => setMetaMenuVisible(true);
    const closeMetaMenu = () => setMetaMenuVisible(false);


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
            console.log(response.data[0])
            const userData = response.data[0];
            setUserData(userData);
            setAltura(userData.altura?.toString() || "");
            setMeta(userData.meta?.toString() || "");
            setNomeUsuario(userData.nomeUsuario?.toString() || "");
            setPeso(userData.peso?.toString() || "");
            setGenero(userData.genero?.toString() || "");
            setGenero(userData.genero?.toString() || "");
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
            const url = `${BACKEND_API_URL}/edit-profile/${userLogin?.id}`;
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
                updateStorage();
                Alert.alert('Sucesso', data.message);
                navigation.navigate('ProfileScreen'); // Salva e volta para ProfileScreen
            } else {
                Alert.alert('Erro', data.message);
            }

        } catch (error) {
            console.log('Erro na função handleSaveChanges:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o perfil');
        }
    };

    return (
        <Provider>
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
                        label="Gênero"
                        icon="venus-mars"
                        editable={true}
                    >
                        <Menu
                            visible={generoMenuVisible}  // Agora usando generoMenuVisible para visibilidade
                            onDismiss={() => setGeneroMenuVisible(false)}  // Fecha o menu
                            anchor={
                                <Button onPress={() => setGeneroMenuVisible(true)} mode="outlined" style={styles.picker}>
                                    {genero || 'Selecione o gênero'}
                                </Button>
                            } >
                            <Menu.Item onPress={() => { setGenero('Outros'); setGeneroMenuVisible(false); }} title="Outros" />
                            <Menu.Item onPress={() => { setGenero('Masculino'); setGeneroMenuVisible(false); }} title="Masculino" />
                            <Menu.Item onPress={() => { setGenero('Feminino'); setGeneroMenuVisible(false); }} title="Feminino" />
                        </Menu>

                    </SettingsOption>
                    <SettingsOption
                        label="Peso em Kg"
                        icon="clipboard"
                        onPress={() => { }}
                        editable={true}
                        value={peso}
                        onChangeText={setPeso}
                    />
                    <SettingsOption
                        label="Meta"
                        icon="clipboard"
                        editable={true}
                    >
                        <Menu
                            visible={metaMenuVisible}  // Agora usando metaMenuVisible para visibilidade
                            onDismiss={() => setMetaMenuVisible(false)}  // Fecha o menu
                            anchor={
                                <Button onPress={() => setMetaMenuVisible(true)} mode="outlined" style={styles.picker}>
                                    {meta || 'Selecione a meta'}  {/* Mostra a meta selecionada ou um valor padrão */}
                                </Button>
                            }
                        >
                            <Menu.Item onPress={() => { setMeta('Ganho de massa'); setMetaMenuVisible(false); }} title="Ganho de massa" />
                            <Menu.Item onPress={() => { setMeta('Manter Peso'); setMetaMenuVisible(false); }} title="Manter Peso" />
                            <Menu.Item onPress={() => { setMeta('Emagrecimento'); setMetaMenuVisible(false); }} title="Emagrecimento" />
                        </Menu>

                    </SettingsOption>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSaveChanges}
                    >
                        <Text style={styles.buttonText}>Salvar alterações</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
};

export default EditProfile;
