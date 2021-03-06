import React, { FunctionComponent, useCallback, memo } from "react";
import { View, FlatList, Text, Dimensions, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { connect } from "react-redux";
import { Card } from "react-native-paper";

type GridProps = {
  navigation: NavigationScreenProp<string, object>;
  state: object[];
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

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const JournalGridContainer: FunctionComponent<GridProps> = ({ state, navigation }) => {

  const JournalGridList = memo(
    function GridJournal({ data, index }:any) {
      return (
        <Card
          style={ styles.gridItem }
          onPress={ () => navigation.navigate("JournalDetails", { title:data.title, body:data.body, date:data.date }) }
        >
          <Card.Content style={ styles.gridText }>
            <Text>{ data.title }</Text>
            <Text
              style={{
                marginTop: 30,
                bottom: 0,
                position: "absolute",
              }}
            >
              { data.date }
            </Text>
          </Card.Content>
        </Card>
      );
    },
  );

  const renderList = useCallback(({ item, index }) => {
    return <JournalGridList data={ item } />;
  }, []);

  return (
    <View
      style={ styles.container }
    >
      <FlatList
        numColumns={ 3 }
        contentContainerStyle={ styles.gridContainer }
        scrollEnabled
        data={ state }
        renderItem={ renderList }
      />
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    paddingTop: 10,
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
  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.journals,
  };
};

export default connect(mapStateToProps)(JournalGridContainer);
