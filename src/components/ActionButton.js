import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ActionButton = (props) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, {backgroundColor: props.btnColor}, {marginTop: props.margin}]} onPress={props.customPress}>
        <View style={styles.view}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ActionButton

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
        margin: 20,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5
    },
    text: {
        color: 'white',
    },
})