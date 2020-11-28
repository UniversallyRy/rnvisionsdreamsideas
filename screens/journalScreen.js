import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph, Text, Modal, Portal, Provider, Button, } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddJournal from '../components/addJournal'
import lorem from '../shared/lorem'

export default function JournalList({ navigation }) {
    const [ modalOpen, setModalOpen ] = useState( false );

    const [ journals, setJournals ] = useState([
        { title: 'Journal Entry 1', body: lorem, key: '1' },
        { title: 'Journal Entry 3', body: lorem, key: '3' },
        { title: 'Journal Entry 2', body: lorem, key: '2' },
      ]);

    const addNewJournal = ( journal ) => {
      journal.key = Math.random().toString();
      setJournals(( currentJournals ) => {
        return [ journal, ...currentJournals ];
      });
      setModalOpen( false );
    }

    const containerStyle ={ flex: .9, backgroundColor: '#A2AAAD', padding: 20 };

  
    return (
         <Provider >
            <Portal>
              <Modal visible={ modalOpen } onDismiss={ () => setModalOpen( false ) } contentContainerStyle={ containerStyle }>
                      
                          <Text style={ globalStyles.input }Text='Add Journal'>Add A Journal Entry</Text>
                          <Button
                          icon='close'
                          size={ 24 }
                          style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                          onPress={ () => setModalOpen( false ) }
                          />  
                        <AddJournal addJournal={ addNewJournal }/>
                    
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
              data={ journals }
              renderItem={({ item }) => (
                <Card style={ globalStyles.card } onPress={ () => navigation.navigate( 'JournalDetails', item ) }>
                    <Card.Content>
                      <Paragraph style={ globalStyles.titleText }>{ item.title }</Paragraph>
                      <Paragraph style={ globalStyles.paragraph }>{ item.body }</Paragraph>
                    </Card.Content>
                </Card>
              )}
          />
            </Provider>
    )
}