import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import JournalList from '../screens/journalScreen';
import JournalDetails from '../components/journals/journalDetails';
import Header from '../shared/header';
import { coltsGray, coltsBlue } from '../styles/global';

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
        headerTintColor: coltsBlue,
        headerStyle: { 
            backgroundColor: coltsGray,
            height: 100,
        }
    }
});


export default JournalStack;