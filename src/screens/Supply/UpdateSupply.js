import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";
import SelectDropdown from 'react-native-select-dropdown'


const db = DatabaseConnection.getConnection();

const UpdateSupply = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [treatmentId, setTreatmentId] = useState(0);
  const [treatments, setTreatments] = useState([]);
  //Recibimos el parámetro de la anterior ventana:
  const {id} = route.params;

  //Rellenamos los campos con los valores del usuario actual
  useEffect(() => {
    db.transaction((txn) => {
      
      txn.executeSql(`SELECT * FROM supplies WHERE id=?`, [id], (tx, results) => {
        // validar resultado
        if (results.rows.length > 0) {
          setName(results.rows.item(0).name)
          setAmount(results.rows.item(0).amount)
          console.log(results.rows.item(0).amount)
        } else {
          Alert.alert(
            "Mensaje",
            "No se encontró el insumo con id: "+id,
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeSupply"),

              },
            ],
            { cancelable: false }
          );
        }
      });
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
    })
  }, []);
  

  const updateC = () =>{
    if(checkFields()==true){
      
    db.transaction((tx) => {

      tx.executeSql(
        "UPDATE supplies SET name = ?, amount = ?, treatmentId= ?",
        [name, amount, treatmentId],
        (tx, results) => {

          if (results.rowsAffected > 0) {
            Alert.alert("Insumo actualizado");
          } else {
            Alert.alert("No se pudo actualizar el insumo");
          }
        }
      );
    });
    
    }
  }
  const checkFields = () =>{
    if(name!='' && amount!=0 && treatmentId!=0){
      if(!isNaN(amount)){
        return true;
      }
      Alert.alert('Debe ingresar una cantidad en números')
      return false
    }
    Alert.alert('Debe ingresar todos los campos y seleccionar tratamiento.')
    return false;
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
                <TextInput style={styles.textInput} value={amount.toString()} onChangeText={setAmount} editable maxLength={40} placeholder="Cantidad" />
                <SelectDropdown buttonStyle={styles.dropdown} defaultButtonText='Seleccione el tratamiento'
                  data={treatments}
                  onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  setTreatmentId(selectedItem.id)
                  return selectedItem.id + ", "+selectedItem.name + ", " +selectedItem.carCode + ", " +selectedItem.costoTratamiento
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.id + ", "+item.name + ", " +item.carCode + ", " +item.costoTratamiento
                  }}
                />
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

export default UpdateSupply

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
  },
  dropdown: {
    marginRight: 92,
    marginBottom: 20,
  }
})