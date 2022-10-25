import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { List } from '@ui-kitten/components';
import ListItem from './ListItem';
import { JournalListType } from '../../../redux/reducers/journals';
import { StoreProps } from '../../../redux/store';
import { ListStyles } from '../styles';
//todos: add draggability
interface ListProps extends JournalListType {
  navigation: NavigationScreenProp<string, object>;
}

const ListView = ({ month, list, navigation }: ListProps): JSX.Element => (
  <List
    style={styles.container}
    data={list}
    accessibilityLabel='Contains Journal Entries'
    keyExtractor={(_item, index) => index.toString()}
    renderItem={({ item }): JSX.Element | null => {
      if ((month != 'All') && !item.date.includes(month)) {
        return null;
      }
      return <ListItem navigation={navigation} item={item} />;
    }}
  />
);

const styles = StyleSheet.create<ListStyles>({
  container: {
    alignSelf: 'center',
  }
});

const mapStateToProps = (state: StoreProps) => {
  const { journals } = state
  const { month, list } = journals;

  return { month, list };
};

export default connect(mapStateToProps)(ListView);
export type PropsFromRedux = ConnectedProps<typeof ListView>;
