const convertPipes = require("../utils/convertPipes");

const createPipe = ({ id = "123", type = "TextField", text = "foo" } = {}) =>
  `<span data-piped="answers" data-id="${id}" data-type="${type}">${text}</span>`;

describe("convertPipes", () => {
  it("should handle empty strings", () => {
    expect(convertPipes("")).toEqual("");
  });

  it("should handle null values", () => {
    expect(convertPipes(null)).toBeNull();
  });

  it("should handle undefined values", () => {
    expect(convertPipes()).toBeUndefined();
  });

  it("should handle empty html tags", () => {
    expect(convertPipes("<p></p>")).toEqual("<p></p>");
  });

  it("should convert relevant elements to pipe format", () => {
    const html = createPipe();
    expect(convertPipes(html)).toEqual("{{answers.answer123}}");
  });

  it("should handle multiple piped values", () => {
    const pipe1 = createPipe();
    const pipe2 = createPipe({ id: "456", text: "bar" });
    const html = `${pipe1}${pipe2}`;

    expect(convertPipes(html)).toEqual(
      "{{answers.answer123}}{{answers.answer456}}"
    );
  });

  it("should handle piped values amongst regular text", () => {
    const pipe1 = createPipe();
    const pipe2 = createPipe({ id: "456", text: "bar" });
    const html = `hello ${pipe1}${pipe2} world`;

    expect(convertPipes(html)).toEqual(
      "hello {{answers.answer123}}{{answers.answer456}} world"
    );
  });

  describe("formatting", () => {
    it("should format Date answers with `format_date`", () => {
      const html = createPipe({ id: "123", type: "Date" });
      expect(convertPipes(html)).toEqual("{{answers.answer123|format_date}}");
    });

    it("should format Currency answers with `format_currency`", () => {
      const html = createPipe({ id: "123", type: "Currency" });
      expect(convertPipes(html)).toEqual(
        "{{answers.answer123|format_currency}}"
      );
    });

    it("should format Number answers with `format_number`", () => {
      const html = createPipe({ id: "123", type: "Number" });
      expect(convertPipes(html)).toEqual("{{answers.answer123|format_number}}");
    });
  });
});
