import React, {useCallback, memo } from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { coltsBlue, globalStyles } from '../../styles/global';


const { width: width, height: height } = Dimensions.get( "window" );

export function VisionGridContainer({ state, navigation, toggleGrid }) {

    const VisionGridList = memo(function GridImage({ data, index }){
        return (
            <Card style={{backgroundColor: coltsBlue}} onPress={ () => navigation.navigate( 'VisionDetails', data )} >
                {/* <Card onPress={ () => navigation.navigate( 'Visions', item ) }> */}
                <Image source={{ uri: data.uri }} style={{...styles.gridItem}}/>
            </Card>
        )
    })

    const renderList = useCallback( function renderList({ item, index }) {
        return <VisionGridList index={index} data={ item } />;
      }, []);



    return (
        <View style={{flex: 1}}>
            <FlatList
              numColumns={3}
              contentContainerStyle={styles.gridContainer}
              scrollEnabled
              data={ state }
              keyExtractor={( item, index) => index.toString() }
              renderItem={renderList}
            />
            <Card/>
            <MaterialCommunityIcons
              name='circle'
              size={ 24 }
              style={ globalStyles.modalToggle }
              onPress={ toggleGrid}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    gridContainer: {
        paddingTop: 3, 
        backgroundColor: coltsBlue,

    },
    gridItem: {
        height: height * 0.25,
        width: width * 0.32,
        margin: 4,
    }
})

export default VisionGridContainer;
