exports.getQuestionnaire = `
  fragment answerFragment on Answer {
    id
    type
    label
    description
    guidance
    mandatory
    qCode
  }

  fragment optionFragment on Option {
    id
    label
    description
    value
    qCode
  }

  fragment destinationFragment on RoutingDestination {
    ... on LogicalDestination {
      __typename
      logicalDestination
    }
    ... on AbsoluteDestination {    
      __typename
      absoluteDestination {
        ... on QuestionPage {
          id
          __typename
        }
        ... on Section {
          id
          __typename
        }
      }
    }
  }

  query GetQuestionnaire($questionnaireId: ID!) {
    questionnaire(id: $questionnaireId) {
      id
      title
      description
      theme
      legalBasis
      navigation
      surveyId
      summary
      sections {
        id
        title
        description
        pages {
          ... on QuestionPage {
            id
            title
            description
            guidance
            pageType
            routingRuleSet {
              id
              else {
                ...destinationFragment
              }
              routingRules {
                id
                operation
                goto {
                  ...destinationFragment
                }
                conditions {
                  id
                  comparator
                  answer {
                    id
                    type
                    ... on MultipleChoiceAnswer {
                      options {
                        id
                        label
                      }
                    }
                  }
                  routingValue {
                    ... on IDValue {
                      value
                    }
                  }
                }
              }
            }
            answers {
              ...answerFragment
              ... on BasicAnswer {
                secondaryLabel
              }
              ... on MultipleChoiceAnswer {
                options {
                  ...optionFragment
                }
                other {
                  option {
                    ...optionFragment
                  }
                  answer {
                    ...answerFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
