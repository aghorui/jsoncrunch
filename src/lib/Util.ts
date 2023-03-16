
export function copyText(text: string) {
	if (!navigator.clipboard) {
		console.log("navigator.clipboard not supported by the browser.")
	}

	navigator.clipboard.writeText(text).then(
		() => {  },
		(err) => { console.log(err) }
	)
}

export function hasWhiteSpace(s: string): boolean{
	return /\s/g.test(s);
}

export function isInteger(s: string): boolean{
	return Number.isInteger(s);
}

export function getIndexRepresentation(s: string, parentPath: string): string {
	// objects can also have empty strings as keys
	if (s === "" || hasWhiteSpace(s)) {
		return `['${s}']`;
	} else if (isInteger(s)) {
		return `[${s}]`;
	} else if (parentPath === "") {
		return s;
	} else {
		return `.${s}`;
	}
}