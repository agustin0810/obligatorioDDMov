import { StyleSheet, TextInput, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";

const db = DatabaseConnection.getConnection();
const AddUser = ({ navigation }) => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [ci, setCI] = useState(null);
  const [matAuto, setMatAuto] = useState('');
  const [maxId, setMaxId] = useState(null);
  const [paso, setpaso] = useState(6);
  const [carsCodes, setCarsCodes] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {

    db.transaction((tx) => {
      tx.executeSql(`SELECT carCode FROM cars`, [], (tx, results) => {
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
      tx.executeSql(`SELECT document FROM users`, [], (tx, results) => {
        // validar resultado
    
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i){
    
            //Alert.alert("paso " +results.rows.item(i).name)
            temp.push(results.rows.item(i).document.toString());
          }
          setDocuments(temp);
          
        } else {
          Alert.alert(
            "Mensaje",
            "No hay ningún usuario registrado",
            [
              {
                text: "Ok",
              },
            ],
            { cancelable: false }
          );
        }
      });
    }
  
  )}, [])
  const checkFields = () =>{
    if(name!='' && lastname!='' && ci!=null && matAuto!=''){
      
      if(!isNaN(ci) && ci.length==8){
        if(carsCodes.includes(matAuto)){
          if(!documents.includes(ci.toString())){
            return true;
          }
          else{
            Alert.alert("Documento duplicado.")
            return false;
          }
        }
        else{
          Alert.alert("La matricula que ingresó no corresponde a ningún vehículo.")
          return false;
        }
      }
      else{
        Alert.alert("El formato de la CI es incorrecto.")
        return false;
      }
      
    }
    else{
      Alert.alert("Debe ingresar todos los campos.")
      return false;
    }
  }
  //función para hacer el submit desde el botón
  const submitUser = () =>{
    // Pendiente validar la matricula
    //checkeamos que hayan datos ingresados en todos los campos
 //   if(name!="" && lastname!="" && ci!="" && matAuto!=""){
      //validamos la ci como número
  //    if(Number(ci)){
   //     if(maxId){
      if(checkFields()==true){


          // guardar los datos
          db.transaction((tx) => {
            tx.executeSql(
              `INSERT INTO users (name, lastname, document, carCode) VALUES (?, ?, ?, ?)`,
              [name, lastname, ci, matAuto],
              (tx, results) => {
                console.log("results", results);
                // validar resultado
                if (results.rowsAffected > 0) {
                              
                  Alert.alert(
                    "Exito",
                    "Usuario registrado!!!",
                    [
                      {
                        text: "Ok",
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  Alert.alert("Error al registrar usuario");
                }
              }
            );
          });
        //}
        //else{
          
        //  Alert.alert(  
        //    'Resultado de la operación',  
        //    '¡Surgió un problema con la base de datos!' + maxId
        //  ); 
        //}
 
      //}
      //else{
      //  Alert.alert(  
      //    'Resultado de la operación',  
      //    'La CI debe tener un formato de solo números'
      //  ); 
      //}
 
    //}
    //else{
    //  Alert.alert(  
    //   'Resultado de la operación',  
    //    '¡Faltan datos por ingresar!'
    //);  
   // }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        
          <TextInput style={styles.textInput} onChangeText={setName} editable maxLength={40} placeholder="Nombre" />
          <TextInput style={styles.textInput} onChangeText={setLastName} id="inputLastName" editable maxLength={40} placeholder="Apellido" />
          <TextInput style={styles.textInput} onChangeText={setCI} id="inputCI" editable maxLength={8} placeholder="C.I" />
          <TextInput style={styles.textInput} onChangeText={setMatAuto} id="inputMatAuto" editable maxLength={7} placeholder="MAT. Auto" />
          <TouchableOpacity style={[styles.submitButton]} onPress={submitUser}>
            <Text style={styles.text}>Agregar</Text>
          </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  )
}

export default AddUser

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