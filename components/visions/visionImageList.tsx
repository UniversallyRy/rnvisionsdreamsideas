import React, { FunctionComponent, useState, useRef } from "react";
import { View, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { deleteVision } from "../../redux/actions";
import { DeleteButton } from "../../shared/icon";
import { connect } from "react-redux";
import { windowHeight, windowWidth } from "../../utils/dimensions";

// needs to add navigation and delete picture option back
type ImageProps = {
  navigation: NavigationScreenProp<string, object>;
  state: object[];
  index: number;
  deleteVision: ((item: object) => void);
}

interface ListProps {
  item: any;
  index: number;
}

const SPACING = 10;
const ITEM_SIZE = 80;

const VisionsContainer: FunctionComponent<ImageProps> = ({
  navigation,
  state,
  deleteVision,
}) => {

  const topRef:any = useRef();
  const thumbRef:any = useRef();
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * windowWidth,
      animated: true
    })
    if(index * (ITEM_SIZE + SPACING) - ITEM_SIZE / 2 > windowWidth / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (ITEM_SIZE + SPACING) - windowWidth / 2 + ITEM_SIZE / 2,
        animated: true,
      })
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      })
    }
  }

  return (
    <View style={{ flex:1 }}>
      <FlatList
        ref={ topRef }
        data={ state }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={ false }
        onMomentumScrollEnd={ev => {
          scrollActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/ windowWidth))
        }}
        keyExtractor={ (_, index) => String(index) }
        renderItem={ ({ item }:any) => {
          return <View style={{ width:windowWidth, height:windowHeight }}>
              <Image
              source={ { uri:item.uri } }
              style={ [StyleSheet.absoluteFill] }
              />
          </View>
        }}
      />
      <FlatList
        ref={ thumbRef }
        data={ state }
        horizontal
        showsHorizontalScrollIndicator={ false }
        style={{ position: "absolute", bottom: ITEM_SIZE }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        keyExtractor={ (_, index) => String(index) }
        renderItem={ ({item, index}:any) => {
          return <TouchableOpacity
                    onPress={ () => scrollActiveIndex(index) }
                  >
                    <Image
                      source={{ uri:item.uri }}
                      style={{
                        width: ITEM_SIZE,
                        height: ITEM_SIZE,
                        borderRadius: 12,
                        marginRight: SPACING,
                        borderWidth: 2,
                        borderColor: activeIndex === index ? "#fff" : 'transparent'
                      }}
                    />
          </TouchableOpacity>
        }}
      />
    </View>
  );
};

const mapStateToProps = (state:any) => {
  return {
    state: state.visions,
  };
};

const mapDispatchToProps = { deleteVision };

export default connect(mapStateToProps, mapDispatchToProps)(VisionsContainer);
