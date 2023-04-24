<script lang="ts">
	export let value: string = "";
	export let placeholder: string = "";
	export let readonly: boolean = false;
</script>

<input type="text" class="value-input" bind:value={value} placeholder={placeholder} readonly={readonly}/>

<style>
	.value-input {
		border-radius: 3px;
		border: none;
		background-color: #222222;
		padding: 4px;
		color: white;
	}
</style>