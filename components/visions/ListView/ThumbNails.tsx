import React, { useState, useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Tooltip } from '@ui-kitten/components';
import { IndexContext } from '.';
import { ThumbStyles } from '../Styles';
import { deleteVision, VisionType } from '../../../redux/reducers/visions';
import { useAppDispatch } from '../../../utils/hooks';
import { SPACING, THUMBNAIL_SIZE } from '../../../utils/constants';
import { CloseButton } from '../../../shared/buttons';

type ThumbnailProps = {
  item: VisionType;
  index: number;
}

const renderThumbnail: React.FunctionComponent<ThumbnailProps> = ({ item, index }): JSX.Element => {

  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const { activeIndex, scrollActiveIndex } = useContext(IndexContext);

  const ThumbNail = (): JSX.Element => (
    <TouchableOpacity
      onPress={() => scrollActiveIndex(index)}
      // delayLongPress= { () => navigation.navigate('Vision Details', { item }) }
      onLongPress={activeIndex === index ? () => setVisible(true) : undefined}
    >
      <Image
        source={{ uri: item.uri }}
        style={{
          borderColor: activeIndex === index ? '#fff' : 'transparent',
          ...styles.thumbImg
        }}
      />
    </TouchableOpacity>
  );

  return (
    <Tooltip
      anchor={ThumbNail}
      placement='top'
      visible={activeIndex === index ? visible : false}
      onBackdropPress={(): void => setVisible(false)}
    >
      <CloseButton onPress={(): { payload: VisionType; type: string; } => dispatch(deleteVision(item))} />
    </Tooltip>
  );

};

const styles = StyleSheet.create<ThumbStyles>({
  thumbImg: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: 3,
    marginRight: SPACING,
    borderWidth: 1,
  },
});

export default renderThumbnail;
