export function positive_number(n: number, var_name = '') {
	const num = +n;

	if (isNaN(num)) {
		throw new Error(var_name + ' número invalido.');
	}

	if (num <= 0.9999) {
		throw new Error(var_name + ' valor deve ser um número positivo.');
	}

	return num;
}
