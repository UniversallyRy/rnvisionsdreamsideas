import React, { FunctionComponent, useCallback, memo } from "react";
import { StyleSheet, StyleProp, ViewStyle, ImageStyle, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { NavigationScreenProp } from 'react-navigation';
import { windowHeight, windowWidth } from "../../utils/dimensions";
import FooterButtons from "./FooterButtons"


type GridProps = {
  state: object[];
  navigation: NavigationScreenProp<string,object>;
  gridContainer: StyleProp<ViewStyle>;
  gridItem: StyleProp<ImageStyle>;
}

type ListProps = {
  item: object;
}

interface Styles {
  gridContainer: ViewStyle;
  gridItem: ImageStyle;
}

const VisionGridContainer: FunctionComponent<GridProps> = ({ state, navigation }) => {
  const VisionGridList = memo(function GridImage({ data }:any) {
    return (
      <Card
        style={{margin: 4, borderRadius: 12,}}
        accessibilityLabel={ "Grid List" }
        accessible  
        onPress={ () => navigation.navigate("VisionDetails", { data }) }
      > 
        <Card.Cover
          style={ styles.gridItem }
          source={{ uri: data.uri }}
          testID={ data.id }  
          resizeMode={ 'cover' }
        />
      </Card>
    );
  });

  const renderList: FunctionComponent<ListProps> = useCallback(function renderList({ item }) {
    return <VisionGridList data={ item } />;
  }, []);

  return (
    <View style={{ margin: "auto", flex: 1 }}>
      <FlatList
        numColumns={ 2 }
        contentContainerStyle={ styles.gridContainer }
        scrollEnabled
        data={ state }
        keyExtractor={ (item, index) => index.toString() }
        renderItem={ renderList }
      />
      <FooterButtons
      />
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  gridContainer: {
    alignSelf: "center",
    padding: 3,
    elevation: 4
  },
  gridItem: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.45,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 12,
    borderWidth: 1,

  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.visions,
  };
};

export default connect(mapStateToProps)(VisionGridContainer);

export type PropsFromRedux = ConnectedProps<typeof VisionGridContainer>

