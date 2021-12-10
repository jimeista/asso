import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign, Feather, Entypo } from '@expo/vector-icons'
import * as React from 'react'
import { NativeBaseProvider } from 'native-base'
import { Platform } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

import Home from '../screens/Home'
import About from '../screens/About'
import SignIn from '../screens/auth/SignIn'
import SignUp from '../screens/auth/SignUp'
import Settings from '../screens/Settings'
import Map from '../screens/Map'
import Order from '../screens/Order'
import GuestDrawer from '../layout/GuestDrawer'

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeBaseProvider>
        <DrawerNavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerNavigator {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#2C4DA3',
          borderBottomRightRadius: 40,
          borderTopRightRadius: 40,
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={BottomTabNavigator}
        options={({ route }) => {
          return {
            headerShown: false,
            // headerShown: route.params.screen === 'Map' ? false : true,
            // title: route.params.screen === 'Map' ? 'Карта' : 'Заказ',
          }
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={Settings}
        options={{ title: 'Настройки' }}
      />
      <Drawer.Screen
        name='About'
        component={About}
        options={{ headerShown: true, title: 'Подробнее' }}
      />
      <Drawer.Screen
        name='Auth'
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}

const CustomDrawerNavigator = (props) => {
  return <GuestDrawer {...props} />
}

const AuthStack = createNativeStackNavigator()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ title: 'Авторизация' }}>
      <AuthStack.Screen
        name='SignIn'
        component={SignIn}
        options={{ title: 'Авторизация' }}
      />
      <AuthStack.Screen
        name='SignUp'
        component={SignUp}
        options={{ title: 'Регистрация' }}
      />
    </AuthStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme()

  return (
    <Tab.Navigator
      initialRouteName={'Map'}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={'Map'}
        component={Map}
        options={{
          title: 'Карта',
          tabBarIcon: ({ color }) => <Feather name='map' color={color} />,
        }}
      />
      <Tab.Screen
        name={'Order'}
        component={Order}
        options={{
          headerShown: true,
          title: 'Заказ',
          tabBarIcon: ({ color }) => <AntDesign name='plus' color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
