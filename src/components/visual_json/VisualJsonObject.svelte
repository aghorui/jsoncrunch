<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { getJsonType, JsonType, type ContextMenuEvent, type JsonPath } from "../../lib/Types";
	import { copyText, hasWhiteSpace, isInteger, getIndexRepresentation } from "../../lib/Util";
	import VisualJsonValue from "./VisualJsonValue.svelte";
	import { contextMenuTargetSet } from "../../lib/State";
	import VisualJsonEntryMenu from "./VisualJsonEntryMenu.svelte";
	import VisualJsonEntry from "./VisualJsonEntry.svelte";
	import VisualJsonEntryTitle from "./VisualJsonEntryTitle.svelte";

	const dispatch = createEventDispatcher()

	export let parentPathString: string = "";
	export let parentPath: JsonPath = [];
	export let title: string = "";
	export let targetObject: object | [any] = {};
	export let isHighlighted: boolean = false;
	export let currentPathString: string = "";
	export let currentPath: JsonPath = [ ...parentPath, title ];
	export let hideChildren: boolean = false;

	export let deleteObject: () => void = null;

	let persistentHighlight: boolean = false;

	$: backgroundColor = isHighlighted || persistentHighlight ? "rgba(0, 0, 0, 0.05)" : "unset";
	$: titleBackgroundColor = persistentHighlight ? "rgba(0, 0, 0, 0.4)" :
							  (isHighlighted ? "rgba(0, 0, 0, 0.2)" :
							  "unset");
	$: titleColor = isHighlighted ? "lightyellow" : "#FAFAFA";
	$: toolbarVisible = isHighlighted ? "visible" : "none";
	$: currentPathString =  parentPathString + getIndexRepresentation(title, parentPathString);
	$: persistentHighlight = $contextMenuTargetSet.has(currentPathString);

	function createDeleteFunction(index: number | string): (string) => void {
		return (pathString: string) => {
			$contextMenuTargetSet.delete(pathString);
			$contextMenuTargetSet = $contextMenuTargetSet;
			console.log($contextMenuTargetSet)
			delete targetObject[index];
			targetObject = targetObject;
		}
	}

	function contextMenuAddElement(e: MouseEvent) {
		e.preventDefault();
		let detail: ContextMenuEvent = {
			deleteObject: deleteObject,
			isPinned: persistentHighlight,
			togglePin: () => { persistentHighlight = !persistentHighlight; },
			key: title,
			value: targetObject,
			path: currentPathString,
			type: JsonType.OBJECT,
			isMultiselect: e.ctrlKey || e.metaKey
		}
		dispatch("contextEvent", detail)
		console.log("sending out: ", detail)
	}

	function contextMenuRemoveElement(e: MouseEvent) {
		dispatch("removeContextEvent", { key: currentPathString })
	}

</script>

<VisualJsonEntry
	targetObjectType={JsonType.OBJECT}
	currentPathString={currentPathString}
	contextMenuAddElement={contextMenuAddElement}
	contextMenuRemoveElement={contextMenuRemoveElement}>
	<VisualJsonEntryTitle title={title} />
</VisualJsonEntry>

{#if !hideChildren}

<li class="objectblock" style:background-color={backgroundColor}>
	<ul class="objectblock-inner">
		{#each Object.keys(targetObject) as key}
			{#if getJsonType(targetObject[key]) === JsonType.OBJECT || getJsonType(targetObject[key]) === JsonType.OBJECT}
				<li class="">
					<svelte:self
						on:contextEvent
						on:removeContextEvent
						on:clearContextEvent
						title={key}
						deleteObject={createDeleteFunction(key)}
						targetObject={targetObject[key]}
						parentPathString={currentPathString}
						parentPath={currentPath} />
				</li>
			{:else}
				<VisualJsonValue
					on:contextEvent
					on:removeContextEvent
					on:clearContextEvent
					key={key}
					value={targetObject[key]}
					parentPath={currentPathString}
					valueType={JsonType[getJsonType(targetObject[key])]} />
			{/if}
		{/each}
	</ul>
</li>

{:else}

<ul class="objectblock" style:background-color={backgroundColor}>
	<li class="hidden-block"><span
		on:click={() => {hideChildren = false;}}
		on:keydown={() => {hideChildren = false;}}>...</span></li>
</ul>

{/if}

<style>

	.objectblock {
		margin-left: 20px;
		border-left: 1px solid black;
		padding-left: 0;
		padding-top: 12px;
		padding-bottom: 5px;
		margin-bottom: 10px;
		list-style: none;
		box-sizing: border-box;
		transition: background-color 0.1s;
	}

	.objectblock::after {
		display: block;
		content: "";
		position: relative;
		bottom: -5px;
		left: -5px;
		width: 10px;
		height: 2px;
		background-color: black;
	}

	.objectblock-inner {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.hidden-block {
		margin-left: 20px;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.hidden-block span {
		padding: 2px 5px 2px 5px;
		border-radius: 3px;
		background-color: #00000022;
		user-select: none;
	}

</style>