import React, { useCallback, memo } from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, Surface } from "react-native-paper";
import { connect } from "react-redux";
import { coltsBlue, coltsGray, globalStyles } from "../../styles/global";

const { width: width, height: height } = Dimensions.get("window");

const JournalGridContainer = ({ state, navigation }) => {
  const JournalGridList = memo(
    function GridJournal({ data, index }) {
      return (
        <Card
          style={{ backgroundColor: coltsBlue }}
          onPress={() => navigation.navigate("JournalDetails", data)}
        >
          <Card.Content style={styles.gridItem}>
            <Text style={{ color: coltsGray }}>{data.title}</Text>
            <Text
              style={{
                color: coltsGray,
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
    [state]
  );

  const renderList = useCallback(function renderList({ item, index }) {
    return <JournalGridList index={index} data={item} />;
  }, []);

  return (
    <Surface
      style={{
        flex: 1,
        backgroundColor: coltsBlue,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        scrollEnabled
        data={state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderList}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingTop: 3,
  },
  gridItem: {
    height: height * 0.25,
    width: width * 0.32,
    margin: 1,
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 3,
    borderWidth: 2,
    borderColor: coltsGray,
    backgroundColor: "#000",
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowRadius: 350,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.journals,
  };
};

export default connect(mapStateToProps)(JournalGridContainer);
