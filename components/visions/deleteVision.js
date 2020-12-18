import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { deleteVision, addJournal } from '../../redux/actions';
import { globalStyles, coltsBlue } from '../../styles/global';
export function DeleteVision({ deleteVision, item }) {

    const removeVision = id => {
        // save item.id from props to buttonId
        var buttonId = id;
        //calls redux action on stored visions
        deleteVision(buttonId);
    };

    return (
        <View>
            <Button style={globalStyles.visionDeleteButton} color={coltsBlue} icon="close-outline" onPress={() => removeVision(item)}>
                <Text>Delete</Text>
            </Button>
        </View>
    )
}

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