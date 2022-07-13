import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList } from 'react-native'
import React, {useEffect} from 'react'
import MyText from "../../components/MyText";
import { useFocusEffect } from '@react-navigation/native';
import DatabaseConnection from "../../database/database-connection";

const db = DatabaseConnection.getConnection();


const DetailedList = () => {
  const [treatments, setTreatments] = React.useState([]);
  useFocusEffect(() => {

    db.transaction( (txn) => {

      txn.executeSql(`SELECT DISTINCT treatments.id, treatments.name, treatments.fInicio, treatments.fFin, treatments.carCode, treatments.costoTratamiento, users.name as uName, users.lastname as uLastname, replacements.treatmentId as replacements FROM treatments inner join users on treatments.carCode = users.carCode left join replacements on treatments.id=replacements.treatmentId`, [], (tx, results) => {
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
  const listItemView = (item) => {
    
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText text="Nombre tratamiento" style={styles.textL}/>
        <MyText text={item.name} style={styles.textL}/>

        <MyText text="Nombre cliente" style={styles.textL}/>
        <MyText text={item.uName + " "+ item.uLastname} style={styles.textL}/>

        <MyText text="Fecha inicio" style={styles.textL}/>
        <MyText text={item.fInicio} style={styles.textL}/>

        <MyText text="Fecha fin:" style={styles.textL}/>
        <MyText text={item.fFin} style={styles.textL}/>

        <MyText text="Usó repuestos:" style={styles.textL}/>
        {item.replacements==undefined ? <MyText text={'No'} style={styles.textL}/> : <MyText text={'Si'} style={styles.textL}/>}


        <MyText text="Costo tratamiento:" style={styles.textL}/>
        <MyText text={item.costoTratamiento} style={styles.textL}/>

      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <View>
          <View style={styles.view}>
            <FlatList 
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
            data={treatments}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}

            />
            {console.log(treatments)}
          </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default DetailedList

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