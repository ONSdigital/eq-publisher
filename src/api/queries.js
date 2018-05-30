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
              else{
                ... on Section {
                  id
                }
                ... on Page {
                  id
                  section {
                    id
                  }
                }
              }
              routingRules {
                id
                operation  
                goto{
                  ... on Section {
                    id
                  }
                  ... on Page {
                    id
                    section {
                      id
                    }
                  }
                }
                conditions {
                  id
                  comparator
                  answer {
                    id
                    ...on MultipleChoiceAnswer{
                      options {
                        id
                        label
                      }
                    }
                  }
                  routingValue {
                    ...on IDArrayValue {
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
                  answer{
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
