import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import testData from './testData';


export default function AddListModal({closeModal, addList}) {
    const bgColors = ['#5CD859', '#24A6D9', '#595BD9', '#0022D9', '#D159D8', '#D85963', '#D88559'];
    const [bgColor, setColor] = useState(bgColors[0]);
    const [newName, setName] = useState(''); 

    const renderColors = () => {
        return bgColors.map(color => {
            return (
                <TouchableOpacity 
                    key={color} 
                    style={[styles.colorSelect, {backgroundColor: color}]}
                    onPress={()=> setColor(color)}
            />
            );
        });
    };

    const createTodo = () => {
        const name = newName;
        const color = bgColor; 
        const key = Math.random()* 93932;   
        const lists = { name, color, key }
        addList(lists)
        setName('');
        closeModal();
    }
    
    return (
        <KeyboardAvoidingView style={styles.container} behavior={"padding"}> 
            <TouchableOpacity style={{position: 'absolute', top: 64, right:32}} onPress={closeModal}>
            <AntDesign name='close' size={24} color='black' />
            </TouchableOpacity>

            <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                <Text style={styles.title}>Create Todo List</Text>
                <TextInput style={styles.input} placeholder='List Items' onChangeText={(text => setName(text))}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                    {renderColors()}
                </View>
                <TouchableOpacity style={[styles.create, {backgroundColor: bgColor}]} onPress={createTodo}>
                    <Text style={{color: 'white', fontWeight: '600'}}>Create</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: 'black',
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'blue',
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
    }
})
