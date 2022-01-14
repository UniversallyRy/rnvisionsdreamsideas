import React, {  useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { List } from 'react-native-paper';
import months from '../../utils/months';
import { windowWidth } from "../../utils/dimensions";
import { changeMonth } from "../../redux/reducers/journals";


type FilterProps = {
    state: string;
    container: StyleProp<ViewStyle>;
    listContainer: StyleProp<ViewStyle>;
    listItem: StyleProp<TextStyle>;
  }

interface Styles {
    container: ViewStyle
    listContainer: ViewStyle;
    listItem: ViewStyle;
  }

const JournalFilter: React.FC<FilterProps> = ({ state }) => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    const dispatch = useDispatch();

    const handleItemPress = (item) => {
        dispatch(changeMonth(item))
        setExpanded(false);
    }

    
    const MonthsList = () => {
        return (
            <List.Accordion
                style={styles.listContainer}
                title={state}
                left={props => <List.Icon {...props} icon="calendar" />}
                expanded={expanded}
                onPress={handlePress}
                accessibilityLabel="Dropdown of months to filter journal entries"
            >
            {months.map(item => {
                return(
                    <List.Item 
                        style={styles.listItem} 
                        key={item} 
                        title={item}
                        left={() => <List.Icon icon="calendar" />}
                        onPress={() => handleItemPress(item)}
                        titleStyle={{fontSize: 10}}
                        accessibilityLabel={`Dropdown text for ${item}`}
                    />
                )
            })}
            </List.Accordion>
        )
    }

    return (
        <List.Section style={styles.container}>
            <MonthsList/>
        </List.Section>
    )
  
}

const styles = StyleSheet.create<Styles>({
    container: {
      position: 'absolute',
      width: windowWidth,
      margin: 1,
      zIndex: 1,
      backgroundColor: 'lightgray',
    },
    listContainer: {
      justifyContent: "center",
      height: 40,
    },
    listItem: {
      height: 50,
    }
  });
  

const mapStateToProps = (state) => {
    return {
        state: state.journals.monthFilter,
      };
}

export default connect(mapStateToProps)(JournalFilter);
