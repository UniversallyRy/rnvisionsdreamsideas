import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import IdeaList from './IdeaList';
import NewIdea from './NewIdea';
import TodoLists from './TodoLists';
import NewTodoList from './NewTodoList';
import { FooterButtons } from '../../shared/buttons';
import { HomeStyles } from './Styles';

const NotesContent = (): JSX.Element => {
  const [ideaModal, setIdeaModal] = useState(false);
  const [todoModal, setTodoModal] = useState(false);

  const toggleIdeaModal = (): void => {
    setIdeaModal(!ideaModal);
  };

  const toggleTodoModal = (): void => {
    setTodoModal(!todoModal);
  };

  return (
    <Layout style={ styles.container }>
      <Modal visible={ ideaModal }>
        <NewIdea closeModal={ (): void => toggleIdeaModal() } />
      </Modal>
      <Modal visible={ todoModal }>
        <NewTodoList closeModal={ (): void => toggleTodoModal() } />
      </Modal>
      <View style={ styles.lists }>
        <IdeaList />
        <TodoLists />
      </View>
      <FooterButtons left={ setIdeaModal } right={ setTodoModal } />
    </Layout>
  );
};

const styles = StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  lists: {
    flexDirection: 'row',
  }
});

export default NotesContent;
