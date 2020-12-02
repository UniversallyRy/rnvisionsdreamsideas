import React, { useCallback, memo, useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Card }  from 'react-native-paper';
import { connect } from 'react-redux';
import { DeleteVision } from "./deleteVision";

const { width: windowWidth } = Dimensions.get( "window" );

const Slide = memo( function Slide( { data } ) {
  return (
    <Card style={ globalStyles.slide } >
      <Card.Cover source={{ uri: data.uri }} style={ globalStyles.slideImage }></Card.Cover>
      <Card.Title 
        style={ globalStyles.slideSubtitle }
        title={ data.title }
      />
      <DeleteVision item={ data.id }/>
    </Card> 
  );
});

function Pagination( { state, index }) {
  return (
    <View style={ globalStyles.pagination } pointerEvents="none">
      { state.map((_, i) => {
          return (
            <View
              key={ i }
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

export function SlideList({ state }) {
  const [ index, setIndex ] = useState(0);
  const indexRef = useRef( index );
  indexRef.current = index;
  const onScroll = useCallback(( event ) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round( index );

    const distance = Math.abs( roundIndex - index );

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if ( roundIndex !== indexRef.current && !isNoMansLand ) {
      setIndex( roundIndex );
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback( s => String(s.id), [] ),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const renderList = useCallback( function renderList( { item, navigation } ) {
    return <Slide data={ item } onPress={ () => navigation.navigate( 'VisionDetails', item ) }/>;
  }, []);

  return (
    <>
      <FlatList
        data={ state }
        style={ globalStyles.slideCarousel }
        renderItem={ renderList }
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={ false }
        bounces={ false } 
        onScroll={ onScroll }
        { ...flatListOptimizationProps }
      />
      <Pagination state={ state } index={ index }></Pagination>
    </>
  );
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    state: state.visions,
  }
}

export default connect( mapStateToProps )( SlideList )