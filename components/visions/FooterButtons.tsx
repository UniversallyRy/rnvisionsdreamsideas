import { Layout } from '@ui-kitten/components';
import React, { useContext } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { VisionContext } from '../../screens/visionScreen';
import { GridButton, SubmitButton } from '../../shared/button';
import { Icon } from "../../shared/icon"; 

export interface Styles {
    buttonContainer: ViewStyle;
    grid: ViewStyle;
}

const FooterButtons = () => {
    const { setModalOpen, toggleView } = useContext(VisionContext);

    return (
        <Layout style={styles.buttonContainer}>
            <SubmitButton item="plus" onPress={() => setModalOpen(true)} style={styles.grid}/>
            <GridButton item="grid" onPress={() => toggleView()} style={styles.grid}/>
        </Layout>
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
    grid: {
        backgroundColor: "lightgray",
        marginHorizontal: 50,
        borderRadius: 20,
    }
});

export default FooterButtons;
