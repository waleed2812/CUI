// https://snack.expo.io/@waleedbutt98/sp18-bcs-170-a2
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
  // Function to return X or 0 on random
  const turn = () => (Math.round(Math.random() * 2) === 1 ? 'X' : 'O');

  // Reset Array
  const reset_array = () => {
    return [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  // Array to record current view
  let arr = reset_array();

  // Hooks
  const [getTurn, setTurn] = useState(turn()); // Deciding Turn
  const [getArr, setArr] = useState(arr); // Current Array State
  const [getDisplay, setDisplay] = useState('Main'); // Hook rendered component
  const [getWin, setWin] = useState(''); // Hooks for decding who won
  const [getXscore, setXscore] = useState(0); // Score for player X
  const [getOscore, setOscore] = useState(0); // Score for player O

  // Update Score
  const update_score = () => {
    getTurn === 'X' ?
        setXscore(Number.parseInt(getXscore, 10)+1) :
        setOscore(Number.parseInt(getOscore, 10)+1);
  }

  // Function to see who won
  const check_win = () => {

    // Checking Rows are Matching
    for ( let i = 0 ; i < 3  ; i++ ) {

      // Don't compare empty strings
      if (( (arr[i][0] === '') || (arr[i][1] === '') || (arr[i][2] === ''))) continue;

      // Normal Comparison
      if (( (arr[i][0] === arr[i][1]) && (arr[i][1] === arr[i][2]) ))
      {
        console.log("row");

        setWin(arr[i][0] + ' Won !!');
        update_score();
        return true;
      }
    }

    // Checking columns are matching
    for ( let i = 0 ; i < 3  ; i++ ) {

      // Don't compare empty strings
      if (( (arr[0][i] === '') || (arr[1][i] === '') || (arr[2][i] === ''))) continue;

      // Normal Comparison
      if (((arr[0][i] === arr[1][i]) && (arr[1][i] === arr[2][i])))
      {
        console.log("col");
        setWin(arr[0][i] + ' Won !!');
        update_score();
        return true;
      }
    }

    // Checking Diagonals are Matching
    if
    (
      ( // Main Diagonal is Matching
        (arr[0][0] !== '') &&
        (arr[1][1] !== '') &&
        (arr[2][2] !== '') &&
        (arr[0][0] === arr[1][1]) && (arr[0][0] === arr[2][2])) ||
      ( // Opposite Diagonal is Matching
        (arr[0][0] !== '') &&
        (arr[0][2] !== '') &&
        (arr[2][0] !== '') &&
        (arr[0][2] === arr[1][1]) && (arr[0][2] === arr[2][0]))

    )
    {
      console.log("diagonal");
      setWin(getTurn + ' Won !!');
      update_score();
      return true;
    }

    // Checking if Draw
    for ( let  i = 0 ; i < 3 ; i++ ) {
      for ( let j = 0 ; j < 3 ; j++ ) {
        if (arr[i][j] === '') {
          return false;
        }
      }
    }

    // Continue Game
    setWin("The Game is Draw");
    return true;

  }

  // Function to perform to button actions
  const btn_click = (...args) => {

    // Btn Clicked
    let btn_clicked = args[0];

    // index passed
    let i = Number.parseInt(args[1], 10) || 0,
        j = Number.parseInt(args[2], 10) || 0;

    // Then Map the response to each operator
    switch (btn_clicked) {
      // Case to Start The Game
      case 'Start Game':
        setDisplay('Game');
        btn_click('New');
        break;

      // Case to Start The Game
      case 'Quit':
      case 'Main Menu':
        setDisplay('Main');
        break;

      // If New is passed to reset
      case 'Play Again':
      case 'New':
        setTurn(turn());
        setArr(reset_array());
        setWin('');
        break;

      // Error check
      default:

        arr = getArr;

        // Checking if the game is ended
        if(getWin.length !== 0) break ;

        // Updating Array with turn
        if (arr[i][j].length === 0) {

          // Update arr
          arr[i][j] = getTurn;

          // Re-render
          setArr(arr);
        }
        else break ;

        // See if somebody won or it was a draw
        if(check_win()) break;

        // Updating Next Turn
        getTurn === 'X' ? setTurn('O') : setTurn('X');


    }
  };

  // Main Menu Screen
  let main_menu = (
    <View style={styles.container}>
      <Text style={styles.stats_text}>Tic Tac Toe</Text>
      <AppButton
        style={styles.btn_menu}
        txt_style={styles.btn_menu_txt}
        title="Start Game"
        onPress={btn_click}
      />
    </View>
  );

  // Defining Game Play Area
  let game_view = (

    <View style={[styles.container, styles.container_game]}>

      <View style={styles.extra_area}>

        <Text style={styles.message}>X wins: {getXscore}, O wins:{getOscore}</Text>

        <Text style={styles.message}>Player {getTurn} Turn</Text>

        <Text style={styles.message}>{getWin}</Text>

      </View>

      <View style={styles.btn_area}>

        <View style={styles.btn_row}>
          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 0, 0)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[0][0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 0, 1)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[0][1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 0, 2)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[0][2]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btn_row}>
          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 1, 0)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[1][0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 1, 1)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[1][1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 1, 2)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[1][2]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btn_row}>
          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 2, 0)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[2][0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 2, 1)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[2][1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={btn_click.bind(this, 'Move', 2, 2)}
            style={styles.inp}>
            <Text style={styles.inp_txt}>{getArr[2][2]}</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.extra_area}>
        <View style={styles.nav}>
          <AppButton
            style={styles.btn_nav}
            txt_style={styles.btn_nav_txt}
            onPress={btn_click}
            title={'Quit'}
          />
          <AppButton
            style={styles.btn_nav}
            txt_style={styles.btn_nav_txt}
            onPress={btn_click}
            title={'Play Again'}
          />
        </View>
      </View>

    </View>
  );

  return (
    <>
      <StatusBar transluscent={false} />
      <View>
        {getDisplay === 'Main' ? main_menu : game_view}
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

  container_game: {
    justifyContent: 'space-between',
  },

  btn_menu: {
    backgroundColor: '#f2f2f2',
    width: '50%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '2%',
  },

  btn_menu_txt: {
    fontFamily: 'Aerial',
  },

  stats_text: {
    marginVertical: '2%',
    fontSize: 25,
    textAlign: 'center',
    marginHorizontal: 'auto',
  },

  extra_area: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  message: {
    fontSize: 40,
  },

  btn_area: {
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'black',
    aspectRatio: 1,
  },

  btn_row: {
    width: '100%',
    height: '32%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  inp: {
    backgroundColor: '#f2f2f2',
    width: '32%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inp_txt: {
    fontSize: 100,
  },

  nav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btn_nav: {
    width: '48%',
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn_nav_txt: {
    fontSize: 30,
  },
});

export default App;
