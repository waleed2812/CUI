import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Text,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

// My Components
import Stats from './screen-components/Stats';
import Countries from './screen-components/Countries';

// My Constants
import {colors, styles} from './constants/style';

// Change Navigation Bar Color
const navbar_color = async () => {
  try {
    const response = await changeNavigationBarColor(colors.light, true);
    console.log(response); // {success: true}
  } catch (e) {
    console.log(e); // {success: false}
  }
};
navbar_color().done();

// Stack Navigator Object
const Stack = createStackNavigator();

// Component to display Countries List
const Country = ({navigation, route}) => {
  // To See if favourites are to be printed or all
  const fav = route.params?.fav || false;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'List'}
        component={Countries}
        options={{
          headerStyle: styles.header,

          headerTitle: () => (
            <Text style={styles.headerTxt}>
              {fav ? 'Favourites' : 'All Countries'}
            </Text>
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Ionicons
                name={'menu'}
                size={30}
                color={colors.darker}
                style={{paddingLeft: 10}}
              />
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

// Component to display World's Statistics
const World = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'World Statistics'} component={Stats} />
    </Stack.Navigator>
  );
};

// Drawer Object for Drawer Screens
const Drawer = createDrawerNavigator();

// Drawer Navigator for Countries and World
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawer}
      drawerType={useWindowDimensions().width >= 768 ? 'permanent' : 'front'}
      drawerContentOptions={{
        activeTintColor: colors.darker,
        inactiveTintColor: colors.dark,
        labelStyle: styles.drawerItem,
      }}>
      <Drawer.Screen
        name={'World'}
        component={World}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name={'earth'} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Countries'}
        component={Country}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name={'flag'} size={20} color={color} />
          ),
        }}
        initialParams={{fav: false}}
      />
      <Drawer.Screen
        name={'Favourites'}
        component={Country}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name={'heart'} size={20} color={color} />
          ),
        }}
        initialParams={{fav: true}}
      />
    </Drawer.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={colors.light}
        barStyle={'dark-content'}
      />
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </>
  );
};

export default App;
