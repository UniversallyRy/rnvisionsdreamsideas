import React, { FC, useState, useRef } from "react";
import { TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { NavigationScreenProp } from 'react-navigation';
import { connect, ConnectedProps } from "react-redux";
import { Layout } from "@ui-kitten/components";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import { FooterButtons } from "../../shared/buttons";
import { VisionContext } from "../../screens/visionScreen";
import { SPACING, THUMBNAIL_SIZE } from "../../utils/constants";
// import { deleteVision } from "../../redux/reducers/visions";

// todos: add delete picture option back
type ImageProps = {
  navigation: NavigationScreenProp<string, object>;
  state: [];
}

type ItemProps = {
  item: {
    id: string;
    title: string;
    uri: string;
  }
  index: number
}

const VisionListContainer: FC<ImageProps> = ({ navigation, state }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const topRef = useRef<FlatList>(null);
  const thumbRef = useRef<FlatList>(null);

  const scrollActiveIndex = (index: number) => {
    setActiveIndex(index);
    topRef.current?.scrollToOffset({
      offset: index * windowWidth,
      animated: true
    })
    if(index * (THUMBNAIL_SIZE + SPACING) - THUMBNAIL_SIZE / 2 > windowWidth / 2) {
      thumbRef.current?.scrollToOffset({
        offset: index * (THUMBNAIL_SIZE + SPACING) - windowWidth / 2 + THUMBNAIL_SIZE / 2,
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
    <Layout style={{ flex: 1 }}>
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
        renderItem={ ({ item }: ItemProps)  => {
          return <Layout style={{ width:windowWidth, height:windowHeight }}>
                    <Image
                      source={ { uri:item.uri } }
                      style={ [StyleSheet.absoluteFill] }
                    />
                </Layout>
        }}
      />
      <FlatList
        data={ state }
        style={{ position: "absolute", bottom: THUMBNAIL_SIZE - 30 }}
        ref={ thumbRef }
        horizontal
        showsHorizontalScrollIndicator={ false }
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        keyExtractor={ (_, index) => String(index) }
        renderItem={ ({item, index}: ItemProps) => {
          return (
            <TouchableOpacity
              onPress={ () => scrollActiveIndex(index) }
              onLongPress={ () => navigation.navigate("Vision Details", { item }) }
            >
              <Image
                source={{ uri:item.uri }}
                style={{
                  width: THUMBNAIL_SIZE,
                  height: THUMBNAIL_SIZE,
                  borderRadius: 3,
                  marginRight: SPACING,
                  borderWidth: 1,
                  borderColor: activeIndex === index ? "#fff" : 'transparent'
                }}
              />
            </TouchableOpacity>
          )
        }}
      />
      <FooterButtons context={ VisionContext }/>
    </Layout>
  );
};

const mapStateToProps = (state: { visions: [] }) => {
  return {
    state: state.visions,
  };
};

export default connect(mapStateToProps)(VisionListContainer);

export type PropsFromRedux = ConnectedProps<typeof VisionListContainer>;