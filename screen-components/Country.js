/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../constants/style';
import Stats from './Stats';

const Stack = createStackNavigator();

const Country = ({navigation, route}) => {
  // Hooks
  const [countries, setCountries] = useState([]); // To Update COVID Data
  const [getFav, setFav] = useState([]);

  // Filter Favourite
  const fav = route.params?.fav;
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

  // Function to get Data from World Population API
  const getFavs = async () => {
    // Options for API
    try {
      const data = await AsyncStorage.getItem('fav');
      setFav(JSON.parse(data));
    } catch (err) {
      // Set Empty list if no data was found
      setFav([]);
    }
  };
  getFavs();

  // Function to save favourites
  const save = (name) => {
    setFav([...getFav, {name: `${name}`}]);
    AsyncStorage.setItem('fav', JSON.stringify([...getFav, {name: `${name}`}]));
    console.log('Saving...');
  };

  // Final Component of Country List
  const Countries_screen = () => {
    // Countries List
    const temp = countries.body?.countries || ['pakistan'];

    // Deciding Which Country List to show
    // All Countries or just favourites
    const DATA = fav
      ? getFav
      : temp.map((item) => {
          return {key: Math.random().toString(), name: `${item}`};
        });

    // Item to display FlatList Items
    const render_item = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            navigation.navigate('Stats', {cntry: item.name + ''});
          }}
          key={item.key}>
          <Text style={{fontSize: 20, color: 'black'}}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => {
              save(item.name + '');
            }}>
            <Ionicons name={'heart'} size={20} />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={render_item}
          keyExtractor={(item) => `${item.key}`}
          extraData={navigation}
        />
      </SafeAreaView>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'List'}
        component={Countries_screen}
        options={{
          headerTitle: () => (
            <Text style={styles.header}>
              {fav ? 'Favourite' : 'All'} Countries
            </Text>
          ),

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

export default Country;
