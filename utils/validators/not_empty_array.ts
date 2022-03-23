export function not_empty_array(arr: any[], var_name: string = ""): any[] {
  if (!Array.isArray(arr)) {
    throw new Error(`${var_name} não é um array válido.`);
  }

  if (arr.length === 0) {
    throw new Error(`${var_name} array vazia.`);
  }

  return arr;
}
