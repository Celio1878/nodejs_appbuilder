import { not_empty_array } from "../not_empty_array";

describe("not_empty_array", () => {
  [[1], [-1], [""], ["1", "2"]].forEach((arr) => {
    it("deve retornar valor de um array com elementos.", () => {
      // Arrange

      // Act
      const v = not_empty_array(arr);

      // Assert
      expect(v).toBe(arr);
    });
  });

  [[], 1, "", "ricardo", true, 0, "[]"].forEach((t) => {
    it("deve gerar erro ao receber valor invalido.", () => {
      // Arrange

      // Assert
      expect(() => {
        // Act
        not_empty_array(t as any[]);
      }).toThrow();
    });
  });
});
