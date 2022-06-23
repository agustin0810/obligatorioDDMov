import { StyleSheet, TextInput, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";

const db = DatabaseConnection.getConnection();

const AddCar = ({ navigation }) => {
  const [carCode, setCarCode] = useState('')
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [engineSerial, setEngineSerial] = useState(null);
  const [paso, setpaso] = useState(6);

  //función para hacer el submit desde el botón
  const submitCar = () =>{
          // guardar los datos

          db.transaction((tx) => {

            tx.executeSql(
              `INSERT INTO cars (carCode, brand, color, engineSerial) VALUES (?, ?, ?, ?)`,
              [carCode, brand, color, engineSerial],
              (tx, results) => {
                console.log("results", results);
                // validar resultado
                if (results.rowsAffected > 0) {
                              
                  Alert.alert(
                    "Exito",
                    "Auto registrado.",
                    [
                      {
                        text: "Ok",
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  Alert.alert("Error al registrar auto");
                }
              }
            );
          });

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
          <TextInput style={styles.textInput} onChangeText={setCarCode} editable maxLength={7} placeholder="Matricula" />
          <TextInput style={styles.textInput} onChangeText={setBrand} editable maxLength={40} placeholder="Marca" />
          <TextInput style={styles.textInput} onChangeText={setColor} id="inputLastName" editable maxLength={20} placeholder="Color" />
          <TextInput style={styles.textInput} onChangeText={setEngineSerial} id="inputCI" editable maxLength={20} placeholder="Serial del motor" />
          <TouchableOpacity style={[styles.submitButton]} onPress={submitCar}>
            <Text style={styles.text}>Agregar</Text>
          </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  )
}

export default AddCar

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