import React, { useState, useRef, useEffect, createContext, SetStateAction, Dispatch } from "react";
import { Animated, Modal, ViewStyle, StyleSheet } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { Layout } from "@ui-kitten/components";
import VisionsListContainer from "../components/visions/visionImageList";
import VisionGridContainer from "../components/visions/visionImageGrid";
import AddVision from "../components/visions/addVisionModal";
import Header from "../shared/header";

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
  const [gridView, setGridView] = useState(false);
  

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {}
    return () => { isCancelled = true;};
  }, []);

  const toggleView = () => {
    setGridView(!gridView);
  };


  
  return (
    <Layout style={styles.container}>
      <Header name="Visions"/>
      <Modal visible={modalOpen} animationType="slide">
        <AddVision setModalOpen={setModalOpen} />  
      </Modal>
      {/* when gridview is toggled use gridContainer otherwise VisionsContainer */}
      <VisionContext.Provider value={{ setModalOpen, toggleView }}>
      {gridView ? (
        <VisionGridContainer navigation={navigation} />
      ) : (
        <VisionsListContainer navigation={navigation} />
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
