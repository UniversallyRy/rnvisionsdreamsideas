import React, { useState, memo } from 'react';
import { View } from 'react-native';
import { Text, Modal, Portal, Provider } from 'react-native-paper';
import { connect } from 'react-redux';
import AddJournalModal from '../components/journals/addJournalModal';
import JournalList from '../components/journals/journalList';
import { globalStyles } from '../styles/global';
import JournalGridContainer from '../components/journals/journalGrid';
import Icon from '../shared/icon';

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
                          <AddJournalModal setModalOpen = { setModalOpen }/>
                          <View style={ globalStyles.closeModalContainer }>
                            <Icon
                              item='close'
                              style={{ ...globalStyles.modalClose }}
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
                    <Icon
                    item='plus'
                    onPress={ () => setModalOpen( true ) }
                    />
                    <Icon
                      item='grid'
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
