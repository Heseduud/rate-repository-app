import React from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { GET_USER } from '../graphql/queries';
import { ReviewItem, ItemSeparator } from './SingleRepository';

const ReviewList = () => {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true
    }
  });

  if (data && data.authorizedUser.reviews) {
    return (
      <FlatList
        data={data.authorizedUser.reviews.edges.map(edge => edge.node)}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({id}) => id}
        renderItem={({ item }) => 
          <ReviewItem review={item}/>
        }
      />
    );
  }

  return (
    <View/>
  );
};

export default ReviewList;