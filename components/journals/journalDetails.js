import React from 'react';
import { Button, Text, Card }  from 'react-native-paper';
import { View, StyleSheet }  from 'react-native';
import { globalStyles, coltsGray, windowWidth } from '../../styles/global';

export default function JournalDetails({ navigation }) {

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <Card style={globalStyles.jDetailsContainer} id ={ Math.random() * 92 }>
            <Card style={ globalStyles.jDetailsCard }>
                <Text style={ globalStyles.jDetailsTitle }> { navigation.getParam( 'title' ) } </Text>
                <View style={ styles.divider } />
                <Text style={ globalStyles.jDetailsText }> { navigation.getParam( 'body' ) } </Text>
                <View style={ styles.divider } />                
                <Text style={ globalStyles.jDetailsDate }> { navigation.getParam( 'date' ) } </Text>
                <Button style={globalStyles.jDetailsButton} icon='arrow-left' mode='contained' dark={ true } title={ 'back to home' } onPress={ handlePress }>
                    Go Back
                </Button>
            </Card>
        </Card>
    )
}

const styles = StyleSheet.create({
    divider: {
      backgroundColor: coltsGray,
      alignSelf: 'center',
      height: 0.3,
      width: windowWidth * 0.98,
      marginTop: 10,
      marginBottom: 10,
      opacity: 0.7,
    },
  });  