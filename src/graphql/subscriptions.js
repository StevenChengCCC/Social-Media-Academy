/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSlangTerm = /* GraphQL */ `
  subscription OnCreateSlangTerm(
    $filter: ModelSubscriptionSlangTermFilterInput
  ) {
    onCreateSlangTerm(filter: $filter) {
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
export const onUpdateSlangTerm = /* GraphQL */ `
  subscription OnUpdateSlangTerm(
    $filter: ModelSubscriptionSlangTermFilterInput
  ) {
    onUpdateSlangTerm(filter: $filter) {
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
export const onDeleteSlangTerm = /* GraphQL */ `
  subscription OnDeleteSlangTerm(
    $filter: ModelSubscriptionSlangTermFilterInput
  ) {
    onDeleteSlangTerm(filter: $filter) {
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
export const onCreateContribution = /* GraphQL */ `
  subscription OnCreateContribution(
    $filter: ModelSubscriptionContributionFilterInput
    $owner: String
  ) {
    onCreateContribution(filter: $filter, owner: $owner) {
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
export const onUpdateContribution = /* GraphQL */ `
  subscription OnUpdateContribution(
    $filter: ModelSubscriptionContributionFilterInput
    $owner: String
  ) {
    onUpdateContribution(filter: $filter, owner: $owner) {
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
export const onDeleteContribution = /* GraphQL */ `
  subscription OnDeleteContribution(
    $filter: ModelSubscriptionContributionFilterInput
    $owner: String
  ) {
    onDeleteContribution(filter: $filter, owner: $owner) {
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
export const onCreateUserAnalytics = /* GraphQL */ `
  subscription OnCreateUserAnalytics(
    $filter: ModelSubscriptionUserAnalyticsFilterInput
  ) {
    onCreateUserAnalytics(filter: $filter) {
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
export const onUpdateUserAnalytics = /* GraphQL */ `
  subscription OnUpdateUserAnalytics(
    $filter: ModelSubscriptionUserAnalyticsFilterInput
  ) {
    onUpdateUserAnalytics(filter: $filter) {
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
export const onDeleteUserAnalytics = /* GraphQL */ `
  subscription OnDeleteUserAnalytics(
    $filter: ModelSubscriptionUserAnalyticsFilterInput
  ) {
    onDeleteUserAnalytics(filter: $filter) {
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
