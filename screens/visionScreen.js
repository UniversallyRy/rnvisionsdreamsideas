import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "react-native-paper";
import AddVision from "../components/visions/addVision";
import VisionsContainer from "../components/visions/visionImageList";
import VisionGridContainer from "../components/visions/visionImageGrid";
import { coltsBlue, globalStyles } from "../styles/global";
import Icon from "../shared/icon";

const VISIBLE_ITEMS = 3;

const Visions = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const [modalOpen, setModalOpen] = useState(false);
  const [gridView, setGridView] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  const toggleGrid = () => {
    setGridView(!gridView);
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden/> */}
      <Modal style={{ margin: 10 }} visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={globalStyles.modalContent}>
            <Text Text="Add Vision"> Add A Vision </Text>
            <AddVision setModalOpen={setModalOpen} />
            <View style={globalStyles.closeModalContainer}>
              <Icon
                item="close"
                style={{ ...globalStyles.modalClose }}
                onPress={() => setModalOpen(false)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* when gridview is toggled use gridContainer otherwise VisionsContainer */}
      {gridView ? (
        <VisionGridContainer navigation={navigation} />
      ) : (
        <VisionsContainer navigation={navigation} scrollX={scrollX} />
      )}
      <View style={globalStyles.visionAddToggle}>
        <Icon item="plus" onPress={() => setModalOpen(true)} />
        <Icon item="grid" onPress={() => toggleGrid()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: coltsBlue,
  },
});

export default Visions;
