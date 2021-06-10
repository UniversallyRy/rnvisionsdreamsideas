import React, { useCallback, memo } from "react";
import { StyleSheet, Dimensions, StyleProp, TextStyle, ViewStyle,} from "react-native";
import { Card, Text } from "react-native-paper";
import { NavigationStackProp } from 'react-navigation-stack';
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";

interface GridProps {
  navigation: NavigationStackProp;
  state: [];
  gridContainer: StyleProp<ViewStyle>;
  gridItem: StyleProp<TextStyle>;
  gridText: StyleProp<ViewStyle>;
}

interface Styles {
  gridContainer: ViewStyle;
  gridItem: ViewStyle;
  gridText: TextStyle;
}

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const JournalGridContainer:React.FC<GridProps> = ({ state, navigation }) => {

  const JournalGridList = memo(
    function GridJournal({ data, index }:any) {
      return (
        <Card
          style={styles.gridItem}
          onPress={() => navigation.navigate("JournalDetails", data)}
        >
          <Card.Content style={styles.gridText}>
            <Text>{data.title}</Text>
            <Text
              style={{
                marginTop: 30,
                bottom: 0,
                position: "absolute",
              }}
            >
              {data.date}
            </Text>
          </Card.Content>
        </Card>
      );
    },
  );

  const renderList = useCallback(function renderList({ item, index }) {
    return <JournalGridList  style ={styles.gridItem} data={item} />;
  }, []);

  return (
    <Card
      style={{
        flex: 1,
      }}
    >
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        scrollEnabled
        data={state}
        renderItem={renderList}
      />
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  gridContainer: {
    backgroundColor: "lightgray",
    flex: 1,
    paddingTop: 10,
  },
  gridItem: {
    flex: 1,
    alignSelf: "center",
    borderRadius: 3,
    height: windowHeight * 0.25,
    width: windowWidth * 0.30,
    marginRight: 2,
    marginLeft: 2,
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
