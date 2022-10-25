import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { Layout, Card, List, Text } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../../utils/constants';
import { JournalListType } from '../../../redux/reducers/journals';
import { StoreProps } from '../../../redux/store';
import { GridStyles } from '../styles';
//todos: add draggability
interface GridProps extends JournalListType {
  navigation: NavigationScreenProp<string, object>;
}

const GridView = ({ month, list, navigation }: GridProps): JSX.Element => (
  <Layout style={styles.container}>
    <List
      scrollEnabled
      numColumns={3}
      contentContainerStyle={styles.grid}
      data={list}
      accessibilityLabel='Journal List Entries in Grid Format'
      renderItem={({ item }): JSX.Element | null => {
        const { title, body, date } = item;
        if ((month != 'All') && !date.includes(month)) {
          return null;
        } else {
          return (
            <Card
              key={title + '_key'}
              style={styles.item}
              onPress={(): boolean => navigation.navigate('Journal Details', { title, body, date })}
            >
              <Text>{title}</Text>
              <Text style={styles.itemDate}>
                {date}
              </Text>
            </Card>
          );
        }
      }}
    />
  </Layout>
);

const styles = StyleSheet.create<GridStyles>({
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
    top: 100,
    right: 20,
  },
});

const mapStateToProps = (state: StoreProps) => {
  const { journals } = state;
  const { month, list } = journals;

  return { month, list };
};

export type PropsFromRedux = ConnectedProps<typeof GridView>;
export default connect(mapStateToProps)(GridView);
