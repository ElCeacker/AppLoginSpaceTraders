import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useEffect, useState } from 'react';
import { claimLoan, getUser } from './services/SpaceTraders' 

import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Logout from './screens/Logout';
import Loans from './screens/Loans';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const STORE_TOKEN_KEY = 'mytoken'

export default function App() {

  const [userData, setUserData] = useState({ user: { username: "", credits: "", shipCount: "", joinedAt: "" } });
  const [userToken, setUserToken] = useState('')
  const [active, setActive] = useState(false)
  

  // const handleAPi = async()=>{
  //   const response =  await claimLoan("351cf3fe-da77-490f-9a6b-98ff5f17fd93", "STARTUP")
  // }

  // useEffect(()=>{
  //   handleAPi()
  // },[])

  const getValueFor = async(key) => {
    let result = await AsyncStorage.getItem(key);

    if (!result) {
      return ''
    } else {
      return result
    }
  }

  const save = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  }

  useEffect(() => {
    setActive(false)
    const retrieveStoredToken = async () => {
      const storedToken = await getValueFor(STORE_TOKEN_KEY);
      if (storedToken) {
        setUserToken(storedToken);
      }
      if (userToken !== '') {
        save(STORE_TOKEN_KEY, userToken)
      }
    }
    const fetchUserAccount = async () => {
      try {
        const data = await getUser(userToken)
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
    retrieveStoredToken();
    if (userToken) {
      fetchUserAccount();
    }
    console.log("token => ", userToken);
  }, [userToken, active])

  const logOut = () => {
    save(STORE_TOKEN_KEY, '')
    setUserToken('')
    
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Login'>
          {
            userToken === ''
            ?
            <>
              <Drawer.Screen name='Login'>
                {() => <Login userToken={userToken} setUserToken={setUserToken} save={save}/>}
              </Drawer.Screen>
              <Drawer.Screen name='Register'>
                {() => <Register setUserToken={setUserToken}/>}
              </Drawer.Screen>
            </>
            :
            <>
              <Drawer.Screen name='Profile'>
                {() => <Profile userToken={userToken} userData={userData}/>}
              </Drawer.Screen>

              <Drawer.Screen name='Loans'>
                {() => <Loans userToken={userToken} setActive={setActive} />}
              </Drawer.Screen>

              <Drawer.Screen name='LogOut'> 
                {() => <Logout logOut={logOut}/>}
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
