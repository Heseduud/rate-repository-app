import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './form/FormikTextInput';
import Theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.listItemBackround,
    display: 'flex',
    alignItems: 'stretch',
  },
  input: {
    padding: 5,
    margin: 10,
    borderRadius: 8,
    borderWidth: 2
  },
  loginButton: {
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 8,
    margin: 10,
    textAlign: 'center',
  }
});

const onSubmit = (values) => {
  console.log(values);
};

const initialValues = {
  username: '',
  password: ''
};

const validationSchema =  yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput 
        name="username" 
        placeholder="Username" 
        textAlign={'center'}
        style={styles.input}/>
      <FormikTextInput 
        name="password" 
        placeholder="Password" 
        secureTextEntry={true} 
        textAlign={'center'}
        style={styles.input}/>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.loginButton} color="white">Login</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit}/>} 
    </Formik>
  );
};

export default SignIn;