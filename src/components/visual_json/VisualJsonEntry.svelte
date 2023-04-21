<script lang="ts">
	import { JsonType } from "../../lib/Types";
	import VisualJsonEntryMenu from "./VisualJsonEntryMenu.svelte";

	let contextMenuAddElement
	let contextMenuRemoveElement
	let isHighlighted = false;
	let persistentHighlight = false;
	let titleBackgroundColor;
	export let targetObjectType: JsonType = JsonType.INVALID;
	export let currentPathString: string = "";
	export let targetObject: object = null;
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

	<!-- <div class="title-label" style:background-color={titleColor}>
		{title}
	</div> -->

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
	}

	.entry-stem {
		display: flex;
		align-items: center;
	}

	.entry-stem {
		display: inline-block;
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
</style>
