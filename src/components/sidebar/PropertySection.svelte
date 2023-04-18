<script lang="ts">
	export let title: string = "";
	export let expanded: boolean = true;
</script>


<div class="property-section">

	<div class="title-container">
		<div class="title">{title}</div>
		<button class="expand-button" on:click={() => { expanded = !expanded; }}>
		{#if expanded} - {:else} + {/if}
		</button>
	</div>

{#if expanded}
	<div class="body">
		<slot></slot>
	</div>
{/if}

</div>

<style>

	.property-section {
		display: flex;
		flex-direction: column;
		min-width: 20%;
		background-color: #444444;
	}

	.title-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #333333;
		padding: 5px;
	}

	.title {
		flex: 1;
	}

	.expand-button {
		padding: 5px;
		width: 20px;
		text-align: center;
		background-color: #444444;
		border-radius: 3px;
		border: none;
		color: white;
		font-weight: bold;
	}

	.expand-button:hover {
		background-color: #555555;
	}

	.expand-button:active {
		background-color: #222222;
	}

	.body {
		padding: 5px;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

</style>