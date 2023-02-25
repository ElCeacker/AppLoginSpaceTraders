import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { getShips } from '../services/SpaceTraders';


const Ships = ({ userToken }) => {

    const shipsImages = [
        require('../assets/pngwing.png'),
        require('../assets/pngwingdos.png'),
        require('../assets/pngwingtres.png'),
        require('../assets/pngwingcuatro.png'),
        require('../assets/pngwingcinco.png'),
        require('../assets/pngwingseis.png'),
        require('../assets/pngwingsiete.png'),
        require('../assets/pngwingocho.png'),
        require('../assets/pngwingnueve.png'),
        require('../assets/pngwingdiez.png'),
        require('../assets/pngwingonce.png'),
    ]

    const [ships, setShips] = useState([])

    useEffect(() => {
        const availableLoans = async () => {
            const data = await getShips(userToken)
            setShips(data)
        }
        availableLoans()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Ships</Text>

            <FlatList data={ships.shipListings} renderItem={({ item, index }) => {
                return (
                    ships === ''
                        ? <Text>No loans Available</Text>
                        : <View style={styles.modal_structure}>
                            <View>
                                <Image source={shipsImages[index]} style={styles.shipsimages} />
                            </View>
                            <View>
                                <Text>Type: {item.type}</Text>
                                <Text>Speed: {item.speed}</Text>
                                <Text>Weapons: {item.weapons}</Text>
                                <Text>Cargo: {item.maxCargo}</Text>
                            </View>
                        </View>
                )
            }} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    title: {
        fontSize: 30,
    },
    modal_structure: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        padding: 10,
        height: 180,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    shipsimages: { 
        height: 100,
        width: 100 
    }
})

export default Ships