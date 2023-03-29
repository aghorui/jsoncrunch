<script lang="ts">
    import { isUndefinedOrNull, JsonType, JsonTypeNames } from "../lib/Types";
	import { copyText } from "../lib/Util";

	export let target: any = null;
	export let path: string = "(no path)";
	export let targetType: JsonType = JsonType.INVALID;
	export let x: number = 110;
	export let y: number = 110;
	export let isShown: boolean = true;
	export let deleteObject: () => void = null;
	export let togglePin: () => void = null;
	export let contextMenuFocused = false;
</script>

{#if isShown}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="context-menu-container">
<div class="context-menu"
	style:top={`${y}px`}
	style:left={`${x}px`}
	on:mouseenter={() => { contextMenuFocused = true; }}
	on:mouseleave={() => { contextMenuFocused = false; }}>

	<button disabled={true} class="title">{path} : <i>{JsonTypeNames[targetType]}</button>

	<button type="button" on:click={togglePin} disabled={togglePin === null}>
		{#if target.persistentHighlight}Unpin{:else}Pin{/if}
	</button>

	<button type="button">Info</button>

	<button type="button" on:click={deleteObject} disabled={deleteObject === null}>Delete</button>

	<button type="button" on:click={() => { copyText(path) }}>Copy Path</button>

	<button type="button" on:click={() => { copyText(target.key) }}>Copy Key</button>

	<button type="button" on:click={() => { copyText(target.value) }}>Copy Value</button>
</div>
</div>

{/if}

<style>
	button {
		background: none;
		display: block;
		width: 100%;
		border: none;
		border-top: 1px solid black;
		text-align: left;
		font-size: 12px;
		padding: 3px;
		margin: 0;
	}

	button:hover {
		background-color: #aaaaaa;
	}

	button:active {
		background-color: #888888;
	}

	.context-menu-container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
/*		background-color: #444444;
*/		z-index: 10000;
	}

	.context-menu {
		background-color: white;
		font-size: 10px;
		border: 1px solid black;
		position: fixed;
		z-index: 10000;
		padding: 0;
	}

	.title {
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