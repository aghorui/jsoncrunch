<script lang="ts">
	import { isUndefinedOrNull, JsonType, JsonTypeNames, ViewportViewType, type ContextMenuEvent } from "../../lib/Types";
	import { copyText } from "../../lib/Util";
	import ToggleSelector from "../ToggleSelector.svelte";

	export let targetSet: Map<string, ContextMenuEvent> = null;
	let target: ContextMenuEvent

	$: if (targetSet.size == 1) {
		// grab the first value in the set
		target = targetSet.values().next().value;
	} else {
		target = null;
	}

	function deleteAll() {
/*		let list = [ ...targetSet.keys() ].sort()
		for (let i of list) {
			i.deleteObject();
		}

		targetSet.clear();
		targetSet = targetSet;*/
		// not implemented
	}

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="context-menu">
{#if targetSet.size > 0}
	<!-- <button type="button" on:click={togglePin} disabled={togglePin === null}>
		{#if target.persistentHighlight}Unpin{:else}Pin{/if}
	</button>
 -->
	<button type="button">Info</button>

	{#if targetSet.size === 1}
		<button type="button" disabled={target.deleteObject === null}>Subtree</button>

		<button type="button" on:click={() => target.deleteObject(target.path)} disabled={target.deleteObject === null}>Delete</button>

		<button type="button" on:click={() => { copyText(target.path) }}>Copy Path</button>

		<button type="button" on:click={() => { copyText(target.key) }}>Copy Key</button>
		

		<button type="button" on:click={() => { copyText(JSON.stringify(target.value)) }}>Copy Value</button>
	{:else if targetSet.size > 1}
		<button type="button" on:click={target.deleteObject} disabled={true}>Delete All</button>

		<button type="button" on:click={() => { copyText(target.path) }}>Copy Paths</button>

		<button type="button" on:click={() => { copyText(target.key) }}>Copy Keys</button>

		<button type="button" on:click={() => { copyText(JSON.stringify(target.value)) }}>Copy Values</button>
	{/if}

	{#if targetSet.size > 1}
		<button type="button" on:click={() => { copyText(JSON.stringify(target.value)) }}>Unselect All</button>
	{/if}

	<div class="spacer"> </div>

	{#if targetSet.size === 1}
		<button disabled={true} class="title">{target.path} : <i>{JsonTypeNames[target.type]}</button>
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
		padding: 5px;
	}

	.title:hover {
		background-color: #444444;
	}

	.title:active {
		background-color: #444444;
	}
</style>