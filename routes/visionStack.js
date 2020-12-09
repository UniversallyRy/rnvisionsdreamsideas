import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Visions from '../screens/visionScreen';
import VisionDetails from '../components/visions/visionDetails';
import Header from '../shared/header';
import { coltsGray, coltsBlue } from '../styles/global';

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
        headerTintColor: coltsBlue,
        headerStyle: { 
            backgroundColor: coltsGray,
            height: 100,
        }
    }
} );


export default VisionStack;