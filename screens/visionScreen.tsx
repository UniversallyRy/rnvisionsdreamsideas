import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "react-native-paper";
import { NavigationStackProp } from 'react-navigation-stack';
import AddVision from "../components/visions/addVision";
import VisionsContainer from "../components/visions/visionImageList";
import VisionGridContainer from "../components/visions/visionImageGrid";
import { coltsBlue, globalStyles } from "../styles/global";
import Icon from "../shared/icon";

const VISIBLE_ITEMS = 3;

interface VisionProps {
  navigation: NavigationStackProp;
  container: StyleProp<ViewStyle>;
  modalContent: StyleProp<TextStyle>;
  modalClose: StyleProp<ViewStyle>;
  visionAddToggle: StyleProp<ViewStyle>;
}

interface Styles {
  container: ViewStyle;
}


const Visions: React.FC<VisionProps> = ({ navigation }) => {
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
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback style={{ margin: 10 }} onPress={Keyboard.dismiss}>
          <View style={globalStyles.modalContent}>
            <Text> Add A Vision </Text>
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

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: coltsBlue,
  },
});

export default Visions;