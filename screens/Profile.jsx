import { Text, View, Image, Button } from "react-native"
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { getUserProfile } from '../services/SpaceTraders'

const Profile = ({logOut}) => {
    
    const [profile, setProfile] = useState({user:{username: ''}});

    useEffect(() => {
        const fetchUserAccount = async () => {
            const userProfile = await getUserProfile();
            setProfile(userProfile)
        }
        fetchUserAccount()
    }, [])

    function tabla() {
        return (
            <View style={{borderWidth: 5, height: '100%', borderColor: 'white'}}>
                <View style={styles.edit}>
                    <Image style={styles.image} source={require('../assets/scooterAcuatico.jpg')}/>
                    <Text style={{paddingTop: 35}}>Username:  {profile.user.username}</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.textAlign}>ShipCount: {profile.user.shipCount}</Text>
                    <Text style={styles.textAlign}>StructureCount: {profile.user.structureCount}</Text>
                    <Text style={styles.textAlign}>JoinedAt: {profile.user.joinedAt}</Text>
                    <Text style={styles.textAlign}>Credits: {profile.user.credits}</Text>
                </View>
                <Button title="LogOut" onPress={logOut}/>
            </View>
        );
    }

    return (
        tabla()
    )
}

const styles = StyleSheet.create({
    edit: {
        display: 'flex',
        borderColor: 'black',
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',

    },
    image: {
        borderColor: 'black',
        borderWidth: 5,
        borderRadius:50,
        width: 90,
        height: 90,
        marginBottom: 10
    },
    viewText: {
        padding: 10,
    },
    textAlign: {
        textAlign: 'center'
    }
})

export default Profile