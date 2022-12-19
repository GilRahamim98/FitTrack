import { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setId, setEmail, setPassword } from "../redux/actions";

const Register = ({ navigation }) => {
    const [registerForm, setRegisterForm] = useState({
        fullName: {
            value: '',
            placeholder: "Full Name",
        },
        emailOrPhone: {
            value: '',
            placeholder: "Email/Phone",
        },
        password: {
            value: '',
            placeholder: "Password",
        },
        confirmPassword: {
            value: '',
            placeholder: "Confirm Password",
        }
    });
    const setRegisterFormData = (name, value) => {
        const currentInput = registerForm[name]
        currentInput.value = value
        setRegisterForm({ ...registerForm })
    }
    // const { id, email, password } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        //Add user authentication functionality
        setEmail(registerForm.emailOrPhone.value)
        setPassword(registerForm.password.value)
        navigation.navigate('Home')

    };
    const createRegisterForm = () => {
        return Object.keys(registerForm).map(field =>
            field.includes('password') ?
                <TextInput
                    style={styles.input}
                    placeholder={registerForm[field].placeholder}
                    value={registerForm[field].value}
                    onChangeText={(text) => setRegisterFormData(field, text)}
                    key={field}
                    selectionColor={'#FED049'}
                    secureTextEntry
                /> :
                <TextInput
                    style={styles.input}
                    placeholder={registerForm[field].placeholder}
                    value={registerForm[field].value}
                    onChangeText={(text) => setRegisterFormData(field, text)}
                    key={field}
                    selectionColor={'#FED049'}
                />
        )
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/dumbbell.png')} style={styles.tinyLogo} />

            {createRegisterForm()}

            <View style={{ marginHorizontal: 32 }}>
                <TouchableOpacity
                    style={styles.buttonLike}
                    onPress={handleSubmit}
                >
                    <Text style={styles.textInsideButton}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 16 }}>
                <Text>
                    Already have an account?
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        fontFamily: 'Lato-Regular',
                        color: '#FED049'
                    }} onPress={() => navigation.navigate('Login')}>Sign In</Text>
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




export default Register