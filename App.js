import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useEffect, useState } from 'react';

import * as SecureStore from 'expo-secure-store';
import Home from './screens/Home';
import ServerStatus from './screens/ServerStatus';
import Profile from './screens/Profile';

const Drawer = createDrawerNavigator();
const STORE_TOKEN_KEY = 'mytoken'

export default function App() {

  useEffect(() => {
    const retrieveStoreToken = async () => {
      const storeToken = await getValueFor(STORE_TOKEN_KEY)
      setUserToken(storeToken)
    }
    retrieveStoreToken();
  }, [userToken])

  const getValueFor = async(key) => {
    let result = await SecureStore.getItemAsync(key);
  
    // if (result) {
    //   alert(`Tu valor es ${result}`)
    //   return result
    // } else {
    //   alert('No existe esa key')
    //   return ''
    // }
  }

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  }

  const [userToken, setUserToken] = useState('')

  const storeUserToken = (newToken) => {
    console.log('Mama estoy en la app: ', newToken);
    setUserToken(newToken);
    save(STORE_TOKEN_KEY, newToken)
    setUserToken(userToken)
  }

  const logOut = () => {
    setUserToken('')
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          {
            userToken === ''
            ?
            <>
              <Drawer.Screen name='Login Way'>
                {() => <Home onLogin={storeUserToken} />}
              </Drawer.Screen>
            </>
            :
            <>
              <Drawer.Screen name='Server Status' component={ServerStatus} />

              <Drawer.Screen name='Profile'> 
                {() => <Profile logOut={logOut}/>}
              </Drawer.Screen>
            </>
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
