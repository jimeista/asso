import * as React from 'react'
import {
  Box,
  Input,
  FormControl,
  Text,
  Center,
  Button,
  useToast,
  extendTheme,
  NativeBaseProvider,
} from 'native-base'
import { Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Entypo, Feather } from '@expo/vector-icons'

import {
  login,
  handleChangePassword,
  handleChangePhone,
  getStateSelector,
} from '../../redux/auth-slice'

const theme = extendTheme({
  components: {
    FormControlLabel: {
      color: Platform.OS === 'android' ? '#fff' : '#000',
    },
    Input: {
      baseStyle: {
        color: Platform.OS === 'android' ? '#fff' : '#000',
      },
    },
  },
})

export default function SignIn(props) {
  const { mobile_phone, password, loading } = useSelector(getStateSelector)
  const toast = useToast()

  // form error
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState([])
  const dispatch = useDispatch()

  // error timeout clear
  React.useEffect(() => {
    if (error.length > 0) {
      setTimeout(() => {
        setError([])
      }, 3000)
    }
  }, [error])

  // submit request
  const handlePress = async () => {
    try {
      if (!mobile_phone)
        setError((state) => [
          ...state,
          { type: 'phone', message: 'Необходимо ввести номер телефона' },
        ])
      if (!password)
        setError((state) => [
          ...state,
          { type: 'password', message: 'Необходимо ввести пароль' },
        ])
      if (mobile_phone && password) {
        const res = await dispatch(login({ mobile_phone, password }))

        if (res.payload) {
          toast.show({
            status: 'success',
            title: 'Успешная авторизация',
            placement: 'top',
          })

          setTimeout(() => {
            props.navigation.navigate('Home', { screen: 'Map' })
          }, 1000)
        }
        if (res.error) {
          toast.show({
            status: 'error',
            title: res.error?.message,
            placement: 'top',
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <NativeBaseProvider theme={theme}>
      <Center height='100%'>
        <Box w={{ base: '70%' }} mb={2}>
          <FormControl
            isRequired={true}
            isInvalid={error.filter((err) => err.type === 'phone').length > 0}
          >
            <Input
              placeholder='Введите номе телефона'
              onChangeText={(value) => dispatch(handleChangePhone(value))}
            />
            <FormControl.ErrorMessage>
              {error.find((err) => err.type === 'phone')?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            mt='4'
            isRequired={true}
            isInvalid={error.filter((err) => err.type === 'password').length > 0}
          >
            <Input
              type='password'
              placeholder='Введите пароль'
              onChangeText={(value) => dispatch(handleChangePassword(value))}
              // InputRightElement={
              //   show ? (
              //     <Entypo
              //       name='eye'
              //       size={24}
              //       color='white'
              //       onPress={() => setShow(true)}
              //     />
              //   ) : (
              //     <Feather
              //       name='eye-off'
              //       size={24}
              //       color='white'
              //       onPress={() => setShow(false)}
              //     />
              //   )
              // }
            />
            <FormControl.ErrorMessage>
              {error.find((err) => err.type === 'password')?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <Text
            underline={true}
            color='#3a86ff'
            mt='1'
            onPress={() => props.navigation.navigate('SignUp')}
          >
            Регистрация
          </Text>
          <Button
            isLoading={loading}
            onPress={handlePress}
            _hover={{ bg: 'primary.700', color: '#fff' }}
            bg='primary.600'
            mt={10}
          >
            Войти
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}
