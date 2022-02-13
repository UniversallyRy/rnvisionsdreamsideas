import React, {  useEffect, useState } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { windowWidth } from '../../utils/dimensions';
import { useAppDispatch } from '../../utils/hooks';
import months from '../../utils/months';
import { changeMonth } from '../../redux/reducers/journals';
import { CloseIcon } from '../../shared/icons';


interface Styles {
  container: ViewStyle
  listGroup: ViewStyle;
  listItem: TextStyle;
}

const MonthSelect = () => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const dispatch = useAppDispatch();
  const displayValue = months[selectedIndex.row];

  useEffect(() => {    
    dispatch(changeMonth(displayValue))
  }, [displayValue]);

  const handleItemPress = (index) => {
    setSelectedIndex(index)
  }

  return (
    <Layout style={ styles.container } level='1'>
      <Select
        style={ styles.listGroup }
        value={ displayValue }
        label='See All or A Month'
        selectedIndex={ selectedIndex }
        onSelect={ handleItemPress }
        accessibilityLabel='Dropdown of months to filter journal entries'
      >
        {months.map(item => {
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
    width: windowWidth,
    margin: 1,
    zIndex: 1,
  },
  listGroup: {
    justifyContent: 'center',
    width: windowWidth,
  },
  listItem: {
  }
});
  
export default MonthSelect;
