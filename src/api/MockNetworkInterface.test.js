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
      query: query,
      variables: {}
    };

    api.query(request).then(result => {
      expect(result.data.questionnaires).toHaveLength(2);
    });
  });
});
