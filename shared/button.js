import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function FlatButton( { text, onPress }) {
    return (
            <Button raised theme={{ roundness: 4 }} onPress={ onPress } dark={ true } mode='contained' >
                <Text style={ styles.buttonText }> { text } </Text>
            </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#002C5F',
    },
    buttonText: {
        color: '#A2AAAD',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
})
