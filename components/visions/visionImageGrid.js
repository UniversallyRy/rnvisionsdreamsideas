import React, { useCallback, memo } from "react";
import { Image, StyleSheet, Dimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { connect } from "react-redux";
import { coltsBlue, coltsGray, globalStyles } from "../../styles/global";

const { width: width, height: height } = Dimensions.get("window");

export function VisionGridContainer({ state, navigation }) {
  const VisionGridList = memo(function GridImage({ data }) {
    return (
      <Card
        style={{ backgroundColor: coltsBlue }}
        onPress={() => navigation.navigate("VisionDetails", data)}
      >
        {/* <Card onPress={ () => navigation.navigate( 'Visions', item ) }> */}
        <Image
          source={{ uri: data.uri }}
          id={data.id}
          style={{ ...styles.gridItem }}
        />
      </Card>
    );
  });

  const renderList = useCallback(function renderList({ item }) {
    return <VisionGridList data={item} />;
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: coltsBlue }}>
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        scrollEnabled
        data={state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    paddingTop: 3,
    backgroundColor: coltsBlue,
  },
  gridItem: {
    height: height * 0.25,
    width: width * 0.32,
    margin: 1,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 3,
    borderWidth: 2,
    borderColor: coltsGray,
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
    state: state.visions,
  };
};

export default connect(mapStateToProps)(VisionGridContainer);
