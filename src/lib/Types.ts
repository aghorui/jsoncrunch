/**
 * Represents a Valid JSON-representable type.
 */
export enum JsonType {
	INVALID = -1,
	NULL = 0,
	OBJECT = 1,
	ARRAY,
	STRING,
	NUMBER,
	BOOLEAN
};

export const JsonTypeNames = {
	[JsonType.INVALID]: "Invalid JSON Data",
	[JsonType.NULL]: "Null Value",
	[JsonType.OBJECT]: "Object",
	[JsonType.ARRAY]: "Array",
	[JsonType.STRING]: "String",
	[JsonType.NUMBER]: "Number",
	[JsonType.BOOLEAN]: "Boolean"
};

export type JsonValue = number | string | boolean | object | Array<any> | null

/**
 * Describes an object idiom.
 */
export enum ObjectIdiom {
	DOCUMENT,  // { [id: string]: any }
	DICTIONARY // Any a => { [id: string]: a }
}

/**
 * Describes an array idiom.
 */
export enum ArrayIdiom {
	DATASET,        // Document a => [a]
	ARRAY,          // [any]
	DYNAMIC_ARRAY,  // Any a => [a]
	SMALL_ARRAY     // array size < 8. used to represent sets
}

/**
 * Describes a string idiom.
 */
export enum StringIdiom {
	STRING, // small strings
	MEMO    // large strings, size > 80
}


/**
 * Describes a right click menu for a json document.
 */
export type ContextMenuEvent = {
	deleteObject: () => void,
	togglePin: () => void,
	isPinned: boolean,
	target: object,
	path: string,
	x: number,
	y: number
};
``
/**
 * Determines whether the specified value is object and not array.
 *
 * @param      {any}      value   The value
 * @return     {boolean}  True if the specified value is object and not array, False otherwise.
 */
export function isObjectAndNotArray(value: any): boolean {
	return typeof value === 'object' && value !== null && value.constructor !== Array;
}

/**
 * Determines whether the specified value is array.
 *
 * @param      {any}      value   The value
 * @return     {boolean}  True if the specified value is array, False otherwise.
 */
export function isArray(value: any): boolean {
	return value.constructor === Array;
}

/**
 * Determines whether the specified value is string.
 *
 * @param      {any}      value   The value
 * @return     {boolean}  True if the specified value is string, False otherwise.
 */
export function isString(value: any): boolean {
	return typeof value === 'string' || value instanceof String;
}

/**
 * Determines whether the specified value is undefined or null.
 *
 * @param      {any}      value   The value
 * @return     {boolean}  True if the specified value is undefined or null, False otherwise.
 */
export function isUndefinedOrNull(value: any): boolean {
	return value === null || value === (void 0);
}

/**
 * Determines whether the specified value is number.
 *
 * @param      {any}      value   The value
 * @return     {boolean}  True if the specified value is number, False otherwise.
 */
export function isNumber(value: any): boolean {
	return typeof value === 'number';
}

/**
 * Determines whether the specified value is boolean.
 *
 * @param      {any}      value   The value
 * @return     {boolean}  True if the specified value is boolean, False otherwise.
 */
export function isBoolean(value: any): boolean {
	return typeof value === 'boolean';
}

/**
 * Gets the JSON-Equivalent type of the supplied value
 *
 * @param      {any}       value The value for which the type is requested.
 * @return     {JsonType}        The type.
 */
export function getJsonType(value: any): JsonType {

	if (isObjectAndNotArray(value)) {
		return JsonType.OBJECT;
	} else if (isArray(value)) {
		return JsonType.ARRAY;
	} else if (isString(value)) {
		return JsonType.STRING;
	} else if (isUndefinedOrNull(value)) {
		return JsonType.NULL;
	} else if (isNumber(value)) {
		return JsonType.NUMBER;
	} else if (isBoolean(value)) {
		return JsonType.BOOLEAN;
	}

	return JsonType.INVALID;
}