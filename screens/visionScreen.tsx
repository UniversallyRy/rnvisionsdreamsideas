import React, { useState, useRef, useEffect } from "react";
import { Animated, Modal, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Card, Surface, useTheme } from "react-native-paper";
import AddVision from "../components/visions/addVisionModal";
import VisionsContainer from "../components/visions/visionImageList";
import VisionGridContainer from "../components/visions/visionImageGrid";
import { Icon } from "../shared/icon";

interface VisionProps {
  navigation: any;
  container: StyleProp<ViewStyle>;
  visionAddToggle: StyleProp<ViewStyle>;
}

interface Styles {
  container: ViewStyle;
  visionAddToggle: ViewStyle;
}


const Visions: React.FC<VisionProps> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [modalOpen, setModalOpen] = useState(false);
  const [gridView, setGridView] = useState(false);
  const theme = useTheme();


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
    <Card
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}
     style={styles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <AddVision setModalOpen={setModalOpen} />  
      </Modal>
      {/* when gridview is toggled use gridContainer otherwise VisionsContainer */}
      {gridView ? (
        <VisionGridContainer navigation={navigation} />
      ) : (
        <VisionsContainer navigation={navigation} scrollX={scrollX} />
      )}
      <Surface style={styles.visionAddToggle}>
        <Icon item="plus" onPress={() => setModalOpen(true)} />
        <Icon item="grid" onPress={() => toggleGrid()} />
      </Surface>
    </Card>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    fontFamily: "roboto-black",
    flex: 1,
  },
    visionAddToggle: {
    flexDirection: "row",
    alignSelf: "center",
  },
});

export default Visions;
