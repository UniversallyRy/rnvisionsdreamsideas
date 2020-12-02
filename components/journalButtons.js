import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { deleteJournal } from '../redux/actions';
import { connect } from 'react-redux';
import { globalStyles } from '.././styles/global'

export function JournalButtons( {deleteJournal, item}) {

    const removeJournal = () => {
        // saves prop item.id 
        var journalId = item;
        // calls redux action on item.id
        deleteJournal(journalId);
    }

    return (
        <View style={styles.buttonsContainer}>
            <Button style={styles.editButton} color='#002C5F' icon="lead-pencil" mode="contained" >Edit</Button>
            <Button style={styles.deleteButton} color='red' icon="close-outline" mode="contained" onPress={() => removeJournal()} style={styles.buttons}>Delete</Button>
        </View>
    )
}

const styles = StyleSheet.create({
        buttonsContainer: {
            flexDirection: 'row',
            alignContent: 'center',
            margin: 15,
            fontSize: 30,
        },
        editButton: {
            margin:  1,
        },
        deleteButton: {
            margin: 3,
        }
})

const mapStateToProps = ( state, ownProps ) => {
    return {
      state: state.journals
    }
  }
  
  const mapDispatchToProps = { deleteJournal }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(JournalButtons)