import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './form/FormikTextInput';
import Theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput 
        name="username" 
        placeholder="Username" 
        textalign={'center'}
        style={styles.input}/>
      <FormikTextInput 
        name="password" 
        placeholder="Password" 
        secureTextEntry={true} 
        textalign={'center'}
        style={styles.input}/>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.loginButton} color="white">Login</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username: username, password: password });
      if (data.authorize.accessToken) {
        history.push('/');
      }
    } catch (e) {
      console.error(e);
    }
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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit}/>} 
    </Formik>
  );
};

export default SignIn;