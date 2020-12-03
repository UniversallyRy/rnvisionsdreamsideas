import React from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../styles/global'
import { Card, Paragraph,  Modal, Provider, Portal, Text, Button } from 'react-native-paper';
import AddTodo from '../components/addTodo'
import DeleteTodo from '../components/deleteTodo'
import EditTodo from '../components/editTodo'
import { connect } from 'react-redux';
import { getTodosByVisibilityFilter } from "../redux/reducers/selectors";

export  function TodoList({ navigation, state }) {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {alignSelf: 'center', width: 500, height: 500, backgroundColor: '#A2AAAD', padding: 20};

    return (
      <Provider>
          <View style={ globalStyles.container }>            
            <View style={ globalStyles.todoFormContainer }>
              <AddTodo />
            </View>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
                <EditTodo item={state[2]}/>
              </Modal>
            </Portal> 
            <FlatList
                style={globalStyles.todoList}
                data={ state } 
                keyExtractor={( item, index) => index.toString() }
                renderItem={({ item }) => (
                  <Card style={ globalStyles.card } onPress={ () => navigation.navigate( 'TodoDetails', item ) }>
                      <Card.Content>
                        <Paragraph>{ item.task }</Paragraph>
                      </Card.Content>
                        <DeleteTodo showMod={showModal} item={item}/>
                  </Card>
                )}
              />
              <Button onPress={showModal}>Click</Button>
          </View>
      </Provider>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.todos,
  }
}

export default connect(mapStateToProps)(TodoList)