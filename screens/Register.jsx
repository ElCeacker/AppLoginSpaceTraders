import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

import Toast from "react-native-root-toast";
import { createUser } from "../services/SpaceTraders";

const Register = ({ setUserToken }) => {
  const [userName, setUserName] = useState("");

  const registerHandler = async () => {
    if (userName === "") {
      Toast.show("Introduzca el nombre de usuario", {
        duration: Toast.durations.LONG,
      });
    } else {
      const userData = await createUser(userName);
      if ("token" in userData) {
        setUserToken(userData.token);
        return;
      }

      Toast.show(userData.error.message, {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Register: </Text>
        <TextInput
          value={userName}
          placeholder="Coloque su nombre de usuario"
          onChangeText={(value) => setUserName(value)}
        />
        <Button title="Register" onPress={registerHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  button: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 40,
    width: 80,
    backgroundColor: "lightgreen",
  },
});

export default Register;
