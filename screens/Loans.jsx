import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import Toast from "react-native-root-toast";
import { getLoans } from "../services/SpaceTraders";

const Loans = ({ userToken, setActive }) => {
  const [loans, setLoans] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const availableLoans = async () => {
      const data = await getLoans(userToken);
      setLoans(data);
    };
    availableLoans();
  }, []);

  const takeLoan = async (type) => {
    const data = await takeLoan(userToken, type);
    try {
      if (data.loan.status) {
        Toast.show(`Loan '${data.loan.type}' taked`, {
          duration: Toast.durations.LONG,
        });
        setActive(true);
        navigation.navigate("Profile");
      }
    } catch (error) {
      Toast.show(`You can only take one loan`, {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Loans</Text>

      <FlatList
        data={loans.loans}
        renderItem={({ item }) => {
          return loans === "" ? (
            <Text>No loans Available</Text>
          ) : (
            <View style={styles.modal_structure}>
              <Text>- {item.amount} Crd</Text>
              <Text>- Rate: {item.rate} %</Text>
              <Text>- Term: {item.termInDays} days</Text>
              <Text style={{ paddingBottom: 10 }}>- Type: {item.type}</Text>
              <Button title="Take out" onPress={() => takeLoan(item.type)} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 50,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
  },
  modal_structure: {
    borderColor: "black",
    borderWidth: 1,
    width: 200,
    padding: 10,
    height: 150,
    backgroundColor: "#fff",
  },
});

export default Loans;
