import React, { createContext, useState, FunctionComponent } from 'react';
import { View, FlatList, Modal, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Layout, Divider } from '@ui-kitten/components';
import NoteList from './NoteContainer';
import NewNote from './NewNote';
import TodoListsContainer from './TodoListsContainer';
import NewTodoList from './NewTodoList';
import { FooterButtons } from '../../shared/buttons';
import { Notes } from '../../redux/reducers/note';
import { TodoList } from '../../redux/reducers/todos';
import { StoreProps } from '../../redux/store';

type ContainerProps = {
  notes: Notes[];
  todos: TodoList[];
}

type ContextProps = {
  toggleTodoModal: () => void;
  toggleNoteModal: () => void;
}

interface Styles {
  container: ViewStyle;
  titleStyle: TextStyle;
  title: TextStyle;
  addList: ViewStyle;
}

export const NoteContext = createContext<ContextProps>({ toggleTodoModal: () => {}, toggleNoteModal: () => {} });

const Container: FunctionComponent<ContainerProps> = ({ notes, todos }) => {
  const [todoModal, setTodoModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);

  const toggleTodoModal = () => {
    setTodoModal(!todoModal);
  };
  const toggleNoteModal = () => {
    setNoteModal(!noteModal);
  };

  const renderList = (list) => {
    return <TodoListsContainer list={ list } />;
  };

  return (
    <Layout style={ styles.container }>
      <NoteContext.Provider value={{ toggleNoteModal, toggleTodoModal }}>
        <Modal
          animationType='slide'
          visible={ todoModal }
        >
          <NewTodoList closeModal={ () => toggleTodoModal() } />
        </Modal>
        <Modal
          animationType='slide'
          visible={ noteModal }
        >
          <NewNote closeModal={() => toggleNoteModal()} />
        </Modal>
          <Divider/>
          <Text style={ styles.title }>
            Note{' '}
            <Text style={{ fontWeight: '300', color: 'lightgray' }}>Lists</Text>
          </Text>
          <Divider/>
        <View
          style={{
            height: 450,
            flexDirection: 'row',
          }}
          >
          <NoteList notes={ notes } key={ 1 } />
          <FlatList
            keyExtractor={ (_, index) => index.toString() }  
            data={ todos }
            horizontal={ true }
            showsHorizontalScrollIndicator={ false }
            renderItem={ ({ item }) => renderList(item) }
            keyboardShouldPersistTaps='always'
            />
        </View>
        <FooterButtons context={ NoteContext }/>
      </NoteContext.Provider>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    flexDirection: 'row',
    marginTop: 50,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    paddingHorizontal: 20,
  },
  addList: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 'auto'
  },
});

const mapStateToProps = (state: StoreProps) => {
  const { notes, todos } = state;
  return { notes, todos };
};

export default connect(mapStateToProps)(Container);

export type PropsFromRedux = ConnectedProps<typeof Container>
