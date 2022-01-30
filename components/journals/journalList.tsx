import React, { FunctionComponent } from "react";
import { StyleSheet, FlatList, ViewStyle, View } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { connect } from "react-redux";
import JournalItem from "./journalItem";

type JournalListProps = {
  month: string;
  journals: [];
  navigation: NavigationScreenProp<string, object>;
 }

interface Styles {
  container: ViewStyle;
}

const JournalList: FunctionComponent<JournalListProps> = ({ journals, month,  navigation }) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={ journals }
        accessibilityLabel="Contains Journal Entries"
        keyExtractor={ (item, index) => index.toString() }
        renderItem={ ({ item }:any) => {
          if ((month != 'All') && !item.date.includes(month)) {
            return null
          }
            return <JournalItem navigation={navigation} item={item}/>
    
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    alignSelf: "center",
    marginTop: 50,
    paddingBottom: 40,
    borderRadius: 22,
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
