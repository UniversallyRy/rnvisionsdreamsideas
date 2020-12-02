import React, { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph, Text, Modal, Portal, Provider,Button as PaperButton} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddJournal from '../components/addJournal'
import { connect } from 'react-redux';
import JournalButtons from '../components/journalButtons'

export function JournalList({ navigation, state }) {
    const [ modalOpen, setModalOpen ] = useState( false );

    const containerStyle ={ flex: .9, backgroundColor: '#A2AAAD', padding: 20 };

  
    return (
         <Provider >
            <Portal>
              <Modal visible={ modalOpen } onDismiss={ () => setModalOpen( false ) } contentContainerStyle={ containerStyle }>
                      
                          <Text style={ globalStyles.input }Text='Add Journal'>Add A Journal Entry</Text>
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
                <Card style={ globalStyles.card } onPress={ () => navigation.navigate( 'JournalDetails', item ) }>
                    <Card.Content>
                      <Paragraph style={ globalStyles.titleText }>{ item.title }</Paragraph>
                      <Paragraph style={ globalStyles.paragraph }>{ item.body }</Paragraph>
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
  },
  buttonContainer: {
    fontSize: 20,
    // backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    marginLeft: 30,
    marginRight: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.journals,
  }
}

export default connect(mapStateToProps)(JournalList)
