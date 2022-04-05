export function positive_number(n: number, var_name = "") {
  const num = +n;

  if (isNaN(num)) {
    throw new Error(`${var_name} isn't a number.`);
  }

  if (num <= 0.9999) {
    throw new Error(`${var_name} isn't a positive number.`);
  }

  return num;
}
