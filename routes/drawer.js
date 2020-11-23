import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import VisionStack from './visionStack';
import AboutStack from './aboutStack';
import TodoStack from './todoStack'
import JournalStack from './journalStack';

const RootDrawerNavigator = createDrawerNavigator({
    Visions: {
        screen: VisionStack
    },
    Journals: {
        screen: JournalStack
    },
    Todos: {
        screen: TodoStack
    },
    About: {
        screen: AboutStack
    },
})

export default createAppContainer(RootDrawerNavigator);