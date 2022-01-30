import React, { createContext, FunctionComponent, useState } from "react";
import { StyleSheet, Text, FlatList, Modal, TextStyle, ViewStyle, View } from "react-native";
import { Divider, Layout } from "@ui-kitten/components";
import NoteList from "./noteList";
import AddNoteModal from "./addNoteModal";
import TodoLists from "./todoLists";
import AddTodoListModal from "./addTodoListModal";
import { FooterButtons } from "../../shared/buttons";

type NoteMainProps = {
  stateNotes: object[];
  stateTodos: object[];
}

type ContextProps = {
  toggleTodoModal: () => void;
  toggleNoteModal: () => void;
}

interface Styles {
  container: ViewStyle;
  titleStyle: TextStyle;
  title: TextStyle;
  addList: ViewStyle;
}

export const NoteContext = createContext<ContextProps>({toggleTodoModal: () => {}, toggleNoteModal: () => {}});

const NoteMain: FunctionComponent<NoteMainProps> = ({ stateNotes, stateTodos }) => {
  const [todoModal, setTodoModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);

  const toggleTodoModal = () => {
    setTodoModal(!todoModal);
  };
  const toggleNoteModal = () => {
    setNoteModal(!noteModal);
  };

  const renderList = (list) => {
    return <TodoLists list={ list } />;
  };

  return (
    <Layout style={ styles.container }>
      <NoteContext.Provider value={{ toggleNoteModal, toggleTodoModal }}>
        <Modal
          animationType="slide"
          visible={ todoModal }
          onRequestClose={ () => toggleTodoModal() }
        >
          <AddTodoListModal closeModal={ () => toggleTodoModal() } />
        </Modal>
        <Modal
          animationType="slide"
          visible={ noteModal }
          onRequestClose={ () => toggleNoteModal() }
        >
          <AddNoteModal closeModal={() => toggleNoteModal()} />
        </Modal>
          <Divider/>
          <Text style={ styles.title }>
            Note{" "}
            <Text style={{ fontWeight: "300", color: "lightgray" }}>Lists</Text>
          </Text>
          <Divider/>
        <View
          style={{
            height: 450,
            flexDirection: "row",
          }}
          >
          <NoteList notes={ stateNotes } key={ 1 } />
          <FlatList
            keyExtractor={ (_, index) => index.toString() }  
            data={ stateTodos }
            horizontal={ true }
            showsHorizontalScrollIndicator={ false }
            renderItem={ ({ item }) => renderList(item) }
            keyboardShouldPersistTaps="always"
            />
        </View>
        <FooterButtons context={NoteContext}/>
      </NoteContext.Provider>
    </Layout>
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
