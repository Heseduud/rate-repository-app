import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( sortObj, filterDebounce ) => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);
  const { data, loadingQuery, ...result } = useQuery(GET_REPOSITORIES, 
    { fetchPolicy: 'cache-and-network',
      variables: { orderBy: sortObj.orderBy,
         orderDirection: sortObj.orderDirection,
         searchKeyword: filterDebounce
        }
      }
    );

  // useEffect(() => {
  //   if (loadingQuery) {
  //     setLoading(true);
  //   }

  //   if (data && data.repositories) {
  //     setRepositories(data.repositories);
  //     setLoading(false);
  //   }

  // }, [data, loading]);

  return { 
    repositories: data ? data.repositories : undefined,
    loadingQuery,
    ...result 
  };
};

export default useRepositories;