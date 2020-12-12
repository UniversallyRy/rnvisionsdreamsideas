import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { deleteJournal } from '../../redux/actions';

const { width: windowWidth } = Dimensions.get("window");

export function JournalButtons({ deleteJournal, item }) {

    const removeJournal = () => {
        // saves prop item.id 
        var journalId = item;
        // calls redux action on item.id
        deleteJournal(journalId);
    }

    return (
        <View style={styles.buttonsContainer}>
            <Button style={styles.editButton} color='#002C5F' icon="lead-pencil" mode="contained" >Edit</Button>
            <Button style={styles.deleteButton} color='red' icon="close-outline" mode="contained" onPress={() => removeJournal()}>Delete</Button>
        </View>
    )
}

const styles = StyleSheet.create({
        buttonsContainer: {
            flexDirection: 'row',
            alignContent: 'center',
            fontSize: 20,
            marginTop: 4,
        },
        editButton: {
            flex: .51,
        },
        deleteButton: {
            flex: .51,
            marginLeft: 2,
        },
})

const mapStateToProps = ( state, ownProps ) => {
    return {
            // reducers/journals.js 
      state: state.journals
    }
  }
  
  const mapDispatchToProps = { deleteJournal }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(JournalButtons)