import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../constants/style';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Stack = createStackNavigator();

const StatsView = ({route}) => {
  return (
    <View style={styles.container}>
      <Text>Confirmed: {route.params?.list.confirmed}</Text>
      <Text>Recovered: {route.params?.list.recovered}</Text>
      <Text>Critical Cases: {route.params?.list.critical}</Text>
      <Text>Deaths: {route.params?.list.deaths}</Text>
      <Text>Last Updated: {route.params?.list.lastUpdate}</Text>
    </View>
  );
};

const Stats = ({naviagtion, route}) => {
  const [list, setList] = useState([{}]);
  const [rendering, setRendering] = useState(false);

  let options, title;

  switch (route.params?.stats) {
    case 'world':
      options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/totals',
        headers: {
          'x-rapidapi-key':
            '067da5ff5bmsh74944382777f27dp18db32jsne4841f51b22e',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        },
      };
      title = 'World Statiscs';
      break;
    default:
      options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/totals',
        headers: {
          'x-rapidapi-key':
            '067da5ff5bmsh74944382777f27dp18db32jsne4841f51b22e',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        },
      };
      title = 'World Statiscs';
      break;
  }

  const getData = () => {
    axios
      .request(options)
      .then(function (response) {
        // Update List from response
        setList(response.data);

        // To Stop re-render
        setRendering(true);

        // Save on Local Storage for later use
        AsyncStorage.setItem('list', JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  React.useEffect(getData, []);

  if (!rendering) {
    return (
      <View style={styles.container}>
        <Text>No Data</Text>
      </View>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={title}
          component={StatsView}
          initialParams={{list: list[0]}}
        />
      </Stack.Navigator>
    );
  }
};

export default Stats;
