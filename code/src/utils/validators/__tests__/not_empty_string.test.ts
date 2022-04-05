import { not_empty_string } from "../not_empty_string";

describe("not_empty_string", () => {
  // Arrange
  const tests = ["", " ", "   ", null, 1, undefined, 0, [], {}, NaN];

  tests.forEach((str: any) => {
    test("should to return exception why invalid string.", () => {
      expect(() => {
        not_empty_string(str, "str-name");
      }).toThrow();
    });
  });
});
