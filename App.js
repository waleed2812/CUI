/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// My Components
import Stats from './screen-components/Stats';
import Country from './screen-components/Country';

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
      <Drawer.Screen
        name={'All Countries'}
        component={Country}
        initialParams={{fav: false}}
      />
      <Drawer.Screen
        name={'Favourite Countries'}
        component={Country}
        initialParams={{fav: true}}
      />
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
