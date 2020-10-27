import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( sortObj, filterDebounce ) => {
  const { data, loadingQuery, ...result } = useQuery(GET_REPOSITORIES, 
    { fetchPolicy: 'cache-and-network',
      variables: { orderBy: sortObj.orderBy,
         orderDirection: sortObj.orderDirection,
         searchKeyword: filterDebounce
        }
      }
    );

  return { 
    repositories: data ? data.repositories : undefined,
    loadingQuery,
    ...result 
  };
};

export default useRepositories;