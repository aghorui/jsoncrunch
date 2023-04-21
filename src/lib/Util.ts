import { getJsonType, isObjectOrArray, JsonType, type IndexEntry, type JsonPath, type JsonValue } from "./Types";

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
	);
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
	return JSON.stringify(value).length;
}


/**
 * Creates and fills an array with a default value
 */
export function makeArray<T>(length: number, value: T): Array<T> {
	return Array(length).fill(value);
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

/*/**
 * Iterates an object in level order.
 *
 * @param      {object}            doc     The document
 * @return     {Iterator<object>}  { description_of_the_return_value }

export function iterateObject(doc: object): Iterator<object> {
	return {
		next: () => {
			return
		}
	}
}*/

/**
 * Walks the entire JSON tree and builds an index for all the objects on the
 * tree.
 *
 * @param      {object}             doc     The document.
 * @return     {Array<IndexEntry>}          The index.
 */
export function buildIndex(doc: object): Array<IndexEntry> {

	// pointer to current node
	let stack: Array<object> = [ doc ];

	// pointer to current node's Object.keys array index. By default it is zero.
	let keyIndexStack: Array<number> = [ 0 ];

	// path to current node
	// main reason for not creating a struct stack because we'll concatenate
	// this everytime we have a new object.
	let pathStack: Array<string> = [ "root" ];

	let indexList: Array<IndexEntry> = [];

	let restart: boolean = false;

	while (stack.length > 0) {
		// Define convenience variables.
		// We will iterate in the order defined by Object.keys.
		let top = stack.length - 1
		let stacktop = stack[top]
		let topkeys = Object.keys(stack[top])

		for (let i = keyIndexStack[top]; i < topkeys.length; i++) {

			// Increment the key index.
			keyIndexStack[top] = i + 1;

			// Add whatever there is to the list.
			indexList.push({
				path: [...pathStack, topkeys[i]].join("/"),
				data: stacktop[topkeys[i]],
				key: topkeys[i],
				type: getJsonType(stacktop[topkeys[i]])
			})

			// If its traversable, traverse it.
			if (isObjectOrArray(stacktop[topkeys[i]])) {
				stack.push(stacktop[topkeys[i]]);
				pathStack.push(topkeys[i]);
				keyIndexStack.push(0);
				restart = true;
				break;
			}
		}

		// this flag is set to true if we want to go up one level in the stack.
		if (restart === true) {
			restart = false;
			continue;
		}

		// If object is exhausted. Pop the top.
		stack.pop()
		keyIndexStack.pop()
		pathStack.pop()
	}

	// Sort and return
	return indexList.sort((a, b) => { return a.path.localeCompare(b.path) })
}