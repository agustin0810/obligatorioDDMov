import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AddButton = (props) => {
  return (
      <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}, ]} onPress={props.customPress}>
        <View style={styles.view}>
            <Text style={styles.text}>+</Text>
        </View>
      </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        color: 'white',
        padding: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,
        marginBottom: 16
    },
    text: {
        color: 'white',
        fontSize: 20
    },
});