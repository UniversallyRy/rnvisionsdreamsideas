import React from 'react';
import { Icon } from '@ui-kitten/components';

export const CloseIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='close-outline' />
);
// Footer Icons
export const SubmitIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='plus-outline' />
);

export const GridIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='grid' />
);
// Journal Card Icons
export const EditIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='edit' />
);

export const SaveIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='save-outline' />
);

export const FavIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='heart-outline' />
);

export const DeleteIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='trash-outline' />
);
// Tab Bar Icons
export const DayIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='sun' />
);

export const NightIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='moon' />
);

export const BackIcon: React.FunctionComponent = (props: React.ReactNode): JSX.Element => (
  <Icon {...props} name='arrow-back' />
);
