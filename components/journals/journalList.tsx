import React, { FunctionComponent } from "react";
import { Text, StyleSheet, FlatList, StyleProp, TextStyle, ViewStyle, View } from "react-native";
import { Surface, Button, Card, Paragraph} from "react-native-paper";
import { NavigationScreenProp } from 'react-navigation';
import { connect, useDispatch } from "react-redux";
import { deleteJournal } from "../../redux/reducers/journals";
import { windowWidth } from "../../utils/dimensions";

type JournalListProps = {
  month: string;
  journals: [];
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
  container: ViewStyle;
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

const JournalList: FunctionComponent<JournalListProps> = ({ journals, month,  navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingTop: 10 }}
        data={ journals }
        keyExtractor={ (item, index) => index.toString() }
        renderItem={ ({ item }:any) => {
          if ((month != 'All') && !item.date.includes(month)) {
            return null
          }
          else{
            return(
              <Card onPress={ () => navigation.navigate("JournalDetails", { title:item.title, body:item.body, date:item.date})} style={ styles.journalCard }>
                <Surface
                  style={ styles.journalText }
                >
                  <Card.Content>
                    <Paragraph style={ styles.journalTitle }>
                      { item.title }
                    </Paragraph>
                    <Text style={ styles.divider } />
                    <Paragraph style={ styles.journalParagraph }>
                      { item.body }
                    </Paragraph>
                    <Text style={ styles.divider } />
                    <Paragraph style={ styles.journalDate }>
                      { item.date }
                    </Paragraph>
                  </Card.Content>
                </Surface>
                <Surface style={ styles.buttonsContainer }>
                  <Button
                    style={ styles.editButton }
                    icon="lead-pencil"
                    mode="contained"
                  >
                    Edit
                  </Button>
                  <Button
                    style={ styles.deleteButton }
                    color="red"
                    icon="close-outline"
                    mode="contained"
                    onPress={ () => dispatch(deleteJournal({ id: item.id })) }
                  >
                    Delete
                  </Button>
                </Surface>
              </Card>
          )}
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    alignSelf: "center",
    marginTop: 50,
  },
  journalCard: {
    margin: 5,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 10,
    width: windowWidth * 0.92,
    elevation: 4,
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
    marginTop: 35,
    margin: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignContent: "center",
    fontSize: 20,
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
    month: journals.monthFilter
  };
};

export default connect(mapStateToProps)(JournalList);
