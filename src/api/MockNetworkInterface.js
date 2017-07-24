const { mockServer } = require("graphql-tools");
const { print } = require("graphql/language/printer");

class MockNetworkInterface {
  constructor(schema, mocks = {}) {
    this.mockServer = mockServer(schema, mocks);
  }

  query(request) {
    return this.mockServer.query(print(request.query), request.variables);
  }
}

module.exports = MockNetworkInterface;
