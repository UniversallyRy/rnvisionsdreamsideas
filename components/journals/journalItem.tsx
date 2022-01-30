import React, { FunctionComponent, useState } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { connect, useDispatch } from "react-redux";
import { ButtonGroup, Card, Divider, Input, Layout, Text } from "@ui-kitten/components";
import { CancelButton, DeleteButton, EditButton, SaveButton } from "../../shared/buttons";
import { deleteJournal, editJournal, editJournalToggle } from "../../redux/reducers/journals";
import { windowHeight, windowWidth } from "../../utils/dimensions";

type JournalListProps = {
  item: {
    title: string
    body: string
    id: string
    date: string;
    isEditing: boolean,
  };
  navigation: NavigationScreenProp<string, object>;
}

interface Styles {
  journalCard: ViewStyle;
  journalTitle: TextStyle;
  journalParagraph: TextStyle;
  journalText: TextStyle;
  journalDate: TextStyle;
}

const JournalItem: FunctionComponent<JournalListProps> = ({ item,  navigation }) => {
  const dispatch = useDispatch();
  const [textTitle, setTitle] = useState(item.title);
  const [textBody, setBody] = useState(item.body);

  const editHandler = (id) => {
    dispatch(editJournal({id: id, title: textTitle , body: textBody, isEditing: false}));
    
  };

  const {title, body, date} = item;
  return (
    <Card 
      style={ styles.journalCard }
      onPress={ () => navigation.navigate("Journal Details", { title, body, date })} 
      accessibilityLabel="Card containing single Journal Entry" 
    >
      <Layout
        style={ styles.journalText }
      >
        {item.isEditing
          ?<Input
              label="Title"
              value={textTitle}
              onChangeText={text => setTitle(text)}
            />
          :<Text style={ styles.journalTitle }>
            { item.title }
            </Text>
        }
        <Divider />
        {item.isEditing
          ?<Input
            label={'Body'}
            value={textBody}
            multiline={true}
            onChangeText={text => setBody(text)}
          />
          :<Text style={ styles.journalParagraph }>
            { item.body }
          </Text>
        }
        <Divider />
      </Layout>
      {item.isEditing 
        ? null
        :<Text style={ styles.journalDate }>
          { item.date }
        </Text>
      }
        {item.isEditing 
          ?<ButtonGroup>
            <SaveButton onPress={() => editHandler(item.id)}/>
            <CancelButton onPress={() => dispatch(editJournalToggle({id: item.id}))}/>
          </ButtonGroup>
          :<ButtonGroup>
            <EditButton onPress={() => dispatch(editJournalToggle({id: item.id}))}/>
            <DeleteButton onPress={ () => dispatch(deleteJournal({ id: item.id })) }/>
          </ButtonGroup>
        }
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  journalCard: {
    margin: 5,
    borderRadius: 3,
    width: windowWidth * 0.95,
    height: windowHeight * 0.35,
    elevation: 2,
  },
  journalText: {
    alignSelf: "center",
    width: windowWidth * 0.92,
  },
  journalTitle: {
    fontFamily: "roboto-black",
    fontSize: 20,
    marginBottom: 10,
  },
  journalParagraph: {
    fontFamily: "roboto-regular",
    fontSize: 12,
    marginBottom: 10,
  },
  journalDate: {
    fontFamily: "roboto-italic",
    fontSize: 10,
    margin: 5,
  },
});



const mapStateToProps = (state:any) => {
  const { journals } = state
  return {
    journals: journals.journals,
  };
};

export default connect(mapStateToProps)(JournalItem);
