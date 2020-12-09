import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { coltsGray, coltsBlue } from '../styles/global';

const aboutText = 'This is an ongoing App based on charting any visions/dreams you may have.'

export default function About() {
    return (
        <View style={{backgroundColor: coltsGray, flex: 1}}>
            <Card style={styles.aboutContent}>
                <Text multiline style={styles.text}> {aboutText} </Text>
            </Card>
        </View>    
    );
};

const styles = StyleSheet.create({
    text: {
      padding: 8,
      margin: 30,
      alignSelf: 'center',
      color: 'skyblue',
    },
    aboutContent: {
        backgroundColor: coltsBlue,
        flex: .4,
        flexDirection: "row",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    }
  });
  