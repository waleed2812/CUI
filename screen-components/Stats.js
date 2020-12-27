/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles, colors} from '../constants/style';

const Stats = ({navigation, route}) => {
  // Hooks
  const no_data = [
    {
      confirmed: 0,
      recovered: 0,
      critical: 0,
      deaths: 0,
      lastChange: 'Never',
      lastUpdate: 'Never',
    },
  ];
  const [list, setList] = useState(no_data); // To Update COVID Data
  const [population, setPopulation] = useState(0);

  // Variables for Api Link depending on parameters passed
  let world = 'worldpopulation',
    cntry = '',
    covid = 'totals';

  // Change Variable Values if Country Name was given
  if (route.params?.cntry) {
    world = 'population';
    cntry = route.params?.cntry;
    // Title String
    cntry = cntry.charAt(0).toUpperCase() + cntry.substr(1).toLowerCase();
    covid = 'country';
  }

  // Function to get Data from Covid API
  const getCovid = () => {
    // Options for API
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/' + covid,
      params: {name: cntry},
      headers: {
        'x-rapidapi-key': '067da5ff5bmsh74944382777f27dp18db32jsne4841f51b22e',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        // Update List from response
        setList(response.data);

        // Save on Local Storage for later use
        AsyncStorage.setItem('list', JSON.stringify(response.data));
      })
      .catch(async () => {
        // Get Data From Memory if Online Fails
        const data = await AsyncStorage.getItem('list');

        // Checking If Data was fetched
        if (JSON.parse(data).length > 0) {
          setList(JSON.parse(data));
        } else {
          // Set Empty list if no data was found
          setList(no_data);
        }
      });
  };

  // Function to get Data from World Population API
  const getWorld = () => {
    // Options for API
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/' + world,
      params: {country_name: cntry},
      headers: {
        'x-rapidapi-key': '067da5ff5bmsh74944382777f27dp18db32jsne4841f51b22e',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        // Update List from response according to
        // country or world
        if (route.params?.cntry) {
          // Update List from response
          setPopulation(response.data?.body.population);

          // console.error(response.data?.body.population);
          // Save on Local Storage for later use
          AsyncStorage.setItem(
            'population',
            `${response.data?.body.population}`,
          );
        } else {
          // Update List from response
          setPopulation(response.data?.body.world_population);

          // Save on Local Storage for later use
          AsyncStorage.setItem(
            'population',
            `${response.data?.body.world_population}`,
          );
        }
      })
      .catch(async (err) => {
        // Get Data From Memory if Online Fails
        // Checking If Data was fetched
        try {
          const data = await AsyncStorage.getItem('population');
          setPopulation(data);
        } catch (err) {
          // Set Empty list if no data was found
          setPopulation(0);
        }
      });
  };

  // Refresh Stats
  const refresh = () => {
    getCovid();
    getWorld();
  };

  React.useEffect(() => {
    refresh();
    navigation.setOptions({
      headerStyle: styles.header,

      headerTitle: () => (
        <Text style={styles.headerTxt}>
          {cntry.length <= 0
            ? 'World Statistics'
            : `${cntry.charAt(0).toUpperCase()}${cntry
                .substr(1)
                .toLowerCase()} Statistics`}
        </Text>
      ),

      headerRight: () => (
        <TouchableOpacity onPress={refresh}>
          <Ionicons
            name={'refresh'}
            size={30}
            color={colors.darker}
            style={{paddingRight: 10}}
          />
        </TouchableOpacity>
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, cntry]);

  // Variables for calculation and data display
  const confirmed = Number.parseInt(list[0].confirmed, 10);
  const recovered = Number.parseInt(list[0].recovered, 10);
  const critical = Number.parseInt(list[0].critical, 10);
  const deaths = Number.parseInt(list[0].deaths, 10);
  const lastUpdate = list[0].lastUpdate;
  const pop = Number.parseInt(population, 10);

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statsTxtContainer}>
          <Text style={styles.statsTxt}>Confirmed: {confirmed}</Text>
          <Text style={styles.statsTxt}>
            {((confirmed / pop) * 100).toFixed(2)}%
          </Text>
        </View>
        <View style={styles.statsTxtContainer}>
          <Text style={styles.statsTxt}>Recovered: {recovered}</Text>
          <Text style={styles.statsTxt}>
            {((recovered / confirmed) * 100).toFixed(2)}%
          </Text>
        </View>
        <View style={styles.statsTxtContainer}>
          <Text style={styles.statsTxt}>Critical Cases: {critical}</Text>
          <Text style={styles.statsTxt}>
            {((critical / confirmed) * 100).toFixed(2)}%
          </Text>
        </View>
        <View style={styles.statsTxtContainer}>
          <Text style={styles.statsTxt}>Deaths: {deaths}</Text>
          <Text style={styles.statsTxt}>
            {((deaths / confirmed) * 100).toFixed(2)}%
          </Text>
        </View>
        <View style={styles.statsTxtContainer}>
          <Text style={styles.statsTxt}>Last Updated</Text>
          <Text style={styles.statsTxt}>
            {lastUpdate.substr(0, 10)} {lastUpdate.substr(11, 8)}
          </Text>
        </View>
        <View style={styles.statsTxtContainer}>
          <Text style={styles.statsTxt}>Total Population: {pop}</Text>
        </View>
      </View>
    </View>
  );
};

export default Stats;
