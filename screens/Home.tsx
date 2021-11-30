import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Home({navigation}: RootTabScreenProps<'Home'>) {

  const handlePress = () => {
      // navigation.toggleDrawer()    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.paragraph}>
        Why not to navigate to tab two ?
      </Text>
      <Button 
        title="Next"
        color="#841584"
        onPress={handlePress}
      />
      <EditScreenInfo path="/screens/Home.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 15,
    fontWeight: "400",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
