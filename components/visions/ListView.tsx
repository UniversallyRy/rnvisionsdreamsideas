import React, { memo, useState, useRef, useCallback, FC } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, ConnectedProps } from 'react-redux';
import { Layout, List, Tooltip } from '@ui-kitten/components';
import { CloseButton } from '../../shared/buttons';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { SPACING, THUMBNAIL_SIZE } from '../../utils/constants';
import { useAppDispatch } from '../../utils/hooks';
import { VisionItem, deleteVision } from '../../redux/reducers/visions';
import { StoreProps } from '../../redux/store';

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
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0)
  const topRef = useRef<List>(null);
  const thumbRef = useRef<List>(null);
  const dispatch = useAppDispatch()

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

  const renderThumbnail = ({ item, index }: ThumbnailProps) => {

    const thumbNail = () => {
      return (
        <TouchableOpacity
          onPress={ () => scrollActiveIndex(index) }
          // delayLongPress= { () => navigation.navigate('Vision Details', { item }) }
          onLongPress={ activeIndex === index ? () => setVisible(true) : undefined }
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
        </TouchableOpacity>
      );
    };

    return (
      <Tooltip
        anchor={ thumbNail }
        placement='top'
        visible={ activeIndex === index ? visible : false }
        onBackdropPress={ () => setVisible(false) }
      >
        <CloseButton onPress={ () => dispatch(deleteVision(item)) }/>
      </Tooltip>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
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
        style={{ position: 'absolute', bottom: THUMBNAIL_SIZE - 30 }}
        ref={ thumbRef }
        horizontal
        showsHorizontalScrollIndicator={ false }
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        keyExtractor={ (_, index) => String(index) }
        renderItem={ renderThumbnail }
      />
    </Layout>
  );
};

const mapStateToProps = (state: StoreProps) => {
  const { visions } = state;
  return { visions };
};

export default connect(mapStateToProps)(ListView);
export type PropsFromRedux = ConnectedProps<typeof ListView>;