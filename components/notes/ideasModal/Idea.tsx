import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { CloseButton } from '../../../shared/buttons';
import { deleteIdea, IdeaType } from '../../../redux/reducers/ideas';
import { useAppDispatch } from '../../../utils/hooks';
import { windowWidth } from '../../../utils/constants';

interface Styles {
  card: ViewStyle;
  cardContent: ViewStyle;
  cardText: TextStyle;
  cardDelete: TextStyle;
}

const Idea = ({ inputValue, inputId }: IdeaType) => {
  const dispatch = useAppDispatch();

  return (
    <Card style={ styles.card }>
      <View style={ styles.cardContent }>
        <Text style= { styles.cardText}>{ inputValue }</Text>
        <CloseButton
          style={ styles.cardDelete }
          onPress={ () => dispatch(deleteIdea({ inputId })) }
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
    card: {
      alignSelf: 'center',
      width: windowWidth * 0.99,
      margin: 2,
      elevation: 2,
    },
    
    cardContent:{
      flexDirection: 'row',
      justifyContent: 'center'
    },
    cardText:{
      fontSize: 14,
    },
    cardDelete: {
      marginLeft: 'auto',
    },
  });
  
export default Idea;