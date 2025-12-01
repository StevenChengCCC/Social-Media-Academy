/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
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
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
