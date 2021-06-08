import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';

beforeEach(() => {
  AsyncStorage.clear();
  // console.log(`After the data is being reset :`)
  // console.log(AsyncStorage)
});

it('can read asyncstorage', async () => {

  await AsyncStorage.setItem('username', 'testUser')
  let usernameValue = await AsyncStorage.getItem('username')
  // console.log(`After the data is being set :`)
  // console.log(AsyncStorage)
  expect(usernameValue).toBe('testUser')
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

