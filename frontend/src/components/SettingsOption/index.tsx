import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { useFonts, Signika_400Regular } from '@expo-google-fonts/signika';

type FontAwesomeIconNames =
    | 'home'
    | 'user'
    | 'cog'
    | 'bell'
    | 'chevron-right'
    | 'star'
    | 'lock'
    | 'file-text'
    | 'sign-out';

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
                <FontAwesome name={icon} size={24} color="#FF9385" />
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

export default SettingsOption;