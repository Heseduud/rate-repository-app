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
  query authorizedUser {
    authorizedUser {
      id,
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
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
      reviews {
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
          }
        }
      }
    }
  }
`;