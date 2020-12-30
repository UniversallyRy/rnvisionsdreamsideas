import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { deleteJournal } from '../../redux/actions';

export function DeleteJournal({ deleteJournal, item }) {
    const removeJournal = () => {
        //prop item = item.id
        var buttonId = item;
        deleteJournal( buttonId );
    }

    return (
        <View style={ styles.buttonsContainer }>
            <Button style={ styles.buttons }>Edit</Button>
            <Button id={ id } onPress={ () => removeJournal() } style={ styles.buttons }>Delete</Button>
        </View>
    )
}

const styles = StyleSheet.create({
        buttonsContainer: {
            flexDirection: 'row',
            backgroundColor: 'green',
            alignContent: 'center',
            alignSelf: 'center',
        },
        buttons: {
            alignContent:'center',
            alignSelf: 'center',
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
  )( DeleteJournal )