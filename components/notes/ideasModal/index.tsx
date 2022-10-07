import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';
import { Layout, List, Text } from '@ui-kitten/components';
import Idea from './Idea';
import { ModalStyles } from './Styles';
import { CloseButton } from '../../../shared/buttons';
import { FooterInput } from '../../../shared/inputs';
import { IdeaType, addIdea } from '../../../redux/reducers/ideas';
//import { useAppDispatch } from '../../../utils/hooks';
import { windowHeight, windowWidth } from '../../../utils/constants';

type ModalProps = {
  ideas: IdeaType[];
  closeModal: (() => void);
}

const ideaSchema = yup.object({
  inputValue: yup.string().required().min(6),
});

const IdeasModal: FC<ModalProps> = ({ ideas, closeModal }): JSX.Element => {

 // const dispatch = useAppDispatch();
  const ideaCount = ideas.length;

  const renderIdea = ( item: IdeaType): JSX.Element => {
    const { inputValue, inputId } = item;
    return <Idea inputValue={ inputValue } inputId={ inputId } />
  };

  return (
    <Layout style={ styles.container } >
      <CloseButton
        style={ styles.close }
        onPress={ closeModal }
      />
      <Layout style={ styles.header }>
        <Text style={ styles.headerText }>There are { ideaCount } Ideas</Text>
      </Layout>
      <Layout>
        <List
          style={ styles.list }
          data={ ideas }
          keyExtractor={ (_, index): string => index.toString() }
          renderItem={ ({ item }): JSX.Element => renderIdea(item) }
        />
      </Layout>
      <FooterInput
        inputName='Idea'
        reducerFunc={ addIdea }
        inputSchema={ ideaSchema }
      />
    </Layout>
  );

};

const styles = StyleSheet.create<ModalStyles>({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  close: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  header: {
    borderBottomColor: 'green',
    paddingTop: 10,
    paddingLeft: 5,
    borderBottomWidth: 3,
  },
  headerText: {
    color: 'black',
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    marginTop: 10,
  },
});

export default IdeasModal;
