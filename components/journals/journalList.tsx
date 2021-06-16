import React, { FunctionComponent } from "react";
import { StyleSheet, FlatList, StyleProp, TextStyle, ViewStyle, Dimensions } from "react-native";
import { Surface, Button, Card, Paragraph, Text} from "react-native-paper";
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from "react-redux";
import { deleteJournal } from "../../redux/actions";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");



type JournalListProps = {
  navigation: NavigationStackProp;
  state: [];
  deleteJournal: ((item: object) => void);
  buttonsContainer: StyleProp<ViewStyle>;
  editButton: StyleProp<ViewStyle>;
  deleteButton: StyleProp<ViewStyle>;
  divider: StyleProp<ViewStyle>;
  journalCard: StyleProp<TextStyle>;
  journalTitle: StyleProp<ViewStyle>;
  journalText: StyleProp<ViewStyle>;
  journalBorder: StyleProp<ViewStyle>;
  journalDate: StyleProp<ViewStyle>;
  
}

interface Styles {
  container: ViewStyle;
  buttonsContainer: ViewStyle;
  editButton: ViewStyle;
  deleteButton: ViewStyle;
  divider: ViewStyle;
  journalCard: ViewStyle;
  journalTitle: ViewStyle;
  journalText: ViewStyle;
  journalBorder: ViewStyle;
  journalDate: ViewStyle;
}

const JournalList: FunctionComponent<JournalListProps> = ({ state, navigation, deleteJournal }) => {

  return (
    <Card style={styles.container}>
      <FlatList
        style={{ paddingTop: 10 }}
        data={ state }
        keyExtractor={ (item, index) => index.toString() }
        renderItem={ ({ item }:any) => (
          <Surface style={ styles.journalBorder }>
            <Card
              style={ styles.journalCard }
              onPress={ () => navigation.navigate("JournalDetails", item) }
            >
              <Card.Content>
                <Paragraph style={ styles.journalTitle }>
                  { item.title }
                </Paragraph>
                <Text style={ styles.divider } />
                <Paragraph style={ styles.journalText }>
                  { item.body }
                </Paragraph>
                <Text style={ styles.divider } />
                <Paragraph style={ styles.journalDate }>
                  { item.date }
                </Paragraph>
              </Card.Content>
            </Card>
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
                onPress={ () => deleteJournal({ id: item.id }) }
              >
                Delete
              </Button>
            </Surface>
          </Surface>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingTop: 10,
    width: windowWidth,
    height: windowHeight
  },
  journalBorder: {
    margin: 10,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 10,
    width: windowWidth * 0.92,
  },
  journalCard: {
    alignSelf: "center",
    width: windowWidth * 0.92,
  },
  journalTitle: {
    fontFamily: "roboto-black",
    fontSize: 20,
    marginBottom: 10,
  },
  journalText: {
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


const mapDispatchToProps = { deleteJournal };

const mapStateToProps = (state:any) => {
  return {
    state: state.journals,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JournalList);
