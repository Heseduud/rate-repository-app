import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useHistory } from 'react-router-native';
import { Picker } from '@react-native-community/picker';

import RepositoryItem from './repositoryItem/RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce/lib';

// This component should probably be refactored to multiple files

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  onPress = (id) => {
    this.props.history.push(`/repositories/${id}`);
  };

  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        SORT_TEXTS={props.SORT_TEXTS}
        setStates={props.setStates}
        pickerText={props.pickerText}
        setFilter={props.setFilter}
        filterText={props.filterText}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.repositories ? this.props.repositories.edges.map(edge => edge.node) : []}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => this.onPress(item.id)}>
            <RepositoryItem item={item}/>
          </TouchableOpacity>
        }
      />
    );
  }
}

const RepositoryListHeader = ({ SORT_TEXTS, setStates, pickerText, setFilter, filterText }) => {
  return (
    <View>
        <Picker
          selectedValue={pickerText}
          onValueChange={(itemValue) => setStates(itemValue)}
          >
            <Picker.Item label={SORT_TEXTS.latest_Repositories} value={SORT_TEXTS.latest_Repositories}/>
            <Picker.Item label={SORT_TEXTS.highest_Rated} value={SORT_TEXTS.highest_Rated}/>
            <Picker.Item label={SORT_TEXTS.lowest_Rated} value={SORT_TEXTS.lowest_Rated}/>
        </Picker>
        <TextInput
          style={{ height: 20, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
          onChangeText={text => setFilter(text)}
          value={filterText}
        />
    </View>
  );
};

const RepositoryList = () => {
  // Enums for possible values for sort hook
  const SORT_VALUES = {
    latest_Repositories: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC'
    },
    highest_Rated: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC'
    },
    lowest_Rated: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC'
    }
  };

  const SORT_TEXTS = {
    latest_Repositories: 'Latest repositories',
    highest_Rated: 'Highest rated repositories',
    lowest_Rated: 'Lowest rated repositories'
  };

  const [sortObj, setSort] = useState(SORT_VALUES.latest_Repositories);
  const [pickerText, setText] = useState('Latest repositories');
  const [filterText, setFilter] = useState('');
  const [filterDebounce] = useDebounce(filterText, 500);
  const { repositories } = useRepositories(sortObj, filterDebounce);
  const history = useHistory();

  const setStates = (itemValue) => {
    switch(itemValue) {
      case SORT_TEXTS.latest_Repositories:
        setSort(SORT_VALUES.latest_Repositories);
        setText(SORT_TEXTS.latest_Repositories);
        break;
      case SORT_TEXTS.highest_Rated:
        setSort(SORT_VALUES.highest_Rated);
        setText(SORT_TEXTS.highest_Rated);
        break;
      case SORT_TEXTS.lowest_Rated:
        setSort(SORT_VALUES.lowest_Rated);
        setText(SORT_TEXTS.lowest_Rated);
        break;
      default:
        break;
    }
  };

  if (repositories != undefined) {
    return <RepositoryListContainer
    repositories={repositories}
    SORT_TEXTS={SORT_TEXTS}
    setStates={setStates}
    pickerText={pickerText}
    history={history}
    setFilter={setFilter}
    filterText={filterText}
  />;
  }

  return <View/>;
};

export default RepositoryList;