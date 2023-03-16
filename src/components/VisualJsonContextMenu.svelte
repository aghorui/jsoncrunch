<script lang="ts">
    import { JsonType } from "../lib/Types";
	import { copyText } from "../lib/Util";

	export let target: any = null;
	export let path: string = "(no path)";
	export let targetType: JsonType = JsonType.INVALID;
	export let x: number = 110;
	export let y: number = 110;
	export let isShown: boolean = true;
	export let contextMenuFocused = false;
</script>

{#if isShown}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="context-menu"
	style:top={`${y - 10}px`}
	style:left={`${x - 10}px`}
	on:mouseenter={() => { contextMenuFocused = true; }}
	on:mouseleave={() => { contextMenuFocused = false; }}>
	<div class="path" style:display="inline-block">{path} : <i>{targetType}</i></div>
	<button type="button" on:click={() => {}}>
<!-- 		{#if target.persistentHighlight}Unpin{:else}Pin{/if} -->
	</button>
	<button type="button">Info</button>
	<button type="button">Delete</button>
	<button type="button" on:click={() => { copyText("") }}>Copy Path</button>
	<button type="button" on:click={() => { copyText(target.key) }}>Copy Key</button>
	<button type="button" on:click={() => { copyText(target.value) }}>Copy Value</button>
</div>

{/if}

<style>
	button {
		display: block;
		width: 100%;
		border-top: 1px solid black;
		text-align: left;
		font-size: 10px;
		margin: 0;
	}

	.context-menu {
		background-color: white;
		padding: 5px;
		font-size: 10px;
		border: 1px solid black;
		position: fixed;
		z-index: 10000;
	}
</style>