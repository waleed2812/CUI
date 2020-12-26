/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../constants/style';
import Stats from './Stats';

const Stack = createStackNavigator();

const All = ({navigation}) => {
  // Hooks
  const [countries, setCountries] = useState([]); // To Update COVID Data
  const [getFav, setFav] = useState([]);

  // Function to get Data from World Population API
  const getCountries = () => {
    // Options for API
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/allcountriesname',
      headers: {
        'x-rapidapi-key': '067da5ff5bmsh74944382777f27dp18db32jsne4841f51b22e',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        // Update List from response
        setCountries(response.data);

        // Save on Local Storage for later use
        AsyncStorage.setItem('countries', JSON.stringify(response.data));
      })
      .catch(async () => {
        // Get Data From Memory if Online Fails

        // Checking If Data was fetched
        try {
          const data = await AsyncStorage.getItem('countries');
          setCountries(JSON.parse(data));
        } catch (err) {
          // Set Empty list if no data was found
          setCountries([]);
        }
      });
  };

  // Rendering Call
  React.useEffect(getCountries, []);

  // Function to save favourites
  const save = (name) => {
    setFav([...getFav, name]);
    AsyncStorage.setItem('fav', JSON.stringify([...getFav, name]));
  };

  // Final Component of Country List
  const Countries_screen = () => {
    // Array to store JSX components
    // to display countries
    const all_list = [];

    const all = countries.body?.countries || [];

    if (all.length <= 0) {
      all_list.push(<Text key={0}>No Records</Text>);
    }

    for (let i = 0; i < all.length; i++) {
      all_list.push(
        <TouchableOpacity
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            navigation.navigate('Stats', {cntry: all[i] + ''});
          }}
          key={i}>
          <Text style={{fontSize: 20, color: 'black'}}>{all[i]}</Text>
          <Ionicons name={'heart'} size={20} onPress={save.bind(all[i] + '')} />
        </TouchableOpacity>,
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView style={{width: '100%', height: '100%'}}>
          {all_list}
        </ScrollView>
      </View>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'List'}
        component={Countries_screen}
        options={{
          headerTitle: () => <Text style={styles.header}>All Countries</Text>,

          headerRight: () => (
            <TouchableOpacity onPress={getCountries}>
              <Ionicons name={'refresh'} size={30} color={'black'} />
            </TouchableOpacity>
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Ionicons name={'menu'} size={30} color={'black'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={'Stats'}
        component={Stats}
        initialParams={{cntry: 'Pakistan'}}
      />
    </Stack.Navigator>
  );
};

export default All;
