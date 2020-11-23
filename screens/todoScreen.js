import React, {useState} from 'react'
import { FlatList, StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTodo from '../components/addTodo'

export default function TodoList({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);

    const [todos, setTodos] = useState([
        { title: 'Todo 1', key: '1' },
        { title: 'Todo dos', key: '2' },
        { title: 'killme', key: '3' },
      ]);

    const addNewTodo = (todo) => {
      todo.key = Math.random().toString();
      setTodos((currentTodos) => {
        return [todos, ...currentTodos];
      });
      setModalOpen(false);
    }

    return (
        <View>
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <Text Text='Add Todo'>Add A Todo</Text>
                        <MaterialCommunityIcons
                        name='close'
                        size={24}
                        style={{...styles.modalToggle, ...styles.modalClose}}
                        onPress={() => setModalOpen(false)}
                        />  
                        <AddTodo addNewTodo={addNewTodo}/>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <MaterialCommunityIcons
            name='plus'
            size={24}
            style={styles.modalToggle}
            onPress={() => setModalOpen(true)}
          />

          <FlatList
              data={todos}
              renderItem={({ item }) => (
                <Card style={globalStyles.card} onPress={() => navigation.navigate('TodoDetails', item)}>
                    <Card.Content>
                      <Paragraph style={styles.cardContent}>{item.title}</Paragraph>
                    </Card.Content>
                </Card>
              )}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    modalToggle: {
      marginBottom: 10,   
      borderWidth: 1,
      borderColor: '#f2f2f2',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'center',
    },
    modalClose: {
      marginTop: 25,
      marginBottom: 0,
    },
    modalContent: {
      flex: 1,
      backgroundColor: 'darkgrey'
    }
  })
