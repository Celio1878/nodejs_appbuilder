import { not_empty_string } from "../not_empty_string";

describe("not_empty_string", () => {
  // Arrange
  const tests = ["", " ", "   ", null, 1, undefined, 0, [], {}, NaN];

  tests.forEach((str: any) => {
    it("Deve gerar uma excecao quando uma string invalida for recebida.", () => {
      // Act // Assert
      expect(() => {
        not_empty_string(str);
      }).toThrow();
    });
  });
});
