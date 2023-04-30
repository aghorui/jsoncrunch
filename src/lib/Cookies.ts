import { createEmptyObject } from "./Util";


type CookieCollection = { [id: string]: string }

function generateCookieDictionary(): CookieCollection {
	let cookies = document.cookie;
	let cookieCollection: CookieCollection = createEmptyObject();

	for (let cookie of cookies.split("; ")) {
		if (cookie === "") {
			continue;
		}
		let [cookieName, cookieValue] = cookies.split("=");
		cookieCollection[cookieName] = cookieValue;
	}

	return cookieCollection;
}

function commitCookies(c: CookieCollection) {
	let cookieString: string = "";

	for (let [key, value] of Object.entries(c)) {
		cookieString += `${key}=${value}; `;
	}
	document.cookie = cookieString;
}

let cookieCollection = generateCookieDictionary();

export function hasCookie(key: string): boolean {
	return Object.hasOwn(cookieCollection, key);
}

export function getCookie(key: string): string | null {
	if (Object.hasOwn(cookieCollection, key)) {
		return cookieCollection[key];
	}

	return null;
}

export function setCookie(key: string, value: string) {
	cookieCollection[key] = value;
	commitCookies(cookieCollection);
}

export function deleteCookie(key: string) {
	if (Object.hasOwn(cookieCollection, key)) {
		delete cookieCollection[key];
	}
	commitCookies(cookieCollection);
}

export default {}