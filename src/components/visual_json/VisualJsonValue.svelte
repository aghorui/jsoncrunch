<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import { JsonType, JsonTypeNames, type ContextMenuEvent, type JsonValue } from "../../lib/Types";
	import { copyText, getIndexRepresentation, hasWhiteSpace, isInteger } from "../../lib/Util";
	import VisualJsonEntry from "./VisualJsonEntry.svelte";
	import VisualJsonEntryTitle from "./VisualJsonEntryTitle.svelte";

	const dispatch = createEventDispatcher()

	export let key: string = "";
	export let value: any = "";
	export let parentObject: object | any = null;
	export let parentPath: string = "";
	export let deleteObject: (pathString: string) => void = null;
	export let updateObject: (pathString: string, value: JsonValue) => void = null;

	export let isHighlighted: boolean = false;
	export let persistentHighlight: boolean = false;
	export let rightBorderColor: string = "blue"
	export let valueType: JsonType = JsonType.INVALID;

	function contextMenuAddElement(e: MouseEvent) {
		e.preventDefault();
		let detail: ContextMenuEvent = {
			deleteObject: deleteObject,
			updateObject: updateObject,
			isPinned: persistentHighlight,
			togglePin: () => { persistentHighlight = !persistentHighlight; },
			key: key,
			value: value,
			path: currentPathString,
			type: valueType,
			isMultiselect: e.ctrlKey || e.metaKey
		}
		dispatch("contextEvent", detail)
		console.log("sending out: ", detail)
	}

	function contextMenuRemoveElement(e: MouseEvent) {
		dispatch("removeContextEvent", { key: currentPathString })
	}

	$: currentPathString =  parentPath + getIndexRepresentation(key, parentPath);
	$: backgroundColor = persistentHighlight ? "rgba(0, 0, 0, 0.2)" :
							  (isHighlighted ? "rgba(0, 0, 0, 0.1)" :
							  "unset");
	$: titleColor = isHighlighted ? "lightyellow" : "#FAFAFA";

	$: valueLabelBackgroundColor = value === null ? "gray" : "unset";

</script>


<VisualJsonEntry
	targetObjectType={valueType}
	currentPathString={currentPathString}
	contextMenuAddElement={contextMenuAddElement}
	contextMenuRemoveElement={contextMenuRemoveElement}>
	<VisualJsonEntryTitle title={key} value={value} rightBorderColor={rightBorderColor} />
</VisualJsonEntry>