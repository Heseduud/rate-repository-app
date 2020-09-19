import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW } from '../graphql/queries';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const res = await mutate({
      variables: {
        repositoryName: repositoryName,
        ownerName: ownerName,
        rating: rating,
        text: text
      }
    });
    return res;
  };

  return [createReview, result];
};

export default useCreateReview;