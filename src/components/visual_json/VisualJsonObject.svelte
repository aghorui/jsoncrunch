<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { getJsonType, JsonType, type ContextMenuEvent, type JsonPath } from "../../lib/Types";
	import { copyText, hasWhiteSpace, isInteger, getIndexRepresentation } from "../../lib/Util";
	import VisualJsonValue from "./VisualJsonValue.svelte";
    import { contextMenuTargetSet } from "../../lib/State";

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

	function createDeleteFunction(index: number | string): () => void {
		return () => {
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

	onDestroy(() => {
		console.log("Destroying ", currentPathString)
	})

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class="title"
	on:contextmenu={contextMenuAddElement}
	on:mouseenter={() => {isHighlighted = true;}}
	on:mouseleave={() => {isHighlighted = false;}}
	on:click={(e) => {persistentHighlight = !persistentHighlight;
			if (persistentHighlight) {
				contextMenuAddElement(e);
			} else {
				contextMenuRemoveElement(e);
			}
		}}
	style:background-color={titleBackgroundColor}>

<div class="thing-container" style="display: flex; align-items: center;">
	<div class="line-thing" style="display: flex; align-items: center;">
		<div class="line-thing-inner"></div>
	</div>

	<div class="title-label" style:background-color={titleColor}>
		{title}
	</div>

	{#if isHighlighted}
		<div style:display="inline-block" style:flex="1" style:padding-left="5px">
			<!-- <button type="button" on:click={() => {persistentHighlight = !persistentHighlight}}>
				{#if persistentHighlight}Unpin{:else}Pin{/if}
			</button> -->

			<button on:click|stopPropagation type="button">Info</button>

			<!-- <button type="button" disabled={deleteObject === null} on:click|stopPropagation={() => {if (deleteObject) deleteObject()}}>Delete</button> -->

			<!-- <button type="button">Delete</button>-->

			<button type="button" on:click|stopPropagation={() => { copyText(currentPathString) }}>Copy Path</button>

			<button type="button" on:click|stopPropagation={() => { copyText(JSON.stringify(targetObject, null, 4)) }}>Copy JSON</button>

			<div class="path" on:click|stopPropagation style:display="inline-block">{currentPathString} : <i>Object</i></div>
		</div>
	{/if}
</div>

</li>

{#if !hideChildren}

<li class="objectblock" style:background-color={backgroundColor}>
	<ul class="objectblock-inner">
		{#each Object.keys(targetObject) as key}
			{#if getJsonType(targetObject[key]) === JsonType.OBJECT}
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

	button {
		font-size: 10px;
	}

	.objectblock {
		margin-left: 20px;
		border-left: 1px solid black;
		padding-left: 0;
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

	.objectblock-inner {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.line-thing {
		display: inline-block;
		vertical-align: middle;
		width: 8px;
		height: 1px;
		border: none;
		background-color: black;
	}

	.line-thing-inner {
		width: 5px;
		height: 5px;
		background-color: white;
		margin-left: -3px;
		border:1px solid black;
		box-sizing: border-box;
	}
/*
	.line-thing::before {
		left: -2px;
		top: -50%;
		width: 4px;
		height: 4px;
		content: "";
		display: block;
		position: relative;
		background-color: black;
	}*/

	.title {
		padding-top: 12px;
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