import React, { FC, useState } from 'react';
import { Modal, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Card, Layout } from '@ui-kitten/components';
import IdeaModal from './IdeaModal';
import { Idea } from '../../redux/reducers/ideas';
import { StoreProps } from '../../redux/store';

type IdeaProps = {
  ideas: Idea[];
}

interface Styles {
  ideaContainer: ViewStyle;
  ideaTitle: TextStyle;
  count: TextStyle;
  subtitle: ViewStyle;
}

const IdeaList: FC<IdeaProps> = ({ ideas }) => {
  const [visible, setVisible] = useState(false);
  const ideaCount = Object.keys(ideas).length;

  const toggleListModal = () => {
    setVisible(!visible);
  };

  return (
    <Card style={ [styles.ideaContainer, { backgroundColor: 'green' }] } onPress={ () => toggleListModal() }>
      <Modal
        animationType='slide'
        visible={ visible }
        onRequestClose={ () => toggleListModal() }
      >
        <IdeaModal ideas={ ideas } closeModal={ () => toggleListModal() }/>
      </Modal>
        <Text style={ styles.ideaTitle } numberOfLines={ 1 }>
          List of Ideas
        </Text>
        <Layout style={{ alignItems: 'center', bottom: 0, backgroundColor: 'transparent' }}>
          <Text style={ styles.count }>{ ideaCount }</Text>
          <Text style={ styles.subtitle }>Ideas</Text>
        </Layout>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  ideaContainer: {
    padding: 32,
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
    height: 280,
    elevation: 2,
  },
  ideaTitle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  count: {
    marginTop: 40,
    fontSize: 48,
    fontWeight: '200',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
  },
});

const mapStateToProps = (state: StoreProps) => {
  const { ideas, todos } = state;
  return { ideas, todos };
};

export default connect(mapStateToProps)(IdeaList);
export type PropsFromRedux = ConnectedProps<typeof IdeaList>;
