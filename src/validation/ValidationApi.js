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

    try {
      const res = await this.http.post(this.validationApiUrl, {
        body: json,
        json: true
      });

      // TODO: remove after ONSdigital/eq-schema-validator/pull/42 is merged
      if (!isEmpty(res)) {
        result.valid = false;
        result.errors = res.errors;
      }
    } catch ({ response }) {
      result.valid = false;
      result.errors = response.body.errors;
    }

    return result;
  }
}

module.exports = ValidationApi;
