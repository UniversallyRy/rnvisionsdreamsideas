import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import { Card, Paragraph, Text, Modal, Portal, Provider,Button as PaperButton} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddJournal from '../components/addJournal';
import { connect } from 'react-redux';
import JournalButtons from '../components/journalButtons';

export function JournalList({ navigation, state }) {
    const [ modalOpen, setModalOpen ] = useState( false );
  
    return (
         <Provider >
            <Portal>
              <Modal visible={ modalOpen } onDismiss={ () => setModalOpen( false ) } contentContainerStyle={ globalStyles.addJournalContainer }>
                      
                          <Text style={ globalStyles.addJournalTitle }>Add A Journal Entry</Text>
                          <PaperButton
                          icon='close'
                          size={ 24 }
                          style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                          onPress={ () => setModalOpen( false ) }
                          />  
                        <AddJournal/>
                    
              </Modal>
            </Portal>
              <View style={{ backgroundColor: '#A2AAAD' }}>
              <MaterialCommunityIcons
              name='plus'
              size={ 24 }
              style={ globalStyles.modalToggle }
              onPress={ () => setModalOpen(true) }
            />
            </View>

          <FlatList
              style={{ backgroundColor: '#A2AAAD' }}
              data={ state }
              keyExtractor={( item, index) => index.toString() }
              renderItem={({ item }) => (
                <View>
                  <Card style={ globalStyles.journalCard } onPress={ () => navigation.navigate( 'JournalDetails', item ) }>
                    <Card.Content>
                      <Paragraph style={ globalStyles.journalTitle }>{ item.title }</Paragraph>
                      <Paragraph style={ globalStyles.journalText }>{ item.body }</Paragraph>
                    </Card.Content>
                  </Card>
                  <View style={styles.container}>
                        <JournalButtons item={item.id}/>
                  </View>
                </View>
              )}
          />
            </Provider>            
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A2AAAD',
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.journals,
  }
}

export default connect(mapStateToProps)(JournalList)
