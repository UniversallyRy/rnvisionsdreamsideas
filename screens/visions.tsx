import React, { useState, useRef, useEffect, createContext, SetStateAction, Dispatch } from "react";
import { Animated, Modal, StyleSheet, ViewStyle } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { Layout } from "@ui-kitten/components";
import Header from "../shared/header";
import ListView from "../components/visions/ListView";
import GridView from "../components/visions/GridView";
import ModalContent from "../components/visions/Modal";
// todos: make visions drag and droppable, fix image reslolution/size

interface VisionProps {
  navigation: NavigationScreenProp<string, object>;
}

type ContextProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>; 
  toggleView: () => void;
}

interface Styles {
  container: ViewStyle;
}

// Context for methods to add vision and change view buttons
export const VisionContext = createContext<ContextProps>({setModalOpen: () => {}, toggleView: () => {}});

const Visions: React.FC<VisionProps> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState(false);
  

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {}
    return () => { isCancelled = true };
  }, []);

  const toggleView = () => {
    setView(!view);
  };

  return (
    <Layout style={ styles.container }>
      <Header name={ "Visions" } />
      <Modal visible={ modalOpen } animationType={ "slide" }>
        <ModalContent setModalOpen={ setModalOpen } />  
      </Modal>
      {/* when gridview is toggled use gridContainer otherwise VisionsContainer */}
      <VisionContext.Provider value={{ setModalOpen, toggleView }}>
      {view ? (
        <GridView navigation={ navigation } />
      ) : (
        <ListView navigation={ navigation } />
      )}
      </VisionContext.Provider>
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    fontFamily: "roboto-black",
  }
});

export default Visions;
