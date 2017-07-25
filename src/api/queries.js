const gql = require("graphql-tag");

exports.getQuestionnaire = gql`
  query GetQuestionnaire($questionnaireId: Int!) {
    questionnaire(id: $questionnaireId) {
      id
      title
      description
      theme
      legalBasis
      navigation
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
            type
            mandatory
            answers {
              id
              description
              guidance
              qCode
              label
              type
              mandatory
            }
          }
        }
      }
    }
  }
`;
