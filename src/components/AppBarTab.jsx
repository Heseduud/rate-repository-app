import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  textPadding: {
    paddingLeft: 10,
  }
});

const AppBarTab = ({ text, route }) => {
  return (
      <Link to={route} component={TouchableWithoutFeedback}>
        <Text fontSize="header" 
              fontWeight="bold" 
              color="header"
              style={styles.textPadding}>
          {text}
        </Text>
      </Link>
  );
};

export default AppBarTab;