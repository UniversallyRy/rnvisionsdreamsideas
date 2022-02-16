import React, { FunctionComponent, useCallback, memo } from 'react';
import { Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Layout } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { VisionContext } from '../../screens/visions';
import { FooterButtons } from '../../shared/buttons';

type ListProps = {
  item: {
    id: string;
    title: string;
    uri: string;
  }
}

type GridProps = {
  state: ListProps[];
  navigation: NavigationScreenProp<string,object>;
}

interface Styles {
  container: ViewStyle;
  grid: ViewStyle;
  gridItem: ViewStyle;
  img: ImageStyle;
}

const GridView: FunctionComponent<GridProps> = ({ state, navigation }) => {
  
  const VisionGridItem = memo(function GridImage({ item }:ListProps) {
    return (
      <TouchableOpacity
        style={ styles.gridItem }
        accessibilityLabel={ 'Grid Item' }
        onPress={ () => navigation.navigate('Vision Details', { item }) }
        accessible  
      > 
        <Image
          style={ styles.img }
          source={{ uri: item.uri }}
          testID={ item.id }  
          resizeMode={ 'cover' }
        />
      </TouchableOpacity>
    );
  });

  const renderList: FunctionComponent<ListProps> = useCallback(function renderList({ item }) {
    return <VisionGridItem item={ item } />;
  }, []);

  return (
    <Layout style={ styles.container }>
      <FlatList
        numColumns={ 2 }
        contentContainerStyle={ styles.grid }
        scrollEnabled
        data={ state }
        keyExtractor={ (_item, index) => index.toString() }
        renderItem={ renderList }
      />
      <FooterButtons context={VisionContext}/>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1
  },
  grid: {
    flex: 1,
    alignSelf: 'center',
    padding: 3,
  },
  gridItem: {
    margin: 4, 
    borderRadius: 12, 
    elevation: 2,
  },
  img: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.45,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1
  },
});

const mapStateToProps = (state:any) => {
  return {
    state: state.visions,
  };
};

export default connect(mapStateToProps)(GridView);
export type PropsFromRedux = ConnectedProps<typeof GridView>;