import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { CloseButton } from '../../../shared/buttons';
import { useAppDispatch } from '../../../utils/hooks';
import { windowWidth } from '../../../utils/dimensions';
import { deleteIdea } from '../../../redux/reducers/ideas';

interface Styles {
  idea: ViewStyle;
  ideaContent: ViewStyle;
  ideaText: TextStyle;
  ideaDelete: TextStyle;
}

const Idea = ({ inputValue, inputId }) => {
  const dispatch = useAppDispatch();

  return (
    <Card style={ styles.idea }>
      <View style={ styles.ideaContent }>
        <Text style= { styles.ideaText}>{ inputValue }</Text>
        <CloseButton
          style={ styles.ideaDelete }
          onPress={ () => dispatch(deleteIdea({ inputId })) }
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
    idea: {
      alignSelf: 'center',
      width: windowWidth * 0.99,
      margin: 2,
      elevation: 2,
    },
    
    ideaContent:{
      flexDirection: 'row',
      justifyContent: 'center'
    },
    ideaText:{
      fontSize: 14,
    },
    ideaDelete: {
      marginLeft: 'auto',
    },
  });
  
export default Idea;