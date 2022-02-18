import React, { memo, useCallback, FC } from 'react';
import { FlatList, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Card, Layout } from '@ui-kitten/components';
import { FooterButtons } from '../../shared/buttons';
import { VisionContext } from '../../screens/Visions';
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
  container: ViewStyle;
  grid: ViewStyle;
  gridItem: ViewStyle;
  img: ImageStyle;
}

const GridView: FC<GridProps> = ({ visions, navigation }) => {
  
  const GridItem = memo(function GridImage({ item }: ItemProps) {
    return (
      <Card
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
      </Card>
    );
  });

  const renderGridItem = useCallback(function fetchItem({ item }: ItemProps) {
    return <GridItem item={ item } />;
  }, [ visions ]);

  return (
    <Layout style={ styles.container }>
      <FlatList
        numColumns={ 2 }
        contentContainerStyle={ styles.grid }
        scrollEnabled
        data={ visions }
        keyExtractor={ (_item, index) => index.toString() }
        renderItem={ renderGridItem }
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

const mapStateToProps = (state:StoreProps) => {
  const { visions } = state;
  return { visions };
};

export default connect(mapStateToProps)(GridView);
export type PropsFromRedux = ConnectedProps<typeof GridView>;