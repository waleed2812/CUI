/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../constants/style';
import Stats from './Stats';

const Countries = ({navigation, route}) => {
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
        // Getting Response
        const temp = response.data.body?.countries.map((item) => {
          return {key: Math.random().toString(), name: `${item}`};
        });

        // Update List from response
        setCountries(temp);

        // Save on Local Storage for later use
        AsyncStorage.setItem('countries', JSON.stringify(temp));
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
  const save = (item) => {
    setFav([...getFav, item]);
    AsyncStorage.setItem('fav', JSON.stringify([...getFav, item]));
    console.log('Saving...');
  };

  // Item to display FlatList Items
  const render_item = ({item}) => (
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
          save(item);
        }}>
        <Ionicons name={'heart'} size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={fav ? getFav : countries}
        renderItem={render_item}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
};

export default Countries;
