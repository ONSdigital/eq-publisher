class ValidationError extends Error {

  constructor(message, validation) {
    super(message);
    this.validation = validation;
  }

  toString() {
    return this.message + "\n" + JSON.stringify(this.validation);
  }

}

module.exports = ValidationError;