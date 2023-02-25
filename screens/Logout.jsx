import { Button, Text, View, Pressable } from "react-native";
import { StyleSheet } from 'react-native';

const Logout = ({logOut}) => {
    return (
        <View>
            <View style={styles.container}>
                <Pressable onPress={logOut} style={styles.button}>
                    <Text style={styles.textLogout}>LogOut</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        width: 80,
        backgroundColor: 'gray', 
    },
    textLogout: {
        color: 'white'
    }
})

export default Logout