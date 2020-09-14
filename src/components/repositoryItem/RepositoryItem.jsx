import React from 'react';
import { View, StyleSheet } from 'react-native';

import Header from './RepositoryItemHeader';
import RepoItemNums from './RepositoryItemNums';
import Theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.listItemBackround,
    display: 'flex',
    flexShrink: 1,
    minWidth: 0
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Header 
        ImgUrl={item.ownerAvatarUrl} 
        FullName={item.fullName} 
        Description={item.description} 
        Language={item.language}/>
      <RepoItemNums
        stars={item.stargazersCount}
        forks={item.forksCount}
        reviews={item.reviewCount}
        ratingAvg={item.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;