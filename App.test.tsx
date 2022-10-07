import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import AsyncStorage from '@react-native-async-storage/async-storage';

it('renders without crashing', (): void => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
