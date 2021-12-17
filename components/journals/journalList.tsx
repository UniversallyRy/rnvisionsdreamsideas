import React, { FunctionComponent } from "react";
import { StyleSheet, FlatList, StyleProp, ViewStyle, View } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { connect } from "react-redux";
import JournalItem from "./journalItem";
import { windowWidth } from "../../utils/dimensions";

type JournalListProps = {
  month: string;
  journals: [];
  navigation: NavigationScreenProp<string, object>;
  container: StyleProp<ViewStyle>;
 }

interface Styles {
  container: ViewStyle;
}

const JournalList: FunctionComponent<JournalListProps> = ({ journals, month,  navigation }) => {

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
            return <JournalItem navigation={navigation} item={item}/>
          }
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
});

const mapStateToProps = (state:any) => {
  const { journals } = state
  return {
    journals: journals.journals,
    month: journals.monthFilter
  };
};

export default connect(mapStateToProps)(JournalList);
