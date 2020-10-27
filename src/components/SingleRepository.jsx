import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import RepositoryItem from './repositoryItem/RepositoryItem';
import useRepository from '../hooks/userepository';
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

export const ItemSeparator = () => <View style={styles.separator}/>;

const RepositoryInfo = ({ repo }) => {
  return (
    <>
      <RepositoryItem item={repo} showLink={true}/>
      <ItemSeparator/>
    </>
  );
};

export const ReviewItem = ({ review }) => {
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
  const { repository, fetchMore } = useRepository({id: id, first: 8});

  const onEndReach = () => {
    fetchMore();
  };

  if (repository != undefined) {
    return (
      <FlatList
        style={styles.flatlistContainer}
        data={repository.reviews.edges.map(edge => edge.node)}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({id}) => id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.7}
        ListHeaderComponent={() => <RepositoryInfo repo={repository}/>}
        renderItem={({ item }) => 
          <ReviewItem review={item}/>
        }
      />
    );
  }

  return <View/>;
};

export default SingleRepository;