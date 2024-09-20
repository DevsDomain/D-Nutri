import React from 'react';
import { StatusBar, ScrollView, View, Text, SafeAreaView } from 'react-native';
import ProfilePicture from '../../components/ProfilePicture';
import SettingsOption from '../../components/SettingsOption';
import { styles } from './styles';



const EditProfile: React.FC = () => {
    const localImage = require('../../../assets/profile-icon.png');


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
                    onPress={() => { }} />

                <SettingsOption
                    label="Altura"
                    icon="star"
                    onPress={() => { }}
                />
                <SettingsOption
                    label="Peso"
                    icon="gear"
                    onPress={() => { }}
                />
                <SettingsOption
                    label="Meta de Peso"
                    icon="clipboard"
                    onPress={() => { }}
                />

                <SettingsOption
                    label="Sexo"
                    icon="clipboard"
                    onPress={() => { }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
