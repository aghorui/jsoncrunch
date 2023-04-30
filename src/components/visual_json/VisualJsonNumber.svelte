<script lang="ts">
	import Config from "../../lib/Config";
	import { JsonType, type JsonValue } from "../../lib/Types";
	import VisualJsonValue from "./VisualJsonValue.svelte";

	export let key: string = "";
	export let parentObject: object | any = null;
	export let value: string | null = null;
	export let deleteObject: (pathString: string) => void = null;
	export let updateObject: (pathString: string, value: JsonValue) => void = null;
	export let parentPath: string = "";
	export let valueType: JsonType = JsonType.NUMBER;
</script>

<VisualJsonValue
	on:contextEvent
	on:removeContextEvent
	on:clearContextEvent
	on:treeUpdatedEvent
	key={key}
	parentObject={parentObject}
	value={value}
	deleteObject={deleteObject}
	updateObject={updateObject}
	valueType={valueType}
	parentPath={parentPath}
	rightBorderColor={Config.TitleColors[JsonType.NUMBER]}/>