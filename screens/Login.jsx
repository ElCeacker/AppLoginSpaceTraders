import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native"
import { StyleSheet } from 'react-native';

import Toast from 'react-native-root-toast';
import { getUserProfile } from "../services/SpaceTraders";

const Login = ({userToken, setUserToken}) => {

    const [textToken, setTextToken] = useState('');

    const tokenHandler = async () => {
        if (textToken !== '') {
            const userData = await getUserProfile(textToken)
            if ('user' in userData) {
                setUserToken(textToken)
                return
            } 

            Toast.show(userData.error.message, {
                duration: Toast.durations.LONG
            })

        } else {
            Toast.show('Introduzca un Token para continuar', {
                duration: Toast.durations.LONG
            })
        }
    }
    
    

    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Text>Login: </Text>
                <Text>Su token es: {userToken}</Text>
                <TextInput 
                    value={textToken} 
                    placeholder='Introduzca token'
                    onChangeText={(value) => setTextToken(value)}/>
                    <Button title='Login' onPress={tokenHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-end'
    },
    button: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        width: 80,
        backgroundColor: 'lightgreen',
    },
})

export default Login