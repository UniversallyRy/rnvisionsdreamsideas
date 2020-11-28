import { createStackNavigator } from 'react-navigation-stack';
import About from '../screens/about'
import Header from '../shared/header';
import React from 'react';

const screens = {
    About: {
        screen: About,
        navigationOptions: ( { navigation } ) => {
            return {
                headerTitle: () => <Header navigation={ navigation } title='About'/>,   
            }
        }
    },
}

const AboutStack = createStackNavigator( screens, {
    defaultNavigationOptions: {
        headerTintColor: '#002C5F',
        headerStyle: { 
            backgroundColor: '#A2AAAD',
            height: 80,
        }
    }
});


export default AboutStack;