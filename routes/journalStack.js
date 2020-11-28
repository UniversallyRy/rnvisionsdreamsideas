import { createStackNavigator } from 'react-navigation-stack';
import JournalList from '../screens/journalScreen'
import JournalDetails from '../components/journalDetails'
import Header from '../shared/header';
import React from 'react';

const screens = {
    JournalList: {
        screen: JournalList,
        navigationOptions: ( { navigation } ) => {
            return {
                headerTitle: () => <Header navigation={ navigation } title='Journal'/>   
            }
        }
    },
    JournalDetails: {
        screen: JournalDetails,
        navigationOptions: {
            title: 'Journal Details',
            
        }
    }
}

const JournalStack = createStackNavigator( screens, {
    defaultNavigationOptions: {
        headerTintColor: '#002C5F',
        headerStyle: { 
            backgroundColor: '#A2AAAD',
            height: 80,
        }
    }
});


export default JournalStack;