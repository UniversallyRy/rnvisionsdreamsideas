import React, { useEffect } from 'react'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout, Text } from '@ui-kitten/components'
import { CloseButton } from '../../../shared/buttons'

interface Styles {
    close: ViewStyle;
    header: TextStyle;
    title: TextStyle;
    taskCount: ViewStyle;
}
const Header = ({ list, completedList, closeModal }) => {
    
    const { name, todos, color } = list;
    const completedCount = todos.filter((todo:any) => todo.completed).length;
    const taskCount = todos.length;
  
    useEffect(() => {
      const init = () => {
        let newNum = taskCount - completedCount
        completedList(newNum, completedCount);
      }
      return () => {
        init();
      }
    }, [todos]);

    return (
        <>
            <CloseButton
                style={ styles.close }
                onPress={ closeModal }
            />
            <Layout
                style={[
                styles.header,
                { borderBottomColor: color },
                ]}
            >
                <Text style={ styles.title }>{ name }</Text>
                <Text style={ styles.taskCount }>
                Completed { completedCount } of { taskCount } tasks
                </Text>
            </Layout>
        </>
  );
};

const styles = StyleSheet.create<Styles>({
    close: {
      position: 'absolute', 
      zIndex: 1, 
      top: 0, 
      right: 1, 
    },
    header: {
      justifyContent: 'flex-end',
      marginLeft: 10,
      borderBottomWidth: 4,
    },
    title: {
      fontSize: 30,
      fontWeight: '800',
      margin: 3,
    },
    taskCount: {
      fontSize: 12,
      marginTop: 5,
      marginLeft: 20,
    }
});

export default Header;
