import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String!) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      pageInfo {
        totalCount,
        hasNextPage,
        endCursor,
        startCursor
      },
      edges {
        cursor,
        node {
          id,
          name,
          ownerName,
          createdAt,
          fullName,
          reviewCount,
          ratingAverage,
          forksCount,
          stargazersCount,
          description,
          language,
          ownerAvatarUrl,
        },
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password}) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password}) {
      id,
      username,
      createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($repositoryName: String!, $ownerName: String!, 
    $rating: Int!, $text: String) {
    createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName,
      rating: $rating, text: $text }) {
        repositoryId,
    }
  }
`;

export const GET_USER = gql`
  query authorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id,
      username,
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id,
            text,
            rating,
            user {
              username
            },
            createdAt
          }
          cursor
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int!, $after: String) {
    repository(id: $id) {
      id,
      name,
      ownerName,
      createdAt,
      fullName,
      reviewCount,
      ratingAverage,
      forksCount,
      stargazersCount,
      description,
      language,
      ownerAvatarUrl,
      url,
      reviews(first: $first, after: $after) {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            user {
              id,
              username
            }
          },
          cursor
        },
        pageInfo {
          endCursor,
          startCursor,
          totalCount,
          hasNextPage
        }
      }
    }
  }
`;