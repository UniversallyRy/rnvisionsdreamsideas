import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import TodoLists from "./todoLists";
import NoteList from "./noteList";
import AddTodoListModal from "./addTodoListModal";
import AddNoteModal from "./addNoteModal";
import { coltsGray } from "../../styles/global";

const NoteMain = ({ stateNotes, stateTodos }) => {
  const [todoModal, setTodoModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);

  const toggleTodoModal = () => {
    setTodoModal(!todoModal);
  };
  const toggleNoteModal = () => {
    setNoteModal(!noteModal);
  };

  const renderList = (list) => {
    return <TodoLists list={list} />;
  };

  const renderNotes = (notes) => {
    return <NoteList notes={notes} />;
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
        <FlatList
          data={stateNotes}
          style={{ marginRight: 5 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderNotes(item)}
        />
        <FlatList
          data={stateTodos}
          keyExtractor={(item) => item.id.toString()}
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

const mapStateToProps = (state, ownProps) => {
  return {
    stateTodos: state.todos,
    stateNotes: state.notes,
  };
};

const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(NoteMain);
