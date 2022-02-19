import React, { useState, } from 'react';
import { View, Modal, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import IdeaList from './IdeaList';
import NewIdea from './NewIdea';
import TodoLists from './TodoLists';
import NewTodoList from './NewTodoList';
import { FooterButtons } from '../../shared/buttons';

interface Styles {
  container: ViewStyle;
  titleStyle: TextStyle;
  title: TextStyle;
  addList: ViewStyle;
}

const NoteContent = () => {
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
      <Modal
        animationType='slide'
        visible={ ideaModal }
      >
        <NewIdea closeModal={() => toggleIdeaModal()} />
      </Modal>
      <Modal
        animationType='slide'
        visible={ todoModal }
      >
        <NewTodoList closeModal={ () => toggleTodoModal() } />
      </Modal>
      <View
        style={{
          height: 450,
          flexDirection: 'row',
        }}
      >
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

export default NoteContent;
