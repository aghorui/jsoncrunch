<script lang="ts">
	export let code: string = ""
</script>

<pre class="text-view" contenteditable="true" bind:innerText={code}>
</pre>

<style>
	.text-view {
		flex: 1;
		height: 100%;
		font-family: monospace;
		overflow: auto;
		margin: 0;
		padding: 5px;
		box-shadow: 0px 5px 5px -4px rgba(0,0,0,0.4) inset;
	}

	.text-view:focus {
		outline: 0px solid transparent;
	}
</style>