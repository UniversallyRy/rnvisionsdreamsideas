import React, { useState } from 'react';
import { globalStyles } from '../styles/global';
import { Button, Text, Card }  from 'react-native-paper';

export default function JournalDetails({ navigation }) {

    const handlePress = () => {
        navigation.goBack();
    }

    return (
        <Card style={{backgroundColor:'slategrey', flex:1}} id ={Math.random() * 92}>
            <Card style={globalStyles.card}>
                <Text style={globalStyles.titleText}> {navigation.getParam('title', 'text')} </Text>
                <Text style={globalStyles.paragraph}> {navigation.getParam('text')} </Text>
                <Button icon='arrow-left' mode='contained' dark={true} title={'back to home'} onPress={handlePress}>
                    Go Back
                </Button>
            </Card>
        </Card>
    )
}