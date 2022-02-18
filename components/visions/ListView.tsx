import React, { memo, useState, useRef, useCallback, FC } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, ConnectedProps } from 'react-redux';
import { Card, Layout } from '@ui-kitten/components';
import { VisionContext } from '../../screens/Visions';
import { FooterButtons } from '../../shared/buttons';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { SPACING, THUMBNAIL_SIZE } from '../../utils/constants';
import { VisionItem, deleteVision } from '../../redux/reducers/visions';
import { StoreProps } from '../../redux/store';

// todos: add delete picture option back
type ListProps = {
  visions: VisionItem[];
  navigation: NavigationScreenProp<string, object>;
}

type ItemProps = {
  item: VisionItem;
}

type ThumbnailProps = {
  item: VisionItem;
  index: number;
}

const ListView: FC<ListProps> = ({ visions, navigation }) => {
  
  const [activeIndex, setActiveIndex] = useState(0)
  const topRef = useRef<FlatList>(null);
  const thumbRef = useRef<FlatList>(null);

  const scrollActiveIndex = (index: number) => {
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
  }

  const BackgroundImage = memo(function GridImage({ item }: ItemProps) {
    return (
      <Layout style={{ width:windowWidth, height:windowHeight }}>
        <Image
          source={ { uri:item.uri } }
          style={ [StyleSheet.absoluteFill] }
        />
      </Layout>
    );
  });

  const renderBgImage = useCallback(function renderBG({ item }: ItemProps) {
    return <BackgroundImage item={ item } />
  }, [ visions ]);

  const ThumbNail = memo(function smallImage({ item, index }: ThumbnailProps) {
    return (
      <Card
        onPress={ () => scrollActiveIndex(index) }
        onLongPress={ () => navigation.navigate('Vision Details', { item }) }
      >
        <Image
          source={{ uri:item.uri }}
          style={{
            width: THUMBNAIL_SIZE,
            height: THUMBNAIL_SIZE,
            borderRadius: 3,
            marginRight: SPACING,
            borderWidth: 1,
            borderColor: activeIndex === index ? '#fff' : 'transparent'
          }}
        />
      </Card>
    )
  });

  const renderThumbnail = useCallback(function thumb({ item, index }: ThumbnailProps) {
    return <ThumbNail item={ item } index={ index } />
  }, [ visions ]);

  return (
    <Layout style={{ flex: 1 }}>
      <FlatList
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
      <FlatList
        data={ visions }
        style={{ position: 'absolute', bottom: THUMBNAIL_SIZE - 30 }}
        ref={ thumbRef }
        horizontal
        showsHorizontalScrollIndicator={ false }
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        keyExtractor={ (_, index) => String(index) }
        renderItem={ renderThumbnail }
      />
      <FooterButtons context={ VisionContext }/>
    </Layout>
  );
};

const mapStateToProps = (state: StoreProps) => {
  const { visions } = state;
  return { visions };
};

export default connect(mapStateToProps)(ListView);
export type PropsFromRedux = ConnectedProps<typeof ListView>;