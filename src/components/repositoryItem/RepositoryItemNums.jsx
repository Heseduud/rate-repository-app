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
      <RepoItemNum num={stars} text='stars' tID='starCount'/>
      <RepoItemNum num={forks} text='forks' tID='forkCount'/>
      <RepoItemNum num={reviews} text='reviews' tID='reviewCount'/>
      <RepoItemNum num={ratingAvg} text='rating' tID='ratingAvg'/>
    </View>
  );
};

export default RepositoryItemNums;