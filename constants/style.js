import {StyleSheet} from 'react-native';

// Color Schemes
const colors = {
  lighter: '#EDF5E1',
  light: '#8EE4Af',
  normal: '#5CDB95',
  dark: '#379683',
  darker: '#05386B',
  font_family: 'Al Nile',
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.normal,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: colors.light,
  },

  headerTxt: {
    color: colors.darker,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },

  drawer: {
    backgroundColor: colors.light,
  },

  drawerItem: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
  },

  statsTxtContainer: {
    backgroundColor: colors.dark,
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },

  statsTxt: {
    color: colors.lighter,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: colors.font_family,
  },

  search: {
    height: '8%',
    width: '90%',
    borderBottomWidth: 5,
    borderColor: colors.darker,
    fontSize: 20,
    color: colors.darker,
  },

  flatlistContainer: {
    width: '100%',
  },

  flatlistItemContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.light,
    marginVertical: 10,
    borderRadius: 10,
  },

  flatlistItem: {
    paddingVertical: 10,
    justifyContent: 'center',
    width: '80%',
  },

  faltlistHeart: {
    width: '20%',
    padding: 10,
    alignItems: 'center',
  },

  flatlistTxt: {
    fontSize: 20,
    color: colors.darker,
    paddingLeft: 10,
  },
});

export {styles, colors};
