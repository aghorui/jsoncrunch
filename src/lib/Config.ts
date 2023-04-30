import { JsonType } from "./Types";

export default {
	JSONIndentSize: 4,

	TitleColors: {
		[JsonType.INVALID]: '#8B0036',
		[JsonType.ARRAY]:   '#B443A4',
		[JsonType.BOOLEAN]: '#7C159D',
		[JsonType.NULL]:    '#000000',
		[JsonType.NUMBER]:  '#00973F',
		[JsonType.OBJECT]:  '#2F00DF',
		[JsonType.STRING]:  '#F4AB4E',
	}
} as const;