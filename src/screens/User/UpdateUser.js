import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [ci, setCI] = useState(0);
  const [matAuto, setMatAuto] = useState('');
  //Recibimos el parámetro de la anterior ventana:
  const {userId} = route.params;

  //Rellenamos los campos con los valores del usuario actual
  useEffect(() => {
    db.transaction((txn) => {
      
      txn.executeSql(`SELECT * FROM users WHERE id=?`, [userId], (tx, results) => {
        // validar resultado
        if (results.rows.length > 0) {
          setName(results.rows.item(0).name)
          setLastName(results.rows.item(0).lastname)
          setCI(results.rows.item(0).document)
          setMatAuto(results.rows.item(0).carCode)
        } else {
          Alert.alert(
            "Mensaje",
            "No se encontró el usuario con ID: "+userId,
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeUser"),

              },
            ],
            { cancelable: false }
          );
        }
      });
    })
  }, []);
  

  const updateU = () =>{
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET name = ?, lastname = ?, document= ?, carCode= ? WHERE id = ?",
        [name, lastname, ci, matAuto, userId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Usuario actualizado");
          } else {
            Alert.alert("No se pudo actualizar el usuario");
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
                <TextInput style={styles.textInput} value={lastname} onChangeText={setLastName} id="inputLastName" editable maxLength={40} placeholder="Apellido" />
                <TextInput style={styles.textInput} value={ci.toString()} onChangeText={setCI} id="inputCI" editable maxLength={8} placeholder="C.I" />
                <TextInput style={styles.textInput} value={matAuto} onChangeText={setMatAuto} id="inputMatAuto" editable maxLength={7} placeholder="MAT. Auto" />
                <TouchableOpacity style={[styles.submitButton]} onPress={updateU}>
                  <Text style={styles.text}>Modificar</Text>
                </TouchableOpacity>

              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
  </SafeAreaView>
  )
}

export default UpdateUser

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