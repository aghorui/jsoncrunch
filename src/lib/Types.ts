import { createEmptyObject, getObjectElement } from "./Util";

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

export type JsonPathIndex = number | string

export type JsonPath = Array<JsonPathIndex>

export type ToggleSelectorOptions = { key: string, value: any, enabled: boolean };

export type Operation = { name: string, params?: any }


/**
 * Describes the current view in the main viewport.
 *
 * @class      ViewportViewType (name)
 */
export enum ViewportViewType {
	VISUAL,
	SOURCE,
	METADICT
}

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
	deleteObject: () => void, // Object deletor
	togglePin: () => void, // Pin Toggler
	isPinned: boolean, // is it pinned?
	key: string, // The target JSON key
	value: object, // The target JSON value
	path: string, // Path to the JSON value
	type: JsonType, // The type of the JSON value
	isMultiselect: boolean, // In multiselect mode (hold CTRL mode)
};


// Dictionary based on object and not Map.
// not implemented.
/*export class StringDict {
	data: object
	constructor() {
		data
	}
}*/

/*
 * Describes a JSON selection Node
 */

/*export type JsonSelectionNode = {
	selected: boolean,
	children: { [id: string]: JsonSelectionNode } | null
}*/

/*
 * Describes a user's selection of JSON elements
 *
 * This implementation is probably isnt too useful right now because we can just
 * check for existence for the path in the case of deletion albeit at some
 * expense. It might become useful later in other operations.
 *
 * @class      JsonSelection (name)
 */

/*export class JsonSelection {
	selection: JsonSelectionNode | null
	count: number = 0

	constructor() {
		// TODO maybe convert empty object into another class
		var k: any = createEmptyObject();
		k["selected"] = false
		k["children"] = null

		this.selection = k
	}

	insertNode(node: JsonSelectionNode, name: JsonPathIndex, selected: boolean = false) {
		if (node.children === null) {
			node.children = createEmptyObject()
		}

		node.children[name] = { selected: selected, children: null }

		return node.children[name]
	}

	addElement(path: JsonPath) {
		let currentSegment = this.selection;
		for (let segment of path.slice(0, -1)) {
			if (Object.hasOwn(currentSegment, segment)) {
				this.insertNode(currentSegment, segment, false);
			}
			currentSegment = currentSegment[segment];
		}

		// there isn't a need to indicate leaf nodes explicitly.
		if (Object.hasOwn(currentSegment, path[path.length - 1])) {
				this.insertNode(currentSegment, path[path.length - 1], false);
		}

		currentSegment[path[path.length - 1]].selected = true;
	}

	removeElement(path: JsonPath) {
		target = getElement(path)
		parent = getElemebt(path[0:-1])
		parent.delete(target)
		if parent has no children {
			delete parent
		}
	}

	getElement(path: JsonPath) {
		return getObjectElement(k, path);
	}
}*/

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
	return typeof value === 'object' && value !== null && value.constructor === Array;
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