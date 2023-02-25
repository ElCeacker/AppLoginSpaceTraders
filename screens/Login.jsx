import { useState } from "react";
import { Button, Text, TextInput, View, Image } from "react-native";
import { StyleSheet } from "react-native";

import Toast from "react-native-root-toast";
import { getUser } from "../services/SpaceTraders";

const Login = ({ userToken, setUserToken, save }) => {
  const [textToken, setTextToken] = useState("");
  const STORE_TOKEN_KEY = "mytoken";

  const tokenHandler = async () => {
    if (textToken !== "") {
      const userData = await getUser(textToken);
      if ("user" in userData) {
        setUserToken(textToken);
        save(STORE_TOKEN_KEY, textToken);
        return;
      }

      Toast.show("This token does not exist", {
        duration: Toast.durations.LONG,
      });
    } else {
      Toast.show("Enter a Token to continue", {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <>
      <Image source={require('../assets/espacio.jpg')}/>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text>Login: </Text>
          <TextInput
            value={textToken}
            placeholder="Enter your token"
            onChangeText={(value) => setTextToken(value)}
          />
          <View style={{marginTop: 10}}>
            <Button title="Login" onPress={tokenHandler}/>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '90%'
  } 
});

export default Login;
