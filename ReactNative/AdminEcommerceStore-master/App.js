/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {employee} from './constants/employee';
import {products} from './constants/products';
import {orders} from './constants/orders';

// Function for custom Button
const AppButton = (props) => {
  // Assigning required parameters default values
  // In case of no Arguments Passed
  const disable = props.disabled || false;
  const onPress = props.onPress || function () {};
  const title = props.title || 'Button';
  const style = props.style || {width: '100%'};
  const txt_style = props.txt_style || {fontSize: 32};

  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disable}>
      <Text style={txt_style}>{title}</Text>
    </TouchableOpacity>
  );
};

const DetailScreen = ({navigation, route}) => {
  let list = []; // List to store imported items
  let display = []; // List to hold JSX components for display
  let i = route.params.index || 0;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // title: `${route.params.listOf} Details`,
      title: 'Product Details',
    });
  }, [navigation, route]);

  switch (route.params.listOf) {
    case 'Employee':
      list.push(...employee);
      break;
    case 'Order':
      list.push(...orders);
      break;
    case 'Products':
      list.push(...products);
      break;
    default:
      list.push(...products);
  }

  // Getting All Keys For Object to Show in Description
  let keys = Object.keys(list[i]);

  for (let j = 2; j < keys.length; j++) {
    display.push(
      <Text style={styles.item_txt} key={j}>{`${keys[j]}: ${
        list[i][keys[j]]
      }`}</Text>,
    );
  }
  return (
    <View style={styles.detailContainer}>
      <ScrollView style={styles.item_detail}>
        <Image style={{width: '100%', height: 500}} source={list[i].Image} />
        {display}
      </ScrollView>
    </View>
  );
};

const ListScreen = ({navigation, route}) => {
  let list = []; // List to store imported items
  let display = []; // List to contain JSX components for displaying

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.listOf} List`,
    });
  }, [navigation, route]);

  switch (route.params.listOf) {
    case 'Employee':
      list.push(...employee);
      break;
    case 'Order':
      list.push(...orders);
      break;
    case 'Products':
      list.push(...products);
      break;
    default:
      list = [{Error: 'No list', Detail: 'Select Valid List'}];
  }

  for (let i = 0; i < list.length; i++) {
    let keys = Object.keys(list[i]);
    display.push(
      <TouchableOpacity
        key={i}
        style={styles.item_view}
        onPress={() =>
          navigation.navigate('Detail', {
            listOf: route.params.listOf,
            index: i,
          })
        }>
        <Text style={styles.item_txt}>{`${keys[2]}: ${list[i][keys[2]]}`}</Text>
        <Text style={styles.item_txt}>{`${keys[3]}: ${list[i][keys[3]]}`}</Text>
        <Image style={{width: 100, height: 100}} source={list[i].Image} />
      </TouchableOpacity>,
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{width: '100%'}}>{display}</ScrollView>
    </View>
  );
};

const StartScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <AppButton
        title={'Manage Products'}
        style={styles.btn_start_screen}
        txt_style={styles.btn_start_screen_txt}
        onPress={() => navigation.navigate('List', {listOf: 'Products'})}
      />
      <AppButton
        title={'Manage Employee'}
        style={styles.btn_start_screen}
        txt_style={styles.btn_start_screen_txt}
        onPress={() => navigation.navigate('List', {listOf: 'Employee'})}
      />
      <AppButton
        title={'Manage Order'}
        style={styles.btn_start_screen}
        txt_style={styles.btn_start_screen_txt}
        onPress={() => navigation.navigate('List', {listOf: 'Order'})}
      />
    </View>
  );
};

const Stack = createStackNavigator();

export default () => {
  return (
    <>
      <StatusBar transluscent={false} backgroundColor={'darkblue'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'darkblue',
            },
          }}>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{title: 'PhoneSeller.com'}}
          />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  item_detail: {
    width: '90%',
  },

  detailContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  item_txt: {
    fontSize: 20,
  },

  item_view: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },

  btn_start_screen_txt: {
    color: 'white',
    fontSize: 32,
  },

  btn_start_screen: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
  },

  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
