import { Layout } from '@ui-kitten/components';
import React, { useContext } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { NoteContext } from './notesMain';
import { SubmitButton } from '../../shared/button';

export interface Styles {
    buttonContainer: ViewStyle;
    button: ViewStyle;
}

const FooterButtons = () => {
    const { toggleTodoModal, toggleNoteModal } = useContext(NoteContext);

    return (
        <Layout style={styles.buttonContainer}>
            <SubmitButton onPress={() => toggleTodoModal()} style={styles.button}/>
            <SubmitButton onPress={() => toggleNoteModal()} style={styles.button}/>
        </Layout>
    )
}

const styles = StyleSheet.create<Styles>({
    buttonContainer: {
        flexDirection: "row",
        margin: 1,
        top: 132,
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
    },
    button: {
        backgroundColor: "lightgray",
        marginHorizontal: 50,
        borderRadius: 20,
    }
});

export default FooterButtons;
