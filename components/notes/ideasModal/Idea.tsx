import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { CloseButton } from '../../../shared/Buttons';
import { deleteIdea, IdeaType } from '../../../redux/reducers/ideas';
import { IdeaStyles } from './styles';
import { useAppDispatch } from '../../../utils/hooks';
import { windowWidth } from '../../../utils/constants';

const Idea = ({ inputValue, inputId }: IdeaType): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{inputValue}</Text>
        <CloseButton
          style={styles.cardDelete}
          onPress={(): { payload: object; type: string; } => dispatch(deleteIdea({ inputId }))}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create<IdeaStyles>({
  card: {
    alignSelf: 'center',
    width: windowWidth * 0.99,
    margin: 2,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardText: {
    fontSize: 14,
  },
  cardDelete: {
    marginLeft: 'auto',
  },
});

export default Idea;
