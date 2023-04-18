<script lang="ts">
	export let label: string = "";
	export let onclick: () => void = null;
</script>

<input type="button" class="button" value={label} on:click={onclick}/>

<style>
	.button {
		border-radius: 3px;
		border: none;
		background-color: #222222;
		padding: 4px;
		color: white;
	}
</style>