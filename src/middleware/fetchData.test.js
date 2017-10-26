const fetchData = require("./fetchData");

describe("fetchData", () => {
  let res, req, next, API, fetcher;

  beforeEach(() => {
    res = {
      locals: {},
      sendStatus: jest.fn()
    };

    req = {
      params: {
        questionnaireId: "123"
      }
    };

    API = {
      getAuthorData: jest.fn()
    };

    next = jest.fn();

    fetcher = fetchData(API);
  });

  it("should request data from API", () => {
    fetcher(req, res, next);

    expect(API.getAuthorData).toHaveBeenCalledWith(req.params.questionnaireId);
  });

  it("should pass error to next middleware if API errors", () => {
    const error = new Error("oops");
    API.getAuthorData.mockImplementation(() => {
      throw error;
    });

    fetcher(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("should respond with 404 if no questionnaire returned", async () => {
    API.getAuthorData.mockImplementation(() => null);
    await fetcher(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("should assign questionnaire for next middleware", async () => {
    const questionnaire = { id: "123" };

    API.getAuthorData.mockImplementation(() => ({
      data: { questionnaire }
    }));

    await fetcher(req, res, next);

    expect(res.locals.questionnaire).toBe(questionnaire);
    expect(next).toHaveBeenCalledWith();
  });
});
