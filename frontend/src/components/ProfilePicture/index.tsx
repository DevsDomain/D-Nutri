import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { useFonts, Signika_700Bold } from '@expo-google-fonts/signika';
import * as SplashScreen from 'expo-splash-screen';

interface ProfilePictureProps {
    name: string;
    imageUri?: string;
    localImage?: any;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ name, imageUri, localImage }) => {
    let [fontsLoaded] = useFonts({
        Signika_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {imageUri ? (
                <Image source={{ uri: String(imageUri) }} style={styles.image} />
            ) : (
                <Image source={localImage} style={styles.image} />
            )}
            <Text style={styles.name}>{name}</Text>
        </View>
    );
};

export default ProfilePicture;
