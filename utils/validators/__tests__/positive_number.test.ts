import { positive_number } from "../positive_number";

describe("positive_number", () => {
  [0, "", null, -1, -100, 0.00001, 0.99, undefined, " "].forEach((n: any) =>
    it("deve gerar uma excecao numero fornecido for invalido.", () => {
      // Act // Assert
      expect(() => {
        positive_number(n);
      }).toThrow();
    })
  );

  [1, 2, 3, "4"].forEach((n: any) =>
    it("deve retornar o valor do numero.", () => {
      // Act
      const num = positive_number(n);

      // Assert
      expect(num).toBe(+n);
    })
  );
});
