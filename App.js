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
import All from './screen-components/All';

const Tab = createBottomTabNavigator();

const Country = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'All'} component={All} />
      <Tab.Screen
        name={'Favs'}
        component={All}
        initialParams={{favs: true}}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const World = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'World Statistics'} component={Stats} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={'World'} component={World} />
      <Drawer.Screen name={'Country'} component={Country} />
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
