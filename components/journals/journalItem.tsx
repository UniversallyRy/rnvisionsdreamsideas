import React, { FunctionComponent, useState } from "react";
import { Text, StyleSheet, KeyboardAvoidingView, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Surface, Button, Card, Paragraph, TextInput } from "react-native-paper";
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
  deleteJournal: ((item: object) => void);
  buttonsContainer: StyleProp<ViewStyle>;
  editButton: StyleProp<ViewStyle>;
  deleteButton: StyleProp<ViewStyle>;
  divider: StyleProp<ViewStyle>;
  journalCard: StyleProp<ViewStyle>;
  journalTitle: StyleProp<TextStyle>;
  journalParagraph: StyleProp<TextStyle>;
  journalText: StyleProp<TextStyle>;
  journalDate: StyleProp<TextStyle>;
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

  return (
            <KeyboardAvoidingView>
              <Card onPress={ () => navigation.navigate("JournalDetails", { title:item.title, body:item.body, date:item.date})} style={ styles.journalCard }>
                <Surface
                  style={ styles.journalText }
                >
                  <Card.Content>
                    {item.isEditing
                    ?<TextInput
                      label="Title"
                      value={textTitle}
                      onChangeText={text => setTitle(text)}
                      autoComplete
                    />
                    :<Paragraph style={ styles.journalTitle }>
                      { item.title }
                    </Paragraph>
                    }
                    <Text style={ styles.divider } />
                    {item.isEditing
                    ?<TextInput
                        label={'Body'}
                        value={textBody}
                        multiline={true}
                        onChangeText={text => setBody(text)}
                        autoComplete
                    />
                    :<Paragraph style={ styles.journalParagraph }>
                      { item.body }
                    </Paragraph>
                    }
                    <Text style={ styles.divider } />
                  </Card.Content>
                </Surface>
                {item.isEditing 
                ? null
                :<Paragraph style={ styles.journalDate }>
                      { item.date }
                </Paragraph>
                }
                <Surface style={ styles.buttonsContainer }>
                  {item.isEditing 
                  ?<Button
                    style={ styles.editButton}
                        icon="lead-pencil"
                        mode="contained"
                        onPress={() => editHandler(item.id)}
                    >
                        Save
                    </Button>
                  :<Button
                    style={ styles.editButton }
                    icon="lead-pencil"
                    mode="contained"
                    onPress={() => dispatch(editJournalToggle({id: item.id}))}
                  >
                    Edit
                  </Button>
                  }
                  {item.isEditing 
                  ?<Button
                    style={ styles.deleteButton}
                    color="red"
                    icon="close-outline"
                    mode="contained"
                    onPress={ () => dispatch(editJournalToggle({id: item.id})) }
                   >
                        Cancel
                   </Button>
                  :<Button
                    style={ styles.deleteButton }
                    color="red"
                    icon="close-outline"
                    mode="contained"
                    onPress={ () => dispatch(deleteJournal({ id: item.id })) }
                  >
                    Delete
                  </Button>
                  }
                </Surface>
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
