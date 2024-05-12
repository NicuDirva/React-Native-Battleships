import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSignUpMessage, setShowSignUpMessage] = useState(false); // State pentru afișarea mesajului de înregistrare cu succes
    const navigate = useNavigation();

    const handleSignIn = async () => {
        try {
            const user = {
                email,
                password
            }
            const response = await fetch(
                "https://malamute-enabled-yak.ngrok-free.app/auth/login",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(user),
                },
              );
            const result = await response.json();
            if (result.accessToken) {
                const user = {
                  email: email,
                  accessToken: result.accessToken,
                };
                navigate.reset({
                  index: 0,
                  routes: [{ name: "Home", params: { user } }],
                });
              }
              setEmail('');
              setPassword('');
        } catch(error) {
            console.log("Error: ", error)
        }
    };

    const handleSignUp = async () => {
        try {
            const user = {
                email,
                password
            }
            const response = await fetch(
                "https://malamute-enabled-yak.ngrok-free.app/auth/register",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(user),
                },
              );
            const result = await response.json();
            console.log("Result in SignUp", result)
            setEmail('');
            setPassword('');
            setShowSignUpMessage(true); // Afisează mesajul de înregistrare cu succes
            setTimeout(() => setShowSignUpMessage(false), 5000); // Ascunde mesajul după 5 secunde
            
        } catch(error) {
            console.log("Error: ", error)
        }
        console.log('SignUp:', email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Battleships</Text>
            <View style={styles.inputContainer}>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Password:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            {showSignUpMessage && (
                <Text style={styles.successMessage}>Sign Up successful!</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: '70%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successMessage: {
        marginTop: 10,
        color: 'green',
        fontWeight: 'bold',
    },
});
