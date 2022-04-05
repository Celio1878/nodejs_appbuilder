export function not_empty_string(value: string, var_name: string): string {
  if (typeof value !== "string") {
    throw new Error(`${var_name} isn't valid string.`);
  }

  if (!value.trim()) {
    throw new Error(`${var_name} is void.`);
  }

  return value;
}
