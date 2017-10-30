const schemaConverter = require("./schemaConverter");

describe("schemaConverter", () => {
  let res, req, next, converter, middleware, questionnaire;

  beforeEach(() => {
    questionnaire = { id: "123" };

    res = {
      locals: { questionnaire }
    };

    converter = {
      convert: jest.fn()
    };

    req = {};
    next = jest.fn();

    middleware = schemaConverter(converter);
  });

  it("should convert data", () => {
    middleware(req, res, next);

    expect(converter.convert).toHaveBeenCalledWith(questionnaire);
  });

  describe("when successful", () => {
    it("should assign converted questionnaire for next middleware", () => {
      const converted = { title: "i've been converted" };
      converter.convert.mockImplementation(() => converted);

      middleware(req, res, next);

      expect(res.locals.questionnaire).toBe(converted);
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("when error occurs", () => {
    it("should pass error to next middleware", () => {
      const error = new Error("conversion error");
      converter.convert.mockImplementation(() => {
        throw error;
      });

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
