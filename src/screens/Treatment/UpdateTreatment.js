import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";

const db = DatabaseConnection.getConnection();

const UpdateTreatment = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [carCode, setCarCode] = useState('');
  const [fInicio, setFInicio] = useState('');
  const [fFin, setFFin] = useState('');
  const [costoTratamiento, setCostoTratamiento] = useState(null);
  //Recibimos el parámetro de la anterior ventana:
  const {treatmentId} = route.params;

  //Rellenamos los campos con los valores del usuario actual
  useEffect(() => {
    db.transaction((txn) => {
      
      txn.executeSql(`SELECT * FROM treatments WHERE id=?`, [treatmentId], (tx, results) => {
        // validar resultado
        if (results.rows.length > 0) {
          setName(results.rows.item(0).name)
          setCarCode(results.rows.item(0).carCode)
          setFInicio(results.rows.item(0).fInicio)
          setFFin(results.rows.item(0).fFin)
          setCostoTratamiento(results.rows.item(0).costoTratamiento)

        } else {
          Alert.alert(
            "Mensaje",
            "No se encontró el tratamiento con ID: "+treatmentId,
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeTreatment"),

              },
            ],
            { cancelable: false }
          );
        }
      });
    })
  }, []);
  

  const updateT = () =>{
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE treatments SET name = ?, carCode = ?, fInicio= ?, fFin= ?, costoTratamiento = ? WHERE id = ?",
        [name, carCode, fInicio, fFin, costoTratamiento, treatmentId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento actualizado");
          } else {
            Alert.alert("No se pudo actualizar el tratamiento");
          }
        }
      );
    });
  }
  return (
  <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={styles.keyboardView}
              >
                <TextInput style={styles.textInput} value={name} onChangeText={setName} editable maxLength={40} placeholder="Nombre" />
                <TextInput style={styles.textInput} value={carCode} onChangeText={setCarCode} id="inputLastName" editable maxLength={7} placeholder="Mat. auto" />
                <TextInput style={styles.textInput} value={fInicio} onChangeText={setFInicio} id="inputCI" editable maxLength={19} placeholder="Fecha inicio (YYYY-MM-DD HH:MM:SS)" /> 
                <TextInput style={styles.textInput} value={fFin} onChangeText={setFFin} id="inputMatAuto" editable maxLength={19} placeholder="Fecha fin (YYYY-MM-DD HH:MM:SS)" />
                <TextInput style={styles.textInput} value={costoTratamiento.toString()} onChangeText={setCostoTratamiento} id="inputMatAuto" editable maxLength={10} placeholder="Costo tratamiento" />

                <TouchableOpacity style={[styles.submitButton]} onPress={updateT}>
                  <Text style={styles.text}>Modificar</Text>
                </TouchableOpacity>

              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
  </SafeAreaView>
  )
}

export default UpdateTreatment

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
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  inputStyle: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInput: {
    borderColor: "#142492",
    borderWidth: 4,
    borderRadius: 5,
    width: 300,
    padding: 7,
    color: "#142492",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 20
  },
  submitButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    backgroundColor: 'green',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    
  },
  text: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',

    width: 65,
    fontSize: 15
  }
})