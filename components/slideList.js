import React, { useCallback, memo, useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Image,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Button, Text, Card }  from 'react-native-paper';

const { width: windowWidth } = Dimensions.get("window");

const slideList = Array.from({ length:5 }).map((_, i) => {
  return {
    id: i,
    image: `https://picsum.photos/300${i}`,
    title: `This is the title ${i + 1}!`,
    subtitle: `This is the subtitle ${i + 1}!`,
  };
});

const Slide = memo(function Slide({ data }) {
  return (
    <Card style={globalStyles.slide}>
      <Card.Cover source={{ uri: data.image }} style={globalStyles.slideImage}></Card.Cover>
      <Card.Title 
        style={globalStyles.slideSubtitle}
        title={data.title}
        subtitle={data.subtitle}
      />
    </Card>
  );
});

function Pagination({ index }) {
  return (
    <View style={globalStyles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              globalStyles.paginationDot,
              index === i
                ? globalStyles.paginationDotActive
                : globalStyles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function SlideList() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const renderList = useCallback(function renderList({ item }) {
    return <Slide data={item} />;
  }, []);

  return (
    <>
      <FlatList
        data={slideList}
        style={globalStyles.carousel}
        renderItem={renderList}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index}></Pagination>
    </>
  );
}
