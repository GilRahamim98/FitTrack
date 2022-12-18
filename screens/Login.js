import { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setId, setEmail, setPassword } from "../redux/actions";

const Login = ({ navigation }) => {
    const [loginForm, setLoginForm] = useState({
        email: {
            value: '',
            placeholder: "Email",
            setFunc: function (text) {
                setLoginForm({
                    ...loginForm,
                    email: {
                        ...email,
                        value: text
                    }
                })
            }
        },
        password: {
            value: '',
            placeholder: "Password",
            setFunc: function (text) {
                setLoginForm({
                    ...loginForm,
                    password: {
                        ...password,
                        value: text
                    }
                })
            }

        }
    });
    const setLoginFormData = (name, value) => {
        const currentInput = loginForm[name]
        currentInput.value = value
        setLoginForm({ ...loginForm })
    }
    const { id, email, password } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        //Add user authentication functionality
        navigation.navigate('Home')

    };
    return (
        <View style={styles.container}>
            <Image source={require('../assets/dumbbell.png')} style={styles.tinyLogo} />

            <TextInput
                style={styles.input}
                placeholder={loginForm.email.placeholder}
                value={loginForm.email.value}
                onChangeText={(text) => setLoginFormData("email", text)}
            />
            <TextInput
                style={styles.input}
                placeholder={loginForm.password.placeholder}
                value={loginForm.password.value}
                onChangeText={(text) => setLoginFormData("password", text)}
                secureTextEntry
            />
            <Text style={styles.textInsideButton}>Forgot Password?</Text>

            <View style={{ marginHorizontal: 32 }}>
                <TouchableOpacity
                    style={styles.buttonLike}
                    onPress={handleSubmit}
                >
                    <Text style={styles.textInsideButton}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 16 }}>
                <Text>
                    Don't have an account yet?
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        fontFamily: 'Lato-Regular',
                        color: '#FED049'
                    }} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
                </Text>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30
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
    textInsideButton: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: 'Lato-Regular',

    },
    tinyLogo: {
        width: 200,
        height: 200,
    }
});




export default Login