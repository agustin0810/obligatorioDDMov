import { StyleSheet, View, SafeAreaView, FlatList, Alert, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import MyText from "../../components/MyText";
import DatabaseConnection from "../../database/database-connection";
import AddButton from '../../components/AddButton'
import ActionButton from '../../components/ActionButton'
import { useFocusEffect } from '@react-navigation/native';


const db = DatabaseConnection.getConnection();


const HomeReplacement = ({ navigation }) => {
  const [replacements, setReplacements] = useState([]);

  useFocusEffect(() => {

    db.transaction( (txn) => {

      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS replacements(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), amount INTEGER, treatmentId INTEGER)',
        []
      );
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='replacements'",
        [],
         (tx, res) =>{

          console.log('item:', res.rows.length);

          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS replacements', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS replacements(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), amount INTEGER, treatmentId INTEGER)',
              []
            );
          }
          
        }
      );
      txn.executeSql(`SELECT * FROM replacements`, [], (tx, results) => {
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            //Alert.alert("paso " +results.rows.item(i).name)
            temp.push(results.rows.item(i));
          setReplacements(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay ningún repuesto registrado",
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

  const deleteReplacement = (id) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM replacements WHERE id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto eliminado");
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("El repuesto no existe");
          }
        }
      );
    });

  }
  const getTreatment = (id) => {

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM treatments WHERE id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if( results.rows.items(0) != null){
            let treatment = results.rows.items(0);
            console.log(treatment);
            return treatment;
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

        <MyText text="Cantidad" style={styles.textL}/>
        <MyText text={item.amount} style={styles.textL}/>

        <MyText text="Tratamiento" style={styles.textL}/>
        <MyText text={item.treatmentId} style={styles.textL}/>
        
        <ActionButton style={styles.delBut} btnColor="red" customPress={() => deleteReplacement(item.id)} title="X" />
        <ActionButton style={styles.delBut} btnColor="blue" customPress={() => navigation.navigate('UpdateReplacement', {id: item.id})} title="✎" />

      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
    <View>
      <View>
          <AddButton customPress={() => navigation.navigate("AddReplacement") } />
          <View style={styles.view}>
            <FlatList 
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
            data={replacements}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}

            />
          </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default HomeReplacement

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