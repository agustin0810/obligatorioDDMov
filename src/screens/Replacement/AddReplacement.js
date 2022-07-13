import { StyleSheet, TextInput, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatabaseConnection from "../../database/database-connection";
import SelectDropdown from 'react-native-select-dropdown'
import { useFocusEffect } from '@react-navigation/native';

const db = DatabaseConnection.getConnection();

const AddReplacement = ({ navigation }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [treatmentId, setTreatmentId] = useState(0);
  const [treatments, setTreatments] = useState([]);

  //Listamos los tratamientos para permitir asignar el repuesto
  useFocusEffect(() => {

    db.transaction( (txn) => {
      
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

    });
  });

  //función para hacer el submit desde el botón
  const submitSupply = () =>{
          // guardar los datos
        if(checkFields()==true){
          db.transaction((tx) => {

            tx.executeSql(
              `INSERT INTO replacements (name, amount, treatmentId) VALUES (?, ?, ?)`,
              [name, amount, treatmentId],
              (tx, results) => {
                console.log("results", results);
                // validar resultado
                if (results.rowsAffected > 0) {
                              
                  Alert.alert(
                    "Exito",
                    "Repuesto registrado.",
                    [
                      {
                        text: "Ok",
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  Alert.alert("Error al registrar repuesto");
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
          <TextInput style={styles.textInput} onChangeText={setName} editable maxLength={50} placeholder="Nombre" />
          <TextInput style={styles.textInput} onChangeText={setAmount} editable maxLength={10} placeholder="Cantidad" />
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
          <TouchableOpacity style={[styles.submitButton]} onPress={submitSupply}>
            <Text style={styles.text}>Agregar</Text>
          </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  )
}

export default AddReplacement

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
  },
  dropdown: {
    marginRight: 60,
    marginBottom: 20,
  }
})