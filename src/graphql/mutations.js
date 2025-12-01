/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserAnalytics = /* GraphQL */ `
  mutation CreateUserAnalytics(
    $input: CreateUserAnalyticsInput!
    $condition: ModelUserAnalyticsConditionInput
  ) {
    createUserAnalytics(input: $input, condition: $condition) {
      id
      userId
      isAnonymous
      page
      durationSeconds
      clickCount
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserAnalytics = /* GraphQL */ `
  mutation UpdateUserAnalytics(
    $input: UpdateUserAnalyticsInput!
    $condition: ModelUserAnalyticsConditionInput
  ) {
    updateUserAnalytics(input: $input, condition: $condition) {
      id
      userId
      isAnonymous
      page
      durationSeconds
      clickCount
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSlangTerm = /* GraphQL */ `
  mutation CreateSlangTerm(
    $input: CreateSlangTermInput!
    $condition: ModelSlangTermConditionInput
  ) {
    createSlangTerm(input: $input, condition: $condition) {
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
export const updateSlangTerm = /* GraphQL */ `
  mutation UpdateSlangTerm(
    $input: UpdateSlangTermInput!
    $condition: ModelSlangTermConditionInput
  ) {
    updateSlangTerm(input: $input, condition: $condition) {
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
export const deleteSlangTerm = /* GraphQL */ `
  mutation DeleteSlangTerm(
    $input: DeleteSlangTermInput!
    $condition: ModelSlangTermConditionInput
  ) {
    deleteSlangTerm(input: $input, condition: $condition) {
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
export const createContribution = /* GraphQL */ `
  mutation CreateContribution(
    $input: CreateContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    createContribution(input: $input, condition: $condition) {
      id
      type
      term
      proposedMeaning
      note
      status
      adminResponse
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateContribution = /* GraphQL */ `
  mutation UpdateContribution(
    $input: UpdateContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    updateContribution(input: $input, condition: $condition) {
      id
      type
      term
      proposedMeaning
      note
      status
      adminResponse
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteContribution = /* GraphQL */ `
  mutation DeleteContribution(
    $input: DeleteContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    deleteContribution(input: $input, condition: $condition) {
      id
      type
      term
      proposedMeaning
      note
      status
      adminResponse
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserAnalytics = /* GraphQL */ `
  mutation DeleteUserAnalytics(
    $input: DeleteUserAnalyticsInput!
    $condition: ModelUserAnalyticsConditionInput
  ) {
    deleteUserAnalytics(input: $input, condition: $condition) {
      id
      userId
      isAnonymous
      page
      durationSeconds
      clickCount
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
