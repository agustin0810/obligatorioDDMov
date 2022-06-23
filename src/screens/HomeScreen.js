import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";


const HomeScreen = ({ navigation }) => {

  useEffect(() => {

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton title="Usuarios" margin={20} btnColor="#142492" customPress={() => navigation.navigate("HomeUser") }/>
              <MyButton title="Autos" margin={20} btnColor="#142492" customPress={() => navigation.navigate("HomeCar") }/>
              <MyButton title="Tratamientos" margin={20} btnColor="#142492" customPress={() => navigation.navigate("HomeTreatment") }/>
              <MyButton title="Insumos" margin={20} btnColor="#142492" customPress={() => navigation.navigate("HomeSupply") }/>
              <MyButton title="Repuestos" margin={20} btnColor="#142492" customPress={() => navigation.navigate("HomeReplacement") }/>
              <MyButton style={styles.btnListados} margin={60} title="Listados" btnColor="#142492" customPress={() => navigation.navigate("DetailedList") }/>

            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
});
