import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Layout, Text, Modal } from '@ui-kitten/components';
import Header from '../shared/Header';
import { CloseButton, FooterButtons } from '../shared/Buttons';
import ListView from '../components/journals/ListView';
import GridView from '../components/journals/GridView';
import NewEntry from '../components/journals/NewEntry';
import MonthSelect from '../components/journals/MonthSelect';
import { windowHeight, windowWidth } from '../utils/constants';
import { JournalStyles } from "./styles";
// todo: add swipe to delete
interface ScreenProps {
  navigation: NavigationScreenProp<string, object>;
}

const JournalScreen = ({ navigation }: ScreenProps): JSX.Element => {

  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState(true);

  const toggleView = (): void => {
    setView(!view);
  };

  return (
    <Layout style={styles.screen}>
      <Header name='Journals' />
      <MonthSelect />
      <Modal
        style={{ backgroundColor: 'white', ...styles.screen }}
        visible={modalOpen}
      >
        <Text style={styles.title}>Add A Journal Entry</Text>
        <NewEntry setModalOpen={setModalOpen} />
        <CloseButton
          style={styles.close}
          accessibilityLabel='Closes Modal'
          onPress={() => setModalOpen(false)}
        />
      </Modal>
      {view ? (
        <GridView navigation={navigation} />
      ) : (
        <ListView navigation={navigation} />
      )}
      <FooterButtons left={setModalOpen} right={toggleView} />
    </Layout>
  );

};

const styles = StyleSheet.create<JournalStyles>({
  screen: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    fontFamily: 'roboto-black',
  },
  title: {
    alignSelf: 'center',
    padding: 20,
    fontSize: 18,
    borderRadius: 2,
  },
  close: {
    position: 'absolute',
    left: windowWidth * 0.45,
    bottom: 0
  },
});

export default JournalScreen;
