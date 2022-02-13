import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { ButtonGroup, Card, Divider, Input, Layout, Text } from '@ui-kitten/components';
import { CancelButton, DeleteButton, EditButton, SaveButton } from '../../shared/buttons';
import { deleteJournal, editJournal, editJournalToggle } from '../../redux/reducers/journals';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/dimensions';

export type Item = {
    id: string;
    title: string;
    body: string;
    date: string;
    isEditing: boolean,
}

type JournalItemProps = {
  item: Item;
  navigation: NavigationScreenProp<string, object>;
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  paragraph: TextStyle;
  text: TextStyle;
  date: TextStyle;
}

const JournalListItem: FunctionComponent<JournalItemProps> = ({ item,  navigation }) => {
  const { id, title, body, date, isEditing } = item;
  const [textTitle, setTitle] = useState(title);
  const [textBody, setBody] = useState(body);
  const dispatch = useAppDispatch();

  const editHandler = (id) => {
    dispatch(editJournal({ id: id, title: textTitle, body: textBody, isEditing: false }));
  };

  return (
    <Card 
      style={ styles.container }
      onPress={ () => navigation.navigate('Journal Details', { title, body, date })} 
      accessibilityLabel='Card containing single Journal Entry' 
    >
      <Layout style={ styles.text }>
        {isEditing
          ?<Input
              label='Title'
              value={ textTitle }
              onChangeText={ text => setTitle(text) }
            />
          :<Text style={ styles.title }>
            { title }
           </Text>
        }
        <Divider />
        {isEditing
          ?<Input
              label='Body'
              value={ textBody }
              multiline={ true }
              onChangeText={ text => setBody(text) }
          />
          :<Text style={ styles.paragraph }>
            { body }
          </Text>
        }
        <Divider />
      </Layout>
      {isEditing 
        ? null
        :<Text style={ styles.date }>
          { date }
        </Text>
      }
        {isEditing 
          ?<ButtonGroup>
            <SaveButton onPress={ () => editHandler(id) }/>
            <CancelButton onPress={ () => dispatch(editJournalToggle({ id: id })) }/>
          </ButtonGroup>
          :<ButtonGroup>
            <EditButton onPress={ () => dispatch(editJournalToggle({ id: id })) }/>
            <DeleteButton onPress={ () => dispatch(deleteJournal({ id: id })) }/>
          </ButtonGroup>
        }
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    margin: 5,
    borderRadius: 3,
    width: windowWidth * 0.95,
    height: windowHeight * 0.35,
    elevation: 2,
  },
  text: {
    alignSelf: 'center',
    width: windowWidth * 0.92,
  },
  title: {
    fontFamily: 'roboto-black',
    fontSize: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontFamily: 'roboto-regular',
    fontSize: 12,
    marginBottom: 10,
  },
  date: {
    fontFamily: 'roboto-italic',
    fontSize: 10,
    margin: 5,
  },
});



export default JournalListItem;
