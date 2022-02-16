import React, { FunctionComponent } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout, Card, Text, Divider } from '@ui-kitten/components';
import { NavigationScreenProp } from 'react-navigation';
import Header from '../../shared/header';
import { windowHeight, windowWidth } from '../../utils/dimensions';

export type DetailsProps = {
  route: {
    key: string;
    name: string;
    params: {
      title: string;
      body: string;
      date: string;
    },
    path: undefined;
  };
  navigation: NavigationScreenProp<string, object>;
}

interface Styles {
  container: ViewStyle;
  card: ViewStyle;
  textTitle: TextStyle;
  textBody: TextStyle;
  textDate: TextStyle;
}

const ItemDetails: FunctionComponent<DetailsProps> = ({ route, navigation }) => {

  const { title, body, date } = route.params;

  return (
    <Layout style={ styles.container }>
      <Header name='Vision Details' navigation={ navigation }/>
      <Card style={ styles.card }>
        <Text style={ styles.textTitle }>
          { title }
        </Text>
        <Divider />
        <Text style={ styles.textBody }>
          { body }
        </Text>
        <Divider />
        <Text style={ styles.textDate }>
          { date }
        </Text>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'column',
    width: windowWidth,
    height: windowHeight,
    alignContent: 'center',
  },
  card: {
    alignSelf: 'center',
    margin: 10,
    width: windowWidth * 0.99,
    height: windowHeight * 0.5
  },
  textTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 18,
    padding: 10,
  },
  textBody: {
    fontSize: 14,
    fontFamily: 'roboto-regular',
    padding: 7,
    marginTop: 50,
    marginVertical: 18,
    lineHeight: 20,
  },
  textDate: {
    fontFamily: 'roboto-italic',
    fontSize: 10,
    padding: 10,
  },
});

export default ItemDetails;
