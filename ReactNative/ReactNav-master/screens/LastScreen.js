import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {styles} from './style';

const LastScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>(Screen 2)</Text>
      <Text>Dashboard</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home Screen" onPress={() => navigation.popToTop()} />
    </View>
  );
};

export default LastScreen;
