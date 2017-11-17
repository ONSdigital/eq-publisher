const gql = require("graphql-tag");

exports.getQuestionnaire = gql`
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
              id
              description
              guidance
              qCode
              label
              type
              mandatory
              ... on MultipleChoiceAnswer {
                options {
                  id
                  label
                  description
                  value
                  qCode
                  childAnswerId
                }
              }
            }
          }
        }
      }
    }
  }
`;
