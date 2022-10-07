import React, { useState, useRef, FC, createContext } from 'react';
import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Layout, List } from '@ui-kitten/components';
import { renderBgImage } from './ScreenImage';
import renderThumbnail from './ThumbNails';
import { ListStyles } from '../Styles';
import { SPACING, THUMBNAIL_SIZE, windowWidth } from '../../../utils/constants';
import { VisionType } from '../../../redux/reducers/visions';
import { StoreProps } from '../../../redux/store';

type ListProps = {
  visions: VisionType[];
  navigation: NavigationScreenProp<string, object>;
}

export const IndexContext = createContext({
  activeIndex: 0,
  scrollActiveIndex: (_index: number | undefined) => {},
});

const ListView: FC<ListProps> = ({ visions, navigation }): JSX.Element => {

  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef<List>(null);
  const thumbRef = useRef<List>(null);

  const scrollActiveIndex = (index: number): void => {
    setActiveIndex(index);
    topRef.current?.scrollToOffset({
      offset: index * windowWidth,
      animated: true
    })
    if(index * (THUMBNAIL_SIZE + SPACING) - THUMBNAIL_SIZE / 2 > windowWidth / 2) {
      thumbRef.current?.scrollToOffset({
        offset: index * (THUMBNAIL_SIZE + SPACING) - windowWidth / 2 + THUMBNAIL_SIZE / 2,
        animated: true,
      })
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      })
    }
  };

  return (
    <Layout style={styles.container}>
      <IndexContext.Provider value={{ activeIndex, scrollActiveIndex }}>
        <List
          data={ visions }
          ref={ topRef }
          showsHorizontalScrollIndicator={ false }
          onMomentumScrollEnd={ev => {
            scrollActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/ windowWidth))
          }}
          keyExtractor={ (_, index) => String(index) }
          horizontal
          pagingEnabled
          renderItem={ renderBgImage }
        />
        <List
          data={ visions }
          style={ styles.imgList }
          ref={ thumbRef }
          horizontal
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          keyExtractor={ (_, index): string => String(index) }
          renderItem={ renderThumbnail }
        />
      </IndexContext.Provider>
    </Layout>
  );

};

const styles = StyleSheet.create<ListStyles>({
  container: {
    flex: 1
  },
  imgList: {
    position: 'absolute',
    bottom: THUMBNAIL_SIZE - 30
  },
});

const mapStateToProps = (state: StoreProps) => {
  const { visions } = state;
  return { visions };
};

export default connect(mapStateToProps)(ListView);
export type PropsFromRedux = ConnectedProps<typeof ListView>;
