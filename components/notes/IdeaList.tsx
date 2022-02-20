import React, { FC, useState } from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Layout, Modal, Card, Text } from '@ui-kitten/components';
import IdeasModal from './ideasModal';
import { Idea } from '../../redux/reducers/ideas';
import { StoreProps } from '../../redux/store';

type IdeasProps = {
  ideas: Idea[];
}

interface Styles {
  listContainer: ViewStyle;
  listTitle: TextStyle;
  listContent: TextStyle;
  listCount: TextStyle;
  listText: TextStyle;
}

const IdeaList: FC<IdeasProps> = ({ ideas }) => {
  const [visible, setVisible] = useState(false);
  const ideaCount = Object.keys(ideas).length;

  const toggleListModal = () => {
    setVisible(!visible);
  };

  return (
    <Card style={ styles.listContainer } onPress={ () => toggleListModal() }>
      <Modal visible={ visible }>
        <IdeasModal ideas={ ideas } closeModal={ () => toggleListModal() }/>
      </Modal>
        <Text style={ styles.listTitle } numberOfLines={ 1 }>
          List of Ideas
        </Text>
        <Layout style={ styles.listContent }>
          <Text style={ styles.listCount }>{ ideaCount }</Text>
          <Text style={ styles.listText }>Ideas</Text>
        </Layout>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  listContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 200,
    height: 280,
    backgroundColor: 'green',
    padding: 32,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    borderRadius: 6,
    elevation: 2,
  },
  listContent: { 
    alignItems: 'center',
    backgroundColor: 'transparent', 
    bottom: 0 
  },
  listTitle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  listCount: {
    fontSize: 48,
    fontWeight: '200',
    marginTop: 40,
  },
  listText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

const mapStateToProps = (state: StoreProps) => {
  const { ideas } = state;
  return { ideas };
};

export default connect(mapStateToProps)(IdeaList);
export type PropsFromRedux = ConnectedProps<typeof IdeaList>;
