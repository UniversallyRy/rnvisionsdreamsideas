import React, {useState} from 'react'
import { FlatList, StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTodo from '../components/addTodo'

export default function JournalList({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);

    const [todos, setTodos] = useState([
        { title: 'Journal Entry 1', text:'This is Body 1', key: '1' },
        { title: 'Journal Entry 2', text:'This is Body 2', key: '2' },
        { title: 'Journal Entry 3', text:'This is Body 3', key: '3' },
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
                        <Text stlye={globalStyles.input}Text='Add Todo'>Add A Journal Entry</Text>
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
                <Card style={globalStyles.card} onPress={() => navigation.navigate('JournalDetails', item)}>
                    <Card.Content>
                      <Paragraph style={globalStyles.titleText}>{item.title}</Paragraph>
                      <Paragraph style={globalStyles.paragraph}>{item.text}</Paragraph>
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
