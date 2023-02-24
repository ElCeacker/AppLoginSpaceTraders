import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useEffect, useState } from 'react';
import { claimLoan } from './services/SpaceTraders' 

import * as SecureStore from 'expo-secure-store';
import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Register from './screens/Register';
const Drawer = createDrawerNavigator();
const STORE_TOKEN_KEY = 'mytoken'

export default function App() {

  const handleAPi = async()=>{
    const response =  await claimLoan("351cf3fe-da77-490f-9a6b-98ff5f17fd93", "STARTUP")
    console.log({response})
  }

  useEffect(()=>{
    handleAPi()
  },[])

  const getValueFor = async(key) => {
    let result = await SecureStore.getItemAsync(key);
  }

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  }

  const [userToken, setUserToken] = useState('')



  // const logOut = () => {
  //   setUserToken('')
  // }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Login'>
          {
            userToken === ''
            ?
            <>
              <Drawer.Screen name='Login'>
                {() => <Login userToken={userToken} setUserToken={setUserToken}/>}
              </Drawer.Screen>
              <Drawer.Screen name='Register'>
                {() => <Register userToken={userToken} setUserToken={setUserToken}/>}
              </Drawer.Screen>
            </>
            :
            <>
              <Drawer.Screen name='Space Traders'>
                {() => <Profile userToken={userToken}/>}
              </Drawer.Screen>
              <Drawer.Screen name='Home' component={Home} />

              {/* <Drawer.Screen name='LogOut'> 
                {() => <LogOut logOut={logOut}/>}
              </Drawer.Screen> */}
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
