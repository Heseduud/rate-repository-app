import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Text from '../Text';
import Theme from '../../theme';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1
  },
  logoContainer: {
    flexGrow: 0
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10
  },
  languageTag: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 8,
    marginTop: 5,
    padding: 5,
    alignSelf: 'flex-start'
  },
});

const RepositoryItemHeader = ({ ImgUrl, FullName, Description, Language }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: ImgUrl}}/>
      </View>
      <View style={styles.textContainer}>
        <Text fontSize='subheading' fontWeight='bold' testID='name'>{FullName}</Text>
        <Text color='textSecondary' testID='description'>{Description}</Text>
        <Text style={styles.languageTag} color='header' testID='language'>{Language}</Text>
      </View>
    </View>
  );
};

export default RepositoryItemHeader;