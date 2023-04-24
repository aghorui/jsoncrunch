<script lang="ts">
	export let label: string = "";
	export let onclick: () => void = null;
</script>

<button type="button" class="button" on:click={onclick}>
{label}
</button>

<style>
	.button {
		border-radius: 3px;
		border: none;
		background-color: #222222;
		padding: 4px;
		color: white;
	}
</style>