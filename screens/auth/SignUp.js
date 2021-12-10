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
import { useSelector, useDispatch } from 'react-redux'
import { Platform } from 'react-native'

import {
  register,
  handleChangePassword,
  handleChangePhone,
  handleChangeName,
} from '../../redux/auth-slice'

export default function SignUp({ navigation }) {
  const { mobile_phone, password, loading, name } = useSelector((state) => state.auth)
  // request status toast
  const toast = useToast()

  // form error
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
      if (!name)
        setError((state) => [
          ...state,
          { type: 'name', message: 'Необходимо ввести имя пользователя' },
        ])
      if (!password)
        setError((state) => [
          ...state,
          { type: 'password', message: 'Необходимо ввести пароль' },
        ])
      if (mobile_phone && password && name) {
        const res = await dispatch(
          register({ mobile_phone, password1: password, password2: password, name })
        )

        if (res.payload) {
          toast.show({
            status: 'success',
            title: 'Успешная регистрация',
            placement: 'top',
          })

          setTimeout(() => {
            navigation.navigate('Auth', { screen: 'SignIn' })
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
            isInvalid={error.filter((err) => err.type === 'name').length > 0}
          >
            <Input
              onChangeText={(value) => dispatch(handleChangeName(value))}
              placeholder='Введите имя пользователя'
            />
            <FormControl.ErrorMessage>
              {error.find((err) => err.type === 'name')?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            mt='4'
            isRequired={true}
            isInvalid={error.filter((err) => err.type === 'phone').length > 0}
          >
            <Input
              onChangeText={(value) => dispatch(handleChangePhone(value))}
              placeholder='Введите номе телефона'
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
              onChangeText={(value) => dispatch(handleChangePassword(value))}
              type='password'
              placeholder='Введите пароль'
            />
            <FormControl.ErrorMessage>
              {error.find((err) => err.type === 'password')?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <Text
            underline={true}
            color='#3a86ff'
            mt='1'
            onPress={() => navigation.replace('SignIn')}
          >
            Войти
          </Text>
          <Button
            isLoading={loading}
            onPress={handlePress}
            _hover={{ bg: 'primary.700', color: '#fff' }}
            bg='primary.600'
            mt={10}
          >
            Регистрация
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}

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
