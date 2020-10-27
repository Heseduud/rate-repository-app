import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';

import Theme from '../theme';
import AppBarTab from './AppBarTab';
import { GET_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import Text from '../components/Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width,
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: Theme.colors.barBackground,
  },
  signOutButton: {
    paddingLeft: 10,
  }
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const { data } = useQuery(GET_USER,
    { fetchPolicy: 'cache-and-network'}
  );

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} route={'/'}/>
        { data && data.authorizedUser != null 
        ? <>
            <AppBarTab text={'Create a review'} route={'/createReview'}/>
            <AppBarTab text={'Reviews'} route={'/reviews'}/>
            <TouchableWithoutFeedback onPress={signOut}>
              <Text fontSize="header"
                    fontWeight="bold"
                    color="header"
                    style={styles.signOutButton}>
                      Sign out
              </Text>
            </TouchableWithoutFeedback>
          </>          
        : <>
            <AppBarTab text={'Sign in'} route={'/signIn'}/>
            <AppBarTab text={'Sign Up'} route={'/signUp'}/>
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;