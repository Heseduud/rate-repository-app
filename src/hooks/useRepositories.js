import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  const { data, loadingQuery } = useQuery(GET_REPOSITORIES, 
    { fetchPolicy: 'cache-and-network'}
  );

  useEffect(() => {
    if (loadingQuery) {
      setLoading(true);
    }

    if (data && data.repositories) {
      setRepositories(data.repositories);
      setLoading(false);
    }

  }, [data, loading]);

  return { repositories, loading };
};

export default useRepositories;