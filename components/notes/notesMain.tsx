import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleProp,
  TextStyle, 
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TodoLists from "./todoLists";
import NoteList from "./noteList";
import AddTodoListModal from "./addTodoListModal";
import AddNoteModal from "./addNoteModal";
import { coltsGray } from "../../styles/global";

interface NoteMainProps {
  stateNotes: object;
  stateTodos: object;
  container?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  divider?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  addList?: StyleProp<ViewStyle>;
  add?: StyleProp<TextStyle>;
}

interface Styles {
  container: ViewStyle;
  titleStyle: TextStyle;
  divider: ViewStyle;
  title: TextStyle;
  addList: ViewStyle;
  add: TextStyle;
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

  const renderList = (list:object) => {
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
          <Text style={{ fontWeight: "300", color: coltsGray }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View
        style={{
          height: 450,
          flexDirection: "row",
          paddingLeft: 22,
          marginTop: 40,
        }}
      >
        <NoteList notes={stateNotes} style={{ marginRight: 3 }} key={1} />
        <FlatList
          keyExtractor={(_, index) => index.toString()}  
          data={stateTodos}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
      <View
        style={{
          marginVertical: 48,
          paddingBottom: 24,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            margin: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => toggleNoteModal()}
            style={styles.addList}
          >
            <AntDesign color={coltsGray} name="plus" size={30} />
          </TouchableOpacity>
          <Text style={styles.add}>Add New Note</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            margin: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => toggleTodoModal()}
            style={styles.addList}
          >
            <AntDesign color={coltsGray} name="plus" size={30} />
          </TouchableOpacity>
          <Text style={styles.add}>Add New Todos</Text>
        </View>
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
    marginTop: 40,
  },
  divider: {
    backgroundColor: coltsGray,
    height: 1,
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "black",
    paddingHorizontal: 20,
  },
  addList: {
    borderWidth: 2,
    width: 100,
    borderColor: coltsGray,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: coltsGray,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 6,
    alignSelf: "center",
  },
});

export default NoteMain;
