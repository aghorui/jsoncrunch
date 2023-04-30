<script lang="ts">
	import { JsonType, JsonTypeNames, type JsonValue } from "../../lib/Types";
	import { copyText } from "../../lib/Util";
	export let valueType: JsonType = JsonType.INVALID;
	export let currentPathString: string = "(no path)";
	export let value: JsonValue = null;

</script>

<div class="entry-menu">
	<!-- <button type="button" on:click={() => {persistentHighlight = !persistentHighlight}}>
		{#if persistentHighlight}Unpin{:else}Pin{/if}
	</button> -->

	<!-- <button on:click|stopPropagation type="button">Info</button> -->

	<!-- <button type="button" disabled={deleteObject === null} on:click|stopPropagation={() => {if (deleteObject) deleteObject()}}>Delete</button> -->

	<!-- <button type="button">Delete</button>-->

	<button
		type="button"
		on:click|stopPropagation={() => { copyText(currentPathString) }}>
		Copy Path
	</button>

	<button type="button"
		on:click|stopPropagation={() => { copyText(JSON.stringify(value, null, 4)) }}>
		Copy Value
	</button>

	<slot />

	<div class="path-display">
		{currentPathString} : <i>{JsonTypeNames[valueType]}</i>
	</div>
</div>

<style>
	button {
		font-family: monospace;
		font-size: 9px;
	}

	.path-display {
		display: inline-block;
		user-select: none;
	}

	.entry-menu {
		display: inline-block;
		flex: 1;
		padding-left: 5px;
	}
</style>