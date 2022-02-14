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
  grid: ViewStyle;
  gridItem: ImageStyle;
}

const VisionGridContainer: FunctionComponent<GridProps> = ({ state, navigation }) => {
  
  const VisionGridItem = memo(function GridImage({ item }:ListProps) {
    return (
      <TouchableOpacity
        style={{ margin: 4, borderRadius: 12, elevation: 2 }}
        accessibilityLabel={ 'Grid Item' }
        onPress={ () => navigation.navigate('Vision Details', { item }) }
        accessible  
      > 
        <Image
          style={ styles.gridItem }
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
    <Layout style={{ flex: 1 }}>
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
  grid: {
    flex: 1,
    alignSelf: 'center',
    padding: 3,
  },
  gridItem: {
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

export default connect(mapStateToProps)(VisionGridContainer);

export type PropsFromRedux = ConnectedProps<typeof VisionGridContainer>

