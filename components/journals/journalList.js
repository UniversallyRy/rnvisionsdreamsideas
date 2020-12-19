import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
import { globalStyles, coltsGray, coltsBlue } from '../../styles/global';

const JournalList = ({state, navigation}) => {
    return ( 
            <FlatList
                style={{ paddingTop: 10, backgroundColor: coltsBlue }}
                data={ state }
                keyExtractor={( item, index) => index.toString() }
                renderItem={({ item }) => (
                  <View style={ globalStyles.journalBorder }>
                    <Card style={ globalStyles.journalCard } onPress={ () => navigation.navigate( 'JournalDetails', item ) }>
                      <Card.Content>
                        <Paragraph style={ globalStyles.journalTitle }>{ item.title }</Paragraph>
                        <Paragraph style={ globalStyles.journalText }>{ item.body }</Paragraph>
                        <Paragraph style={ globalStyles.journalDate }>{ item.date}</Paragraph>
                      </Card.Content>
                    </Card>
                      
                    <View style={styles.buttonsContainer}>
                      <Button style={styles.editButton} color={coltsGray} icon="lead-pencil" mode="contained" >Edit</Button>
                      <Button style={styles.deleteButton} color='red' icon="close-outline" mode="contained" onPress={() => removeJournal()}>Delete</Button>
                    </View>
                  </View>
                )}
            />
   
    )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    fontSize: 20,
    marginTop: 4,
},
editButton: {
    flex: .51,
},
deleteButton: {
    flex: .51,
    marginLeft: 2,
},
})

export default JournalList