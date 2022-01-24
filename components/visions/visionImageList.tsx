import { Layout } from "@ui-kitten/components";
import React, { FC, useState, useRef } from "react";
import { TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
// import { deleteVision } from "../../redux/reducers/visions";
import { connect, ConnectedProps } from "react-redux";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import FooterButtons from "./FooterButtons";

// todos: navigation bug on thumbnail longpress and add delete picture option back
type ImageProps = {
  navigation: NavigationScreenProp<string, object>;
  state: object[];
}

const SPACING = 10;
const ITEM_SIZE = 80;

const VisionListContainer: FC<ImageProps> = ({navigation, state}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const topRef = useRef<FlatList>(null);
  const thumbRef = useRef<FlatList>(null);

  const scrollActiveIndex = (index) => {
    setActiveIndex(index);
    topRef.current?.scrollToOffset({
      offset: index * windowWidth,
      animated: true
    })
    if(index * (ITEM_SIZE + SPACING) - ITEM_SIZE / 2 > windowWidth / 2) {
      thumbRef.current?.scrollToOffset({
        offset: index * (ITEM_SIZE + SPACING) - windowWidth / 2 + ITEM_SIZE / 2,
        animated: true,
      })
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      })
    }
  }

  return (
    <Layout style={{ flex:1 }}>
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
          return <Layout style={{ width:windowWidth, height:windowHeight }}>
                    <Image
                      source={ { uri:item.uri } }
                      style={ [StyleSheet.absoluteFill] }
                    />
                </Layout>
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
          return (
            <TouchableOpacity
              onPress={ () => scrollActiveIndex(index) }
              onLongPress={ () => navigation.navigate("Vision Details", { item }) }
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
          )
        }}
        />
        <FooterButtons/>
    </Layout>
  );
};

const mapStateToProps = (state:any) => {
  return {
    state: state.visions,
  };
};

export default connect(mapStateToProps)(VisionListContainer);


export type PropsFromRedux = ConnectedProps<typeof VisionListContainer>
