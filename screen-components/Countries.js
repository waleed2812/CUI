/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../constants/style';

const Countries = ({navigation, route}) => {
  // Hooks
  const [countries, setCountries] = useState([]); // To Update COVID Data
  const [getFav, setFav] = useState([]);

  // Filter Favourite
  const fav = route.params?.fav || false;

  // Function to get Data from World Population API
  const getFavs = async () => {
    // Options for API
    try {
      const data = await AsyncStorage.getItem('fav');
      setFav(JSON.parse(data));
    } catch (err) {
      setFav([]);
    }
  };

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
  React.useEffect(() => {
    if (fav) {
      getFavs().done();
    } else {
      getCountries();
    }
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={fav ? getFavs : getCountries}>
          <Ionicons name={'refresh'} size={30} color={'black'} />
        </TouchableOpacity>
      ),
    });
  }, [fav, navigation]);

  // remove from favourites
  const removeItem = (itemName) => {
    // Fetching current items from fav hooks
    const prev = getFav || [];

    // Updating Local Storage
    AsyncStorage.setItem(
      'fav',
      JSON.stringify(prev.filter((item) => item.name !== itemName)),
    )
      .then(() => {
        // Updating Hook
        setFav(prev.filter((item) => item.name !== itemName));
      })
      .catch((e) => console.error('While Removing', e));
  };

  // Function To save/remove Favourites
  const save = async (item) => {
    // Fetching current items from fav hooks
    const prev = JSON.parse(await AsyncStorage.getItem('fav')) || [];

    // Checking if item already exists
    if (prev.find((items) => items.name === item.name) !== undefined) {
      // Removing Item if exists
      removeItem(item.name);
    } else {
      // Save to favourites states and memory if new item
      setFav([...prev, item]);
      AsyncStorage.setItem('fav', JSON.stringify([...prev, item])).catch((e) =>
        console.error('Adding New Value: ', e),
      );
    }
  };

  // Item to display FlatList Items
  const render_item = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={() => {
        navigation.navigate('Stats', {cntry: item.name + ''});
      }}
      key={item.key}>
      <Text style={{fontSize: 20, color: 'black'}}>{item.name}</Text>

      <TouchableOpacity onPress={() => save(item)} style={{padding: 10}}>
        <Text style={{fontSize: 20}}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={fav ? getFav : countries}
        renderItem={render_item}
        keyExtractor={(item) => item.key?.toString()}
        extraData={{navigation}}
      />
    </SafeAreaView>
  );
};

export default Countries;
