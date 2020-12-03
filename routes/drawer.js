import React from 'react'
    // imports for Stack Lists
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import VisionStack from './visionStack';
import AboutStack from './aboutStack';
import TodoStack from './todoStack'
import JournalStack from './journalStack';
import VisionList from '../screens/visionScreen'
import TodoList from '../screens/todoScreen'
import JournalList from '../screens/journalScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Visions"
        activeColor="white"
        inactiveColor="#A2AAAD"
        barStyle={{ backgroundColor: '#002C5F' }}
      >
        <Tab.Screen name="Visions" component={VisionList} />
        <Tab.Screen name="Journals" component={JournalList} />
        <Tab.Screen name="Todos" component={TodoList} />
      </Tab.Navigator>
    );
  }

// const RootDrawerNavigator = createDrawerNavigator(
//     {
//         Visions: {
//             screen: VisionStack
//         },
//         Journals: {
//             screen: JournalStack
//         },
//         Todos: {
//             screen: TodoStack
//         },
//         About: {
//             screen: AboutStack
//         }
//     },
//     {
//         headerMode: 'screen'
//     },
//     {
//         drawerType: 'front',
//     }
// )

// export default createAppContainer( RootDrawerNavigator );