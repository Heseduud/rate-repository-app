import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import SignIn from './SignIn';
import AppBar from './AppBar';
import ReviewList from './ReviewList';
import Theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: Theme.colors.mainBackround,
    maxHeight: Dimensions.get('window').height,
    maxWidth: Dimensions.get('window').width
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path='/' exact>
          <RepositoryList/>
        </Route>
        <Route path='/signIn' exact>
          <SignIn/>
        </Route>
        <Route path='/repositories/:id'>
          <SingleRepository/>
        </Route>
        <Route path='/createReview'>
          <CreateReview/>
        </Route>
        <Route path='/signUp'>
          <SignUp/>
        </Route>
        <Route path='/reviews'>
          <ReviewList/>
        </Route>
        <Redirect to='/'/>
      </Switch>
    </View>
  );
};

export default Main;