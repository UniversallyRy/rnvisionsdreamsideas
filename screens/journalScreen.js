import React, {useState} from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph, Text, Modal, Portal, Provider, Button, } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTodo from '../components/addTodo'
import lorem from '../shared/lorem'

export default function JournalList({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);

    const [todos, setTodos] = useState([
        { title: 'Journal Entry 1', text: lorem, key: '1' },
        { title: 'Journal Entry 2', text: lorem, key: '2' },
        { title: 'Journal Entry 3', text: lorem, key: '3' },
      ]);

    const addNewTodo = (todo) => {
      todo.key = Math.random().toString();
      setTodos((currentTodos) => {
        return [todos, ...currentTodos];
      });
      setModalOpen(false);
    }

    const containerStyle = {flex: .9, backgroundColor: '#A2AAAD', padding: 20};

  
    return (
        // <View style={{backgroundColor: 'slategrey'}}>

         <Provider >
            <Portal>
              <Modal visible={modalOpen} onDismiss={() => setModalOpen(false)} contentContainerStyle={containerStyle}>
                      
                          <Text style={globalStyles.input}Text='Add Todo'>Add A Journal Entry</Text>
                          <Button
                          icon='close'
                          size={24}
                          style={{...globalStyles.modalToggle, ...globalStyles.modalClose}}
                          onPress={() => setModalOpen(false)}
                          />  
                        <AddTodo addNewTodo={addNewTodo}/>
                    
              </Modal>
            </Portal>
              <View style={{backgroundColor: '#A2AAAD'}}>
              <MaterialCommunityIcons
              name='plus'
              size={24}
              style={globalStyles.modalToggle}
              onPress={() => setModalOpen(true)}
            />
            </View>

          <FlatList
              style={{backgroundColor: '#A2AAAD'}}
              data={todos}
              renderItem={({ item }) => (
                <Card style={globalStyles.card} onPress={() => navigation.navigate('JournalDetails', item)}>
                    <Card.Content>
                      <Paragraph style={globalStyles.titleText}>{item.title}</Paragraph>
                      <Paragraph style={globalStyles.paragraph}>{item.text}</Paragraph>
                    </Card.Content>
                </Card>
              )}
          />
            </Provider>
        // </View>
    )
}