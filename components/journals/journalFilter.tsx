import React, {  useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { List } from 'react-native-paper';
import months from '../../utils/months';
import { windowHeight, windowWidth } from "../../utils/dimensions";

type GridProps = {
    state: object[];
    container: StyleProp<ViewStyle>;
    listContainer: StyleProp<ViewStyle>;
    listItem: StyleProp<TextStyle>;
  }

interface Styles {
    container: ViewStyle
    listContainer: ViewStyle;
    listItem: ViewStyle;
  }

const JournalFilter = () => {
    const [newState, setState] = useState()
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    
    const MonthsList = () => {
        return (
            <List.Accordion
                style={styles.listContainer}
                title="By Month"
                left={props => <List.Icon {...props} icon="calendar" />}
                expanded={expanded}
                onPress={handlePress}
            >
            {months.map(item => {
                return(
                     <List.Item 
                        style={styles.listItem} 
                        key={item} 
                        title={item}
                        left={() => <List.Icon icon="calendar" />}
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
      paddingTop: 10,
    },
    listContainer: {
      padding: 10,
      zIndex: 0,
    },
    listItem: {
      borderRadius: 4,
      fontSize: 6,
    }
  });
  

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalFilter)
