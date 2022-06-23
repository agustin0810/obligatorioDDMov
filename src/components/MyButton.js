import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MyButton = (props) => {
  return (
      <TouchableOpacity style={[styles.button, {backgroundColor: props.btnColor}, {marginTop: props.margin}]} onPress={props.customPress}>
        <View style={styles.view}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default MyButton

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
        borderRadius: 5
    },
    text: {
        color: 'white',
    },
});