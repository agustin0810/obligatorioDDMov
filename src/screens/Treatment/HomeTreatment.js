import { StyleSheet, View, SafeAreaView, FlatList, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import MyText from "../../components/MyText";
import DatabaseConnection from "../../database/database-connection";
import AddButton from '../../components/AddButton'
import ActionButton from '../../components/ActionButton'
import { useFocusEffect } from '@react-navigation/native';


const db = DatabaseConnection.getConnection();


const HomeTreatment = ({ navigation }) => {
  const [treatments, setTreatments] = useState([]);

  // Listamos todos los usuarios antes de renderizar
  useFocusEffect(() => {

    db.transaction( (txn) => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS treatments(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), carCode VARCHAR(7), fInicio TEXT, fFin TEXT, costoTratamiento INTEGER)',
        []
      );
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='treatments'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);

          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS treatments', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS treatments(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), carCode VARCHAR(7), fInicio TEXT, fFin TEXT, costoTratamiento INTEGER)',
              []
            );
          }
        }
      );
      txn.executeSql(`SELECT * FROM treatments`, [], (tx, results) => {
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            //Alert.alert("paso " +results.rows.item(i).name)
            temp.push(results.rows.item(i));
          setTreatments(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay tratamientos",
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
          `DELETE FROM treatments WHERE name = ?`,
          [""],
          (tx, results) => {
            console.log("results", results);
            // validar resultado
            if (results.rowsAffected > 0) {
              Alert.alert("Tratamiento eliminado");
            } else {
              Alert.alert("El tratamiento no existe");
            }
          }
        );
      });*/
    });
  });

  const deleteTreatment = (idTreatment) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM treatments WHERE id = ?`,
        [idTreatment],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento eliminado");
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("El tratamiento no existe");
          }
        }
      );
    });

  }
  

  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText text="Nombre" style={styles.textL}/>
        <MyText text={item.name} style={styles.textL}/>

        <MyText text="Auto" style={styles.textL}/>
        <MyText text={item.carCode} style={styles.textL}/>

        <MyText text="Fecha inicio" style={styles.textL}/>
        <MyText text={item.fInicio} style={styles.textL}/>

        <MyText text="Fecha fin:" style={styles.textL}/>
        <MyText text={item.fFin} style={styles.textL}/>

        <MyText text="Costo tratamiento:" style={styles.textL}/>
        <MyText text={item.costoTratamiento} style={styles.textL}/>

        <ActionButton style={styles.delBut} btnColor="red" customPress={() => deleteTreatment(item.id)} title="X" />
        <ActionButton style={styles.delBut} btnColor="blue" customPress={() => navigation.navigate('UpdateTreatment', {treatmentId: item.id})} title="✎" />

      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
    <View>
      <View>
          <AddButton customPress={() => navigation.navigate("AddTreatment") } />
          <View style={styles.view}>
            <FlatList 
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
            data={treatments}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}

            />
          </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default HomeTreatment

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