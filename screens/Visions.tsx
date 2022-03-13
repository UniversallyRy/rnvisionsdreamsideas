import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { Layout, Modal } from "@ui-kitten/components";
import { VisionStyles } from "./Styles";
import Header from "../shared/header";
import ListView from "../components/visions/ListView";
import GridView from "../components/visions/GridView";
import NewEntry from "../components/visions/NewEntry";
import { FooterButtons } from "../shared/buttons";
import { windowHeight, windowWidth } from "../utils/constants";
// todos: make visions drag and droppable, fix image reslolution/size, opacity changes
interface VisionProps {
  navigation: NavigationScreenProp<string, object>;
}

const Visions: React.FC<VisionProps> = ({ navigation }): JSX.Element => {

  const scrollX = useRef(new Animated.Value(0)).current;
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView(!view);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {}
    return () => { isCancelled = true };
  }, []);

  return (
    <Layout style={ styles.container }>

      <Header name={ "Visions" } />
      <Modal visible={ modalOpen }>
        <NewEntry setModalOpen={ toggleModal } />  
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
