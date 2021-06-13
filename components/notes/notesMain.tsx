import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  StyleProp,
  TextStyle, 
  ViewStyle,
} from "react-native";
import { Text } from "react-native-paper";
import TodoLists from "./todoLists";
import NoteList from "./noteList";
import AddTodoListModal from "./addTodoListModal";
import AddNoteModal from "./addNoteModal";
import { Icon } from "../../shared/icon";

interface NoteMainProps {
  stateNotes: [];
  stateTodos: [];
  container?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  divider?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  addList?: StyleProp<ViewStyle>;
}

interface Styles {
  container: ViewStyle;
  titleStyle: TextStyle;
  divider: ViewStyle;
  title: TextStyle;
  addList: ViewStyle;
}


const NoteMain: React.FC<NoteMainProps> = ({ stateNotes, stateTodos }) => {
  const [todoModal, setTodoModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);

  const toggleTodoModal = () => {
    setTodoModal(!todoModal);
  };
  const toggleNoteModal = () => {
    setNoteModal(!noteModal);
  };

  const renderList = (list:any) => {
    return <TodoLists list={list} />;
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={todoModal}
        onRequestClose={() => toggleTodoModal()}
      >
        <AddTodoListModal closeModal={() => toggleTodoModal()} />
      </Modal>
      <Modal
        animationType="slide"
        visible={noteModal}
        onRequestClose={() => toggleNoteModal()}
      >
        <AddNoteModal closeModal={() => toggleNoteModal()} />
      </Modal>
      <View style={styles.titleStyle}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Note{" "}
          <Text style={{ fontWeight: "300", color: "lightgray" }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View
        style={{
          height: 450,
          flexDirection: "row",
        }}
      >
        <NoteList notes={stateNotes} key={1} />
        <FlatList
          keyExtractor={(_, index) => index.toString()}  
          data={stateTodos}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
      <View style={styles.addList}>
        <Icon item="plus" onPress={() => toggleNoteModal()} />
        <Icon item="plus" onPress={() => toggleTodoModal()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    flexDirection: "row",
    marginTop: 50,
  },
  divider: {
    backgroundColor: "black",
    height: 1,
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    paddingHorizontal: 20,
  },
  addList: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "auto"
  },
});

export default NoteMain;
