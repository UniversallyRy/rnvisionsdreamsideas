import React, { FunctionComponent } from 'react';
import { SafeAreaView, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Card, Layout, Text} from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import Header from '../../shared/header';

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
  detailsContainer: ViewStyle;
  detailsCard: ViewStyle;
  detailsTitle: ViewStyle;
  detailsText: TextStyle;
  detailsDate: TextStyle;
  detailsButton: TextStyle;
  divider: ViewStyle;
}

const ItemDetails: FunctionComponent<DetailsProps> = ({ route, navigation }) => {

  const { title, body, date } = route.params;

  return (
    <SafeAreaView style={styles.detailsContainer}>
      <Header name='Vision Details' navigation={navigation}/>
      <Card style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>
          {' '}
          {title}{' '}
        </Text>
        <Layout style={styles.divider} />
        <Text style={styles.detailsText}>
          {' '}
          {body}{' '}
        </Text>
        <Layout style={styles.divider} />
        <Text style={styles.detailsDate}>
          {' '}
          {date}{' '}
        </Text>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
  detailsContainer: {
    flexDirection: 'column',
    width: windowWidth,
    height: windowHeight,
    alignContent: 'center',
  },
  detailsCard: {
    alignSelf: 'center',
    margin: 10,
    width: windowWidth * 0.99,
    height: windowHeight * 0.5
  },
  detailsTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 18,
    padding: 10,
  },
  detailsText: {
    fontSize: 14,
    fontFamily: 'roboto-regular',
    padding: 7,
    marginTop: 50,
    marginVertical: 18,
    lineHeight: 20,
  },
  detailsDate: {
    fontFamily: 'roboto-italic',
    fontSize: 10,
    padding: 10,
  },
  detailsButton: {
    fontSize: 40,
    fontFamily: 'roboto-black',
  },
  divider: {
    backgroundColor: 'black',
    alignSelf: 'center',
    height: 0.3,
    width: windowWidth * 0.98,
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.7,
  },
});

export default ItemDetails;
