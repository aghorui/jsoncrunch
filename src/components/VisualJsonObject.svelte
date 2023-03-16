<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
	import { getJsonType, JsonType, type ContextMenuEvent } from "../lib/Types";
	import { copyText, hasWhiteSpace, isInteger, getIndexRepresentation } from "../lib/Util";
	import VisualJsonValue from "./VisualJsonValue.svelte";

	const dispatch = createEventDispatcher()

	export let parentPath: string = "";
	export let title: string = "";
	export let targetObject: object | [any] = {};
	export let isHighlighted: boolean = false;
	export let currentPath: string = "";

	export let deleteObject: () => void = null;

	let persistentHighlight: boolean = false;

	$: backgroundColor = isHighlighted || persistentHighlight ? "rgba(0, 0, 0, 0.05)" : "unset";
	$: titleBackgroundColor = persistentHighlight ? "rgba(0, 0, 0, 0.4)" :
							  (isHighlighted ? "rgba(0, 0, 0, 0.2)" :
							  "unset");
	$: titleColor = isHighlighted ? "lightyellow" : "#FAFAFA";
	$: toolbarVisible = isHighlighted ? "visible" : "none";
	$: currentPath =  parentPath + getIndexRepresentation(title, parentPath);

	function createDeleteFunction(index: number | string): () => void {
		return () => {
			delete targetObject[index];
			targetObject = targetObject;
		}
	}

	function dispatchContextMenu(e: MouseEvent) {
		e.preventDefault();
		let detail: ContextMenuEvent = {
			deleteObject: deleteObject,
			isPinned: persistentHighlight,
			togglePin: () => { persistentHighlight = !persistentHighlight; },
			target: targetObject,
			path: currentPath,
			x: e.clientX,
			y: e.clientY
		}
		dispatch("contextEvent", detail)
	}

</script>

<li class="title"
	on:contextmenu={dispatchContextMenu}
	on:mouseenter={() => {isHighlighted = true;}}
	on:mouseleave={() => {isHighlighted = false;}}
	style:background-color={titleBackgroundColor}>
	<div class="title-label" style:background-color={titleColor}>
		{title}
	</div>

	{#if isHighlighted}
		<div style:display="inline-block">
			<button type="button" on:click={() => {persistentHighlight = !persistentHighlight}}>
				{#if persistentHighlight}Unpin{:else}Pin{/if}
			</button>
			<button type="button">Info</button>
			<button type="button" disabled={deleteObject === null} on:click={() => {if (deleteObject) deleteObject()}}>Delete</button>
			<!-- <button type="button">Delete</button>
			<button type="button" on:click={() => { copyText(currentPath) }}>Copy Path</button> -->
			<button type="button" on:click={() => { copyText(JSON.stringify(targetObject, null, 4)) }}>Copy JSON</button>
			<div class="path" style:display="inline-block">{currentPath} : <i>Object</i></div>
		</div>
	{/if}
</li>

<ul class="objectblock" style:background-color={backgroundColor}>
	{#each Object.keys(targetObject) as key}
		{#if getJsonType(targetObject[key]) === JsonType.OBJECT}
			<li>
				<svelte:self
					on:contextEvent
					title={key}
					deleteObject={createDeleteFunction(key)}
					targetObject={targetObject[key]}
					parentObjectReference={targetObject}
					parentPath={currentPath} />
			</li>
		{:else}
			<VisualJsonValue
				on:contextEvent
				key={key}
				value={targetObject[key]}
				parentPath={currentPath}
				valueType={JsonType[getJsonType(targetObject[key])]} />
		{/if}
	{/each}
</ul>

<style>

	button {
		font-size: 10px;
	}

/*	.path {
		text-overflow: ellipsis;
		width: 100px;
		max-width: 100px
	}*/

	.objectblock {
		margin-left: 20px;
		border-left: 1px solid black;
		padding-left: 0;
		padding-top: 5px;
		padding-bottom: 5px;
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

/*	.valueblock {
		margin-left: 8px;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.valueblock-label {
		border-right: 1px solid black;
		background-color: #E0E0E0;
		display: inline-block;
		padding: 4px;
	}

	.valueblock-value {
		font-style: italic;
		display: inline-block;
		padding: 4px;
		padding-left: 4px;
		padding-right: 4px;
	}

	.valueblock {
		border: 1px solid black;
		border-right: 5px solid green;
		border-radius: 2px;
		display: inline-block;
		background-color: #FAFAFA;
	}

	.valueblock-container::before {
		display: block;
		content: "";
		position: relative;
		width: 5px;
		height: 1px;
		margin-top:auto;
		margin-bottom:auto;
		background-color: black;
	}

	.valueblock-container:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.valueblock-container:hover .valueblock {
		background-color: lightyellow;
	}
*/

	.title {
		margin-left: 8px;
		margin-top: 12px;
		margin-bottom: 0px;
		transition: background-color 0.1s;
		list-style: none;
		vertical-align: middle;
	}

	.title .title-label {
		padding: 4px;
		border: 1px solid black;
		border-right: 5px solid blue;
		display: inline-block;
		background-color: #FAFAFA;
	}
</style>