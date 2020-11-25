import React, {useState} from 'react'
import { FlatList, Text, View, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTodo from '../components/addTodo'
import { v4 as uuidv4 } from 'uuid';

export default function TodoList({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);

    const [todos, setTodos] = useState([
        { title: 'Todo 1', id: '1' },
        { title: 'Todo dos', id: '2' },
        { title: 'killme', id: '3' },
      ]);

    const addNewTodo = (todo) => {
      todo.id = uuidv4();
      setTodos((currentTodos) => {
        return [todo, ...currentTodos];
      });
      setModalOpen(false);
    }

    return (
        <View style={globalStyles.container}>
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <Text Text='Add Todo'>Add A Todo</Text>
                        <MaterialCommunityIcons
                        name='close'
                        size={24}
                        style={{...globalStyles.modalToggle, ...globalStyles.modalClose}}
                        onPress={() => setModalOpen(false)}
                        />  
                        <AddTodo addTodo={addNewTodo}/>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <MaterialCommunityIcons
            name='plus'
            size={24}
            style={globalStyles.modalToggle}
            onPress={() => setModalOpen(true)}
          />

          <FlatList
              data={todos}
              keyExtractor={(item) => item.id} 
              renderItem={({ item }) => (
                <Card style={globalStyles.card} onPress={() => navigation.navigate('TodoDetails', item)}>
                    <Card.Content>
                      <Paragraph style={globalStyles.cardContent}>{item.title}</Paragraph>
                    </Card.Content>
                </Card>
              )}
          />
        </View>
    )
}

