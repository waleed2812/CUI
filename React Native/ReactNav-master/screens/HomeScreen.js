import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {styles} from './style';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Let's Begin"
        onPress={() => navigation.navigate('Start', {id: 170, name: 'Waleed'})}
      />
    </View>
  );
};

export default HomeScreen;
