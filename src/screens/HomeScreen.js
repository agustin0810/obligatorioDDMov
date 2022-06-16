import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {

  useEffect(() => {

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Usuarios"
                btnColor="green"
                customPress={() => navigation.navigate("RegisterUser")}
              />
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
    backgroundColor: "black",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
});
