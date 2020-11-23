import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function FlatButton( { text, onPress }) {
    return (
            <Button onPress={onPress}dark={true} mode='contained' style={styles.button}>
                <Text style={styles.buttonText}> {text} </Text>
            </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'skyblue',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
})
