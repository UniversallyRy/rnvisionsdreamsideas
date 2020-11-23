import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Dreams from '../screens/dreamScreen';
import DreamDetails from '../components/dreamDetails'
import Header from '../shared/header';
import React from 'react';

const screens = {
    Dreams: {
        screen: Dreams,
        navigationOptions: ( {navigation} ) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Dreams'/>   
            }
        }
    },
    DreamDetails: {
        screen: DreamDetails,
        navigationOptions: {
            title: 'Dream Details',
            
        }
    }
}

const DreamStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { 
            backgroundColor: '#eee',
            height: 60
        }
    }
});


export default DreamStack;