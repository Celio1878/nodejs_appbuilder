/**
 * Verify if array is not empty
 *
 * @param arr
 * @param var_name
 * @returns
 */
export function not_empty_array(arr: any[], var_name: string = ""): any[] {
  if (!Array.isArray(arr)) {
    throw new Error(`${var_name} is invalid.`);
  }

  if (arr.length === 0) {
    throw new Error(`${var_name} is void.`);
  }

  return arr;
}
