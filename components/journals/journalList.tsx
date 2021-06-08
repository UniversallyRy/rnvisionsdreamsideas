import React from "react";
import { StyleSheet, View, FlatList, StyleProp, TextStyle, ViewStyle,} from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Button, Card, Paragraph } from "react-native-paper";
import { connect } from "react-redux";
import { globalStyles, coltsGray, coltsBlue } from "../../styles/global";
import { deleteJournal } from "../../redux/actions";

interface JournalListProps {
  navigation: NavigationStackProp;
  state: [];
  deleteJournal: ((item: string) => void);
  buttonsContainer: StyleProp<ViewStyle>;
  editButton: StyleProp<ViewStyle>;
  deleteButton: StyleProp<ViewStyle>;
  divider: StyleProp<ViewStyle>;
  coltsGray: StyleProp<TextStyle>;
  coltsBlue: StyleProp<TextStyle>;
}

interface Styles {
  buttonsContainer: ViewStyle;
  editButton: ViewStyle;
  deleteButton: ViewStyle;
  divider: ViewStyle;
}

const JournalList: React.FC<JournalListProps> = ({ state, navigation, deleteJournal }) => {
  const removeJournal = (id:string) => {
    var buttonId = id;
    deleteJournal(buttonId);
  };

  return (
    <FlatList
      style={{ paddingTop: 10, backgroundColor: coltsBlue }}
      data={state}
      keyExtractor={(item, index) => index.toString(item)}
      renderItem={({ item }:any) => (
        <View style={globalStyles.journalBorder}>
          <Card
            style={globalStyles.journalCard}
            onPress={() => navigation.navigate("JournalDetails", item)}
          >
            <Card.Content>
              <Paragraph style={globalStyles.journalTitle}>
                {item.title}
              </Paragraph>
              <View style={styles.divider} />
              <Paragraph style={globalStyles.journalText}>
                {item.body}
              </Paragraph>
              <View style={styles.divider} />
              <Paragraph style={globalStyles.journalDate}>
                {item.date}
              </Paragraph>
            </Card.Content>
          </Card>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.editButton}
              color={coltsGray}
              icon="lead-pencil"
              mode="contained"
            >
              Edit
            </Button>
            <Button
              style={styles.deleteButton}
              color="red"
              icon="close-outline"
              mode="contained"
              onPress={() => removeJournal(item.id)}
            >
              Delete
            </Button>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create<Styles>({
  buttonsContainer: {
    backgroundColor: "#000",
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
    backgroundColor: coltsGray,
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
