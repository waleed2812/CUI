import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../constants/style';

const Stack = createStackNavigator();

const Stats = ({navigation, route}) => {
  // Hooks
  const no_data = [
    {
      confirmed: 'No Data',
      recovered: 'No Data',
      critical: 'No Data',
      deaths: 'No Data',
      lastChange: 'No Data',
      lastUpdate: 'No Data',
    },
  ];
  const [list, setList] = useState(no_data); // To Update COVID Data
  const [population, setPopulation] = useState(0);

  // Variables for Api Link
  const world = route.params?.world || 'worldpopulation';
  const cntry = route.params?.cntry || '';
  const covid = route.params?.covid || 'totals';

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
        // Update List from response
        setPopulation(response.data?.body.world_population);

        // Save on Local Storage for later use
        AsyncStorage.setItem(
          'population',
          `${response.data.body.world_population}`,
        );
      })
      .catch(async () => {
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

  React.useEffect(() => {
    getCovid();
    getWorld();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stats = () => {
    // Variables for calculation and data display
    const confirmed = Number.parseInt(list[0].confirmed, 10);
    const recovered = Number.parseInt(list[0].recovered, 10);
    const critical = Number.parseInt(list[0].critical, 10);
    const deaths = Number.parseInt(list[0].deaths, 10);
    const lastUpdate = list[0].lastUpdate;
    const pop = Number.parseInt(population, 10);

    return (
      <View style={styles.container}>
        <Text>
          Confirmed: {confirmed} {((confirmed / pop) * 100).toFixed(2)}%
        </Text>
        <Text>
          Recovered: {recovered} {((recovered / confirmed) * 100).toFixed(2)}%
        </Text>
        <Text>
          Critical Cases: {critical} {((critical / confirmed) * 100).toFixed(2)}
          %
        </Text>
        <Text>
          Deaths: {deaths} {((deaths / confirmed) * 100).toFixed(2)}%
        </Text>
        <Text>Last Updated: {lastUpdate}</Text>
        <Text>Total Population: {pop}</Text>
      </View>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={getCovid}>
            <Ionicons name={'refresh'} size={30} color={'black'} />
          </TouchableOpacity>
        ),

        headerLeft: () => (
          <TouchableOpacity onPress={navigation.toggleDrawer}>
            <Ionicons name={'menu'} size={30} color={'black'} />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen
        name={
          cntry.length <= 0
            ? 'World Statistics'
            : `${cntry.charAt(0).toUpperCase()}${cntry
                .substr(1)
                .toLowerCase()} Statistics`
        }
        component={Stats}
      />
    </Stack.Navigator>
  );
};

export default Stats;
