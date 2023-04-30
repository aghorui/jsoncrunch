<script lang="ts">
	import { copyText, getClipboardText } from "../../lib/Util";
	export let text: string; // supposed to be bound to.
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="context-menu">
	<button type="button" on:click={() => { copyText(text) }}>Copy All</button>
	<button type="button" on:click={() => { text = getClipboardText() }}>Paste from Clipboard</button>
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