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
            answers {
              ...answerFragment
              ... on MultipleChoiceAnswer {
                options {
                  id
                  label
                  description
                  value
                  qCode
                }
                otherAnswer {
                  ...answerFragment
                }
              }
            }
          }
        }
      }
    }
  }
`;
