import { useCallback } from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Connect = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text style={{
                color: "black",
                fontSize: 50,
                fontFamily: 'Lato-Regular',
                fontWeight: "bold",
                marginTop: 32

            }}>Hey there and welcome to FitTrack</Text>
            <Image source={require('../assets/dumbbell.png')} style={styles.tinyLogo} />
            <View style={{ marginTop: 130 }}>
                <View style={{ marginHorizontal: 32 }}>
                    <TouchableOpacity
                        style={styles.buttonLike}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.textInsideButton}>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 32, }}>
                    <TouchableOpacity
                        style={styles.buttonLike}
                        onPress={() =>
                            Alert.alert('Sign up')}
                    >
                        <Text style={styles.textInsideButton}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F1F6F5'
    },
    textInsideButton: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: 'Lato-Regular',

    },
    buttonLike: {
        marginTop: 16,
        justifyContent: 'center',
        backgroundColor: '#FED049',
        padding: 8,
        height: 50,
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
    },
    tinyLogo: {
        marginTop: 130,
        width: 200,
        height: 200,
    }
})



export default Connect