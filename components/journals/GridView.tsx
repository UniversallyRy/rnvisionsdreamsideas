import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { Card, Layout, Text } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../utils/dimensions';

type GridProps = {
  navigation: NavigationScreenProp<string, object>;
  list: Object[];
  month: string;
}

interface Styles {
  container: ViewStyle;
  grid: ViewStyle;
  gridItem: ViewStyle;
  itemDate: TextStyle;
}

const JournalGridContainer: FunctionComponent<GridProps> = ({ list, month, navigation }) => {     

  return (
    <Layout style={ styles.container }>
      <FlatList
        scrollEnabled
        numColumns={ 3 }
        contentContainerStyle={ styles.grid }
        data={ list }
        accessibilityLabel='Journal List Entries in Grid Format'
        renderItem={ ({ item }: any) => {
          const { title, body, date } = item;
          if ((month != 'All') && !date.includes(month)) {
            return null
          }else{
            return (
              <Card
                key={ title + '_key' }
                style={ styles.gridItem }
                onPress={ () => navigation.navigate('Journal Details', { title, body, date }) }
              >
                <Text>{ title }</Text>
                <Text style={ styles.itemDate }>
                  { date }
                </Text>
              </Card>
            );
        }}}
      />
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: windowHeight,
    marginTop: 2,
    paddingTop: 2,
  },
  grid: {
    padding: 10,
  },
  gridItem: {
    borderRadius: 3,
    height: windowHeight * 0.25,
    width: windowWidth * 0.29,
    margin: 5,
    elevation: 5,
  },
  itemDate: {
    marginTop: 30,
    top:100,
    right: 20,
  },
});

const mapStateToProps = (state:any) => {
  const { journals } = state
  const { month, list } = journals;
  return { month, list };
};

export default connect(mapStateToProps)(JournalGridContainer);
