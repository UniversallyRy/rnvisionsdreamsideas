import React from 'react';
import { globalStyles } from '../styles/global';
import { Button, Text, Card }  from 'react-native-paper';

export default function JournalDetails({ navigation }) {

    const handlePress = () => {
        navigation.goBack();
    }

    return (
        <Card style={globalStyles.cardContent} id ={ Math.random() * 92 }>
            <Card style={ globalStyles.card }>
                <Text style={ globalStyles.titleText }> { navigation.getParam( 'title', 'body' ) } </Text>
                <Text style={ globalStyles.paragraph }> { navigation.getParam( 'body' ) } </Text>
                <Button style={globalStyles.backButton} icon='arrow-left' mode='contained' dark={ true } title={ 'back to home' } onPress={ handlePress }>
                    Go Back
                </Button>
            </Card>
        </Card>
    )
}