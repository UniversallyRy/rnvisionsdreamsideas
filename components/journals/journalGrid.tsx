import React, { FunctionComponent} from "react";
import { View, FlatList, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { connect } from "react-redux";
import { Card } from "react-native-paper";
import { windowHeight, windowWidth } from "../../utils/dimensions";

type GridProps = {
  navigation: NavigationScreenProp<string, object>;
  monthFilter: string,
  journals: Object[]
  month: string;
  container: StyleProp<ViewStyle>;
  gridContainer: StyleProp<ViewStyle>;
  gridItem: StyleProp<TextStyle>;
  gridText: StyleProp<ViewStyle>;
}

interface Styles {
  container: ViewStyle
  gridContainer: ViewStyle;
  gridItem: ViewStyle;
  gridText: TextStyle;
}

const JournalGridContainer: FunctionComponent<GridProps> = ({ journals, month, navigation }) => {     

  return (
    <View
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
              onPress={ () => navigation.navigate("JournalDetails", { title:item.title, body:item.body, date:item.date }) }
            >
              <Card.Content style={ styles.gridText }>
                <Text>{ item.title }</Text>
                <Text
                  style={{
                    marginTop: 30,
                    bottom:3,
                    left: 3,
                    position: "absolute",
                  }}
                >
                  { item.date }
                </Text>
              </Card.Content>
            </Card>
          );
        }}}
      />
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: windowHeight,
    marginTop: 35,
    paddingTop: 5,
  },
  gridContainer: {
    marginLeft: "auto",
    marginRight: "auto",
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
