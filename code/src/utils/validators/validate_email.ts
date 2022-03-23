export function validate_email(email: string) {
	if (!/^[_a-z0-9\-.]+@[a-z0-9-]+\.[a-z]+(\.[a-z]+)*$/i.test(email)) {
		return false;
	}

	return true;
}
