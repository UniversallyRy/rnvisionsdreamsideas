import { Card, Text } from "@ui-kitten/components";
import React, { FunctionComponent} from "react";
import { FlatList, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationScreenProp } from 'react-navigation';
import { connect } from "react-redux";
import { windowHeight, windowWidth } from "../../utils/dimensions";

type GridProps = {
  navigation: NavigationScreenProp<string, object>;
  journals: Object[]
  month: string;
}

interface Styles {
  container: ViewStyle
  gridContainer: ViewStyle;
  gridItem: ViewStyle;
  gridText: TextStyle;
}

const JournalGridContainer: FunctionComponent<GridProps> = ({ journals, month, navigation }) => {     

  return (
    <SafeAreaView
      style={ styles.container }
    >
      <FlatList
        numColumns={ 3 }
        contentContainerStyle={ styles.gridContainer }
        scrollEnabled
        data={ journals }
        accessibilityLabel="Journal List Entries in Grid Format"
        renderItem={ ({ item }:any) => {
          if ((month != 'All') && !item.date.includes(month)) {
            return null
          }else{
          return (
            <Card
              key={item.title + '_key'}
              style={ styles.gridItem }
              onPress={ () => navigation.navigate("Journal Details", { title:item.title, body:item.body, date:item.date }) }
            >
                <Text>{ item.title }</Text>
                <Text
                  style={{
                    marginTop: 30,
                    top:100,
                    right: 20,
                  }}
                >
                  { item.date }
                </Text>
            </Card>
          );
        }}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: windowHeight,
    marginTop: 2,
    paddingTop: 2,
  },
  gridContainer: {
    padding: 10,
  },
  gridItem: {
    borderRadius: 3,
    height: windowHeight * 0.25,
    width: windowWidth * 0.29,
    margin: 5,
    elevation: 5,
  },
  gridText: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.3,
    paddingHorizontal: 10
  },
});

const mapStateToProps = (state:any) => {
  return {
    month: state.journals.monthFilter,
    journals: state.journals.journals,
  };
};

export default connect(mapStateToProps)(JournalGridContainer);
