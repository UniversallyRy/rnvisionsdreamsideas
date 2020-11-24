import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { globalStyles } from '../styles/global'

// export default function About() {
//     return (
//         <View style={globalStyles.container}>
//             <Text> About Screen </Text>
//         </View>
//     )
// }

export default function About() {
    return (
        <View style={{backgroundColor: '#A2AAAD', flex: 1}}>
            <Card style={{backgroundColor: '#002C5F'}}>
                <Text style={styles.surface}> About Screen </Text>
            </Card>
        </View>    
    )
}

const styles = StyleSheet.create({
    surface: {
      padding: 8,
      height: 80,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      backgroundColor: '#002C5F',
    },
  });
  