export function not_empty_string(value: string, var_name: string): string {
	if (typeof value !== 'string') {
		throw new Error(`${var_name} o valor fornecido não é uma string valida.`);
	}

	if (!value.trim()) {
		throw new Error(`${var_name} a string está vazia.`);
	}

	return value;
}
