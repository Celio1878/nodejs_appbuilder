import { positive_number } from "../positive_number";

describe("positive_number", () => {
  [0, "", null, -1, -100, 0.00001, 0.99, undefined, " "].forEach((n: any) =>
    test("should to return exception why invalid number.", () => {
      expect(() => {
        positive_number(n);
      }).toThrow();
    })
  );

  [1, 2, 3, "4"].forEach((n: any) =>
    test("should to return as number", () => {
      // Act
      const num = positive_number(n);

      // Assert
      expect(num).toBe(+n);
    })
  );
});
