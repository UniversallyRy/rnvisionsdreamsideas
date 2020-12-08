import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import VisionStack from './visionStack';
import AboutStack from './aboutStack';
import TodoStack from './todoStack';
import JournalStack from './journalStack';

const RootDrawerNavigator = createDrawerNavigator(
    {
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
        }
    },
    {
        headerMode: 'screen',
        drawerType: 'slide',
        drawerBackgroundColor: '#A2AAAD',
        contentOptions: {
            // tab container styling
            activeTintColor: '#002C5F',
            inactiveTintColor: 'black',
            itemsContainerStyle: {
              marginVertical: 1,
            },
            //tab titles styling
            itemStyle: {
                marginHorizontal: 1,
                marginVertical: 50,
                alignSelf: 'center',
              },
          },
    }
);

export default createAppContainer( RootDrawerNavigator );