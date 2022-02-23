import React, { FC } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import * as yup from 'yup';
import Idea from './Idea';
import { CloseButton } from '../../../shared/buttons';
import { FooterInput } from '../../../shared/inputs';
import { useAppDispatch } from '../../../utils/hooks';
import { windowHeight, windowWidth } from '../../../utils/dimensions';
import { Idea as IdeaType, addIdea } from '../../../redux/reducers/ideas';

type ModalProps = {
  ideas: IdeaType[];
  closeModal: (() => void);
}

interface Styles {
  container: ViewStyle;
  close: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  list:ViewStyle;
}

const ideaSchema = yup.object({
  inputValue: yup.string().required().min(6),
});

const IdeasModal: FC<ModalProps> = ({ ideas, closeModal }) => {
  const ideaCount = ideas.length;
  const dispatch = useAppDispatch();

  const renderIdea = ( item: IdeaType) => {
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
          keyExtractor={ (_, index) => index.toString() }
          renderItem={ ({ item }) => renderIdea(item) }
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

const styles = StyleSheet.create<Styles>({
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
