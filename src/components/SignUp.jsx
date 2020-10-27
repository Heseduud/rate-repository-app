import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import FormikTextInput from './form/FormikTextInput';
import { styles as formStyles } from './SignIn';
import Text from './Text';
import { SIGN_UP } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput
        name='username'
        placeholder='Username'
        textalign={'right'}
        style={formStyles.input}
      />
      <FormikTextInput 
        name='password'
        placeholder='Password'
        textalign={'right'}
        style={formStyles.input}
      />
      <FormikTextInput 
        name='passwordConfirm'
        placeholder='Password confirmation'
        textalign={'right'}
        style={formStyles.input}
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={formStyles.submitButton} color="white">Sign up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUp = () => {
  const [mutate] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password} = values;
    try {
      const data = await mutate({ 
        variables: { username: username, password: password}
      });

      if (data) {
        const signInData  = await signIn({ username: username, password: password});
        if (signInData.data.authorize.accessToken) {
          history.push('/');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(0)
      .max(30)
      .required('Username is required'),
    password: yup
      .string()
      .min(5)
      .max(50)
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords need to be the same')
      .required('Password confirmation is required')
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default SignUp;