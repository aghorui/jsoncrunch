import type { getJsonType, JsonPath, JsonType, JsonValue } from "./Types";

/**
 * Copies text to clipboard.
 *
 * @param      {string}  text The text.
 */
export function copyText(text: string) {
	if (!navigator.clipboard) {
		console.log("navigator.clipboard not supported by the browser.");
	}

	navigator.clipboard.writeText(text).then(
		() => {  },
		(err) => { console.log(err); }
	)
}

/**
 * Creates an empty object without any prototype.
 */
export function createEmptyObject(): {} {
	return Object.create(null);
}

/**
 * Determines if string has white space white space.
 *
 * @param      {string}   s String.
 * @return     {boolean}    True if white space, False otherwise.
 */
export function hasWhiteSpace(s: string): boolean {
	return /\s/g.test(s);
}

/**
 * Determines whether the specified s is integer.
 *
 * @param      {string}   s String.
 * @return     {boolean}    True if the specified s is integer, False otherwise.
 */
export function isInteger(s: string): boolean {
	return Number.isInteger(s);
}

/**
 * Gets the representation of subscripting the member of an object or array.
 *
 * @param      {string}  s           The subscript (integer/string).
 * @param      {string}  parentPath  Path of the parent object.
 * @return     {string}  The representation.
 */
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


export function getObjectElement(k: object, path: JsonPath): object | undefined {
	let currentSegment = k;

	for (let segment of path) {
		if (Object.hasOwn(currentSegment, segment)) {
			currentSegment = currentSegment[segment];
		} else {
			return void 0;
		}
	}

	return currentSegment;
}

/**
 * Returns the minified integer weight of the payload supplied. The weight is
 * the minimum size required to store the payload.
 *
 * This is an expensive function, so should be used sparingly with objects,
 * arrays and so on.
 *
 * @param      {JsonValue}  value Valid JSON type (string, number, array, object)
 * @return     {number}           The weight.
 */
export function weight(value: JsonValue): number {
	return JSON.stringify(value).length
}


/**
 * Gets the internal schema representation (not json schema) of a JSON object.
 *
 * TODO: This is not baseline stuff. Implement this later.
 *
 * @param      {<type>}  value   The value
 */
/*export function getSchema(value) {
	switch(getJsonType(value)) {
		JsonType.ARRAY
		JsonType.BOOLEAN
		JsonType.NULL
		JsonType.NUMBER
		JsonType.OBJECT
		JsonType.STRING
	}
}
*/