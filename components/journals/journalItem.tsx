import { Card, Input, Layout, Text, Button, Icon } from "@ui-kitten/components";
import React, { FunctionComponent, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, TextStyle, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { connect, useDispatch } from "react-redux";
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
  editButton: ViewStyle;
  deleteButton: ViewStyle;
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


const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);
const SaveIcon = (props) => (
  <Icon {...props} name='save-outline'/>
);
const DeleteIcon = (props) => (
  <Icon {...props} name='trash-outline'/>
);

  const {title, body, date} = item;
  return (
    <KeyboardAvoidingView>
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
                  ?<Button
                      style={ styles.editButton}
                      accessoryRight={SaveIcon}
                      onPress={() => editHandler(item.id)}
                    >
                        Save
                    </Button>
                  :<Button
                    style={ styles.editButton }
                    accessoryRight={EditIcon}
                    onPress={() => dispatch(editJournalToggle({id: item.id}))}
                  >
                    Edit
                  </Button>
                  }
                  {item.isEditing 
                  ?<Button
                    style={ styles.deleteButton}
                    onPress={ () => dispatch(editJournalToggle({id: item.id})) }
                   >
                        Cancel
                   </Button>
                  :<Button
                    style={ styles.deleteButton }
                    accessoryRight={DeleteIcon}
                    onPress={ () => dispatch(deleteJournal({ id: item.id })) }
                  >
                    Delete
                  </Button>
                  }
                </Layout>
              </Card>
            </KeyboardAvoidingView>
  )}

const styles = StyleSheet.create<Styles>({
  journalCard: {
    flex: 1,
    margin: 5,
    paddingTop: 3,
    borderRadius: 10,
    width: windowWidth * 0.92,
    height: windowHeight * 0.40,
    elevation: 1,
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
  },
  journalDate: {
    fontFamily: "roboto-italic",
    fontSize: 10,
    margin: 5,
    position: 'absolute',
    bottom: 50,
  },
  buttonsContainer: {
    flexDirection: "row",
    fontSize: 20,
    bottom: 0,
    position: 'absolute'
  },
  editButton: {
    flex: 0.51,
  },
  deleteButton: {
    flex: 0.51,
    marginLeft: 2,
  },
  divider: {
    height: 0.3,
    flex: 1,
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
