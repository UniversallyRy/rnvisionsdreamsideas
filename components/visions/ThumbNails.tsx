import React, { useState, FC } from 'react';
import { TouchableOpacity, Image, StyleSheet, ImageStyle } from 'react-native';
import { List, Tooltip } from '@ui-kitten/components';
import { deleteVision, VisionType } from '../../redux/reducers/visions';
import { CloseButton } from '../../shared/buttons';
import { SPACING, THUMBNAIL_SIZE, windowWidth } from '../../utils/constants';
import { useAppDispatch } from '../../utils/hooks';

type ThumbnailProps = {
  item: VisionType;
  index: number;
  topRef: React.RefObject<List<any>>
  thumbRef: React.RefObject<List<any>>
}

interface Styles {
  thumbImg: ImageStyle;
}

const renderThumbnail:FC<ThumbnailProps> = ({ item, index, topRef, thumbRef }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollActiveIndex = (index: number) => {
    setActiveIndex(index);
    topRef.current?.scrollToOffset({
      offset: index * windowWidth,
      animated: true
    });
    if(index * (THUMBNAIL_SIZE + SPACING) - THUMBNAIL_SIZE / 2 > windowWidth / 2) {
      thumbRef.current?.scrollToOffset({
        offset: index * (THUMBNAIL_SIZE + SPACING) - windowWidth / 2 + THUMBNAIL_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  const ThumbNail = () => {
    return (
      <TouchableOpacity
        onPress={ () => scrollActiveIndex(index) }
        // delayLongPress= { () => navigation.navigate('Vision Details', { item }) }
        onLongPress={ activeIndex === index ? () => setVisible(true) : undefined }
      >
        <Image
          source={{ uri:item.uri }}
          style={{  
            borderColor: activeIndex === index ? '#fff' : 'transparent', 
            ...styles.thumbImg
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Tooltip
      anchor={ ThumbNail }
      placement='top'
      visible={ activeIndex === index ? visible : false }
      onBackdropPress={ () => setVisible(false) }
    >
      <CloseButton onPress={ () => dispatch(deleteVision(item)) }/>
    </Tooltip>
  );
};

const styles = StyleSheet.create<Styles>({
  thumbImg: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: 3,
    marginRight: SPACING,
    borderWidth: 1,
  },
});
  
export default renderThumbnail;