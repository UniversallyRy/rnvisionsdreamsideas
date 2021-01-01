import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { globalStyles, coltsGray, coltsBlue } from '../../styles/global';
import { deleteJournal } from '../../redux/actions';


const JournalList = ({ state, navigation, deleteJournal }) => {
    const removeJournal = id => {
      var buttonId = id;
      deleteJournal( buttonId );
    };

    return ( 
            <FlatList
                style={{ paddingTop: 10, backgroundColor: coltsBlue }}
                data={ state }
                keyExtractor={( item, index ) => index.toString() }
                renderItem={({ item }) => (
                  <View style={ globalStyles.journalBorder }>
                    <Card style={ globalStyles.journalCard } onPress={ () => navigation.navigate( 'JournalDetails', item ) }>
                      <Card.Content>
                        <Paragraph style={ globalStyles.journalTitle }>{ item.title }</Paragraph>
                        <View style={ styles.divider } />
                        <Paragraph style={ globalStyles.journalText }>{ item.body }</Paragraph>
                        <View style={ styles.divider } />
                        <Paragraph style={ globalStyles.journalDate }>{ item.date }</Paragraph>
                      </Card.Content>
                    </Card>                      
                    <View style={ styles.buttonsContainer }>
                      <Button style={ styles.editButton } color={ coltsGray } icon="lead-pencil" mode="contained" >Edit</Button>
                      <Button style={ styles.deleteButton } color='red' icon="close-outline" mode="contained" onPress={ () => removeJournal(item.id) }>Delete</Button>
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
  divider: {
    backgroundColor: coltsGray,
    height: 0.3,
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.7,
  },
});

const mapDispatchToProps = { deleteJournal }

export default connect( null, mapDispatchToProps )( JournalList );