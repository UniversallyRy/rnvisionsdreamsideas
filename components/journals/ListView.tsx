import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import ListItem from './ListItem';
import { JournalStateProps } from '../../redux/reducers/journals';

type JournalListProps = {
  list: [];
  month: string;
  navigation: NavigationScreenProp<string, object>;
 }

interface Styles {
  container: ViewStyle;   
}

const ListView: FunctionComponent<JournalListProps> = ({ list, month, navigation }) => {

  return (
    <FlatList
      style={ styles.container }
      data={ list }
      accessibilityLabel='Contains Journal Entries'
      keyExtractor={ (_item, index) => index.toString() }
      renderItem={ ({ item }:any) => {
        if ((month != 'All') && !item.date.includes(month)) {
          return null
        }
        return <ListItem navigation={ navigation } item={ item } />
      }}
    />
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    alignSelf: 'center',
  },
});

const mapStateToProps = (state): JournalStateProps => {
  const { journals } = state
  const { month, list } = journals;
  return { month, list };
};

export default connect(mapStateToProps)(ListView);

export type PropsFromRedux = ConnectedProps<typeof ListView>

