/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

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

// Function to update display
const HistoryScreen = ({navigation, route}) => {
  const [getResults, setResults] = useState(route.params.list); // Record Calculations

  // Function to remove singular item
  const removeItem = (itemKey) => {
    Alert.alert(
      'Are you sure ?',
      `Delete ${getResults.find((item) => item.key === itemKey).Price}`,
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: () => {
            setResults(() => getResults.filter((item) => item.key !== itemKey));
          },
        },
      ],
    );
  };

  // Function to remove all items
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clear = () => {
    Alert.alert('Are you sure ?', 'Delete All ?', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          navigation.navigate('Start', {list: []});
        },
      },
    ]);
  };

  //Clear Button For Screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppButton
          title={'Clear'}
          style={styles.header_btns}
          txt_style={styles.header_btns_txt}
          onPress={clear}
        />
      ),
      headerLeft: () => (
        <AppButton
          title={'<-'}
          style={styles.header_btns}
          txt_style={styles.header_btns_txt}
          onPress={() => {
            navigation.navigate('Start', {list: getResults});
          }}
        />
      ),
    });
  }, [navigation, getResults, clear]);

  return (
    <>
      <StatusBar transluscent={false} backgroundColor={'darkblue'} />
      <View style={styles.historyContainer}>
        <DataTable>
          <DataTable.Header style={styles.tbl_header}>
            <DataTable.Title style={{...styles.tbl_header_title, flex: 3}}>
              <Text style={styles.tbl_header_txt}>Original</Text>
            </DataTable.Title>
            <DataTable.Title style={{...styles.tbl_header_title, flex: 1}}>
              <Text style={styles.tbl_header_txt}>-</Text>
            </DataTable.Title>
            <DataTable.Title style={{...styles.tbl_header_title, flex: 3}}>
              <Text style={styles.tbl_header_txt}>Discount%</Text>
            </DataTable.Title>
            <DataTable.Title style={{...styles.tbl_header_title, flex: 1}}>
              <Text style={styles.tbl_header_txt}>=</Text>
            </DataTable.Title>
            <DataTable.Title style={{...styles.tbl_header_title, flex: 3}}>
              <Text style={styles.tbl_header_txt}>Final</Text>
            </DataTable.Title>
            <DataTable.Title style={{...styles.tbl_header_title, flex: 1}}>
              <TouchableOpacity
                style={{...styles.crossbtn, backgroundColor: 'black'}}
                onPress={clear}>
                <Text style={styles.crossbtn_txt}>x</Text>
              </TouchableOpacity>
            </DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {getResults.map((item, i) => (
              <DataTable.Row
                style={{
                  backgroundColor: i % 2 === 0 ? '#D9E1F2' : 'white',
                  borderBottomColor: '#4472C4',
                  borderBottomWidth: 1,
                }}
                key={item.key}>
                <DataTable.Cell
                  style={{...styles.tbl_header_title, flex: 3}}
                  numeric>
                  <Text style={styles.tbl_txt}>{item.Price}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{...styles.tbl_header_title, flex: 1}}>
                  <Text style={styles.tbl_txt}>-</Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{...styles.tbl_header_title, flex: 3}}
                  numeric>
                  <Text style={styles.tbl_txt}>{item.Disc}%</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{...styles.tbl_header_title, flex: 1}}>
                  <Text style={styles.tbl_txt}>=</Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{...styles.tbl_header_title, flex: 3}}
                  numeric>
                  <Text style={styles.tbl_txt}>{item.Final}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{...styles.tbl_header_title, flex: 1}}>
                  <TouchableOpacity
                    style={{...styles.crossbtn, backgroundColor: 'grey'}}
                    onPress={() => removeItem(item.key)}>
                    <Text style={styles.crossbtn_txt}>x</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </View>
    </>
  );
};

