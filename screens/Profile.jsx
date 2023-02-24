import { Text, View, Image, Button } from "react-native"
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { getUserProfile } from '../services/SpaceTraders'
import Toast from "react-native-root-toast";

const Profile = ({userToken}) => {
    
    const [profile, setProfile] = useState({user:{username: ''}});

    useEffect(() => {
        const fetchUserAccount = async () => {
            const userProfile = await getUserProfile(userToken);
            if ('user' in userProfile) {
                setProfile(userProfile)
                return 
            } 

            Toast.show(userProfile.error.message, {
                duration: Toast.durations.LONG
            })

        }
        fetchUserAccount()
    }, [])

    function tabla() {
        return (
            <View style={{borderWidth: 5, height: '100%', borderColor: 'white'}}>
                <View style={styles.edit}>
                    <Image style={styles.image} source={require('../assets/nave-espacial.png')}/>
                    <Text style={{paddingTop: 35, fontSize: 30}}>{profile?.user?.username}</Text>
                </View>
                <View style={styles.viewText}>
                    <View style={styles.showCredits}>
                        <Text style={styles.textCredits}>{profile?.user?.credits} crd</Text>
                    </View>
                    <View style={styles.datasText}>
                        <View style={{display: 'flex', flexDirection: 'column'}}>
                            <Image style={styles.astronave} source={require('../assets/astronave.png')}/>
                            <Image style={styles.edificioImage} source={require('../assets/edificio-de-oficinas.png')}/>
                        </View>
                        <View style={styles.datasNumber}>
                            <View style={styles.datasSeparations}>
                                <Text style={styles.numberDatas}>{profile?.user?.shipCount}</Text>
                            </View>
                            <View style={styles.datasSeparations}>
                                <Text style={styles.numberDatas}>{profile?.user?.structureCount}</Text>
                            </View>
                        </View>

                    </View>
                </View>
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
    astronave: {
        width: 50,
        height: 50,
    },
    edificioImage: {
        width: 50,
        height: 50,
    },
    viewText: {
        padding: 10,
    },
    textAlign: {
        textAlign: 'center'
    },
    showCredits: {
        borderWidth: 1,
        width: '90%',
        height: '25%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCredits: {
        fontSize: 20
    },
    datasText: {
        marginTop: '10%',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '35%',
        display: 'flex',
        flexDirection: 'row'
    },
    datasNumber: {
        display: 'flex', 
        flexDirection: 'column',
        paddingLeft: 10,
    },
    datasSeparations: {
        margin: 10,
    },
    numberDatas: {
        fontSize: 20
    },
})

export default Profile