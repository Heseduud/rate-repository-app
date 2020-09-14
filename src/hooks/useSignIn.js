import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { useContext } from 'react';

import { SIGN_IN } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const res = await mutate({
      variables: {
        username: username,
        password: password
      }
    });
    
    authStorage.setAccessToken(res.data.authorize.accessToken);
    apolloClient.resetStore();
    return res;
  };

  return [signIn, result];
};

export default useSignIn;