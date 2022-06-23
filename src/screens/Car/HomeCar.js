import { StyleSheet, View, SafeAreaView, FlatList, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import MyText from "../../components/MyText";
import DatabaseConnection from "../../database/database-connection";
import AddButton from '../../components/AddButton'
import ActionButton from '../../components/ActionButton'
import { useFocusEffect } from '@react-navigation/native';


const db = DatabaseConnection.getConnection();


const HomeCar = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [selectedCarcode, setSelectedCarCode] = useState(null);

  // Listamos todos los usuarios antes de renderizar
  useFocusEffect(() => {

    db.transaction( (txn) => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS cars(carCode varchar(7) PRIMARY KEY, brand VARCHAR(20), color VARCHAR(20), engineSerial VARCHAR(20))',
        []
      );
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='cars'",
        [],
         (tx, res) =>{

          console.log('item:', res.rows.length);

          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS cars', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS cars(carCode varchar(7) PRIMARY KEY, brand VARCHAR(20), color VARCHAR(20), engineSerial VARCHAR(20))',
              []
            );
          }
          
        }
      );
      txn.executeSql(`SELECT * FROM cars`, [], (tx, results) => {
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            //Alert.alert("paso " +results.rows.item(i).name)
            temp.push(results.rows.item(i));
          setCars(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay ningún auto registrado",
            [
              {
                text: "Ok",
              },
            ],
            { cancelable: false }
          );
        }
      });



      /*db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM cars WHERE carCode = ?`,
          [""],
          (tx, results) => {
            console.log("results", results);
            // validar resultado
            if (results.rowsAffected > 0) {
              Alert.alert("Auto eliminado");
            } else {
              Alert.alert("El auto no existe");
            }
          }
        );
      });*/
    });
  });

  const deleteCar = (carCode) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM cars WHERE carCode = ?`,
        [carCode],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Auto eliminado");
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("El auto no existe");
          }
        }
      );
    });

  }
  

  const listItemView = (item) => {
    return (
      <View key={item.carCode} style={styles.listItemView}>
        <MyText text="Marca" style={styles.textL}/>
        <MyText text={item.brand} style={styles.textL}/>

        <MyText text="Color" style={styles.textL}/>
        <MyText text={item.color} style={styles.textL}/>

        <MyText text="Serial de motor" style={styles.textL}/>
        <MyText text={item.engineSerial} style={styles.textL}/>

        <ActionButton style={styles.delBut} btnColor="red" customPress={() => deleteCar(item.carCode)} title="X" />
        <ActionButton style={styles.delBut} btnColor="blue" customPress={() => navigation.navigate('UpdateCar', {carCode: item.carCode})} title="✎" />

      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
    <View>
      <View>
          <AddButton customPress={() => navigation.navigate("AddCar") } />
          <View style={styles.view}>
            <FlatList 
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
            data={cars}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}

            />
          </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default HomeCar

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
  },
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  textL: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  flatList: {
    backgroundColor: 'blue'
  },
  delBut: {
    marginTop: 20,
    
  }
})