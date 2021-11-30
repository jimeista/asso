import React from 'react'
import { View, Text, Button,ImageBackground, StatusBar, StyleSheet} from 'react-native'

import { RootStackScreenProps } from '../types';

export const Welcome = ({ navigation }: RootStackScreenProps<'Welcome'>) => {
    console.log(navigation)

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/welcome.png')} resizeMode={'cover'} style={styles.logo}/>
            <View style={styles.wrapper}>
                <Text  style={styles.text}>Добро пожаловать в ASSO</Text>
                <Text  style={styles.text}>Экономь время и деньги</Text>
                <View  style={styles.button_group}>
                    <Button
                        title="заказчик"
                        onPress={() => navigation.navigate('SignIn')}
                    />
                    <Button 
                        title="исполнитель"
                        onPress={() => navigation.navigate('SignIn')}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#20243D',
        textAlign: 'center',
    },
    wrapper: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 20,
        width: '70%',
        margin: 'auto',
        height: '60vh',
        display: 'flex',
    },
    logo: {
        width: '100%',
        height: '40vh',
    },
    button_group : {
        marginTop: 20,
        height: '15vh',
        justifyContent: 'space-around'
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
})