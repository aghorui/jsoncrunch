<script lang="ts">
	import { contextMenuTargetSet } from "../../lib/State";
	import { JsonType } from "../../lib/Types";
	import VisualJsonEntryMenu from "./VisualJsonEntryMenu.svelte";

	export let titleBackgroundColor: string = "";
	export let targetObjectType: JsonType = JsonType.INVALID;
	export let targetObject: object | [any] = {};
	export let isHighlighted: boolean = false;
	export let currentPathString: string = "(no path)";
	export let contextMenuAddElement: (Event) => void = null
	export let contextMenuRemoveElement: (Event) => void = null

	let persistentHighlight: boolean = false;

	$: backgroundColor = isHighlighted || persistentHighlight ? "rgba(0, 0, 0, 0.05)" : "unset";
	$: titleBackgroundColor = persistentHighlight ? "rgba(0, 0, 0, 0.4)" :
							  (isHighlighted ? "rgba(0, 0, 0, 0.2)" :
							  "unset");
	$: titleColor = isHighlighted ? "lightyellow" : "#FAFAFA";
	$: persistentHighlight = $contextMenuTargetSet.has(currentPathString);

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

<div class="entry-container">
	<div class="entry-stem">
		<div class="entry-stem-inner"></div>
	</div>

	<slot />

	{#if isHighlighted}
		<VisualJsonEntryMenu
			targetObjectType={targetObjectType}
			currentPathString={currentPathString}
			targetObject={targetObject} />
	{/if}
</div>

</li>

<style>
	.entry-container {
		display: flex;
		align-items: center;
		margin-top: 10px;
		user-select: none;
		cursor: pointer;
	}

	.entry-stem {
		display: flex;
		align-items: center;
	}

	.entry-stem {
		vertical-align: middle;
		width: 8px;
		height: 1px;
		border: none;
		background-color: black;
	}

	.entry-stem-inner {
		width: 5px;
		height: 5px;
		background-color: white;
		margin-left: -3px;
		border:1px solid black;
		box-sizing: border-box;
	}

	.title {
		margin-bottom: 0px;
		transition: background-color 0.1s;
		list-style: none;
		vertical-align: middle;
	}
</style>
