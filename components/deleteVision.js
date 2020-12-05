import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { deleteVision } from '../redux/actions';

export function DeleteVision({ deleteVision, item }) {

    
    const removeVision = () => {
        // save item.id from props to buttonId
        var buttonId = item;
        //calls redux action on stored todoss
        deleteVision(buttonId);
    }

    return (
        <View>
            <Button style={styles.deleteButton} color="red" icon="close-outline" mode="contained" onPress={() => removeVision()}>
                <Text>Delete</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    deleteButton: {

    }
})

const mapStateToProps = ( state, ownProps ) => {
    return {
      state: state.visions,
    }
  }
  
  const mapDispatchToProps = { deleteVision }


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( DeleteVision )