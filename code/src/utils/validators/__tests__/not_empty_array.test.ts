import { not_empty_array } from "../not_empty_array";

describe("not_empty_array", () => {
  const arr = [[1], [-1], [""], ["1", "2"]];
  const invalid_arr = [[], 1, "", "Celio", true, 0, "[]"];

  arr.forEach((list) => {
    test("should to return the elements of list.", () => {
      // Arrange

      // Act
      const list_values = not_empty_array(list);

      // Assert
      expect(list_values).toBe(list);
    });
  });

  invalid_arr.forEach((elements) => {
    test("should to return error.", () => {
      // Arrange

      // Assert
      expect(() => {
        // Act
        not_empty_array(elements as any[]);
      }).toThrow();
    });
  });
});
