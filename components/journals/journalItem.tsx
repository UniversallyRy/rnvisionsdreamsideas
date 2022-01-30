import React, { FunctionComponent, useState } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { connect, useDispatch } from "react-redux";
import { Card, Input, Layout, Text } from "@ui-kitten/components";
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
  buttonsContainer: ViewStyle;
  divider: ViewStyle;
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
    <Layout>
      <Card accessibilityLabel="Card containing single Journal Entry" onPress={ () => navigation.navigate("Journal Details", { title, body, date })} style={ styles.journalCard }>
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
          <Text style={ styles.divider } />
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
          <Text style={ styles.divider } />
        </Layout>
        {item.isEditing 
          ? null
          :<Text style={ styles.journalDate }>
            { item.date }
          </Text>
        }
        <Layout style={ styles.buttonsContainer }>
          {item.isEditing 
            ?<>
              <SaveButton onPress={() => editHandler(item.id)}/>
              <CancelButton onPress={() => dispatch(editJournalToggle({id: item.id}))}/>
            </>
            :<>
              <EditButton onPress={() => dispatch(editJournalToggle({id: item.id}))}/>
              <DeleteButton onPress={ () => dispatch(deleteJournal({ id: item.id })) }/>
            </>
          }
        </Layout>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  journalCard: {
    flex: 1,
    flexDirection:"column", 
    margin: 5,
    paddingTop: 3,
    borderRadius: 4,
    width: windowWidth * 0.95,
    height: windowHeight * 0.35,
    elevation: 3,
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
  buttonsContainer: {
    flexDirection: "row",
    marginTop: "auto",
  },
  divider: {
    height: 0.3,
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.7,
  },
});



const mapStateToProps = (state:any) => {
  const { journals } = state
  return {
    journals: journals.journals,
  };
};

export default connect(mapStateToProps)(JournalItem);
