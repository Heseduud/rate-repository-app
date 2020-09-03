import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import Theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width,
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: Theme.colors.barBackground,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} route={'/'}/>
        <AppBarTab text={'Sign in'} route={'/signIn'}/>
      </ScrollView>
    </View>
  );
};

export default AppBar;