import React from 'react';
import { StyleSheet, Text, View, Animated} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;

const VisionTitles = ({ data, scrollXAnimated}) => {
    const inputRange = [-1, 0, 1];
    const translateY = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
      });
      
    return (
      <View style={styles.overflowContainer}>
        <Animated.View style={{
            transform: [{translateY}]
        }}>
          {data.map((item, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                <Text style={[styles.title]} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.itemContainerRow}>
                  <Text style={[styles.location]}>
                    <EvilIcons
                      name='location'
                      size={16}
                      color='black'
                      style={{ marginRight: 5 }}
                    />
                    somelocation
                  </Text>
                  <Text style={[styles.date]}>Randomday</Text>
                </View>
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  };

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

  export default VisionTitles;