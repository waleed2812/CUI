import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
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
  const [getMessage, setMessage] = useState('Enter Guess'); // Message to be Displayed
  const [getInp_num, setInp_num] = useState(''); // Input field for number
  const [getScore, setScore] = useState('0'); // Score
  const [getAttempts, setAttempts] = useState('10'); // Attempts Count
  const [getNumber, setNumber] = useState(Math.round(Math.random() * 100)); // Number to be guessed
  const [getHints, setHints] = useState(0);
  const [getDisplay, setDisplay] = useState('Main'); // Hook rendered component

  // Function to perform to button actions
  const btn_click = (btn_clicked) => {
    // Then Map the response to each operator
    switch (btn_clicked) {
      // Case to Start The Game
      case 'Start Game':
        setDisplay('Game');
        btn_click('New');
        break;

      // Case to Start The Game
      case 'Main Menu':
        setDisplay('Main');
        btn_click('New');
        break;

      // Erase Last digit only
      case '<-':
        // Checking if something is written to be erased
        if (getInp_num.length === 0) {
          break;
        }

        // Erasing written data
        setInp_num(getInp_num.substring(0, getInp_num.length - 1));

        break;

      // Clear Entire Input fields and generate new number
      case 'New':
        setNumber(Math.round(Math.random() * 100));
        setInp_num('');
        setMessage('Enter Guess');
        setAttempts(5);
        setHints(0);
        // current_operation.style.color = 'black';
        break;

      // Submit the input
      case 'Enter':
        // Checking if something is written or not
        if (getInp_num.length === 0) {
          setMessage('Enter Digit to Guess');
          break;
        }

        // Deducting attempts if there are any remaining
        setAttempts(Number.parseInt(getAttempts, 10) - 1);

        // Checking if there any attempts remaining
        if (Number.parseInt(getAttempts, 10) === 1) {
          let msg = `No More Attempts !! You Lose\nCorrect Guess was ${getNumber}`;
          setMessage(msg);
          setDisplay('stats');
          break;
        }

        // Checking if correct guess made
        if (
          Number.parseInt(getInp_num, 10) === Number.parseInt(getNumber, 10)
        ) {
          setScore(
            Number.parseInt(getScore, 10) +
              10 * (Number.parseInt(getAttempts, 10) + 1),
          );
          setMessage('Correct Guess');
          setDisplay('stats');

          // current_operation.style.color = 'red';
          setNumber(Math.round(Math.random() * 100));
        }

        // If the input is greater tell user that
        else if (
          Number.parseInt(getInp_num, 10) > Number.parseInt(getNumber, 10)
        ) {
          setMessage('Wrong Guess !! ' + getInp_num + ' is Greater !');
          // current_operation.style.color = 'red';
          // If the input is smaller
        }

        // If the input is smaller tell user that
        else {
          setMessage('Wrong Guess !! ' + getInp_num + ' is Smaller !');
          // current_operation.style.color = 'red';
        }
        break;

      // Give user Hint as a range
      case 'Hint':
        // Deducting Score for taking hint
        setScore(Number.parseInt(getScore, 10) - 2);

        // Appending hint taken
        setHints(Number.parseInt(getHints, 10) + 1);

        // Range for the guess
        let min =
          Number.parseInt(getNumber, 10) - (Math.round(Math.random() * 5) + 1);
        let max =
          Number.parseInt(getNumber, 10) + (Math.round(Math.random() * 5) + 1);

        // Generate a random value to guess
        // Whether tell greater number lesser
        // number or range
        switch (Math.round(Math.random() * 3)) {
          // If 1 appears then provide ran
          case 1:
            // Show range
            setMessage(`The number is between ${min} and ${max} !`);
            break;

          // Case 2 runs to tell the number greater than actual number
          case 2:
            setMessage(`The number is greater than ${min} !`);
            break;

          // Default Case runs to tell the number smaller than actual number
          default:
            setMessage(`The number is smaller than ${max} !`);
            break;
        }
        break;

      // Clear input area only
      case 'Clear':
        setInp_num('');
        setMessage('Enter Guess');
        break;

      // Append Number to text area
      // Default value will be for a number or dot.
      default:
        setInp_num(getInp_num + '' + btn_clicked);
    }
  };

  // Main Menu Screen
  let main_menu = (
    <View style={styles.container}>
      <Text style={styles.stats_text}>Number Guessing Game</Text>
      <AppButton
        style={styles.btnMenu}
        txt_style={styles.btnMenuTxt}
        title="Start Game"
        onPress={btn_click}
      />
    </View>
  );

  // Defining Game Play Area
  let game_view = (
    <View style={[styles.container, styles.container_game]}>
      <View style={styles.subContainer}>
        <Text style={styles.textAreaT}>Score: {getScore}</Text>
        <Text style={styles.textAreaT}>Attempts Remaining: {getAttempts}</Text>
        <Text style={[styles.textAreaO, styles.message]}>{getMessage}</Text>
        <Text style={[styles.textAreaO, styles.inpNum]}>{getInp_num}</Text>
        <View style={styles.buttonArea}>
          <View style={styles.buttonsRow}>
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="New"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="Hint"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="Enter"
              onPress={btn_click}
            />
          </View>
          <View style={styles.buttonsRow}>
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="7"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="8"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="9"
              onPress={btn_click}
            />
          </View>
          <View style={styles.buttonsRow}>
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="4"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="5"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="6"
              onPress={btn_click}
            />
          </View>
          <View style={styles.buttonsRow}>
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="1"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="2"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="3"
              onPress={btn_click}
            />
          </View>
          <View style={styles.buttonsRow}>
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="Clear"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="0"
              onPress={btn_click}
            />
            <AppButton
              style={styles.appButtonContainer}
              txt_style={styles.appButtonText}
              title="<-"
              onPress={btn_click}
            />
          </View>
        </View>
      </View>
    </View>
  );

  // Stats Display Area
  let stats = (
    <View style={[styles.container, styles.statsContainer]}>
      <Text style={styles.stats_text}>{getMessage}</Text>
      <Text style={styles.stats_text}>Score: {getScore}</Text>
      <Text style={styles.stats_text}>Hints: {getHints}</Text>
      <Text style={styles.stats_text}>
        Guesses: {5 - Number.parseInt(getAttempts, 10)}
      </Text>
      <View style={styles.statsBtnArea}>
        <AppButton
          title={'Main Menu'}
          onPress={btn_click}
          style={styles.statsBtn}
          txt_style={styles.statsBtnTxt}
        />
        <AppButton
          title={'Play Again'}
          onPress={btn_click}
          style={styles.statsBtn}
          txt_style={styles.statsBtnTxt}
          args={'Start Game'}
        />
      </View>
    </View>
  );

  return (
    <>
      <StatusBar transluscent={false} />
      <View>
        {getDisplay === 'Main'
          ? main_menu
          : getDisplay === 'Game'
          ? game_view
          : stats}
      </View>
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

  btnMenu: {
    backgroundColor: '#f2f2f2',
    width: '50%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '2%',
  },

  btnMenuTxt: {
    fontFamily: 'Aerial',
  },

  container_game: {
    backgroundColor: 'lightgrey',
    maxWidth: 500,
  },

  subContainer: {
    flex: 1,
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  textAreaT: {
    flex: 1,
    fontSize: 25,
    marginTop: '2%',
  },

  textAreaO: {
    textAlign: 'right',
    width: '100%',
    backgroundColor: '#e7e7e7',
    paddingRight: '2%',
  },

  message: {
    flex: 2,
    height: 30,
    fontSize: 25,
    paddingTop: '2%',
  },

  inpNum: {
    flex: 3,
    height: 50,
    fontSize: 40,
    marginTop: '2%',
    paddingTop: '2%',
  },

  buttonArea: {
    flex: 3,
    width: '100%',
    minHeight: 350,
    paddingTop: '2%',
  },

  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 10,
  },

  appButtonContainer: {
    backgroundColor: '#f2f2f2',
    width: '32%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  appButtonText: {
    fontSize: 25,
  },

  statsContainer: {
    backgroundColor: 'lightgrey',
  },

  stats_text: {
    marginVertical: '2%',
    fontSize: 25,
    textAlign: 'center',
    marginHorizontal: 'auto',
  },

  statsBtnArea: {
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },

  statsBtn: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },

  statsBtnTxt: {
    fontSize: 25,
  },
});

export default App;
