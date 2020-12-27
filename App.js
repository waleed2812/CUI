/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// My Components
import Stats from './screen-components/Stats';
import Countries from './screen-components/Countries';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const Country = ({navigation, route}) => {
  // To See if favourites are to be printed or all
  const fav = route.params?.fav || false;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'List'}
        component={Countries}
        options={{
          headerTitle: () => (
            <Text style={styles.header}>
              {fav ? 'Favourite' : 'All'} Countries
            </Text>
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Ionicons name={'menu'} size={30} color={'black'} />
            </TouchableOpacity>
          ),
        }}
        initialParams={{fav: fav}}
      />
      <Stack.Screen
        name={'Stats'}
        component={Stats}
        initialParams={{cntry: 'Pakistan'}}
      />
    </Stack.Navigator>
  );
};

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
