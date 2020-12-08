import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Visions from '../screens/visionScreen';
import VisionDetails from '../components/visions/visionDetails';
import Header from '../shared/header';
import React from 'react';

const screens = {
    Visions: {
        screen: Visions,
        navigationOptions: ( { navigation } ) => {
            return {
                headerTitle: () => <Header navigation={ navigation } title='Visions'/>   
            }
        }
    },
    VisionDetails: {
        screen: VisionDetails,
        navigationOptions: {
            title: 'Vision Details',
            
        }
    }
}

const VisionStack = createStackNavigator( screens, {
    defaultNavigationOptions: {
        headerTintColor: '#002C5F',
        headerStyle: { 
            backgroundColor: '#A2AAAD',
            height: 100,
        }
    }
} );


export default VisionStack;