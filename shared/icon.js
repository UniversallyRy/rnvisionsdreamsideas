import React from 'react'
import { globalStyles } from '../styles/global';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Icon = ({item, onPress }) => {
    return (
        <MaterialCommunityIcons
                    name={`${item}`}
                    size={ 24 }
                    style={ globalStyles.modalToggle }
                    onPress={onPress}
        />
    )
}

export default Icon
