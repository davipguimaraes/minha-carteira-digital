export function isMinLength(value: string, minLength: number): boolean {
	return value.trim().length >= minLength;
}

export function isMaxLength(value: string, maxLength: number): boolean {
	return value.trim().length <= maxLength;
}
