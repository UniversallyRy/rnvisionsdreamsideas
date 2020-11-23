import React, { useState } from 'react';
import { globalStyles } from '../styles/global';
import { Button, Text, Card }  from 'react-native-paper';

export default function JournalDetails({ navigation }) {

    const handlePress = () => {
        navigation.goBack();
    }

    return (
        <Card id ={Math.random() * 92} style={globalStyles.cardContent}>
            <Card.Content>
                <Text> {navigation.getParam('title')} </Text>
                <Button icon='arrow-left' mode='contained' dark={true} title={'back to home'} onPress={handlePress}>
                    Go Back
                </Button>
            </Card.Content>
        </Card>
    )
}