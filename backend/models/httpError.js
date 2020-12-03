class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Add message property
    this.code = errorCode; //Add a code property
  }
}

module.exports = HttpError;
