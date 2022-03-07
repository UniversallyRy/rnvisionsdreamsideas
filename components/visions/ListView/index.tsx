import React, { memo, useState, useRef, useCallback, FC } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect, ConnectedProps } from 'react-redux';
import { Layout, List, Tooltip } from '@ui-kitten/components';
import { CloseButton } from '../../../shared/buttons';
import { windowHeight, windowWidth } from '../../../utils/constants';
import { SPACING, THUMBNAIL_SIZE } from '../../../utils/constants';
import { useAppDispatch } from '../../../utils/hooks';
import { VisionType, deleteVision } from '../../../redux/reducers/visions';
import { StoreProps } from '../../../redux/store';
import { ListStyles } from '../Styles';

type ListProps = {
  visions: VisionType[];
  navigation: NavigationScreenProp<string, object>;
}

type ItemProps = {
  item: VisionType;
}

type ThumbnailProps = {
  item: VisionType;
  index: number;
}

const ListView: FC<ListProps> = ({ visions, navigation }): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef<List>(null);
  const thumbRef = useRef<List>(null);
  const dispatch = useAppDispatch();

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

  const BackgroundImage = memo(({ item }: ItemProps): JSX.Element => (
      <Layout style={ styles.bgImg }>
        <Image
          source={{ uri: item.uri }}
          style={[StyleSheet.absoluteFill]} 
        />
      </Layout>
  ));

  const renderBgImage = useCallback(({ item }: ItemProps): JSX.Element => (
    <BackgroundImage item={ item } />
  ), [ visions ]);

  const renderThumbnail = ({ item, index }: ThumbnailProps): JSX.Element => {

    const thumbNail = (): JSX.Element => (
      <TouchableOpacity
        onPress={ () => scrollActiveIndex(index)}
        // delayLongPress= { () => navigation.navigate('Vision Details', { item }) }
        onLongPress={activeIndex === index ? () => setVisible(true) : undefined}
      >
        <Image
          source={{ uri: item.uri }}
          style={{
            ...styles.thumbImg,
            borderColor: activeIndex === index ? '#fff' : 'transparent'
          }} 
        />
      </TouchableOpacity>
    );

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
    <Layout style={styles.container}>
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
  bgImg:{
    width:windowWidth, 
    height:windowHeight
  },
  thumbImg:{
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: 3,
    marginRight: SPACING,
    borderWidth: 1,
  }
});

const mapStateToProps = (state: StoreProps) => {
  const { visions } = state;
  return { visions };
};

export default connect(mapStateToProps)(ListView);
export type PropsFromRedux = ConnectedProps<typeof ListView>;