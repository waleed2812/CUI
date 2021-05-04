/* eslint-disable prettier/prettier,no-trailing-spaces */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

// Function for custom Button
function AppButton(props) {
  let args = props.args || props.title;

  return (
    <TouchableOpacity
        onPress={props.onPress.bind(this, args)}
        style={props.style}>

      <Text
          style={props.txt_style}>{props.title}</Text>

    </TouchableOpacity>
  );
}

// Main Component
class App extends React.Component {

  // State objects
  constructor(props) {
    super(props);

    // State properties to change during game
    this.state = {
      message: 'Enter Guess',
      inp_num: '',
      score: 0,
      attempts:5,
    };

    // Recording if the hint is taken
    this.hint_taken = false;

    //call the random function
    this.random();
  }

  // Function to reinitialize stuff and generate random number
  random() {
    this.number = Math.round((Math.random() * 100));
    console.log(this.number);
    this.setState({
      attempts : 5,
    });
    // attempts_label.style.color = `black`;
  }

  // Function to perform to button actions
  btn_click = (...args) => {
    // Button passed
    let btn_clicked = args[0];

    // Then Map the response to each operator
    switch (btn_clicked) {

        // Erase Last digit only
      case '<-':

        // Checking if something is written to be erased
        if (this.state.inp_num.length === 0) {break;}

        // Erasing written data
        this.setState({
          inp_num : this.state.inp_num.substring(0, this.state.inp_num.length - 1),
        });
        break;

        // Clear Entire Input fields and generate new number
      case 'New':
        this.random();

        this.setState({
          inp_num : '',
          message : 'Enter Guess',
        });

        // current_operation.style.color = 'black';
        break;

        // Submit the input
      case 'Enter':

        // Marking this so user can take hint again
        this.hint_taken = false;

        // Checking if there any attempts remaining
        if (Number.parseInt(this.state.attempts, 10) === 0) {

          this.setState({
            message : 'No More Attempts !!',
          });

          break;
        }

        // Deducting attempts if there are any remaining
        else {

          this.setState({
            attempts : Number.parseInt(this.state.attempts, 10) - 1,
          });

        }

        // Checking if correct guess made
        if (Number.parseInt(this.state.inp_num, 10) === this.number) {

          this.setState({
            score : Number.parseInt(this.state.score, 10) + (10 * (Number.parseInt(this.state.attempts, 10) + 1)),
            message : 'Correct Guess',
          });

          // current_operation.style.color = 'red';
          this.random();
        }

        // If the input is greater tell user that
        else if (Number.parseInt(this.state.inp_num, 10) > this.number){

          this.setState({
            message : 'Wrong Guess !! ' + this.state.inp_num + ' is Greater !',
          });
          // current_operation.style.color = 'red';
        }

        // If the input is smaller
        else {
          this.setState({
            message : 'Wrong Guess !! ' + this.state.inp_num + ' is Smaller !',
          });
          // current_operation.style.color = 'red';
        }
        break;

        // Give user Hint as a range
      case 'Hint':

        // If hint taken recently don't give hint again
        if (this.hint_taken) {break;}
        this.hint_taken = true; // hint taken true if hint taken

        // Generate a random value to guess
        // Whether tell greater number lesser
        // number or range
        switch (Math.round((Math.random() * 3))) {

            // If 1 appears then provide range
          case 1:

            // Range for the guess
            let min = this.number - (Math.round((Math.random() * 5)) + 1);
            let max = this.number + (Math.round((Math.random() * 5)) + 1);

            // Show range
            this.setState({
              message : `The number is between ${min} and ${max} !`,
            });
            break;

            // Case 2 runs to tell the number greater than actual number
          case 2:
            let greater = this.number - (Math.round((Math.random() * 5)) + 1);
            this.setState({
              message : `The number is greater than ${greater} !`,
            });
            break;

            // Default Case runs to tell the number smaller than actual number
          default:
            let smaller = this.number + (Math.round((Math.random() * 5)) + 1);
            this.setState({
              message : `The number is smaller than ${smaller} !`,
            });
            break;
        }
        break;

        // Clear input area only
      case 'Clear':
        this.setState({
          inp_num : '',
          message : 'Enter Guess',
        });
        break;

        // Append Number to text area
        // Default value will be for a number or dot.
      default:
        this.setState({
          inp_num : this.state.inp_num + btn_clicked,
        });

    }

  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.textAreaT}>Score: {this.state.score}</Text>
            <Text style={styles.textAreaT}>Attempts Remaining: {this.state.attempts}</Text>
            <Text style={[styles.textAreaO, styles.message]}>{this.state.message}</Text>
            <Text style={[styles.textAreaO, styles.inpNum]}>{this.state.inp_num}</Text>
            <View style={styles.buttonArea}>
              <View style={styles.buttonsRow}>
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="New"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="Hint"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="Enter"
                           onPress={this.btn_click} />
              </View>
              <View style={styles.buttonsRow}>
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="7"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="8"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="9"
                           onPress={this.btn_click} />
              </View>
              <View style={styles.buttonsRow}>
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="4"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="5"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="6"
                           onPress={this.btn_click} />
              </View>
              <View style={styles.buttonsRow}>
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="1"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="2"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="3"
                           onPress={this.btn_click} />
              </View>
              <View style={styles.buttonsRow}>
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="Clear"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="0"
                           onPress={this.btn_click} />
                <AppButton style={styles.appButtonContainer}
                           txt_style={styles.appButtonText}
                           title="<-"
                           onPress={this.btn_click} />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    height: '100%',
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
    fontSize: 40,
  },
});

export default App;
