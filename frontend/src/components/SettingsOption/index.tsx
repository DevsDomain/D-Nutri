import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { Signika_400Regular, Signika_500Medium, useFonts } from '@expo-google-fonts/signika';
import * as SplashScreen from 'expo-splash-screen';

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
    | 'ruler-vertical'
    | 'ruler'
    | 'calendar'
    | 'venus-mars'
    | 'balance-scale'
    | 'arrows-alt-v'
    | 'expand'
    | undefined;

interface SettingsOptionProps {
    label: string;
    icon: FontAwesomeIconNames;
    onPress?: () => void;
    editable?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    style?: ViewStyle;
    children?: React.ReactNode;
    keyboardType?: "numeric" | "default";
}

const SettingsOption: React.FC<SettingsOptionProps> = ({ label, icon, onPress, value, onChangeText, style, editable, children }) => {
    let [fontsLoaded] = useFonts({
        Signika_400Regular,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <View style={styles.iconContainer}>
            <FontAwesome name={icon} size={24} style={styles.fontAwesome} />
            </View>
            <Text style={styles.label}>{label}</Text>
            {editable ? (
                children ? (
                    children
                ) : (
                    <TextInput
                        style={styles.textInput}
                        value={value}
                        onChangeText={onChangeText}
                    />
                )
            ) : null}
        </TouchableOpacity>
    );
};

export default SettingsOption;