import React from 'react';
import { globalStyles } from '../../styles/global';
import { Button, Text, Card }  from 'react-native-paper';

export default function JournalDetails({ navigation }) {

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <Card style={globalStyles.jDetailsContainer} id ={ Math.random() * 92 }>
            <Card style={ globalStyles.jDetailsCard }>
                <Text style={ globalStyles.jDetailsTitle }> { navigation.getParam( 'title', 'body' ) } </Text>
                <Text style={ globalStyles.jDetailsText }> { navigation.getParam( 'body' ) } </Text>
                <Button style={globalStyles.jDetailsButton} icon='arrow-left' mode='contained' dark={ true } title={ 'back to home' } onPress={ handlePress }>
                    Go Back
                </Button>
            </Card>
        </Card>
    )
}