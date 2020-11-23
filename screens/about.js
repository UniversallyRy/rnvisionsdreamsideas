import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
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
        <Surface style={styles.surface}>
            <Text> About Screen </Text>
        </Surface>
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
    },
  });
  