/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSlangTerm = /* GraphQL */ `
  query GetSlangTerm($id: ID!) {
    getSlangTerm(id: $id) {
      id
      term
      meaning
      category
      example
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSlangTerms = /* GraphQL */ `
  query ListSlangTerms(
    $filter: ModelSlangTermFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSlangTerms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        term
        meaning
        category
        example
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getContribution = /* GraphQL */ `
  query GetContribution($id: ID!) {
    getContribution(id: $id) {
      id
      type
      term
      proposedMeaning
      note
      status
      adminResponse
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listContributions = /* GraphQL */ `
  query ListContributions(
    $filter: ModelContributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContributions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        term
        proposedMeaning
        note
        status
        adminResponse
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
