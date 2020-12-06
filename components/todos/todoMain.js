import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import testData from './testData';
import TodoLists from './todoLists';
import AddListModal from './addListModal';

export default function TodoMain() {
   const [modal, setModal]= useState(false); 
   const [lists, setLists]= useState(testData); 


   const toggleModal = () => {
    setModal(!modal);
   };

   const renderList = list => {
       return <TodoLists list={list} />
   };

   const addList = list => {
       setLists([...lists, {...list, id: lists.length + 1, todos: [] }]);
   };

    return (
        
            <View style={styles.container}>
                <Modal 
                animationType='slide' 
                visible={modal} 
                onRequestClose={() => toggleModal()}>
                    <AddListModal closeModal={() => toggleModal()} addList={addList}/>
                </Modal>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.divider} />
                    <Text style={styles.title} >
                        Todo <Text style={{fontWeight: '300', color:'blue'}}>App</Text>
                    </Text>
                    <View style={styles.divider}/>
                    </View>
                    <View style={{marginVertical: 48}}>
                        <TouchableOpacity onPress={() => toggleModal()} style={styles.addList}>
                            <AntDesign name='plus' size={16}/>
                        </TouchableOpacity>

                        <Text style={styles.add}>Add List</Text>
                    </View>

                    <View style={{height: 275, paddingLeft: 32}}>
                        <FlatList 
                            data= {lists}
                            keyExtractor={item => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => renderList(item)}
                            keyboardShouldPersistTaps="always"
                        />
                </View>


            
            
            </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        backgroundColor: 'skyblue',
        height: 1,
        flex: 1,
        alignSelf: 'center',
        
    },
    title: {
        fontSize: 38,
        fontWeight: '800',
        color: 'black',
        paddingHorizontal: 64,
    },
    addList: {
        borderWidth: 2,
        borderColor: 'skyblue',
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
        color: 'blue',
        fontWeight: '600',
        fontSize: 14,
        marginTop: 6,
    }

})
