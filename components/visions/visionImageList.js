import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import { FlatList,StyleSheet, View, Dimensions, Image, Animated } from "react-native";
import { Card, Text }  from 'react-native-paper';
import DeleteVision from "./deleteVision";
import { coltsBlue, coltsGray, globalStyles } from "../../styles/global";
import {Directions, FlingGestureHandler, State} from 'react-native-gesture-handler';
import addVision from "./addVision";

// react native's Dimensions import to grab mobile screens dimensions
const { width: width } = Dimensions.get( "window" );
const ITEM_WIDTH = width * 0.79;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;


export function VisionsContainer({ state, scrollX }) {
  
  const VisionImageList = memo( function VisionImage( { data, index } ) {
      const inputRange= [
        (index -1) * width,
        index * width,
        (index + 1) * width
      ];
      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [-width * 0.7, 0, width * 0.7]
      })

    return (

          <View 
            pointerEvents='none'
            style={{ width, justifyContent: 'center', alignItems: 'center'}}
          >
            <View style={{
              borderRadius: 18,
                borderWidth: 10,
                borderColor: coltsGray,
                shadowColor: 'black',
                shadowOpacity: 0.6,
                shadowRadius: 350,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },      
                backgroundColor: coltsGray
              
            }}>
              <View 
                style={{
                  width: ITEM_WIDTH, 
                  height: ITEM_HEIGHT, 
                  overflow:'hidden',
                  alignItems: 'center',
                  borderRadius: 8,
                }}>
                <Animated.Image 
                  source={{ uri: data.uri }} 
                  style={{
                    resizeMode: 'cover', 
                    width: ITEM_WIDTH * 1.4, height: ITEM_HEIGHT,
                    transform: [{translateX}]
                  }}/>
                  {/* <Text style={ globalStyles.slideTitle }>{ data.title}</Text>
                <DeleteVision item={ data.id }/> */}
              </View>
            </View>
              
          </View> 
    );
  });

  const renderList = useCallback( function renderList( { item, navigation, index } ) {
    return <VisionImageList index={index} data={ item } />;
  }, []);

  return (
    <>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: { x: scrollX}}}],
            {useNativeDriver: true}
        )}
        data={ state }
        keyExtractor={(_, index) => String(index)}
        renderItem={ renderList }
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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


  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
});

export default VisionsContainer;