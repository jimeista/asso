import * as React from 'react';
import {  StyleSheet, Text, Button } from 'react-native';

import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function SignUpScreen({ navigation }: RootStackScreenProps<'SignUp'>) {
  const handlePress = async () => {
      navigation.navigate('SignIn')
  }
  
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Sign Up</Text>
    <Button 
      title='Вернуться'
      onPress={handlePress}
    />
</View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#20243D',
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
  input: {
    width: '70%',
    height: 30,
    // color: '#fff',
    padding: 10,
    // borderBottomColor: '#fff',
    marginBottom: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },

});
