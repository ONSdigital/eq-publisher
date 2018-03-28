const request = require("request-promise");
const { get } = require("lodash/fp");

class ValidationApi {
  constructor(validationApiUrl, http = request) {
    this.validationApiUrl = validationApiUrl;
    this.http = http;
  }

  validate(json) {
    return this.http
      .post(this.validationApiUrl, {
        body: json,
        json: true
      })
      .then(() => ({
        valid: true
      }))
      .catch(e => ({
        valid: false,
        errors: get(e, "response.body.errors")
      }));
  }
}

module.exports = ValidationApi;
