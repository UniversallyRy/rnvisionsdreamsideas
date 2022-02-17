import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import ListItem from './ListItem';
import { JournalStateProps } from '../../redux/reducers/journals';
import { StoreProps } from '../../redux/store';

interface ListProps extends JournalStateProps {
  navigation: NavigationScreenProp<string, object>;
 }

interface Styles {
  container: ViewStyle;   
}

const ListView: FunctionComponent<ListProps> = ({ month, list, navigation }) => {

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

const mapStateToProps = (state: StoreProps) => {
  const { journals } = state
  const { month, list } = journals;
  return { month, list };
};

export default connect(mapStateToProps)(ListView);

export type PropsFromRedux = ConnectedProps<typeof ListView>

