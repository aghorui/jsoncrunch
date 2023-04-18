<script lang="ts">
	export let code: string = "";
	export let errorMessage: string = "";
	export let shown: boolean = false;
</script>

<div class="text-view-container"  style:display={shown ? "flex" : "none"}>

	{#if errorMessage !== ""}
		<div class="error-message">
			{errorMessage}
		</div>
	{/if}

	<textarea class="text-view" bind:value={code} />

</div>

<style>

	.text-view-container {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.text-view {
		flex: 1;
		font-family: monospace;
		overflow: auto;
		margin: 0;
		padding: 0;
		resize: none;
		box-shadow: 0px 5px 5px -4px rgba(0,0,0,0.4) inset;
		border: none;
		padding: 3px;
		white-space: pre;
		overflow-wrap: normal;
	}

	.text-view:focus {
		outline: 0px solid transparent;
	}

	.error-message {
		flex: 0;
		background-color: #C6463A;
		color: white;
		padding: 4px;
		box-sizing: border-box;
		width: 100%;
	}

</style>