<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { getJsonType, JsonType, type ContextMenuEvent, type JsonPath, RightBorderStyle, type JsonValue } from "../../lib/Types";
	import { copyText, hasWhiteSpace, isInteger, getIndexRepresentation } from "../../lib/Util";
	import VisualJsonValue from "./VisualJsonValue.svelte";
	import { contextMenuTargetSet } from "../../lib/State";
	import VisualJsonEntryMenu from "./VisualJsonEntryMenu.svelte";
	import VisualJsonEntry from "./VisualJsonEntry.svelte";
	import VisualJsonEntryTitle from "./VisualJsonEntryTitle.svelte";
	import VisualJsonString from "./VisualJsonString.svelte";
	import VisualJsonNumber from "./VisualJsonNumber.svelte";
	import VisualJsonBoolean from "./VisualJsonBoolean.svelte";
	import VisualJsonNull from "./VisualJsonNull.svelte";
	import Config from "../../lib/Config";

	const dispatch = createEventDispatcher()

	export let parentPathString: string = "";
	export let parentPath: JsonPath = [];
	export let title: string = "";
	export let parentObject: object | any = null;
	export let targetObject: object | any = null;
	export let isHighlighted: boolean = false;
	export let currentPathString: string = "";
	export let currentPath: JsonPath = [ ...parentPath, title ];
	export let hideChildren: boolean = false;
	export let deleteObject: (pathString: string) => void = null;
	export let updateObject: (pathString: string, value: JsonValue) => void = null;

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
			dispatch("treeUpdatedEvent", { pathString: pathString })
		}
	}

	function createUpdateFunction(index: number | string): (string, JsonValue) => void {
		return (pathString: string, value: JsonValue) => {
			console.log($contextMenuTargetSet)
			targetObject[index] = value;
			targetObject = targetObject;
			$contextMenuTargetSet = $contextMenuTargetSet;
			dispatch("treeUpdatedEvent", { pathString: pathString })
		}
	}

	function contextMenuAddElement(e: MouseEvent) {
		e.preventDefault();
		let detail: ContextMenuEvent = {
			deleteObject: deleteObject,
			updateObject: updateObject,
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
	valueType={JsonType.OBJECT}
	value={targetObject}
	currentPathString={currentPathString}
	contextMenuAddElement={contextMenuAddElement}
	contextMenuRemoveElement={contextMenuRemoveElement}>
	<VisualJsonEntryTitle
		title={title}
		displayValue={false}
		rightBorderStyle={RightBorderStyle.TRIANGLE}
		rightBorderColor={Config.TitleColors[JsonType.OBJECT]}/>
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
						on:treeUpdatedEvent
						title={key}
						deleteObject={createDeleteFunction(key)}
						updateObject={createUpdateFunction(key)}
						parentObject={targetObject}
						targetObject={targetObject[key]}
						parentPathString={currentPathString}
						parentPath={currentPath} />
				</li>
			{:else if getJsonType(targetObject[key]) === JsonType.STRING}
				<VisualJsonString
					on:contextEvent
					on:removeContextEvent
					on:clearContextEvent
					on:treeUpdatedEvent
					key={key}
					parentObject={targetObject}
					value={targetObject[key]}
					deleteObject={createDeleteFunction(key)}
					updateObject={createUpdateFunction(key)}
					parentPath={currentPathString}
					valueType={getJsonType(targetObject[key])} />
			{:else if getJsonType(targetObject[key]) === JsonType.NUMBER}
				<VisualJsonNumber
					on:contextEvent
					on:removeContextEvent
					on:clearContextEvent
					on:treeUpdatedEvent
					key={key}
					parentObject={targetObject}
					value={targetObject[key]}
					deleteObject={createDeleteFunction(key)}
					updateObject={createUpdateFunction(key)}
					parentPath={currentPathString}
					valueType={getJsonType(targetObject[key])} />
			{:else if getJsonType(targetObject[key]) === JsonType.BOOLEAN}
				<VisualJsonBoolean
					on:contextEvent
					on:removeContextEvent
					on:clearContextEvent
					on:treeUpdatedEvent
					key={key}
					parentObject={targetObject}
					value={targetObject[key]}
					deleteObject={createDeleteFunction(key)}
					updateObject={createUpdateFunction(key)}
					parentPath={currentPathString}
					valueType={getJsonType(targetObject[key])} />
			{:else if getJsonType(targetObject[key]) === JsonType.NULL}
				<VisualJsonNull
					on:contextEvent
					on:removeContextEvent
					on:clearContextEvent
					on:treeUpdatedEvent
					key={key}
					parentObject={targetObject}
					value={targetObject[key]}
					deleteObject={createDeleteFunction(key)}
					updateObject={createUpdateFunction(key)}
					parentPath={currentPathString}
					valueType={getJsonType(targetObject[key])} />
			{:else}
				<VisualJsonValue
					on:contextEvent
					on:removeContextEvent
					on:clearContextEvent
					on:treeUpdatedEvent
					key={key}
					parentObject={targetObject}
					value={targetObject[key]}
					deleteObject={createDeleteFunction(key)}
					updateObject={createUpdateFunction(key)}
					parentPath={currentPathString}
					valueType={getJsonType(targetObject[key])} />
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