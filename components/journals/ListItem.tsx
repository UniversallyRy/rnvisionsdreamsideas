import React, { FC, useState } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { ButtonGroup, Card, Divider, Input, Layout, Text } from '@ui-kitten/components';
import { CancelButton, DeleteButton, EditButton, SaveButton } from '../../shared/buttons';
import { useAppDispatch } from '../../utils/hooks';
import { windowHeight, windowWidth } from '../../utils/constants';
import { JournalEntry, deleteJournal, editJournal, editJournalToggle } from '../../redux/reducers/journals';

type ItemProps = {
  item: JournalEntry;
  navigation: NavigationScreenProp<string, object>;
}

interface Styles {
  container: ViewStyle;
  textContainer: ViewStyle;
  textTitle: TextStyle;
  textBody: TextStyle;
  textDate: TextStyle;
}

const ListItem: FC<ItemProps> = ({ item,  navigation }) => {
  const { id, title, body, date, isEditing } = item;
  const [textTitle, setTitle] = useState(title);
  const [textBody, setBody] = useState(body);
  const dispatch = useAppDispatch();

  const saveHandler = (id: string) => {
    dispatch(editJournal({ id: id, title: textTitle, body: textBody, isEditing: false }));
  };

  return (
    <Card 
      style={ styles.container }
      onPress={ () => navigation.navigate('Journal Details', { title, body, date })} 
      accessibilityLabel='Card containing single Journal Entry' 
    >
      <Layout style={ styles.textContainer }>
        {isEditing
          ?<Input
              label='Title'
              value={ textTitle }
              onChangeText={ text => setTitle(text) }
            />
          :<Text style={ styles.textTitle }>
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
          :<Text style={ styles.textBody }>
            { body }
          </Text>
        }
        <Divider />
      </Layout>
      {isEditing 
        ? null
        :<Text style={ styles.textDate }>
          { date }
        </Text>
      }
        {isEditing 
          ?<ButtonGroup>
            <SaveButton onPress={ () => saveHandler(id) }/>
            <CancelButton onPress={ () => dispatch(editJournalToggle({ id })) }/>
          </ButtonGroup>
          :<ButtonGroup>
            <EditButton onPress={ () => dispatch(editJournalToggle({ id })) }/>
            <DeleteButton onPress={ () => dispatch(deleteJournal({ id })) }/>
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
  textContainer: {
    alignSelf: 'center',
    width: windowWidth * 0.92,
  },
  textTitle: {
    fontFamily: 'roboto-black',
    fontSize: 20,
    marginBottom: 10,
  },
  textBody: {
    fontFamily: 'roboto-regular',
    fontSize: 12,
    marginBottom: 10,
  },
  textDate: {
    fontFamily: 'roboto-italic',
    fontSize: 10,
    margin: 5,
  },
});

export default ListItem;