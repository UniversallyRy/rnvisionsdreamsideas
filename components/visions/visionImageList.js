import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import { FlatList,StyleSheet, View, Dimensions, Image, Animated } from "react-native";
import { Card, Text }  from 'react-native-paper';
import DeleteVision from "./deleteVision";
import { globalStyles } from "../../styles/global";
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';
import addVision from "./addVision";

// react native's Dimensions import to grab mobile screens dimensions
const { width: windowWidth } = Dimensions.get( "window" );
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = windowWidth * 0.88;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

export function VisionsContainer({ state, scrollXAnimated}) {
  
  const VisionImageList = memo( function VisionImage( { data, index } ) {
  
    const inputRange = [index - 1, index, index + 1];
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100],
                });
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 1.3],
                });
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                });
  
    return (

          <Animated.View 
            pointerEvents='none'
            style={{
              position: 'absolute', 
              left: -ITEM_WIDTH/2,
              opacity,
              transform: [{translateX}, {scale}]            
            }}
          >
            
              <Image source={{ uri: data.uri }} style={{borderRadius: 14, width: ITEM_WIDTH, height: ITEM_HEIGHT}}></Image>
                {/* <Text style={ globalStyles.slideTitle }>{ data.title}</Text>
              <DeleteVision item={ data.id }/> */}
        
          </Animated.View> 
    );
  });

  const renderList = useCallback( function renderList( { item, navigation, index } ) {
    return <VisionImageList index={index} data={ item } />;
  }, []);

  return (
    <>
      <FlatList
        data={ state }
        keyExtractor={(_, index) => String(index)}
        renderItem={ renderList }
        horizontal
        inverted
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          padding: SPACING * 2,
        }}
        CellRendererComponent={({item, index, children, style, ...props}) => {
          const newStyle = [ style,
            {zIndex: state.length - index}
          ]
          return <View style={newStyle} index={index} {...props}>
            {children}
          </View>
        }}
        scrollEnabled={false}
        removeClippedSubviews={false}
      />
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});

export default VisionsContainer;