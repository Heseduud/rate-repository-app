import React from 'react';
import { StyleSheet, View } from 'react-native';

import RepoItemNum from './RepoItemNum';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    flexShrink: 1,
    flex: 1
  }
});

const RepositoryItemNums = ({ stars, forks, reviews, ratingAvg }) => {
  return (
    <View style={styles.flexContainer}>
      <RepoItemNum num={stars} text='stars'/>
      <RepoItemNum num={forks} text='forks'/>
      <RepoItemNum num={reviews} text='reviews'/>
      <RepoItemNum num={ratingAvg} text='rating'/>
    </View>
  );
};

export default RepositoryItemNums;