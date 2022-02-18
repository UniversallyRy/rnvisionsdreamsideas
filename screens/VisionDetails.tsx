import React, { FC } from 'react';
import { Image, StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Layout, Card, Text } from '@ui-kitten/components';
import Header from '../shared/header';
import { windowHeight, windowWidth } from '../utils/dimensions';

type DetailsProps = {
  navigation: NavigationScreenProp<string, object>;
  route: {
    key: string;
    name: string;
    params: {
      item: {
        id: string;
        title: string;
        uri: string;
      },
    },
    path: undefined;
  }
}

interface Styles {
  container: ViewStyle;
  card: ViewStyle;
  img: ImageStyle;
  title: TextStyle;
}

const VisionDetails: FC<DetailsProps> = ({ navigation, route }) => {
  const { id, title, uri } = route.params.item;

  return (
    <Layout style={ styles.container }>
      <Header name={ 'Vision Details' } navigation={ navigation }/>
      <Card style={ styles.card }>
          <Text style={ styles.title }>{ title }</Text>
          <Image key= { id } source={{ uri }} style={ styles.img } />
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,  
    fontFamily: 'roboto-black',
    flexDirection: 'column',
  },
  card: {
    alignSelf: 'center',
    width: windowWidth,
    height: windowHeight,
    elevation: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    marginBottom: 10,
  },
  img: {
    resizeMode: 'contain',
    borderRadius: 3,
    alignSelf: 'center',
    height: windowHeight * 0.65,
    width: windowWidth * 0.97,
    margin: 5,
  },
});

export default VisionDetails;
