import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native"
import { StyleSheet } from 'react-native';

import Toast from 'react-native-root-toast';

const Login = ({userToken, setUserToken}) => {

    const [textToken, setTextToken] = useState('');

    const tokenHandler = () => {
        if (textToken !== '') {
            setUserToken(textToken)
            console.log('Mama estoy en la app: ', textToken);

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