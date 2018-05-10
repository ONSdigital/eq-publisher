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
                page{
                  id
                }
              }
              routingRules {
                id
                operation  
                goto{
                  page{
                    id
                  }
                }
                conditions {
                  id
                  comparator
                  answer {
                    ...on MultipleChoiceAnswer{
                      options {
                        id
                        value
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
