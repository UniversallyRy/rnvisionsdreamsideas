import React, { FunctionComponent, useCallback, memo, useRef, useEffect } from "react";
import { Dimensions, Animated, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper";
import { deleteVision } from "../../redux/actions";
import { DeleteButton } from "../../shared/icon";
import { connect } from "react-redux";

type ImageProps = {
  navigation: any;
  state: [];
  index: any;
  scrollX: any;
  deleteVision: ((item: object) => void);
}

interface ListProps {
  item: any;
  index: number;
}

// react native's Dimensions import to grab mobile screens dimensions
const { width: width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.94;
const ITEM_HEIGHT = ITEM_WIDTH * 1.27;
const VisionsContainer: FunctionComponent<ImageProps> = ({
  navigation,
  state,
  scrollX,
  deleteVision,
}) => {
  const VisionImageList = memo(
    function VisionImage({ data, index }:any) {
      const _isMounted = useRef(true); // Initial value _isMounted = true

      useEffect(() => {
        return () => {
          // ComponentWillUnmount in Class Component
          _isMounted.current = false;
        };
      }, []);

      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ];

      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [-width * 0.7, 0, width * 0.7],
      });

      return (
        <Surface
          style={{
            width,
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            onLongPress={ () => navigation.navigate("VisionDetails", { visionTitle: data.title, imageUri: data.uri }) }
            style={{
              borderRadius: 12,
              overflow: "hidden",
              elevation: 3
            }}
          >
            <Surface>
              <Animated.Image
                source={{ uri: data.uri }}
                resizeMode={"cover"}
                style={{
                  width: ITEM_WIDTH * 1,
                  height: ITEM_HEIGHT,
                  transform: [{ translateX }],
                }}
              />
            </Surface>
          </TouchableOpacity>
          <DeleteButton
            item="close-outline"
            onPress={ () => deleteVision({ id: data.id} ) }
          />
        </Surface>
      );
    },
    
  );

  const renderList: React.FC<ListProps> = useCallback(
    ({ item, index }:any) => {
    return <VisionImageList index={index} data={item} />;
  }, [VisionImageList]);

  return (
    <>
      <Animated.FlatList
        onScroll={ Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={ state }
        keyExtractor={ (_, index) => String(index) }
        renderItem={ renderList }
        horizontal
        showsHorizontalScrollIndicator={ false }
        pagingEnabled={ true }
      />
    </>
  );
};

const mapStateToProps = (state:any) => {
  return {
    state: state.visions,
  };
};

const mapDispatchToProps = { deleteVision };

export default connect(mapStateToProps, mapDispatchToProps)(VisionsContainer);
