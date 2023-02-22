import { Button, Text, TextInput, View, Image } from "react-native"
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getServerState } from '../services/SpaceTraders';

const ServerStatus = () => {
    const [state, setState] = useState({ status: '' });
    useEffect(() => {
        const fetchStateServer = async () => {
            const state = await getServerState();
            setState(state)
        }
        fetchStateServer()
    }, [])
    
    function estado() {
        return (
            <View style={{flex: 1}}>
                <View style={[styles.edit, styles.container]}>
                    {state
                    ?<Image style={styles.image} source={require('../assets/switch-on.png')}/>
                    :<Image style={styles.image} source={require('../assets/switch-off.png')}/>}
                    <Text>State: {state ? 'Online' : 'Offline'}</Text>
                </View>
            </View>
        );
    }

    return (
        estado()
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
    edit: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 50,
        height: 50
    },
})

export default ServerStatus