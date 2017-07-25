const MockNetworkInterface = require("./MockNetworkInterface");
const schema = require("eq-author-graphql-schema/schema");
const gql = require("graphql-tag");

describe("mock network interface", () => {
  it("should be possible to query the mock network interface", () => {
    const api = new MockNetworkInterface(schema);

    const query = gql`
      {
        questionnaires {
          id
        }
      }
    `;

    const request = {
      query,
      variables: {}
    };

    return api.query(request).then(result => {
      // If request query was passed to the mockServer implementation successfully then we should have
      // two questionnaires returned by default.
      expect(result.data.questionnaires).toHaveLength(2);
    });
  });
});
