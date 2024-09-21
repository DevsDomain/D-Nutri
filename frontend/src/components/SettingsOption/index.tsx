import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { useFonts, Signika_400Regular } from '@expo-google-fonts/signika';

type FontAwesomeIconNames =
    | 'sign-out'
    | 'gear'
    | 'clipboard'
    | 'home'
    | 'user'
    | 'cog'
    | 'bell'
    | 'chevron-right'
    | 'star'
    | 'lock'
    | 'file-text'
    | 'search'
    | 'repeat'
    | 'anchor'
    | 'bold'
    | 'link'
    | 'at'
    | 'weight'
    | 'venus-mars'
    | 'ruler-vertical'
    // Adicione outros ícones válidos aqui
    | undefined;

interface SettingsOptionProps {
    label: string;
    icon: FontAwesomeIconNames;
    onPress: () => void;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({ label, icon, onPress }) => {
    let [fontsLoaded] = useFonts({
        Signika_400Regular,
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.iconContainer}>
                <FontAwesome name={icon} size={24} color="black" />
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

export default SettingsOption;
