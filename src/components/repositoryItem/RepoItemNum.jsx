import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
});

const parseNum = (num) => {
  return Math.abs(num) > 999 
  ? (Math.abs(num)/1000).toFixed(1) + 'k' 
  : Math.abs(num);
};

const RepoItemNum = ({ text, num }) => {
  return (
    <View style={styles.container}>
      <Text fontSize="subheading" fontWeight="bold">{parseNum(num)}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

export default RepoItemNum;