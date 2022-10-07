import React, { ReactNode } from 'react';
import { Icon } from '@ui-kitten/components';

export const CloseIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='close-outline'/>
);
// Footer Icons
export const SubmitIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='plus-outline'/>
);

export const GridIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='grid'/>
);
// Journal Card Icons
export const EditIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='edit'/>
);

export const SaveIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='save-outline'/>
);

export const FavIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='heart-outline'/>
);

export const DeleteIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='trash-outline'/>
);
// Tab Bar Icons
export const DayIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='sun' />
);

export const NightIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='moon' />
);

export const BackIcon = (props: ReactNode): JSX.Element => (
    <Icon { ...props } name='arrow-back' />
);
