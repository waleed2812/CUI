/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Button, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Ionicons} from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// My Components
import Stats from './screen-components/Stats';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './constants/style';

const Sample = () => {
  return (
    <View style={styles.container}>
      <Text>Sample</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Countries = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'All'} component={Sample} />
      <Tab.Screen name={'Favs'} component={Sample} />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={'World'} component={Stats} />
      <Drawer.Screen name={'Countries'} component={Countries} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};

export default App;
