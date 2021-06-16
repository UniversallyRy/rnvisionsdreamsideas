import React, { FunctionComponent, useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import { Surface, Text } from "react-native-paper";
import { NavigationStackProp } from 'react-navigation-stack';
import { deleteVision } from "../../redux/actions";
import { DeleteButton } from "../../shared/icon";
import { connect } from "react-redux";

type ImageProps = {
  navigation: NavigationStackProp;
  state: any;
  index: any;
  scrollX: any;
  deleteVision: ((item: object) => void);
}

interface ListProps {
  item: any;
  index: number;
}

// react native's Dimensions import to grab mobile screens dimensions
const { width: width, height: height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = 80;

const VisionsContainer: FunctionComponent<ImageProps> = ({
  navigation,
  state,
  scrollX,
  deleteVision,
}) => {

  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })
    if(index * (ITEM_SIZE + SPACING) - ITEM_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (ITEM_SIZE + SPACING) - width / 2 + ITEM_SIZE / 2,
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
    <View style={{flex:1}}>
      <FlatList
        ref={topRef}
        data={ state }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          scrollActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/ width))
        }}
        keyExtractor={ (_, index) => String(index) }
        renderItem={ ({item}) => {
          return <View style={{width, height}}>
              <Image
              source={{uri:item.uri}}
              style={[StyleSheet.absoluteFill]}
              />
          </View>
        }}
      />
      <FlatList
        ref={thumbRef}
        data={ state }
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{position: "absolute", bottom: ITEM_SIZE}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        keyExtractor={ (_, index) => String(index) }
        renderItem={ ({item, index}) => {
          return <TouchableOpacity
                    onPress={() => scrollActiveIndex(index)}
                  >
                    <Image
                          source={{uri:item.uri}}
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
