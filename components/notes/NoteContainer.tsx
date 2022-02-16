import { Card, Layout } from '@ui-kitten/components';
import React, { FunctionComponent, useState } from 'react';
import { Text, Modal, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import NotesModal, { NoteProps } from './NotesModal';

type NoteContainerProps = {
  notes: NoteProps[];
}

interface Styles {
  noteContainer: ViewStyle;
  noteTitle: TextStyle;
  count: TextStyle;
  subtitle: ViewStyle;
}

const NoteContainer: FunctionComponent<NoteContainerProps> = ({ notes }) => {
  const [visible, setVisible] = useState(false);
  const noteCount = Object.keys(notes).length;

  const toggleListModal = () => {
    setVisible(!visible);
  };

  return (
    <Card style={ [styles.noteContainer, { backgroundColor: 'green' }] } onPress={ () => toggleListModal() }>
      <Modal
        animationType='slide'
        visible={ visible }
        onRequestClose={ () => toggleListModal() }
      >
        <NotesModal notes={ notes } closeModal={ () => toggleListModal() }/>
      </Modal>
        <Text style={ styles.noteTitle } numberOfLines={ 1 }>
          List of Notes
        </Text>
        <Layout style={{ alignItems: 'center', bottom: 0, backgroundColor: 'transparent' }}>
          <Text style={ styles.count }>{ noteCount }</Text>
          <Text style={ styles.subtitle }>Notes</Text>
        </Layout>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  noteContainer: {
    padding: 32,
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
    height: 280,
    elevation: 2,
  },
  noteTitle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  count: {
    marginTop: 40,
    fontSize: 48,
    fontWeight: '200',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default NoteContainer;
