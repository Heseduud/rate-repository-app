import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';
import { SignInContainer } from '../../components/SignIn';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories}/>);

      const names = getAllByTestId('name');
      const descriptions = getAllByTestId('description');
      const languages = getAllByTestId('language');
      const forks = getAllByTestId('forkCount');
      const starCounts = getAllByTestId('starCount');
      const ratings = getAllByTestId('ratingAvg');
      const reviews = getAllByTestId('reviewCount');

      expect(names[0]).toHaveTextContent('jaredpalmer/formik');
      expect(names[1]).toHaveTextContent('async-library/react-async');

      expect(descriptions[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(descriptions[1]).toHaveTextContent('Flexible promise-based React data loader');

      expect(languages[0]).toHaveTextContent('TypeScript');
      expect(languages[1]).toHaveTextContent('JavaScript');

      expect(forks[0]).toHaveTextContent('1.6k');
      expect(forks[1]).toHaveTextContent('69');

      expect(starCounts[0]).toHaveTextContent('21.9k');
      expect(starCounts[1]).toHaveTextContent('1.8k');

      expect(ratings[0]).toHaveTextContent('88');
      expect(ratings[1]).toHaveTextContent('72');

      expect(reviews[0]).toHaveTextContent('3');
      expect(reviews[1]).toHaveTextContent('3');
    });
  });
});

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInContainer onSubmit={onSubmit}/>);

      /*
        Exercise suggested that fireEvent would cause errors on formik and that
        they should be wrapped in act -functions, didn't throw any errors like this
        so didn't wrap them
      */
      fireEvent.changeText(getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(getByTestId('passwordField'), 'password');
      fireEvent.press(getByTestId('submitButton'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password'
      });
    });
  });
});