<script lang="ts">
	import { isUndefinedOrNull, JsonType, JsonTypeNames, ViewportViewType } from "../lib/Types";
	import { copyText } from "../lib/Util";
	import ToggleSelector from "./ToggleSelector.svelte";

	export let target: any = null;
	export let path: string = "(no path)";
	export let targetType: JsonType = JsonType.INVALID;
	export let x: number = 110;
	export let y: number = 110;
	export let deleteObject: () => void = null;
	export let togglePin: () => void = null;
	export let contextMenuFocused: boolean = false;
	export let targetSet: Map<string, object> = null;
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="context-menu"
	style:top={`${y}px`}
	style:left={`${x}px`}
	on:mouseenter={() => { contextMenuFocused = true; }}
	on:mouseleave={() => { contextMenuFocused = false; }}>
{#if targetSet.size > 0}
	<button type="button" on:click={togglePin} disabled={togglePin === null}>
		{#if target.persistentHighlight}Unpin{:else}Pin{/if}
	</button>

	<button type="button">Info</button>


	<button type="button" disabled={deleteObject === null}>Subtree</button>

	<button type="button" on:click={deleteObject} disabled={deleteObject === null}>Delete</button>

	<button type="button" on:click={() => { copyText(path) }}>Copy Path</button>

	<button type="button" on:click={() => { copyText(target.key) }}>Copy Key</button>

	<button type="button" on:click={() => { copyText(target.value) }}>Copy Value</button>

	{#if targetSet.size > 1}
		<button type="button" on:click={() => { copyText(target.value) }}>Unselect All</button>
	{/if}

	<div class="spacer"> </div>

	{#if targetSet.size === 1}
		<button disabled={true} class="title">{path} : <i>{JsonTypeNames[targetType]}</button>
	{/if}

	{#if targetSet.size > 1}
		<span class="status">Num Selected: {targetSet.size}</span>
	{/if}

{:else}
	<span class="status">Nothing Selected.</span>

	<div class="spacer"> </div>
{/if}
</div>

<style>
	button {
		font-size: 10px;
		background: white;
		border: 1px solid grey;
		border-radius: 3px;
		padding: 3px;
		margin-left: 2px;
		margin-right: 2px;
		display: inline-block;
		box-sizing: border-box;
	}

	button:hover {
		background-color: #aaaaaa;
	}

	button:active {
		background-color: #888888;
	}

/*	.context-menu-container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: #444444;
		z-index: 10000;
	}

	.context-menu {
		background-color: white;
		font-size: 10px;
		border: 1px solid black;
		position: fixed;
		z-index: 10000;
		padding: 0;
	}
*/

	.context-menu {
		background-color: #E9E9E9;
		display: flex;
		align-items: center;
		align-content: center;
		height: 30px;
		padding: 3px;
		box-sizing: border-box;
		flex: 1;
	}

	.status {
		font-size: 12px;
		margin-left: 4px;
		margin-right: 4px;
	}

	.spacer {
		flex: 1;
	}

	.context-menu > * {
		flex-shrink: 0;
		padding: 3px;
	}

	.title {
		text-align: right;
		border: none;
		background-color: #444444;
		font-weight: bold;
		color: white;
	}

	.title:hover {
		background-color: #444444;
	}

	.title:active {
		background-color: #444444;
	}
</style>