import React, { useCallback, memo } from "react";
import { StyleSheet, StyleProp, ViewStyle, ImageStyle, Dimensions } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { connect } from "react-redux";

interface GridProps {
  navigation: NavigationStackProp;
  state: any;
  gridContainer: StyleProp<ViewStyle>;
  gridItem: StyleProp<ImageStyle>;
}

interface ListProps {
  item: object;
}

interface Styles {
  gridContainer: ViewStyle;
  gridItem: ImageStyle;
}

const { width: width, height: height } = Dimensions.get("window");

const VisionGridContainer: React.FC<GridProps> = ({ state, navigation }) => {
  const VisionGridList = memo(function GridImage({ data }:any) {
    return (
      <Card
        accessibilityLabel={"Grid List"}
        accessible  
        onPress={() => navigation.navigate("VisionDetails", data)}
      > 
        <Card.Cover
          style={styles.gridItem }
          source={{ uri: data.uri }}
          testID={data.id}  
          resizeMode={'cover'}
        />
      </Card>
    );
  });

  const renderList: React.FC<ListProps> = useCallback(function renderList({ item }) {
    return <VisionGridList data={item} />;
  }, []);

  return (
    <Card style={{ flex: 1 }}>
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        scrollEnabled
        data={state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderList}
      />
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  gridContainer: {
    padding: 3,
  },
  gridItem: {
    height: height * 0.25,
    width: width * 0.32,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 2,
    borderWidth: 1,

  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.visions,
  };
};

export default connect(mapStateToProps)(VisionGridContainer);
