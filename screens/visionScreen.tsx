import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  Dimensions,
  Animated,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "react-native-paper";
import { NavigationStackProp } from 'react-navigation-stack';
import AddVision from "../components/visions/addVision";
import VisionsContainer from "../components/visions/visionImageList";
import VisionGridContainer from "../components/visions/visionImageGrid";
import { Icon } from "../shared/icon";

const {height: windowHeight } = Dimensions.get("window");


const VISIBLE_ITEMS = 3;

interface VisionProps {
  navigation: NavigationStackProp;
  container: StyleProp<ViewStyle>;
  modalContent: StyleProp<TextStyle>;
  closeModalContainer: StyleProp<ViewStyle>;
  visionAddToggle: StyleProp<ViewStyle>;
}

interface Styles {
  container: ViewStyle;
  modalContent: TextStyle;
  closeModalContainer: ViewStyle;
  visionAddToggle: ViewStyle;
}


const Visions: React.FC<VisionProps> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
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
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback style={{ margin: 10 }} onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <Text> 
              Add A Vision 
            </Text>
            <AddVision setModalOpen={setModalOpen} />
            <View style={styles.closeModalContainer}>
              <Icon
                item="close"
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
      <View style={styles.visionAddToggle}>
        <Icon item="plus" onPress={() => setModalOpen(true)} />
        <Icon item="grid" onPress={() => toggleGrid()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    fontFamily: "roboto-black",
    flex: 1,
  },
  closeModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    flex: 1,
    height: windowHeight,
  },
    visionAddToggle: {
    flexDirection: "row",
  },
});

export default Visions;
