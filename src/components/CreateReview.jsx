import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './form/FormikTextInput';
import Text from './Text';
import { styles as formStyles } from './SignIn'; //use same styles as loginform
import useCreateReview from '../hooks/useCreateReview';


const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput
        name='ownerName'
        placeholder='Repository owner name'
        textalign={'right'}
        style={formStyles.input}
      />
      <FormikTextInput
        name='repoName'
        placeholder='Repository name'
        textalign={'right'}
        style={formStyles.input}
      />
      <FormikTextInput
        name='rating'
        placeholder='Rating between 0 and 100'
        textalign={'right'}
        style={formStyles.input}
      />
      <FormikTextInput
        name='review'
        placeholder='Review'
        textalign={'right'}
        style={formStyles.input}
        multiline={true}
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={formStyles.submitButton} color="white">Create a review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repoName, rating, review } = values;
    try {
      const { data } = await createReview({
        repositoryName: repoName,
        ownerName: ownerName,
        rating: parseInt(rating),
        text: review
      });

      if (data.createReview.repositoryId) {
        history.push(`/repositories/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = {
    ownerName: '',
    repoName: '',
    rating: '',
    review: ''
  };

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner name is required'),
    repoName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .min(0)
      .max(100)
      .integer()
      .required('Rating is required'),
    review: yup
      .string()
      .optional()
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default CreateReview;