import React, {  useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { CloseIcon } from '../../shared/icons';
import { MONTHS, windowWidth } from '../../utils/constants';
import { useAppDispatch } from '../../utils/hooks';
import { changeMonth } from '../../redux/reducers/journals';
import { MonthStyles } from './Styles';

const MonthSelect = (): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const dispatch = useAppDispatch();
  const displayValue = MONTHS[selectedIndex.row];

  useEffect(() => {    
    dispatch(changeMonth(displayValue))
  }, [displayValue]);

  const handleItemPress = (index): void => {
    setSelectedIndex(index)
  };

  return (
    <Layout style={ styles.container } level='1'>
      <Select
        style={ styles.list }
        value={ displayValue }
        label='See All or A Month'
        selectedIndex={ selectedIndex }
        onSelect={ handleItemPress }
        accessibilityLabel='Dropdown of months to filter journal entries'
      >
        {MONTHS.map(item => (
          <SelectItem
            style={ styles.listItem }
            key={ item }
            title={ item }
            accessoryRight={ CloseIcon }
            accessibilityLabel={ `Dropdown text for ${ item }` } 
          />
        ))}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create<MonthStyles>({
  container: {
    zIndex: 1,
    margin: 1,
  },
  list: {
    justifyContent: 'center',
    width: windowWidth,
  },
  listItem: {
    fontSize: 12,
  }
});
  
export default MonthSelect;
