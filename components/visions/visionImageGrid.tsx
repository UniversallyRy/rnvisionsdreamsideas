import React, { useCallback, memo } from "react";
import { Image, StyleSheet, StyleProp, ViewStyle, ImageStyle, Dimensions, View } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { connect } from "react-redux";
import { coltsBlue, coltsGray } from "../../styles/global";

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
        onPress={() => navigation.navigate("VisionDetails", data)}
      > 
        <Image
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
    <View style={{ flex: 1 }}>
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
    borderColor: coltsGray,
    backgroundColor: coltsBlue,

  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.visions,
  };
};

export default connect(mapStateToProps)(VisionGridContainer);
