import React, { FC } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Layout, Card, Text, Divider } from '@ui-kitten/components';
import Header from '../shared/header';
import { windowHeight, windowWidth } from '../utils/dimensions';

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

const JournalDetails: FC<DetailsProps> = ({ route, navigation }) => {

  const { title, body, date } = route.params;

  const Details = ({ child, style }) => {
    return (
      <>
        <Divider />
        <Text style={ style }>
          { child }
        </Text>
      </>
    );
  };

  return (
    <Layout style={ styles.container }>
      <Header name='Vision Details' navigation={ navigation }/>
      <Card style={ styles.card }>
        <Details child={ title } style={ styles.textTitle }/>
        <Details child={ body } style={ styles.textBody }/>
        <Details child={ date } style={ styles.textDate }/>
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

export default JournalDetails;
