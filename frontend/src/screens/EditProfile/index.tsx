import React, { useState } from 'react';
import { StatusBar, ScrollView, View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import ProfilePicture from '../../components/ProfilePicture';
import SettingsOption from '../../components/SettingsOption';
import { styles } from './styles';

const EditProfile: React.FC = () => {
    const localImage = require('../../../assets/profile-icon.png');

    const [nome, setNome] = useState('');
    const [altura, setAltura] = useState('');
    const [sexo, setSexo] = useState('');
    const [peso, setPeso] = useState('');
    const [metaPeso, setMetaPeso] = useState('');

    const handleSaveChanges = () => {
        console.log("Alterações salvas");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Editar Perfil</Text>
            </View>

            <ScrollView>
                <ProfilePicture name="User" localImage={localImage} />

                <SettingsOption
                    label="Nome"
                    icon="user"
                    onPress={() => { }}
                    editable={true}
                    value={nome}
                    onChangeText={setNome}
                />
                <SettingsOption
                    label="Altura"
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
                    value={sexo}
                    onChangeText={setSexo}

                />
                <SettingsOption
                    label="Peso"
                    icon="balance-scale"
                    onPress={() => { }}
                    editable={true}
                    value={peso}
                    onChangeText={setPeso}

                />
                <SettingsOption
                    label="Meta de Peso"
                    icon="clipboard"
                    onPress={() => { }}
                    editable={true}
                    value={metaPeso}
                    onChangeText={setMetaPeso}

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
