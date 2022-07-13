import { StyleSheet, TextInput, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";

const db = DatabaseConnection.getConnection();

const AddCar = ({ navigation }) => {
  const [carCode, setCarCode] = useState('')
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [engineSerial, setEngineSerial] = useState(null);
  const [msgAlert, setMsgAlert] = useState('');
  const [carsCodes, setCarsCodes] = useState([]);

  useEffect(() => {
    db.transaction((txn) => {
    txn.executeSql(`SELECT carCode FROM cars`, [], (tx, results) => {
      // validar resultado
  
      if (results.rows.length > 0) {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i){
  
          //Alert.alert("paso " +results.rows.item(i).name)
          temp.push(results.rows.item(i).carCode);
        }
        setCarsCodes(temp);
        
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
  })
  
  }, [])
  

  //función para hacer el submit desde el botón
  const submitCar = () =>{
          // guardar los datos
        if(validarDatos() == true){
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
  }

  const validarDatos = () =>{
    if(carCode!='' && brand!='' && color!='' && engineSerial!=null){
     
      if(carCode.substring(0, 3).match('[a-zA-Z]+') && carCode.substring(3, 7).length==4){
        console.log(carsCodes)
        if(!carsCodes.includes(carCode)){
          console.log(carCode)
        return true;
        }
        else{
          Alert.alert("Matrícula duplicada.")
          return false;
        }
      } 
      else{
        Alert.alert('La matrícula no cumple con el formato')
        return false
      }
    }
    Alert.alert('Debe ingresar todos los campos')
    return false
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
          <TextInput style={styles.textInput} id="carCode" onChangeText={setCarCode} editable maxLength={7} placeholder="Matricula" />
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