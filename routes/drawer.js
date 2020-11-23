import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import DreamStack from './dreamStack';
import AboutStack from './aboutStack';
import TodoStack from './todoStack'
import JournalStack from './journalStack';

const RootDrawerNavigator = createDrawerNavigator({
    Dream: {
        screen: DreamStack
    },
    Todos: {
        screen: TodoStack
    },
    Journals: {
        screen: JournalStack
    },
    About: {
        screen: AboutStack
    },
})

export default createAppContainer(RootDrawerNavigator);