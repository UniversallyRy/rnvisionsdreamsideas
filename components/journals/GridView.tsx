import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Card, Layout, Text } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../utils/dimensions';
import { JournalStateProps } from '../../redux/reducers/journals';
import { StoreProps } from '../../redux/store';

interface GridProps extends JournalStateProps {
  navigation: NavigationScreenProp<string, object>;
}

interface Styles {
  container: ViewStyle;
  grid: ViewStyle;
  item: ViewStyle;
  itemDate: TextStyle;
}

const GridView: FunctionComponent<GridProps> = ({ month, list, navigation }) => {     

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
                style={ styles.item }
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
  item: {
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

const mapStateToProps = (state:StoreProps)=> {
  const { journals } = state
  const { month, list } = journals;
  return { month, list };
};

export default connect(mapStateToProps)(GridView);

export type PropsFromRedux = ConnectedProps<typeof GridView>
