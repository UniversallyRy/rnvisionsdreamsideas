import React, { useState, memo } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Card, Paragraph, Text, Modal, Portal, Provider } from 'react-native-paper';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddJournal from '../components/journals/addJournal';
import JournalButtons from '../components/journals/journalButtons';
import { globalStyles, coltsGray, coltsBlue } from '../styles/global';

const JournalList = memo( function Journals( { navigation, state } ) {
    const [ modalOpen, setModalOpen ] = useState( false );
  
    return (
         <Provider >
            <Portal>
              <Modal visible={ modalOpen } onDismiss={ () => setModalOpen( false ) } contentContainerStyle={ globalStyles.addJournalContainer }>                     
                          <Text style={ globalStyles.addJournalTitle }>Add A Journal Entry</Text>
                          <AddJournal setModalOpen = {setModalOpen}/>
                          <View style={globalStyles.closeModalContainer}>
                            <MaterialCommunityIcons
                              name='close'
                              size={ 24 }
                                    // rest/spread operator to grab modaltoggle props and adds any new modalcloses props  
                              style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                              onPress={ () => setModalOpen( false ) }
                            />
                          </View>  
                    
              </Modal>
            </Portal>

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
                  <View style={ styles.container }>
                    <JournalButtons item={ item.id }/>
                  </View>
                </View>
              )}
            />
            <View style={{ backgroundColor: coltsBlue }}>
              <MaterialCommunityIcons
              name='plus'
              size={ 24 }
              style={ globalStyles.modalToggle }
              onPress={ () => setModalOpen(true) }
              />
            </View>
        </Provider>            
    )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: coltsGray,
  }
});

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.journals,
  }
}

export default connect( mapStateToProps )( JournalList )
