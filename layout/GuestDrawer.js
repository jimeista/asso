import React from 'react'
import { DrawerItem } from '@react-navigation/drawer'
import { Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Center, Image, Text } from 'native-base'

const GuestDrawer = (props) => {
  return (
    <Box flex='1'>
      <Box
        mt='20'
        h='30%'
        w='100%'
        borderBottomLeftRadius='30'
        borderBottomRightRadius='30'
        justifyContent='center'
        alignItems='center'
      >
        <Text fontSize='24px' bold color='#fff' letterSpacing='2'>
          ASSO
        </Text>
        <Image
          source={require('../assets/images/guest.png')}
          alt='Alternate Text'
          size='xl'
        />
      </Box>
      <Box justifyContent='space-between' h='50%' w='100%'>
        <Box w='100%'>
          <DrawerItem
            label='Войти'
            icon={() => <Ionicons name='key' size={20} color='white' />}
            onPress={() => props.navigation.navigate('Auth', { screen: 'SignIn' })}
          />
          <DrawerItem
            label='Настройки'
            icon={() => <Fontisto name='player-settings' size={18} color='white' />}
            onPress={() => props.navigation.navigate('Settings')}
          />
        </Box>
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons name='information-outline' size={22} color='white' />
          )}
          label='О приложении'
          onPress={() => props.navigation.navigate('About')}
        />
      </Box>
    </Box>
  )
}

export default GuestDrawer
