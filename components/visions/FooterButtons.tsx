import React, { useContext } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { VisionContext } from '../../screens/visionScreen';
import { Icon } from "../../shared/icon"; 

export interface Styles {
    buttonContainer: ViewStyle;
}

const FooterButtons = () => {
    const { setModalOpen, toggleView } = useContext(VisionContext);

    return (
        <View style={styles.buttonContainer}>
            <Icon item="plus" onPress={() => setModalOpen(true)} />
            <Icon item="grid" onPress={() => toggleView()} />
        </View>
    )
}

const styles = StyleSheet.create<Styles>({
    buttonContainer: {
        flexDirection: "row",
        margin: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
    },
});

export default FooterButtons;
