import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import { deleteJournal } from '../redux/actions';
import { connect } from 'react-redux';
import { globalStyles } from '.././styles/global'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

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
            <Button style={styles.deleteButton} color='red' icon="close-outline" mode="contained" onPress={() => removeJournal()}>Delete</Button>
        </View>
    )
}

const styles = StyleSheet.create({
        buttonsContainer: {
            flexDirection: 'row',
            alignContent: 'center',
            margin: 2,
            fontSize: 20,
        },
        editButton: {
            alignContent: 'center',
            width: windowWidth * .49,
            marginRight: 2,
        },
        deleteButton: {
            alignContent: 'center',
            width: windowWidth * .49,
            marginLeft: 1,
        },
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