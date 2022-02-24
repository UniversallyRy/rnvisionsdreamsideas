import React, {  useState, useEffect } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { CloseIcon } from '../../shared/icons';
import { MONTHS, windowWidth } from '../../utils/constants';
import { useAppDispatch } from '../../utils/hooks';
import { changeMonth } from '../../redux/reducers/journals';

interface Styles {
  container: ViewStyle
  list: ViewStyle;
  listItem: TextStyle;
}

const MonthSelect = () => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const dispatch = useAppDispatch();
  const displayValue = MONTHS[selectedIndex.row];

  useEffect(() => {    
    dispatch(changeMonth(displayValue))
  }, [displayValue]);

  const handleItemPress = (index) => {
    setSelectedIndex(index)
  }

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
        {MONTHS.map(item => {
          return(
            <SelectItem  
              style={ styles.listItem } 
              key={ item } 
              title={ item }
              accessoryRight={ CloseIcon }
              accessibilityLabel={ `Dropdown text for ${ item }` }
            />
          )
        })}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
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