// Component for main screen
const StartScreen = ({navigation, route}) => {
  // Hooks
  const [getPrice, setPrice] = useState(''); // Original Price
  const [getDiscount, setDiscount] = useState(''); // Discount
  const [getFinalPrice, setFinalPrice] = useState(''); // Final Calculated Price
  const [getResults, setResults] = useState([]); // Record Calculations
  const [isDisable, setDisable] = useState(false); // Disable Save Button

  // Change input to numbers
  const changeAlphaNumeric = (...args) => {
    // Input field text
    let text = args[0] || '';

    // Checking which input field is pressed
    let price_disc = args[1] || 'price';

    // If user is trying to empty field
    if (text.length <= 0) {
      if (price_disc === 'price') {
        setPrice('');
      } else {
        setDiscount('');
      }

      // Update Final Price
      setFinalPrice('');

      // Disable Save Button on Empty Field
      setDisable(true);
      return;
    }

    // Checking if the value is float
    // If it is a valid float update it
    // Other wise leave it
    if (!new RegExp(/^[-+]?\d*\.?\d*$/).test(text)) {
      return;
    }

    // Price Entered
    let price = Number.parseFloat(getPrice);

    // Discount
    let disc = Number.parseFloat(getDiscount);

    // Update price if event is triggered by price field
    if (price_disc === 'price') {
      setPrice(text + '');
      price = Number.parseFloat(text);
    }

    // Else update number field
    else if (text > 0 && text < 100) {
      setDiscount(text + '');
      disc = Number.parseFloat(text);
    }

    if (isNaN(disc) || isNaN(price)) {
      return;
    }

    // Update Price
    setFinalPrice((price - price * (disc / 100.0)).toFixed(2));

    // Enable Saving
    setDisable(false);
  };

  // Function to respond to click responds
  const save = () => {
    if (getPrice.length === 0 || getDiscount.length === 0) {
      Alert.alert('Calculate Discount to Save');
      // setDisable(true);
      return;
    }

    // Save Records
    // Updating state object
    setResults([
      ...getResults,
      {
        key: Math.random().toString(),
        Price: getPrice,
        Disc: getDiscount,
        Final: getFinalPrice,
      },
    ]);
    // Disable Save Button Until Values Changed
    setDisable(true);
  };

  // Function called on render
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // Navigate to History Button
      headerRight: () => (
        <AppButton
          title={'History'}
          style={styles.header_btns}
          txt_style={styles.header_btns_txt}
          onPress={() => {
            if (getResults.length <= 0) {
              Alert.alert('Empty Record', 'Save Something to see History');
            } else {
              navigation.navigate('History', {list: getResults});
            }
          }}
        />
      ),
    });

    // Reset Results State if returning from
    // history screen by clear button
    if (route.params?.list) {
      setResults(route.params?.list);
      route.params = {};
    }
  }, [navigation, route, getResults]);

  return (
    <>
      <StatusBar transluscent={false} backgroundColor={'darkblue'} />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabel_txt}>Price</Text>
          </View>
          <TextInput
            style={styles.input_text}
            keyboardType={'numeric'}
            onChangeText={(text) => changeAlphaNumeric(text, 'price')}
            value={getPrice}
            placeholder={'Enter Price digits only'}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabel_txt}>Discount</Text>
          </View>
          <TextInput
            style={styles.input_text}
            keyboardType={'numeric'}
            onChangeText={(text) => changeAlphaNumeric(text, 'disc')}
            value={getDiscount}
            placeholder={'Enter Digits (0-100)'}
          />
        </View>
        <View style={styles.result}>
          <Text style={styles.result_txt}>Final Price: {getFinalPrice}</Text>
        </View>
        <View style={styles.result}>
          <Text style={styles.result_txt}>
            You Save:{' '}
            {getFinalPrice.length > 0
              ? Number.parseFloat((getPrice - getFinalPrice).toString())
                  .toFixed(2)
                  .toString()
              : '0'}
          </Text>
        </View>
        <AppButton
          title={'Save'}
          style={styles.btns}
          txt_style={styles.btns_txt}
          onPress={save}
          disabled={isDisable}
        />
      </View>
    </>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'darkblue',
          },
        }}>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerTitleAlign: 'left',
            title: 'Discount Calculator',
          }}
        />

        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  crossbtn_txt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  crossbtn: {
    borderRadius: 50,
    width: 25,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tbl_txt: {
    color: 'black',
    fontSize: 15,
  },

  tbl_header_txt: {
    fontSize: 18,
    color: 'white',
  },

  tbl_header_title: {
    justifyContent: 'center',
  },

  tbl_header: {
    backgroundColor: '#4472C4',
  },

  historyContainer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },

  btns_txt: {
    fontSize: 21,
    padding: 10,
    textAlign: 'center',
    color: 'white',
  },

  btns: {
    backgroundColor: 'lightgreen',
    width: '30%',
  },

  result_txt: {
    fontSize: 26,
    color: 'white',
  },

  result: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    margin: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },

  input_text: {
    flex: 3.5,
    borderBottomWidth: 1,
    borderColor: 'red',
    backgroundColor: '#fff',
    fontSize: 20,
  },

  inputLabel_txt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  inputLabel: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 'auto',
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    maxHeight: 100,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  header_btns_txt: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10,
  },

  header_btns: {
    backgroundColor: 'transparent',
  },
});
