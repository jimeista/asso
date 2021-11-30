/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Profile: 'users/:id',
            },
          },
          Order: 'order',
          Settings: 'settings',
        },
      },
      Welcome: 'welcome',
      SignIn: 'signin',
      SignUp: 'signup',
      Modal: 'modal',
      Home: 'home',
      NotFound: '*',
    },
  },
};

export default linking;
