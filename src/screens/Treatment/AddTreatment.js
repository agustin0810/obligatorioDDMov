import { StyleSheet, TextInput, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";

const db = DatabaseConnection.getConnection();

const AddTreatment = ({ navigation }) => {
  const [name, setName] = useState('');
  const [carCode, setCarCode] = useState('');
  const [fInicio, setFInicio] = useState('');
  const [fFin, setFFin] = useState('');
  const [costoTratamiento, setCostoTratamiento] = useState(null);

  //función para hacer el submit desde el botón
  const submitTreatment = () =>{
          // guardar los datos
          db.transaction((tx) => {
            tx.executeSql(
              `INSERT INTO treatments (name, carCode, fInicio, fFin, costoTratamiento) VALUES (?, ?, ?, ?, ?)`,
              [name, carCode, fInicio, fFin, costoTratamiento],
              (tx, results) => {
                console.log("results", results);
                // validar resultado
                if (results.rowsAffected > 0) {
                              
                  Alert.alert(
                    "Exito",
                    "Tratamiento agregado",
                    [
                      {
                        text: "Ok",
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  Alert.alert("Error al agregar tratamiento");
                }
              }
            );
          });

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        
          <TextInput style={styles.textInput} onChangeText={setName} editable maxLength={40} placeholder="Nombre" />
          <TextInput style={styles.textInput} onChangeText={setCarCode} id="inputLastName" editable maxLength={7} placeholder="Mat. auto" />
          <TextInput style={styles.textInput} onChangeText={setFInicio} id="inputCI" editable maxLength={19} placeholder="Fecha inicio (YYYY-MM-DD HH:MM:SS)" /> 
          <TextInput style={styles.textInput} onChangeText={setFFin} id="inputMatAuto" editable maxLength={19} placeholder="Fecha fin (YYYY-MM-DD HH:MM:SS)" />
          <TextInput style={styles.textInput} onChangeText={setCostoTratamiento} id="inputMatAuto" editable maxLength={10} placeholder="Costo tratamiento" />

          <TouchableOpacity style={[styles.submitButton]} onPress={submitTreatment}>
            <Text style={styles.text}>Agregar</Text>
          </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  )
}

export default AddTreatment

const styles = StyleSheet.create({
  container: {

  },
  viewContainer: {
    padding: 30
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
    marginBottom: 30
  },
  submitButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    backgroundColor: 'green',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    
  },
  text: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 55,
    fontSize: 15
  }
})