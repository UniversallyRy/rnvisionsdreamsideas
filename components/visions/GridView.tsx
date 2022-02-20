import React, { memo, useCallback, FC } from 'react';
import { TouchableOpacity, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Layout, List } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { VisionItem } from '../../redux/reducers/visions';
import { StoreProps } from '../../redux/store';

type GridProps = {
  visions: VisionItem[];
  navigation: NavigationScreenProp<string,object>;
}

type ItemProps = {
  item: VisionItem;
  index?: number;
}

interface Styles {
  grid: ViewStyle;
  gridItem: ViewStyle;
  img: ImageStyle;
}

const GridView: FC<GridProps> = ({ visions, navigation }) => {
  
  const GridItem = memo(function GridImage({ item }: ItemProps) {
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

  const renderGridItem = useCallback(function fetchItem({ item }: ItemProps) {
    return <GridItem item={ item } />;
  }, [ visions ]);

  return (
    <Layout>
      <List
        numColumns={ 2 }
        contentContainerStyle={ styles.grid }
        scrollEnabled
        data={ visions }
        keyExtractor={ (_item, index) => index.toString() }
        renderItem={ renderGridItem }
      />
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  grid: {
    alignSelf: 'center',
  },
  gridItem: {
    margin: 4, 
    elevation: 2,
  },
  img: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.45,
    borderRadius: 4,
  },
});

const mapStateToProps = (state:StoreProps) => {
  const { visions } = state;
  return { visions };
};

export default connect(mapStateToProps)(GridView);
export type PropsFromRedux = ConnectedProps<typeof GridView>;