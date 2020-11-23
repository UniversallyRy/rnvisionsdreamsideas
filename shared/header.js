import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({navigation, title}) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} styles={styles.icon}/>
            <View>
                {/* <Image source={require('../assets/favicon.png')}/> */}
                <Text style={styles.headerText}>{title}</Text>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
       width: '100%',
       height: '100%',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'flex-start',
    },
    headerText: {
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 20,
        color: 'slategrey',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
    }
})
