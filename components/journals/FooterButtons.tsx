import { Layout } from '@ui-kitten/components';
import React, { useContext } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { JournalContext } from '../../screens/journalScreen';
import { GridButton, SubmitButton } from '../../shared/button';

export interface Styles {
    buttonContainer: ViewStyle;
    button: ViewStyle;
}

const FooterButtons = () => {
    const { setModalOpen, toggleView } = useContext(JournalContext);

    return (
        <Layout style={styles.buttonContainer}>
            <SubmitButton onPress={() => setModalOpen(true)} style={styles.button}/>
            <GridButton onPress={() => toggleView()} style={styles.button}/>
        </Layout>
    )
}

const styles = StyleSheet.create<Styles>({
    buttonContainer: {
        flexDirection: "row",
        marginTop: "auto",
        paddingTop: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
    },
    button: {
        backgroundColor: "lightgray",
        marginHorizontal: 50,
        borderRadius: 20,
    }
});

export default FooterButtons;
