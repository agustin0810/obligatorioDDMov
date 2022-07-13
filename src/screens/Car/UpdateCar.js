import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";

const db = DatabaseConnection.getConnection();

const UpdateCar = ({ route, navigation }) => {
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [engineSerial, setEngineSerial] = useState('');
  //Recibimos el parámetro de la anterior ventana:
  const {carCode} = route.params;

  //Rellenamos los campos con los valores del usuario actual
  useEffect(() => {
    db.transaction((txn) => {

        txn.executeSql(`SELECT * FROM cars WHERE carCode=?`, [carCode], (tx, results) => {
          // validar resultado
          if (results.rows.length > 0) {
            setBrand(results.rows.item(0).brand)
            setColor(results.rows.item(0).color)
            setEngineSerial(results.rows.item(0).engineSerial)
          } else {
            Alert.alert(
              "Mensaje",
              "No se encontró el auto con matrícula: "+carCode,
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeCar"),

                },
              ],
              { cancelable: false }
            );
          }
        });

    })
  }, []);
  
  const validarDatos = () =>{
    if(brand!='' && color!='' && engineSerial!=null){
     

        return true;
    }
    Alert.alert('Debe ingresar todos los campos')
    return false
  }
  const updateC = () =>{
    if(validarDatos()==true){

      db.transaction((tx) => {

        tx.executeSql(
          "UPDATE cars SET brand = ?, color = ?, engineSerial= ? WHERE carCode = ?",
          [brand, color, engineSerial, carCode],
          (tx, results) => {

            if (results.rowsAffected > 0) {
              Alert.alert("Auto actualizado");
            } else {
              Alert.alert("No se pudo actualizar el auto");
            }
          }
        );
      });
    }
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
                <TextInput style={styles.textInput} value={brand} onChangeText={setBrand} editable maxLength={40} placeholder="Marca" />
                <TextInput style={styles.textInput} value={color} onChangeText={setColor} id="inputLastName" editable maxLength={40} placeholder="Color" />
                <TextInput style={styles.textInput} value={engineSerial} onChangeText={setEngineSerial} id="inputCI" editable maxLength={40} placeholder="Serial motor" />
                <TouchableOpacity style={[styles.submitButton]} onPress={updateC}>
                  <Text style={styles.text}>Modificar</Text>
                </TouchableOpacity>

              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
  </SafeAreaView>
  )
}

export default UpdateCar

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