import React, { useState, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Modal, Portal, Provider } from 'react-native-paper';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddJournal from '../components/journals/addJournal';
import JournalList from '../components/journals/journalList';
import { globalStyles, coltsGray } from '../styles/global';
import JournalGridContainer from '../components/journals/journalGrid';

const JournalScreen = memo( function Journals( { navigation, state } ) {
    const [ modalOpen, setModalOpen ] = useState( false );
    const [ gridView, setGridView ] = useState(true); 

    const toggleGrid = () => { 
      setGridView( !gridView );
    }; 
  
    return (
         <Provider style={{ flex: 1 }}>
            <Portal>
              <Modal visible={ modalOpen } onDismiss={ () => setModalOpen( false ) } contentContainerStyle={ globalStyles.addJournalContainer }>                     
                          <Text style={ globalStyles.addJournalTitle }>Add A Journal Entry</Text>
                          <AddJournal setModalOpen = { setModalOpen }/>
                          <View style={ globalStyles.closeModalContainer }>
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
            {gridView
                ? <JournalGridContainer
                    state={ state }
                    navigation={ navigation }
                  />
              
                : <JournalList
                    state={ state }
                    navigation={ navigation }
                />
            }
                <View style={ globalStyles.visionAddToggle }>
                    <MaterialCommunityIcons
                    name='plus'
                    size={ 24 }
                    style={ globalStyles.modalToggle }
                    onPress={ () => setModalOpen( true ) }
                    />
                    <MaterialCommunityIcons
                      name='grid'
                      size={ 24 }
                      style={ globalStyles.modalToggle }
                      onPress={ () => toggleGrid() }
                    />
                </View>
        </Provider>            
    )
});

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.journals,
  }
}

export default connect( mapStateToProps )( JournalScreen )
