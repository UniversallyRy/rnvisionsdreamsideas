import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import IdeaList from './IdeaList';
import NewIdea from './NewIdea';
import TodoLists from './TodoLists';
import NewTodoList from './NewTodoList';
import { FooterButtons } from '../../shared/buttons';

interface Styles {
  container: ViewStyle;
  lists: ViewStyle;
}

const NotesContent = () => {
  const [ideaModal, setIdeaModal] = useState(false);
  const [todoModal, setTodoModal] = useState(false);

  const toggleIdeaModal = () => {
    setIdeaModal(!ideaModal);
  };

  const toggleTodoModal = () => {
    setTodoModal(!todoModal);
  };

  return (
    <Layout style={ styles.container }>
      <Modal visible={ ideaModal }>
        <NewIdea closeModal={() => toggleIdeaModal()} />
      </Modal>
      <Modal visible={ todoModal }>
        <NewTodoList closeModal={ () => toggleTodoModal() } />
      </Modal>
      <View style={ styles.lists }>
        <IdeaList />
        <TodoLists />
      </View>
      <FooterButtons left={ setIdeaModal } right={ setTodoModal } />
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lists: {
    flexDirection: 'row',
    height: 450,
  }
});

export default NotesContent;
