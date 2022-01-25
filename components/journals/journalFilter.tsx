import React, {  useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { StyleSheet, ViewStyle } from "react-native";
import months from '../../utils/months';
import { windowHeight, windowWidth } from "../../utils/dimensions";
import { changeMonth } from "../../redux/reducers/journals";
import { Layout, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { CloseIcon } from '../../shared/button';


type FilterProps = {
    state: string;
  }

interface Styles {
    container: ViewStyle
    listContainer: ViewStyle;
    listItem: ViewStyle;
  }

const JournalFilter: React.FC<FilterProps> = ({ state }) => {
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const dispatch = useDispatch();
    const displayValue = months[selectedIndex.row];

    useEffect(() => {    
      dispatch(changeMonth(displayValue))
    }, [displayValue]);

    const handleItemPress = (index) => {
      setSelectedIndex(index)
    }

    const MonthsList = () => {
        return (
            <Select
                style={styles.listContainer}
                value={displayValue}
                // title={state}
                // left={props => <List.Icon {...props} icon="calendar" />}
                label={"Month Picker"}
                selectedIndex={selectedIndex}
                onSelect={handleItemPress}
                accessibilityLabel="Dropdown of months to filter journal entries"
            >
            {months.map(item => {
                return(
                    <SelectItem  
                        style={styles.listItem} 
                        key={item} 
                        title={item}
                        accessoryRight={CloseIcon}
                        accessibilityLabel={`Dropdown text for ${item}`}
                    />
                )
            })}
            </Select>
        )
    }

    return (
        <Layout style={styles.container} level="1">
            <MonthsList/>
        </Layout>
    )
  
}

const styles = StyleSheet.create<Styles>({
    container: {
      width: windowWidth,
      margin: 1,
      zIndex: 1,
      backgroundColor: 'lightgray',
    },
    listContainer: {
      justifyContent: "center",
      width: windowWidth,
    },
    listItem: {
    }
  });
  

const mapStateToProps = (state) => {
    return {
        state: state.journals.monthFilter,
      };
}

export default connect(mapStateToProps)(JournalFilter);
