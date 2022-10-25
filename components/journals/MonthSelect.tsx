import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { CloseIcon } from '../../shared/Icons';
import { MONTHS, windowWidth } from '../../utils/constants';
import { useAppDispatch } from '../../utils/hooks';
import { changeMonth } from '../../redux/reducers/journals';
import { MonthStyles } from './styles';

const MonthSelect = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const displayValue = MONTHS[selectedIndex.row];

  const handleItemPress = (index: IndexPath): void => {
    setSelectedIndex(index)
  };

  useEffect(() => {
    dispatch(changeMonth(displayValue))
  }, [displayValue]);

  return (
    <Layout style={styles.container} level='1'>
      <Select
        style={styles.list}
        value={displayValue}
        label='See All or A Month'
        selectedIndex={selectedIndex}
        onSelect={handleItemPress}
        accessibilityLabel='Dropdown of months to filter journal entries'
      >
        {MONTHS.map(item => (
          <SelectItem
            style={styles.listItem}
            key={item}
            title={item}
            accessoryRight={CloseIcon}
            accessibilityLabel={`Dropdown text for ${item}`}
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
