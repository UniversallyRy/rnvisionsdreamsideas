import { createStackNavigator } from 'react-navigation-stack';
import TodoScreen from '../screens/todoScreen';
import TodoDetails from '../components/todos/todoDetails';
import Header from '../shared/header';
import React from 'react';

const screens = {
    TodoScreen: {
        screen: TodoScreen,
        navigationOptions: ( { navigation } ) => {
            return {
                headerTitle: () => <Header navigation={ navigation } title='Todos'/>   
            }
        }
    },
    TodoDetails: {
        screen: TodoDetails,
        navigationOptions: {
            title: 'TodoDetails',
        }
    }
};

const TodoStack = createStackNavigator( screens, {
    defaultNavigationOptions: {
        headerTintColor: '#002C5F',
        headerStyle: { 
            backgroundColor: '#A2AAAD',
            height: 80,
        }
    }
});


export default TodoStack;