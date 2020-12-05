import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function FlatButton( { text, onPress }) {
    return (
            <Button icon = 'plus'style={ styles.button } onPress={ onPress } dark={ true } >
                <Text style={ styles.buttonText }> { text } </Text>
            </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf:'center',
        width: 200,
        borderRadius: 2,
        paddingVertical: 24,
        marginBottom: 10,
        borderColor: 'black',
        backgroundColor: '#A2AAAD',
        shadowColor: "black",
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowOpacity: 7.25,
        shadowRadius: 4.84,

        elevation: 5,
    },
    buttonText: {
        color: '#002C5F',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
})
