import React, { memo, useCallback } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ScreenImgStyles } from '../Styles';
import { VisionType } from '../../../redux/reducers/visions';
import { windowHeight, windowWidth } from '../../../utils/constants';

type ItemProps = {
    item: VisionType;
}

const ScreenImage = memo(({ item }: ItemProps): JSX.Element => (
    <Layout style={ styles.bgImg }>
      <Image
        source={{ uri: item.uri }}
        style={[StyleSheet.absoluteFill]}
      />
    </Layout>
));

ScreenImage.displayName = "ScreenImage";

export const renderBgImage = useCallback(({ item }: ItemProps): JSX.Element => (
  <ScreenImage item={ item } />
), []);

const styles = StyleSheet.create<ScreenImgStyles>({
    bgImg:{
        width: windowWidth,
        height: windowHeight
    },
})
