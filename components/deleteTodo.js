import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux';
import { deleteTodo } from '../redux/actions';

export function DeleteTodo({ deleteTodo, item }) {
    const removeTodo = () => {
        // save item.id from props to buttonId
        var buttonId = item
        //calls redux action on stored todoss
        deleteTodo(buttonId);
    }
    return (
        <View>
            <Button onPress={() => removeTodo()}>
                <Text>Delete</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({

})

const mapStateToProps = ( state, ownProps ) => {
    return {
      state: state.todos,
    }
  }
  
  const mapDispatchToProps = { deleteTodo }


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( DeleteTodo )