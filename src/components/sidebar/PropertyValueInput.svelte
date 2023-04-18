<script lang="ts">
	export let value: string = "";
	export let placeholder: string = "";
</script>

<input type="text" class="value-input" value={value} placeholder={placeholder}/>

<style>
	.value-input {
		border-radius: 3px;
		border: none;
		background-color: #222222;
		padding: 4px;
		color: white;
	}
</style>