/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign , Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { NativeBaseProvider} from 'native-base'

import { Welcome } from '../components/Welcome'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <NativeBaseProvider>
        <RootNavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

// const Drawer = createDrawerNavigator();

// function RootDrawer () {
//   return <Drawer.Navigator screenOptions={{ headerShown: false}}>
//       <Drawer.Screen name="Главная" component={RootNavigator} />
//   </Drawer.Navigator>
// }


/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="Welcome" component={Welcome}  options={{headerShown: false}}/>
      <Stack.Screen name="SignIn" component={SignInScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={Home}  options={{headerShown: false}}/>
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} /> */}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}



// /**
//  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
//  * https://reactnavigation.org/docs/bottom-tab-navigator
//  */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//         headerShown: false,
//       }}>
//       <BottomTab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color }) => <AntDesign  name="home" color={color} />,
//         }}
//       />
//       <BottomTab.Screen
//         name="Order"
//         component={Settings}
//         options={{
//           tabBarIcon: ({ color }) => <AntDesign name="plus" color={color} />,
//         }}
//       />
//       <BottomTab.Screen
//         name="Settings"
//         component={Settings}
//         listeners={({navigation}) =>({
//           tabPress: (e) => {
//             e.preventDefault()
//             navigation.toggleDrawer()
//           }
//         })}
//         options={{
//           tabBarIcon: ({ color }) => <Feather name="settings" color={color} />
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }
