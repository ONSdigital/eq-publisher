const request = require("request-promise");
const { isEmpty } = require("lodash");

class ValidationApi {
  constructor(validationApiUrl, http = request) {
    this.validationApiUrl = validationApiUrl;
    this.http = http;
  }

  async validate(json) {
    const result = {
      valid: true
    };

    const res = await this.http.post(this.validationApiUrl, {
      body: json,
      json: true
    });

    if (!isEmpty(res)) {
      result.valid = false;
      result.errors = res.errors;
    }

    return result;
  }
}

module.exports = ValidationApi;
