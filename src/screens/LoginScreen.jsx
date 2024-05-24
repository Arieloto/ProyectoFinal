import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../constants/colors";
import InputForm from "../components/inputForm";
import SubmitButton from "../components/submitButton";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { useDispatch } from "react-redux";
import { insertSession } from "../persistence";
import SvgLogo from "../../assets/SvgLogo";

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (result.isSuccess) {
            insertSession({
                email: result.data.email,
                localId: result.data.localId,
                token: result.data.idToken,
            })
                .then(() => {
                    dispatch(
                        setUser({
                            email: result.data.email,
                            idToken: result.data.idToken,
                            localId: result.data.localId,
                        })
                    );
                })
                .catch((err) => {
                    console.log(err);
                    setError("Error storing session data.");
                });
        } else if (result.isError) {
            setError(result.error.data?.message || "Inicio de sesion fallida.");
        }
    }, [result]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = () => {
        if (!email && !password) {
            setError("Porfavor ingresa correo y contraseña");
            return;
        }
        if (!email) {
            setError("Por favor ingresa tu correo electrónico");
            return;
        }
    
        // Verificar si se ingresó la contraseña
        if (!password) {
            setError("Por favor ingresa tu contraseña");
            return;
        }
        if (password.length <= 6) {
            setError("Contraseña debe tener almenos 6 caracteres");
            return;
        }
        if (!emailRegex.test(email) || !email.includes('@')) {
            setError("Por favor ingresa un correo electrónico válido");
            return;
        }
        setError('');
        triggerSignIn({ email, password });
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <SvgLogo width={100} height={100} fill={colors.teal200} />
                <Text style={styles.title}>A OTRA DIMENSION</Text>
                <Text style={styles.sub}>Todo en impresion 3d y maquinas cnc</Text>
                <Text style={styles.title}>Iniciar Sesion</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <InputForm
                    label={"Email"}
                    onChange={setEmail}
                    error={""}
                />
                <InputForm
                    label={"Contraseña"}
                    onChange={setPassword}
                    error={""}
                    isSecure={true}
                />
                <SubmitButton onPress={onSubmit} title="Enviar" />
                <Text style={styles.sub}>¿No tienes cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Registrate</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.teal200,
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.teal900,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: "Saira",
        backgroundColor: colors.teal900,
        color: colors.platinum,
    },
    sub: {
        fontSize: 14,
        color: colors.teal200,
        fontFamily: "Saira",
        
    },
    subLink: {
        fontSize: 14,
        color: colors.teal200,
        fontFamily: "Saira",
        borderBottomWidth:1,
        borderBottomColor:colors.teal400,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        
    },
});
