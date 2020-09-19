import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Header from './RepositoryItemHeader';
import RepoItemNums from './RepositoryItemNums';
import Theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.listItemBackround,
    display: 'flex',
    flexShrink: 1,
    minWidth: 0
  },
  githubLink: {
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  }
});

const RepositoryItem = ({ item, showLink }) => {
  const handleOpenWithWebBrowser = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

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
      { 
        // Somehow overlaps the ItemNums on personal phone, have to test on another one
        // Browser view works fine tho, even with decreased width of screen
        showLink
        ? <TouchableOpacity style={styles.githubLink} onPress={() => handleOpenWithWebBrowser(item.url)}>
            <Text color='header' testID='language'>Open in GitHub</Text>
          </TouchableOpacity>
        : <></>}
    </View>
  );
};

export default RepositoryItem;