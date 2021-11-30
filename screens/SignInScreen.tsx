import * as React from 'react';
import { Box,Input,FormControl, Text,Center, VStack, Button, useToast} from 'native-base'

import axios from 'axios'

import { RootStackScreenProps } from '../types';

interface Error {
  type: string,
  message: string,
}

export default function SignInScreen({ navigation }: RootStackScreenProps<'SignIn'>) {
  // form data
  const [phone,handleChangePhone] = React.useState(null)
  const [password,handleChangePassword] = React.useState(null)
  
  // request state loading
  const [loading, setLoading] = React.useState(false)

  // request status toast
  const toast = useToast()

  // form error
  const [error, setError] = React.useState<Error []>([])

  // error timeout clear
  React.useEffect(() => {
    if(error.length > 0) {
      setTimeout(() => { setError([])},3000)
    }
  },[error])

  // submit request
  const handlePress = async () => {
    try{
      setLoading(true)
      if(!phone) setError(state => [...state, {type: 'phone', message: 'Необходимо ввести номер телефона'}])
      if(!password) setError(state => [...state, {type: 'password', message: 'Необходимо ввести пароль'}])
      if(phone && password){
        const res = await axios.post('https://asso-kz.herokuapp.com/api/log_in/', { mobile_phone: phone, password} )
        toast.show({
          status: 'success',
          title: 'Успешная авторизация',
          placement: 'top'
        })
        
        setTimeout(() => {
          navigation.navigate('Home')
        }, 3000)
      }
      setLoading(false)
    }catch(err : any){
      toast.show({
        status: 'error',
        title: err.message,
        placement: 'top'
      })
      setLoading(false)
    }
  }

  return (
    <Center
      height="100vh"
      width="100%"
    >
      <Box
        flexShrink={1}
        mb="90px"
      >
        <Text fontSize={22} fontWeight={500} color={'#000'}>Авторизация</Text>
      </Box>
      <Box
        w={{base: '70%'}}
        mb={2}
      >
        <FormControl
          isRequired={true}
          isInvalid={error.filter(err => err.type === 'phone').length > 0}
        >
          <FormControl.Label>Номер телефона</FormControl.Label>
          <Input
            onChange={(e: any) =>handleChangePhone(e.target.value)} 
            placeholder="Введите номер телефона"
          />
          <FormControl.ErrorMessage>{error.find(err => err.type === 'phone')?.message}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          mt="4"
          isRequired={true}
          isInvalid={error.filter(err => err.type === 'password').length > 0}
        >
          <FormControl.Label>Пароль</FormControl.Label>
          <Input
            onChange={(e: any) => handleChangePassword(e.target.value)}
            type="password" 
            placeholder="Введите пароль"
          />
          <FormControl.ErrorMessage>{error.find(err => err.type === 'password')?.message}</FormControl.ErrorMessage>
        </FormControl>
        <Text underline={true} color="#3a86ff" onPress={() => navigation.replace('SignUp')}>sign up</Text>
        <Button 
          isLoading={loading}
          onPress={handlePress}
          _hover={{ bg: 'primary.700', color: '#fff'}}
          bg="primary.600"
          mt={10}
        >
          Enter
        </Button>
      </Box>
    </Center>
  );
}
