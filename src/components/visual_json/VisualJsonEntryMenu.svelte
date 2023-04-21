<script lang="ts">
    import { JsonType, JsonTypeNames } from "../../lib/Types";
	import { copyText } from "../../lib/Util";
	export let targetObjectType: JsonType = JsonType.INVALID;
	export let currentPathString: string = "";
	export let targetObject: object = null;

</script>

<div class="entry-menu">
	<!-- <button type="button" on:click={() => {persistentHighlight = !persistentHighlight}}>
		{#if persistentHighlight}Unpin{:else}Pin{/if}
	</button> -->

	<button on:click|stopPropagation type="button">Info</button>

	<!-- <button type="button" disabled={deleteObject === null} on:click|stopPropagation={() => {if (deleteObject) deleteObject()}}>Delete</button> -->

	<!-- <button type="button">Delete</button>-->

	<button
		type="button"
		on:click|stopPropagation={() => { copyText(currentPathString) }}>
		Copy Path
	</button>

	<button type="button"
		on:click|stopPropagation={() => { copyText(JSON.stringify(targetObject, null, 4)) }}>
		Copy JSON
	</button>

	<div on:click|stopPropagation on:keypress|stopPropagation  style:display="inline-block">
		{currentPathString} : <i>{JsonTypeNames[targetObjectType]}</i>
	</div>
</div>

<style>
	button {
		font-size: 10px;
	}
	.entry-menu {
		display: inline-block;
		flex: 1;
		padding-left: 5px;
	}
</style>