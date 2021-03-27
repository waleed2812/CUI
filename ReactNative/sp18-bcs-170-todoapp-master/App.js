import React, {useState} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';

import CustomButton from './components/ButtonComponent';

import {todoItems} from './constants/dummyToDoList';

export default function App() {
  const [getText, setText] = useState('');
  const [getList, setList] = useState(todoItems);
  const [editingItem, setEditingItem] = useState('0');

  const addItem = () => {
    console.log(getText);
    setList([...getList, {key: Math.random().toString(), data: getText}]);
    setText('');
    Keyboard.dismiss();
  };

  const removeItem = (itemKey) => {

    // getList.filter(item => item.key != itemKey);

    Alert.alert(
      'Are you sure ?',
      `Delete ${getList.find(item => item.key === itemKey).data}`,
      [
        {
          text: 'No',
          onPress: () => {}
        },
        {
          text: 'Yes',
          onPress: () => setList((list) => getList.filter((item) => item.key != itemKey))
        }
      ]
    )
  };

  const editItem = (item) => {
    setText(item.data);
    setEditingItem(item.key);
    Keyboard.dismiss();
  };

  const updateItem = () => {
    setList((list) =>
      getList.map((item) =>
        item.key === editingItem ? {key: item.key, data: getText} : item,
      ),
    );

    setText('');
    setEditingItem('0');
  };

  const scrollView = (
    <ScrollView style={styles.scrollview}>
      {getList.map((item, index) => (
        <View style={styles.scrollViewItem} key={item.key}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => editItem(item)}>
            <Text style={styles.scrollViewText}>
              {index + 1 + '# ' + item.data}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.crosstextcontainer}
            activeOpacity={0.7}
            onPress={() => removeItem(item.key)}>
            <Text style={styles.scrollViewText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const emptyScrollView = (
    <View style={{paddingTop: 30}}>
      <Text style={{fontStyle: 'italic', fontSize: 20, color: 'grey'}}>
        No ToDo Otems ! Hurray !
      </Text>
    </View>
  );

  return (
    <>
      <StatusBar transluscent={false} />
      <View style={styles.container}>
        <Text style={styles.title}>todo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={'Enter Item'}
            onChangeText={(text) => setText(text)}
            value={getText}
          />

          <CustomButton
            text={editingItem === '0' ? 'New' : 'Update'}
            onPress={editingItem === '0' ? addItem : updateItem}
            disabled={getText.length <= 0}
          />
        </View>

        <View>
          <Text style={{fontSize: 26}}>{getText}</Text>
        </View>
        {getList.length <= 0 ? emptyScrollView : scrollView}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  crosstextcontainer: {
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  crosstext: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },

  scrollViewText: {
    fontSize: 26,
    color: 'white',
  },

  scrollViewItem: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    padding: 10,
    margin: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },

  scrollview: {
    width: '100%',
  },

  textInput: {
    borderColor: 'red',
    // borderWidth: 2,
    borderBottomWidth: 2,
    width: '70%',
    // borderRadius: 50,
    fontSize: 16,
    padding: 10,
  },

  inputContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 64,
    color: 'lightgrey',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
