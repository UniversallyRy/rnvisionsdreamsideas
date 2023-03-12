import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Layout, List } from '@ui-kitten/components';
import GridItem from './GridItem';
import { VisionType } from '../../../redux/reducers/visions';
import { StoreProps } from '../../../redux/store';
import { GridStyles } from '../styles';

type GridProps = {
  visions: VisionType[];
  navigation: NavigationScreenProp<string, object>;
}

type ItemProps = {
  item: VisionType;
  navigation?: NavigationScreenProp<string, object>;
  index?: number;
}

const GridView = ({ visions, navigation }: GridProps): JSX.Element => {

  const renderGridItem = ({ item }: ItemProps): JSX.Element => (
    <GridItem item={item} navigation={navigation} />
  );

  return (
    <Layout>
      <List
        numColumns={2}
        contentContainerStyle={styles.grid}
        scrollEnabled
        data={visions}
        keyExtractor={(_item, index): string => index.toString()}
        renderItem={renderGridItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create<GridStyles>({
  grid: {
    alignSelf: 'center',
  },
});

const mapStateToProps = (state: StoreProps) => {
  const { visions } = state;
  return { visions };
};

export default connect(mapStateToProps)(GridView);
export type PropsFromRedux = ConnectedProps<typeof GridView>;
