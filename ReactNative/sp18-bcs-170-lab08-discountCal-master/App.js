// https://github.com/waleedbutt98/sp18-bcs-170-lab08-discountCal
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal,
  Alert,
} from 'react-native';

// Function for custom Button
function AppButton(props) {
  let args = props.args || props.title;

  return (
    <TouchableOpacity
      onPress={props.onPress.bind(this, args)}
      style={props.style}>
      <Text style={props.txt_style}>{props.title}</Text>
    </TouchableOpacity>
  );
}

// Game Component
const App = () => {
  // Hooks
  const [getPrice, setPrice] = useState(''); // Original Price
  const [getDiscount, setDiscount] = useState(''); // Original Discount
  const [getFinalPrice, setFinalPrice] = useState(''); // Final Calculated Price
  const [getResults, setResults] = useState([]); // Record Calculations
  const [getDisplay, setDisplay] = useState(false); // Hook for Model

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
  };

  // Function to respond to click responds
  const btn_click = (...args) => {
    let btn_clicked = args[0];

    switch (btn_clicked) {
      case 'Calculate':
        // Checking if the inputs are not empty
        if (getPrice.length <= 0 || getDiscount.length <= 0) {
          // Set Final Price as null
          setFinalPrice('');
          return;
        }

        // Price Entered
        let price = Number.parseFloat(getPrice);

        // Discount
        let disc = Number.parseFloat(getDiscount);

        // Final Price
        let final = (price - price * (disc / 100.0)).toFixed(2);

        // Update Price
        setFinalPrice(final);
        break;

      case 'Save':
        // Checking if th input fields are empty
        if (
          getPrice.length === 0 ||
          getDiscount.length === 0 ||
          getFinalPrice === 0
        ) {
          // eslint-disable-next-line no-alert
          alert('Calculate Discount to Save');
        }

        // Save Records
        let res = getResults;

        // Pushing new Records
        res.push({
          Price: getPrice,
          Disc: getDiscount,
          Final: getFinalPrice,
        });

        // Updating state object
        setResults(res);
        break;

      case 'History':
        setDisplay(true);
        break;

      case '<-':
        setDisplay(false);
        break;

      case 'Clear':
        setResults([]);
        break;
      default:
        break;
    }
  };

  // Function to update display
  const get_history_screen = () => {
    let history = [];

    // Appending history to view
    let results = getResults;

    // Looping through results
    for (let i = 0; i < results.length; i++) {
      history.push(
        <View style={styles.scroll_item} key={i}>
          <Text style={styles.scroll_txt} key={i + 1}>
            Price: {results[i].Price}
          </Text>
          <Text style={styles.scroll_txt} key={i + 2}>
            Discount: {results[i].Disc}%
          </Text>
          <Text style={styles.scroll_txt} key={i + 3}>
            Final Price: {results[i].Final}
          </Text>
          <View style={styles.hr} key={i + 4} />
        </View>,
      );
    }

    return (
      <View style={styles.historyContainer}>
        <View style={styles.h_btn_area}>
          <AppButton
            title={'<-'}
            style={styles.h_btns}
            txt_style={styles.btns_txt}
            onPress={btn_click}
          />
          <AppButton
            title={'Clear'}
            style={styles.h_btns}
            txt_style={styles.btns_txt}
            onPress={btn_click}
          />
        </View>
        <ScrollView>
          <View style={styles.scroll_area}>{history}</View>
        </ScrollView>
      </View>
    );
  };

  // Component for main screen
  const main_screen = (
    <View style={styles.mainContainer}>
      <View style={styles.heading}>
        <Text style={styles.headingTxt}>Discount Calculator</Text>
      </View>

      <View style={styles.inp_area}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Price:</Text>
          <TextInput
            style={styles.input_text}
            keyboardType={'numeric'}
            onChangeText={(text) => changeAlphaNumeric(text, 'price')}
            value={getPrice}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Discount (0-100%):</Text>
          <TextInput
            style={styles.input_text}
            keyboardType={'numeric'}
            onChangeText={(text) => changeAlphaNumeric(text, 'disc')}
            value={getDiscount}
          />
        </View>

        <View style={styles.result}>
          <Text style={styles.result_txt}>Final Price: {getFinalPrice}</Text>
        </View>
      </View>

      <View style={styles.btn_area}>
        <AppButton
          title={'Calculate'}
          style={styles.btns}
          txt_style={styles.btns_txt}
          onPress={btn_click}
        />
        <AppButton
          title={'Save'}
          style={styles.btns}
          txt_style={styles.btns_txt}
          onPress={btn_click}
        />
        <AppButton
          title={'History'}
          style={styles.btns}
          txt_style={styles.btns_txt}
          onPress={btn_click}
        />
      </View>

      <Modal
        style={styles.model_container}
        animationType="slide"
        transparent={false}
        visible={getDisplay}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        {get_history_screen()}
      </Modal>
    </View>
  );

  return (
    <>
      <StatusBar transluscent={false} />
      <View style={styles.container}>{main_screen}</View>
    </>
  );
};

// Styling Sheet
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  mainContainer: {
    width: '95%',
    justifyContent: 'space-evenly',
    height: '100%',
  },

  heading: {
    marginBottom: 10,
    // flex: 1,
  },

  headingTxt: {
    fontSize: 40,
    textAlign: 'center',
  },

  inp_area: {
    // flex: 2,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  inputLabel: {
    fontSize: 20,
    flex: 1,
  },

  input_text: {
    flex: 2,
    borderWidth: 1,
    backgroundColor: '#f2f2f2',
    fontSize: 20,
  },

  btn_area: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  result: {
    marginBottom: 10,
  },

  result_txt: {
    fontSize: 30,
  },

  btns: {
    backgroundColor: '#e5e5e5',
    width: '30%',
  },

  btns_txt: {
    fontSize: 21,
    padding: 10,
    textAlign: 'center',
  },

  model_container: {
    width: '100%',
    justifyContent: 'center',
  },

  historyContainer: {
    width: '95%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  h_btn_area: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },

  h_btns: {
    // flex:'1',
  },

  scroll_area: {
    alignItems: 'flex-start',
  },

  scroll_item: {
    paddingBottom: '2%',
    marginLeft: '2%',
  },

  scroll_txt: {
    fontSize: 30,
  },

  hr: {
    borderWidth: 2,
  },
});

export default App;
