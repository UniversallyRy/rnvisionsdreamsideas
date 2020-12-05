import React from 'react';
import { globalStyles } from '../styles/global';
import { Button, Text, Card }  from 'react-native-paper';

export default function TodoDetails({ navigation }) {

    const handlePress = () => {
        navigation.goBack();
    };

    return (
            <Card id ={ Math.random() * 92 } style={ globalStyles.tDetailsContainer }>
                <Card style={globalStyles.todoDetails}>
                    <Card.Content>
                        <Text> { navigation.getParam( 'task' ) } </Text>
                        <Button style={globalStyles.tDetailsButton} icon='arrow-left' mode='contained' dark={ true } title={ 'back to home' } onPress={ handlePress }>
                            Go Back
                        </Button>
                    </Card.Content>
                </Card>
            </Card>
    )
}