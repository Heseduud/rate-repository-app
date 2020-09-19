import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import RepositoryItem from './repositoryItem/RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const onPress = (id) => {
    console.log('onPress touchableopacity', id);
    history.push(`/repositories/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <TouchableOpacity onPress={() => onPress(item.id)}>
          <RepositoryItem item={item}/>
        </TouchableOpacity>
      }
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories}/>;
};

export default RepositoryList;