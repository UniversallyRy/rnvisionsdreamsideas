import { createStackNavigator } from 'react-navigation-stack';
import TodoList from '../screens/todoScreen'
import TodoDetails from '../components/todoDetails'
import Header from '../shared/header';
import React from 'react';

const screens = {
    TodoList: {
        screen: TodoList,
        navigationOptions: ( {navigation} ) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Todos'/>   
            }
        }
    },
    TodoDetails: {
        screen: TodoDetails,
        navigationOptions: {
            title: 'Todo Details',
        }
    }
}

const TodoStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'skyblue',
        headerStyle: { 
            backgroundColor: '#eee',
            height: 60
        }
    }
});


export default TodoStack;