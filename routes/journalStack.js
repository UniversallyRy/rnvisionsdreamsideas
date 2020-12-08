import { createStackNavigator } from 'react-navigation-stack';
import JournalList from '../screens/journalScreen';
import JournalDetails from '../components/journals/journalDetails';
import Header from '../shared/header';
import React from 'react';

const screens = {
    JournalList: {
        screen: JournalList,
        navigationOptions: ( { navigation } ) => {
            return {
                headerTitle: () => <Header navigation={ navigation } title='Journals'/>   
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
            height: 100,
        }
    }
});


export default JournalStack;