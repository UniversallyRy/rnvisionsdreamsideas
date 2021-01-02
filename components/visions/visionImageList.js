import React, { useCallback, memo } from "react";
import { Text, Dimensions, Animated } from "react-native";
import { Surface, Button }  from 'react-native-paper';
import { deleteVision } from '../../redux/actions';
import { globalStyles, coltsGray, coltsBlue } from "../../styles/global";
import { connect } from 'react-redux';
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

// react native's Dimensions import to grab mobile screens dimensions
const { width: width } = Dimensions.get( "window" );
const ITEM_WIDTH = width * 0.94;
const ITEM_HEIGHT = ITEM_WIDTH * 1.27;

export function VisionsContainer({ navigation, state, scrollX, deleteVision }) {

  
  const VisionImageList = memo( function VisionImage( { data, index } ) {
    
    const removeVision = id => {
      // save item.id from props to buttonId
      var buttonId = id;
      //calls redux action on stored visions
      deleteVision( buttonId );
    };
      
    const inputRange= [
        ( index -1 ) * width,
        index * width,
        ( index + 1 ) * width
    ];

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: [ -width * 0.7, 0, width * 0.7 ]
    });

    return (
          <Surface 
            style={{ backgroundColor: coltsBlue, width, justifyContent: 'center', alignItems: 'center' }}
          >
            <Surface 
              onLongPress={ () => navigation.navigate( 'VisionDetails', data )} 
              style={{
              borderRadius: 18,
              borderWidth: 2,
              overflow: 'hidden',
              borderColor: coltsGray,
              shadowColor: 'black',
              shadowOpacity: 0.6,
              shadowRadius: 350,
              shadowOffset: {
                width: 0,
                height: 0,
              },      
            }}>
              <Surface 
                style={{
                  width: ITEM_WIDTH, 
                  height: ITEM_HEIGHT, 
                  overflow:'hidden',
                  alignItems: 'center',
                  borderRadius: 8,
                  elevation: 4,
                }}>
                <Animated.Image 
                  source={{ uri: data.uri }} 
                  resizeMode={ 'cover' }
                  style={{
                    alignSelf: 'center',
                    width: ITEM_WIDTH * 1,
                    height: ITEM_HEIGHT ,
                    transform: [{ translateX }]
                  }}/>
                  {/* <Text style={ globalStyles.slideTitle }>{ data.title}</Text>
                <DeleteVision item={ data.id }/> */}
              </Surface>
            </Surface>
            <Button style={ globalStyles.visionDeleteButton } color={ coltsBlue } icon="close-outline" onPress={ () => removeVision( data.id ) }>
                <Text>Delete</Text>
            </Button>       
          </Surface> 
    );
  });

  const renderList = useCallback( function renderList( { item, index } ) {
    return <VisionImageList index={ index } data={ item } />;
  }, []);

  return (
    <>
      <Animated.FlatList
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
        )}
        data={ state }
        keyExtractor={( _, index ) => String( index )}
        renderItem={ renderList }
        horizontal
        showsHorizontalScrollIndicator={ false }
        pagingEnabled={ true }
      />
    </>
  );
}

const mapStateToProps = ( state, ownProps ) => { 
  return {
    state: state.visions 
  }
};

const mapDispatchToProps = { deleteVision }

export default connect( mapStateToProps, mapDispatchToProps )( VisionsContainer );