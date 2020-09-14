import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      pageInfo {
        totalCount,
        hasNextPage,
        endCursor,
        startCursor
      },
      edges {
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

export const GET_USER = gql`
  query authorizedUser {
    authorizedUser {
      id,
      username
    }
  }
`;