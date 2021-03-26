import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {styles} from './style';

const StartScreen = ({navigation, route}) => {
  const id = route.params.id;

  return (
    <View style={styles.container}>
      <Text>ID: {id}</Text>
      <Button
        title="Get New ID"
        onPress={() =>
          navigation.setParams({
            id: Math.floor(Math.random() * 100),
          })
        }
      />
      <Text>Name: {route.params.name}</Text>
      <Text>(Screen 1)</Text>
      <Text>Welcome to My App</Text>
      <Button
        title="Go to Last Screen"
        onPress={() => navigation.navigate('LastScreen')}
      />
    </View>
  );
};

export default StartScreen;
