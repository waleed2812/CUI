/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Button} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import LastScreen from './screens/LastScreen';
import {styles} from './screens/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Contacts from './screens/Contacts';
import CallHistory from './screens/CallHistory';
// import {Ionicons} from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Contacts'}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      shifting={true}
      barStyle={{backgroundColor: '#694fad', paddingBottom: 10}}>
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarColor: 'green',
          tabBarIcon: ({color}) => (
            <Ionicons name={'people'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={CallHistory}
        options={{
          tabBarBadge: true,
          tabBarColor: 'pink',
          tabBarIcon: ({color}) => (
            <FontAwesome name={'history'} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const MyStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'lightblue',
        },
        headerLeft: () => (
          <Ionicons
            name={'menu'}
            color={'white'}
            size={40}
            onPress={navigation.toggleDrawer}
          />
        ),
      })}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Welcome',
          // headerShown: false,
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerRight: () => <Button title={'Edit'} />,
        }}
      />
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{
          title: 'Start Here',
          headerRight: () => <Button title={'Show'} />,
        }}
      />
      <Stack.Screen name="LastScreen" component={LastScreen} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      openByDefault={true}
      drawerType="slide"
      drawerStyle={styles.drawer}
      drawerContentOptions={{
        activeTintColor: 'red',
      }}>
      <Drawer.Screen
        name={'Stack'}
        component={MyStackNavigator}
        options={{
          drawerLabel: 'Welcome Home',
          drawerIcon: () => <Ionicons name={'home'} size={20} />,
        }}
      />
      <Drawer.Screen
        name={'Contacts'}
        component={BottomTabs}
        options={{
          drawerIcon: () => <Ionicons name={'people'} size={20} />,
        }}
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
