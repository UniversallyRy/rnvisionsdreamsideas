import React, { memo, MemoExoticComponent } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { NavigationScreenProp } from 'react-navigation';
import { VisionType } from '../../../redux/reducers/visions';
import { windowHeight, windowWidth } from '../../../utils/constants';
import { ItemStyles } from '../styles';

type ItemProps = {
  item: VisionType;
  navigation: NavigationScreenProp<string, object>;
  index?: number;
}

const GridItem: MemoExoticComponent<any> = memo(({ item, navigation }: ItemProps): JSX.Element => (
  <TouchableOpacity
    style={styles.gridItem}
    accessibilityLabel={'Grid Item'}
    onPress={() => navigation.navigate('Vision Details', { item })}
    accessible
  >
    <Image
      style={styles.img}
      source={{ uri: item.uri }}
      testID={item.id}
      resizeMode={'cover'}
    />
  </TouchableOpacity>
));

GridItem.displayName = 'GridItem';

const styles = StyleSheet.create<ItemStyles>({
  gridItem: {
    margin: 4,
    elevation: 2,
  },
  img: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.45,
    borderRadius: 4,
  },
})

export default GridItem;
