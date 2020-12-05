import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodo } from '../../redux/actions';
import { globalStyles } from '../../styles/global';

export function DeleteTodo({ deleteTodo, item, toggleTodo }) {
    const removeTodo = () => {
        // save item.id from props to buttonId
        var buttonId = item.id;
        //calls redux action on stored todoss
        deleteTodo(buttonId);
    };

    const togTodo = () => {
        var buttonId = item.id;
        toggleTodo(buttonId, item);
        console.log(item);
    };

    return (
        <View style={globalStyles.todoButtons}>
            <Button style={styles.editButton} color="#A2AAAD" icon="lead-pencil" mode="contained" onPress={()=> togTodo()}>
                <Text>Edit</Text>
            </Button>
            <Button style={styles.deleteButton} color="red" icon="close-outline" mode="contained" onPress={() => removeTodo()}>
                <Text>Delete</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    editButton: {
        margin: 5
    },
    deleteButton: {
        margin: 5,
    }
})

const mapStateToProps = ( state, ownProps ) => {
    return {
      state: state.todos,
    }
  }
  
  const mapDispatchToProps = { deleteTodo, toggleTodo }


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( DeleteTodo )