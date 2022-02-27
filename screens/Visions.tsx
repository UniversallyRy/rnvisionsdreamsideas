import React, { useState, useRef, useEffect, createContext, SetStateAction, Dispatch } from "react";
import { Animated, StyleSheet } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { Layout, Modal } from "@ui-kitten/components";
import Header from "../shared/header";
import ListView from "../components/visions/ListView";
import GridView from "../components/visions/GridView";
import ModalContent from "../components/visions/Modal";
import { FooterButtons } from "../shared/buttons";
import { windowHeight, windowWidth } from "../utils/constants";
import { VisionStyles } from "./Styles";
// todos: make visions drag and droppable, fix image reslolution/size

interface VisionProps {
  navigation: NavigationScreenProp<string, object>;
}

type ContextProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>; 
  toggleView: () => void;
}
// Context for methods to add vision and change view buttons
export const VisionContext = createContext<ContextProps>({setModalOpen: () => {}, toggleView: () => {}});

const Visions: React.FC<VisionProps> = ({ navigation }): JSX.Element => {
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

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <Layout style={ styles.container }>
      <Header name={ "Visions" } />
      <Modal visible={ modalOpen }>
        <ModalContent setModalOpen={ toggleModal } />  
      </Modal>
      {/* when gridview is toggled use gridContainer otherwise VisionsContainer */}
      {view ? (
        <GridView navigation={ navigation } />
      ) : (
        <ListView navigation={ navigation } />
      )}
        <FooterButtons left={ toggleModal } right={ toggleView } />
    </Layout>
  );
};

const styles = StyleSheet.create<VisionStyles>({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    fontFamily: "roboto-black",
  }
});

export default Visions;
