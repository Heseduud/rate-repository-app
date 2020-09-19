import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import RepositoryItem from './repositoryItem/RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from '../components/Text';
import Theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: Theme.colors.listItemBackround,
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    minWidth: 0,
    paddingTop: 5
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    paddingRight: 10,
    marginBottom: 10
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    marginRight: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 5,
    borderColor: Theme.colors.primary
  }
});

const ItemSeparator = () => <View style={styles.separator}/>;

const RepositoryInfo = ({ repo }) => {
  return (
    <>
      <RepositoryItem item={repo} showLink={true}/>
      <ItemSeparator/>
    </>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text color='primary' fontWeight='bold'>{review.rating}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontSize='subheading' fontWeight='bold'>{review.user.username}</Text>
        <Text color='textSecondary'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id: id }
  });

  // Probably needs wrapper for styling
  if (data && data.repository) {
    const reviews = data.repository.reviews.edges.map(edge => edge.node);

    return (
      <FlatList 
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({id}) => id}
        ListHeaderComponent={() => <RepositoryInfo repo={data.repository}/>}
        renderItem={({ item }) => 
          <ReviewItem review={item}/>
        }
      />
    );
  }

  return null;
};

export default SingleRepository;